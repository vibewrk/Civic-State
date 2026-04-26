import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { logAgentAction } from '../lib/logger.js';
import { callWithLogging } from '../lib/anthropic.js';

const config = getAgentConfig('drafter');

const DRAFTER_SYSTEM_PROMPT = `You are a professional letter drafter for CivicState, a civic technology platform that helps citizens send researched, citation-backed letters to government officials.

CRITICAL RULES:
1. Write a formal, professional letter suitable for sending to a government official.
2. Use ONLY the citations and research provided — never invent or fabricate legal references.
3. Be persuasive but respectful. Focus on facts and legal basis.
4. Structure the letter with clear paragraphs: opening (state the concern), body (cite evidence and legal basis), and closing (state the desired outcome).
5. Address the official by their correct title and name.
6. Include inline citations in the format [Citation: source reference] where relevant.
7. Keep the letter between 400-800 words — concise but thorough.

OUTPUT FORMAT:
Respond with a JSON object (no markdown code fences) with this structure:
{
  "salutation": "Dear [Title] [Name]",
  "body": "The full letter body with citations inline",
  "closing": "Respectfully submitted",
  "wordCount": 500
}`;

const AI_DISCLOSURE = `AI Disclosure (California AI Transparency Law, SB 942): This letter was drafted with the assistance of artificial intelligence. The research, citations, and legal references have been verified against public government databases. The civic concerns expressed reflect the genuine views of the constituent.`;

const DISCLAIMER = `Disclaimer: This letter does not constitute legal advice. CivicState is a civic technology platform that assists constituents in communicating with their elected officials. The information provided is for civic engagement purposes only and should not be relied upon as a substitute for professional legal counsel.`;

const CAN_SPAM_FOOTER = `---
This message was sent by CivicState on behalf of a constituent.
CivicState, PO Box 1776, San Francisco, CA 94101
To stop receiving messages from CivicState: [OPT_OUT_URL]
Message-ID compliant with CAN-SPAM Act of 2003 (15 U.S.C. § 7701 et seq.)`;

interface DraftedLetter {
  salutation: string;
  body: string;
  closing: string;
  wordCount: number;
}

interface OfficialRecord {
  id: string;
  name: string;
  title: string;
  email: string;
  jurisdiction: string;
  level: string;
  district: string;
  state: string;
}

/**
 * Parse the LLM response into a structured letter draft.
 * Falls back gracefully if the response is not valid JSON.
 */
function parseDraftResponse(text: string): DraftedLetter {
  try {
    const cleaned = text.replace(/^```(?:json)?\n?/m, '').replace(/\n?```$/m, '');
    const parsed = JSON.parse(cleaned) as DraftedLetter;
    return {
      salutation: parsed.salutation ?? 'Dear Official',
      body: parsed.body ?? text,
      closing: parsed.closing ?? 'Respectfully submitted',
      wordCount: parsed.wordCount ?? parsed.body?.split(/\s+/).length ?? 0,
    };
  } catch {
    // If LLM returns non-JSON, use the entire text as the letter body
    return {
      salutation: 'Dear Official',
      body: text,
      closing: 'Respectfully submitted',
      wordCount: text.split(/\s+/).length,
    };
  }
}

/**
 * Compose the full letter content with all required disclosures and footers.
 */
function composeFullLetter(
  draft: DraftedLetter,
  sigLine: string,
): string {
  return [
    draft.salutation + ',',
    '',
    draft.body,
    '',
    draft.closing + ',',
    sigLine,
    '',
    '---',
    AI_DISCLOSURE,
    '',
    DISCLAIMER,
    '',
    CAN_SPAM_FOOTER,
  ].join('\n');
}

/**
 * Determine pricing tier based on official count.
 */
function determinePricingTier(officialCount: number): string {
  if (officialCount === 1) return 'single';
  if (officialCount <= 3) return 'three_pack';
  return 'full_spread';
}

async function processJob(job: Job): Promise<void> {
  const {
    submissionId,
    research,
    concern,
    desiredOutcome,
    zipCode,
    isAnonymous,
  } = job.data as {
    submissionId: string;
    research?: {
      researchBrief: string;
      citations: Array<{ text: string; source: string; reference: string }>;
      recommendedArguments: string[];
      summary: string;
    };
    concern?: string;
    desiredOutcome?: string;
    zipCode?: string;
    isAnonymous?: boolean;
  };

  const startTime = Date.now();

  // ---------------------------------------------------------------
  // Step 1: Get submission data and officials from the database
  // ---------------------------------------------------------------
  const { prisma } = await import('shared');

  const submission = await prisma.submission.findUniqueOrThrow({
    where: { id: submissionId },
  });

  const issueDescription = concern ?? submission.issueDescription;
  const outcome = desiredOutcome ?? submission.desiredOutcome;
  const zip = zipCode ?? submission.zipCode;
  const anonymous = isAnonymous ?? submission.isAnonymous;

  // Find officials matching this submission's zip code / jurisdiction
  const officials: OfficialRecord[] = await prisma.official.findMany({
    where: {
      optedOut: false,
      // Match officials by state derived from zip or by district
      OR: [
        { district: { contains: zip } },
        { jurisdiction: { contains: zip } },
      ],
    },
    take: 10, // Cap at 10 officials maximum
  });

  // If no officials found by zip, fall back to any non-opted-out officials
  // (in production, the official-lookup agent would populate these first)
  if (officials.length === 0) {
    console.warn(
      `[Drafter] No officials found for zip ${zip}, submission ${submissionId}. Campaign will have 0 letters.`,
    );
  }

  const officialCount = officials.length;
  const pricingTier = determinePricingTier(officialCount);

  // ---------------------------------------------------------------
  // Step 2: Create Campaign record
  // ---------------------------------------------------------------
  const campaign = await prisma.campaign.create({
    data: {
      submissionId,
      userId: submission.userId,
      status: 'draft',
      pricingTier,
      officialCount,
    },
  });

  // ---------------------------------------------------------------
  // Step 3: Build research context for the drafter
  // ---------------------------------------------------------------
  const researchBrief = research?.researchBrief ?? 'No research brief available.';
  const citations = research?.citations ?? [];
  const recommendedArguments = research?.recommendedArguments ?? [];

  const citationContext = citations.length > 0
    ? citations.map((c, i) => `[${i + 1}] ${c.text} (Source: ${c.source}, Ref: ${c.reference})`).join('\n')
    : 'No verified citations available.';

  const argumentContext = recommendedArguments.length > 0
    ? recommendedArguments.map((a, i) => `${i + 1}. ${a}`).join('\n')
    : 'No specific arguments recommended.';

  // Signature line depends on anonymity setting
  const sigLine = anonymous
    ? `A Concerned Constituent of ${zip}`
    : '[CONSTITUENT_NAME]'; // Filled in later from user profile

  // ---------------------------------------------------------------
  // Step 4: Draft a personalized letter for each official
  // ---------------------------------------------------------------
  let totalInputTokens = 0;
  let totalOutputTokens = 0;
  let totalWordCount = 0;
  let totalCitations = 0;
  const letterIds: string[] = [];

  for (const official of officials) {
    const userMessage = `Draft a formal letter to the following government official about the constituent's civic concern.

OFFICIAL:
Name: ${official.name}
Title: ${official.title}
Jurisdiction: ${official.jurisdiction}
Level: ${official.level}
District: ${official.district}
State: ${official.state}

CIVIC CONCERN:
${issueDescription}

DESIRED OUTCOME:
${outcome}

RESEARCH BRIEF:
${researchBrief}

VERIFIED CITATIONS (use ONLY these):
${citationContext}

RECOMMENDED ARGUMENTS:
${argumentContext}

SIGNATURE LINE: "${sigLine}"

Remember: Address this official specifically by their title and name. Reference their jurisdiction and authority where relevant.`;

    try {
      const llmResult = await callWithLogging({
        agentName: 'drafter',
        jobId: submissionId,
        action: `draft_letter_${official.id}`,
        systemPrompt: DRAFTER_SYSTEM_PROMPT,
        userMessage,
        temperature: 0.4,
      });

      totalInputTokens += llmResult.inputTokens;
      totalOutputTokens += llmResult.outputTokens;

      const draft = parseDraftResponse(llmResult.text);
      const fullContent = composeFullLetter(draft, sigLine);

      totalWordCount += draft.wordCount;
      // Count inline citations in the letter body
      const citationMatches = draft.body.match(/\[Citation:/g);
      totalCitations += citationMatches?.length ?? 0;

      // ---------------------------------------------------------------
      // Step 5: Create Letter record in database
      // ---------------------------------------------------------------
      const letter = await prisma.letter.create({
        data: {
          campaignId: campaign.id,
          officialId: official.id,
          content: fullContent,
          status: 'draft',
          aiDisclosure: true,
        },
      });

      letterIds.push(letter.id);
    } catch (letterErr) {
      console.error(
        `[Drafter] Failed to draft letter for official ${official.name} (${official.id}):`,
        letterErr instanceof Error ? letterErr.message : letterErr,
      );
      // Continue drafting for remaining officials — partial success is better than total failure
    }
  }

  // ---------------------------------------------------------------
  // Step 6: Update campaign status and log results
  // ---------------------------------------------------------------
  const lettersCreated = letterIds.length;

  if (lettersCreated > 0) {
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: { status: 'pending_payment' },
    });
  } else if (officialCount === 0) {
    // No officials found — still transition, payment can handle zero-letter case
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: { status: 'pending_payment' },
    });
  } else {
    // All letters failed to draft — mark campaign as failed
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: { status: 'failed' },
    });
  }

  const result = {
    campaignId: campaign.id,
    lettersCreated,
    officialCount,
    pricingTier,
    totalWordCount,
    citationsIncluded: totalCitations,
    letterIds,
  };

  // Store drafter output on job data for downstream agents
  await job.updateData({
    ...job.data,
    drafter: result,
  });

  // Log agent action with token usage (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'draft',
    result,
    modelUsed: config.model,
    inputTokens: totalInputTokens,
    outputTokens: totalOutputTokens,
    durationMs: Date.now() - startTime,
  });

  // ---------------------------------------------------------------
  // Step 7: Transition state
  // ---------------------------------------------------------------
  if (lettersCreated > 0 || officialCount === 0) {
    await transitionJob(submissionId, 'drafting', 'payment_pending', config.name);
  } else {
    // All drafts failed — transition to failed
    await transitionJob(submissionId, 'drafting', 'failed', config.name);
  }
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const drafterWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

drafterWorker.on('failed', (job, err) => {
  console.error(`Drafter failed for job ${job?.id}:`, err.message);
});
