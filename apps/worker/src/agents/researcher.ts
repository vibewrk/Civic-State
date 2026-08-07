import { Worker, Job } from 'bullmq';
import { computeRowHmac } from 'shared/hmac';
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

interface ResearchSourceCounts {
  regulationsFound: number;
  caseLawFound: number;
  stateStatutesFound: number;
  totalSourcesFound: number;
}

type CitationReviewFlagOutcome =
  | 'flagged'
  | 'already_flagged'
  | 'terminal_submission'
  | 'stale_job';

function buildVerifiedSummary(
  research: ResearchResult,
  verification: VerificationSummary,
): string {
  if (verification.unverifiedCount === 0) {
    return research.summary;
  }

  return [
    'Verified-only summary.',
    `${verification.verifiedCount} citation(s) passed provenance validation; ${verification.unverifiedCount} citation(s) failed and were omitted.`,
    verification.verifiedCount > 0
      ? 'Use only the verified citations carried in this handoff.'
      : 'No citation-backed legal summary is available without human review.',
  ].join(' ');
}

function buildVerifiedResearchBrief(
  research: ResearchResult,
  verification: VerificationSummary,
  verifiedSummary = buildVerifiedSummary(research, verification),
): string {
  if (verification.unverifiedCount === 0) {
    return research.researchBrief;
  }

  const verifiedCitationLines = verification.verified.map((citation) => {
    const reference =
      citation.evidence.canonicalReference ?? citation.reference;
    return `- ${citation.text} (${reference})`;
  });

  return [
    verifiedSummary ? `Summary: ${verifiedSummary}` : 'Summary unavailable.',
    '',
    'Verified legal citations:',
    verifiedCitationLines.length > 0
      ? verifiedCitationLines.join('\n')
      : 'No citations passed provenance validation.',
    '',
    `Original research narrative omitted because ${verification.unverifiedCount} citation(s) failed provenance validation.`,
  ].join('\n');
}

function buildDrafterCitationProvenance(verification: VerificationSummary) {
  return {
    total: verification.total,
    verifiedCount: verification.verifiedCount,
    unverifiedCount: verification.unverifiedCount,
    allFailed: verification.allFailed,
    failClosed: verification.failClosed,
    qualityCounts: verification.qualityCounts,
    results: verification.results.map((citation, index) => ({
      index,
      source: citation.source,
      verified: citation.verified,
      qualityTier: citation.qualityTier,
      failureReasons: citation.failureReasons,
      evidence: {
        citationWellFormed: citation.evidence.citationWellFormed,
        sourceResolved: citation.evidence.sourceResolved,
        quoteMatched: citation.evidence.quoteMatched,
        checkedAt: citation.evidence.checkedAt,
      },
    })),
  };
}

async function flagSubmissionForCitationReview(
  submissionId: string,
  jobId: string | undefined,
  verification: VerificationSummary,
  sourceCounts: ResearchSourceCounts,
): Promise<CitationReviewFlagOutcome> {
  const { prisma } = await import('shared');
  const reviewDetails =
    verification.total > 0
      ? 'All cited authorities failed provenance validation; submission requires human review before drafting.'
      : 'Search found legal sources, but the research handoff contained no verifiable citations; submission requires human review before drafting.';

  const details = {
    tier: 'flag',
    reason: 'citation_verification_failed',
    confidence: 1,
    citationsVerified: verification.verifiedCount,
    citationsStripped: verification.unverifiedCount,
    totalCitations: verification.total,
    totalSourcesSearched: sourceCounts.totalSourcesFound,
    citationQuality: verification.qualityCounts,
    citationFailures: verification.unverified.map((citation) => ({
      source: citation.source,
      reference: citation.evidence.canonicalReference ?? citation.reference,
      qualityTier: citation.qualityTier,
      failureReasons: citation.failureReasons,
      evidence: {
        citationWellFormed: citation.evidence.citationWellFormed,
        sourceResolved: citation.evidence.sourceResolved,
        quoteMatched: citation.evidence.quoteMatched ?? null,
      },
    })),
    details: reviewDetails,
  };

  return prisma.$transaction(async (transactionClient) => {
    const tx = transactionClient as typeof prisma;

    const [submission, latestJob] = await Promise.all([
      tx.submission.findUnique({
        where: { id: submissionId },
        select: { userId: true, status: true },
      }),
      jobId
        ? tx.job.findFirst({
            where: { submissionId },
            orderBy: { createdAt: 'desc' },
            select: { id: true },
          })
        : Promise.resolve(null),
    ]);

    if (!submission) {
      throw new Error(`Submission ${submissionId} not found for citation review`);
    }
    if (latestJob && latestJob.id !== jobId) {
      return 'stale_job';
    }
    if (submission.status === 'flagged') {
      return 'already_flagged';
    }
    if (submission.status === 'rejected') {
      return 'terminal_submission';
    }

    const updatedSubmission = await tx.submission.update({
      where: { id: submissionId },
      data: { status: 'flagged' },
      select: { userId: true },
    });

    const hmacFields = {
      userId: updatedSubmission.userId ?? 'system',
      action: 'submission.flagged',
      resource: 'submission',
      resourceId: submissionId,
      details: JSON.stringify(details),
    };

    await tx.auditLog.create({
      data: {
        userId: updatedSubmission.userId,
        action: 'submission.flagged',
        resource: 'submission',
        resourceId: submissionId,
        details,
        hmacChecksum: computeRowHmac(hmacFields),
      },
    });

    return 'flagged';
  });
}

export function buildResearchHandoff(
  research: ResearchResult,
  verification: VerificationSummary,
  sourceCounts: ResearchSourceCounts,
) {
  const verifiedCitations = verification.verified.map(
    ({
      verified: _verified,
      qualityTier: _qualityTier,
      canonicalId: _canonicalId,
      evidence: _evidence,
      failureReasons: _failureReasons,
      ...rest
    }) => rest,
  );

  const verifiedSummary = buildVerifiedSummary(research, verification);
  const verifiedResearchBrief = buildVerifiedResearchBrief(
    research,
    verification,
    verifiedSummary,
  );
  const verifiedRecommendedArguments =
    verification.unverifiedCount > 0 ? [] : research.recommendedArguments;

  return {
    regulationsFound: sourceCounts.regulationsFound,
    caseLawFound: sourceCounts.caseLawFound,
    stateStatutesFound: sourceCounts.stateStatutesFound,
    totalSourcesSearched: sourceCounts.totalSourcesFound,
    citationsVerified: verification.verifiedCount,
    citationsStripped: verification.unverifiedCount,
    citationQuality: verification.qualityCounts,
    citationProvenance: buildDrafterCitationProvenance(verification),
    researchBrief: verifiedResearchBrief,
    citations: verifiedCitations,
    recommendedArguments: verifiedRecommendedArguments,
    summary: verifiedSummary,
  };
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

export async function processJob(job: Job): Promise<void> {
  const { submissionId, jobId, concern, state, issueCategories } = job.data as {
    submissionId: string;
    jobId?: string;
    concern: string;
    state?: string;
    issueCategories?: string[];
  };
  const jobRecordId = jobId ?? submissionId;
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
    jobId: jobRecordId,
    action: 'research_synthesis',
    systemPrompt: RESEARCHER_SYSTEM_PROMPT,
    userMessage,
    temperature: 0.2,
  });

  const research = parseResearchResponse(llmResult.text);

  // ---------------------------------------------------------------
  // Step 4: Verify all citations (SUBM-07)
  // ---------------------------------------------------------------
  const verification: VerificationSummary = await verifyCitations(
    research.citations,
  );

  const sourceCounts = {
    regulationsFound: ecfrResults.length,
    caseLawFound: courtListenerResults.length,
    stateStatutesFound: stateCacheResults.length,
    totalSourcesFound,
  };

  // ---------------------------------------------------------------
  // Step 6: Flag for human review if ALL citations fail (SUBM-08)
  // ---------------------------------------------------------------
  const allSubmittedCitationsFailed =
    verification.total > 0 && verification.allFailed;
  const citationsOmittedDespiteSources =
    verification.total === 0 && totalSourcesFound > 0;
  const needsHumanReview =
    allSubmittedCitationsFailed || citationsOmittedDespiteSources;

  // ---------------------------------------------------------------
  // Step 7: Build result and store on job.data for downstream Drafter
  // ---------------------------------------------------------------
  const result = {
    ...buildResearchHandoff(research, verification, sourceCounts),
    needsHumanReview,
  };

  const updateResearchJobData = () => job.updateData({
    ...job.data,
    research: result,
  });

  const logResearchAction = () => logAgentAction({
    jobId: jobRecordId,
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
    const flagOutcome = await flagSubmissionForCitationReview(
      submissionId,
      jobId,
      verification,
      sourceCounts,
    );
    await transitionJob(jobRecordId, 'researching', 'failed', config.name);
    try {
      await updateResearchJobData();
    } catch (err) {
      console.warn(
        `[Researcher] Could not persist research handoff for flagged job ${jobRecordId}:`,
        err instanceof Error ? err.message : err,
      );
    }
    try {
      await logResearchAction();
    } catch (err) {
      console.warn(
        `[Researcher] Could not log research action for flagged job ${jobRecordId}:`,
        err instanceof Error ? err.message : err,
      );
    }
    console.warn(
      `[Researcher] Job ${jobRecordId}: ALL citations failed verification -- ${flagOutcome} before drafting (SUBM-08)`,
    );
    return;
  }

  // Store research data on the job for the Drafter agent
  await updateResearchJobData();

  // Log agent action with token usage (per AGNT-05, AGNT-06)
  await logResearchAction();

  // Transition to next state
  await transitionJob(jobRecordId, 'researching', 'drafting', config.name);
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const researcherWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

researcherWorker.on('failed', (job, err) => {
  console.error(`Researcher failed for job ${job?.id}:`, err.message);
});
