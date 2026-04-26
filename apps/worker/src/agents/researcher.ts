import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { logAgentAction } from '../lib/logger.js';
import { callWithLogging } from '../lib/anthropic.js';
import { searchECFR } from '../lib/legal/ecfr.js';
import { searchCourtListener } from '../lib/legal/courtlistener.js';
import { searchStateCache } from '../lib/legal/state-cache.js';
import {
  verifyCitations,
  type Citation,
  type VerificationSummary,
} from '../lib/legal/citation-verifier.js';

const config = getAgentConfig('researcher');

const RESEARCHER_SYSTEM_PROMPT = `You are a legal researcher for CivicState, a civic technology platform. Your job is to analyze civic concerns and identify the most relevant legal authorities.

CRITICAL RULES:
1. You may ONLY cite sources from the search results provided below. Do NOT invent, fabricate, or hallucinate any citations.
2. Every legal reference you mention MUST come directly from the provided search results.
3. If the search results do not contain relevant legal authorities, say so explicitly rather than making up citations.
4. Structure your research brief with clear sections: Summary, Applicable Regulations, Relevant Case Law, State Statutes, and Recommended Arguments.
5. For each citation, include the exact source identifier so it can be verified.

OUTPUT FORMAT:
Respond with a JSON object (no markdown code fences) with this structure:
{
  "summary": "Brief overview of the legal landscape for this issue",
  "citations": [
    {
      "text": "Human-readable citation text",
      "source": "ecfr" | "courtlistener" | "state_cache",
      "reference": "The exact identifier (CFR citation, case name, or statute ID)"
    }
  ],
  "researchBrief": "Full narrative research brief for the drafter agent",
  "recommendedArguments": ["argument1", "argument2"]
}`;

interface ResearchResult {
  summary: string;
  citations: Citation[];
  researchBrief: string;
  recommendedArguments: string[];
}

/**
 * Parse the LLM response into structured research results.
 * Falls back gracefully if the response is not valid JSON.
 */
function parseResearchResponse(text: string): ResearchResult {
  try {
    // Strip markdown code fences if present
    const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '');
    const parsed = JSON.parse(cleaned) as ResearchResult;
    return {
      summary: parsed.summary ?? '',
      citations: Array.isArray(parsed.citations) ? parsed.citations : [],
      researchBrief: parsed.researchBrief ?? '',
      recommendedArguments: Array.isArray(parsed.recommendedArguments)
        ? parsed.recommendedArguments
        : [],
    };
  } catch {
    // If LLM returns non-JSON, wrap the entire response as the research brief
    return {
      summary: '',
      citations: [],
      researchBrief: text,
      recommendedArguments: [],
    };
  }
}

async function processJob(job: Job): Promise<void> {
  const { submissionId, concern, state, issueCategories } = job.data as {
    submissionId: string;
    concern: string;
    state?: string;
    issueCategories?: string[];
  };
  const startTime = Date.now();
  const categories = issueCategories ?? [];

  // ---------------------------------------------------------------
  // Step 1: Search all legal sources in parallel
  // ---------------------------------------------------------------
  const [ecfrResults, courtListenerResults, stateCacheResults] =
    await Promise.all([
      searchECFR(concern, categories),
      searchCourtListener(concern),
      state ? searchStateCache(state, categories) : Promise.resolve([]),
    ]);

  const totalSourcesFound =
    ecfrResults.length + courtListenerResults.length + stateCacheResults.length;

  // ---------------------------------------------------------------
  // Step 2: Build context for the LLM from search results
  // ---------------------------------------------------------------
  const searchContext = [
    '=== eCFR (Federal Regulations) ===',
    ...ecfrResults.map(
      (r, i) =>
        `[eCFR-${i + 1}] ${r.title}\nHeading: ${r.heading}\nCitation: ${r.cfrTitle} CFR § ${r.cfrSection || r.cfrPart}\nURL: ${r.url}\nExcerpt: ${r.text}`,
    ),
    ecfrResults.length === 0 ? 'No federal regulations found.' : '',
    '',
    '=== CourtListener (Case Law) ===',
    ...courtListenerResults.map(
      (r, i) =>
        `[CL-${i + 1}] ${r.caseName}\nCitation: ${r.citation}\nCourt: ${r.court}\nDate: ${r.dateFiled}\nURL: ${r.url}\nSnippet: ${r.snippet}`,
    ),
    courtListenerResults.length === 0 ? 'No case law found.' : '',
    '',
    '=== State Statutes ===',
    ...stateCacheResults.map(
      (r, i) =>
        `[STATE-${i + 1}] ${r.title}\nStatute ID: ${r.statuteId}\nState: ${r.state}\nCategory: ${r.category}\nURL: ${r.url}\nDescription: ${r.text}`,
    ),
    stateCacheResults.length === 0
      ? `No state statutes found${state ? ` for ${state}` : ''}.`
      : '',
  ]
    .filter(Boolean)
    .join('\n');

  const userMessage = `Research the following civic concern and identify all applicable legal authorities from the search results provided.

CIVIC CONCERN:
${concern}

${state ? `STATE: ${state}` : ''}
${categories.length > 0 ? `ISSUE CATEGORIES: ${categories.join(', ')}` : ''}

SEARCH RESULTS (you may ONLY cite from these):
${searchContext}`;

  // ---------------------------------------------------------------
  // Step 3: Call Sonnet for research synthesis
  // ---------------------------------------------------------------
  const llmResult = await callWithLogging({
    agentName: 'researcher',
    jobId: submissionId,
    action: 'research_synthesis',
    systemPrompt: RESEARCHER_SYSTEM_PROMPT,
    userMessage,
    temperature: 0.2,
  });

  const research = parseResearchResponse(llmResult.text);

  // ---------------------------------------------------------------
  // Step 4: Verify all citations (SUBM-07)
  // ---------------------------------------------------------------
  let verification: VerificationSummary;
  if (research.citations.length > 0) {
    verification = await verifyCitations(research.citations);
  } else {
    verification = {
      verified: [],
      unverified: [],
      total: 0,
      verifiedCount: 0,
      unverifiedCount: 0,
      allFailed: true,
    };
  }

  // ---------------------------------------------------------------
  // Step 5: Strip unverified citations (SUBM-07)
  // ---------------------------------------------------------------
  const verifiedCitations = verification.verified.map(
    ({ verified: _v, ...rest }) => rest,
  );

  // Update the research brief to only reference verified citations
  const verifiedResearchBrief =
    verification.unverifiedCount > 0
      ? `${research.researchBrief}\n\n[Note: ${verification.unverifiedCount} citation(s) could not be verified and were removed.]`
      : research.researchBrief;

  // ---------------------------------------------------------------
  // Step 6: Flag for human review if ALL citations fail (SUBM-08)
  // ---------------------------------------------------------------
  const needsHumanReview = verification.allFailed && totalSourcesFound > 0;

  // ---------------------------------------------------------------
  // Step 7: Build result and store on job.data for downstream Drafter
  // ---------------------------------------------------------------
  const result = {
    regulationsFound: ecfrResults.length,
    caseLawFound: courtListenerResults.length,
    stateStatutesFound: stateCacheResults.length,
    totalSourcesSearched: totalSourcesFound,
    citationsVerified: verification.verifiedCount,
    citationsStripped: verification.unverifiedCount,
    needsHumanReview,
    researchBrief: verifiedResearchBrief,
    citations: verifiedCitations,
    recommendedArguments: research.recommendedArguments,
    summary: research.summary,
  };

  // Store research data on the job for the Drafter agent
  await job.updateData({
    ...job.data,
    research: result,
  });

  // Log agent action with token usage (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'research',
    result: {
      regulationsFound: result.regulationsFound,
      caseLawFound: result.caseLawFound,
      stateStatutesFound: result.stateStatutesFound,
      citationsVerified: result.citationsVerified,
      citationsStripped: result.citationsStripped,
      needsHumanReview: result.needsHumanReview,
    },
    modelUsed: config.model,
    inputTokens: llmResult.inputTokens,
    outputTokens: llmResult.outputTokens,
    durationMs: Date.now() - startTime,
  });

  if (needsHumanReview) {
    console.warn(
      `[Researcher] Job ${submissionId}: ALL citations failed verification -- flagged for human review (SUBM-08)`,
    );
  }

  // Transition to next state
  await transitionJob(submissionId, 'researching', 'drafting', config.name);
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const researcherWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

researcherWorker.on('failed', (job, err) => {
  console.error(`Researcher failed for job ${job?.id}:`, err.message);
});
