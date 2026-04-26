import Anthropic from '@anthropic-ai/sdk';
import type { ModerationTier, ModerationReason } from 'shared';

/**
 * Three-tier content moderation pipeline for CivicState submissions.
 *
 * Tier 1: Keyword blocklist — instant block for explicit threats/violence (regex).
 * Tier 2: LLM classification via Claude Haiku 4.5 — nuanced content analysis.
 * Tier 3: Human review — flagged submissions await admin triage.
 *
 * Non-partisan by design: the system prompt explicitly forbids
 * moderation based on political viewpoint or party affiliation.
 */

export interface ModerationResult {
  tier: ModerationTier;
  reason: ModerationReason;
  confidence: number;
  details: string;
}

// ─── Tier 1: Keyword Blocklist ───────────────────────────────────────────────

/**
 * Regex patterns for immediate threat detection.
 * These catch explicit, unambiguous threats of violence or illegal activity
 * that should never reach the LLM tier.
 */
const BLOCKLIST_PATTERNS: Array<{ pattern: RegExp; reason: ModerationReason; details: string }> = [
  {
    pattern: /\b(i\s+will\s+kill|going\s+to\s+kill|plan\s+to\s+kill|threat(en)?\s+to\s+kill)\b/i,
    reason: 'threat_of_violence',
    details: 'Explicit threat of lethal violence detected',
  },
  {
    pattern: /\b(bomb\s+threat|plant\s+a\s+bomb|blow\s+up|detonate|explosive\s+device)\b/i,
    reason: 'threat_of_violence',
    details: 'Bomb threat or explosive violence detected',
  },
  {
    pattern: /\b(shoot\s+up|mass\s+shooting|gun\s+them\s+down|open\s+fire\s+on)\b/i,
    reason: 'threat_of_violence',
    details: 'Threat of gun violence detected',
  },
  {
    pattern: /\b(i\s+will\s+(hurt|harm|attack|assault)|going\s+to\s+(hurt|harm|attack|assault))\b/i,
    reason: 'threat_of_violence',
    details: 'Direct threat of physical harm detected',
  },
  {
    pattern: /\b(kill\s+(myself|themselves|himself|herself)|suicide\s+bomb)\b/i,
    reason: 'self_harm',
    details: 'Self-harm or suicide-related threat detected',
  },
];

/**
 * Tier 1: Check content against keyword blocklist.
 * Returns a block result if matched, or null to proceed to Tier 2.
 */
function checkBlocklist(text: string): ModerationResult | null {
  for (const entry of BLOCKLIST_PATTERNS) {
    if (entry.pattern.test(text)) {
      return {
        tier: 'block',
        reason: entry.reason,
        confidence: 1.0,
        details: entry.details,
      };
    }
  }
  return null;
}

// ─── Tier 2: LLM Classification ─────────────────────────────────────────────

const MODERATION_SYSTEM_PROMPT = `You are a content moderation classifier for CivicState, a civic engagement platform that helps citizens write letters to government officials.

Your job is to determine if a submission is safe to process. Evaluate ONLY for:
- Threats of violence against individuals or groups
- Incitement to illegal activity
- Targeted harassment of specific individuals
- Hate speech directed at protected classes
- Self-harm content
- Sexually explicit content
- Spam or bot-generated gibberish

CRITICAL NON-PARTISAN RULE:
You MUST NOT moderate based on political viewpoint, party affiliation, ideology, or policy position. Citizens have the right to advocate for ANY legal policy position — conservative, liberal, progressive, libertarian, or otherwise. Strong political opinions, criticism of officials, and passionate advocacy are ALWAYS acceptable. The First Amendment protects political speech.

Examples of content that MUST pass regardless of political leaning:
- "I want to defund the police" — valid policy position
- "I want to ban all immigration" — valid policy position
- "The mayor is incompetent and should resign" — valid criticism
- "This law is destroying our community" — valid advocacy

Respond with ONLY a JSON object (no markdown, no explanation):
{
  "tier": "block" | "flag" | "pass",
  "reason": "threat_of_violence" | "illegal_activity" | "harassment" | "hate_speech" | "self_harm" | "explicit_content" | "spam" | "policy_violation" | "clean",
  "confidence": <number between 0 and 1>,
  "details": "<brief explanation>"
}

Confidence thresholds:
- "block" requires confidence > 0.95 (you must be near-certain)
- "flag" requires confidence > 0.80 (significant concern warranting human review)
- Below 0.80 confidence, default to "pass"`;

/**
 * Tier 2: LLM-based content classification using Claude Haiku 4.5.
 * Falls back to flagging for human review if the API call fails.
 */
async function classifyWithLLM(
  issueDescription: string,
  desiredOutcome: string,
): Promise<ModerationResult> {
  try {
    const client = new Anthropic();

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20250401',
      max_tokens: 256,
      system: MODERATION_SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Please classify the following civic submission:\n\nIssue Description:\n${issueDescription}\n\nDesired Outcome:\n${desiredOutcome}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : '';

    const parsed = JSON.parse(responseText) as {
      tier: string;
      reason: string;
      confidence: number;
      details: string;
    };

    // Enforce confidence thresholds
    const confidence = Math.max(0, Math.min(1, parsed.confidence));

    let tier: ModerationTier;
    if (parsed.tier === 'block' && confidence > 0.95) {
      tier = 'block';
    } else if (
      (parsed.tier === 'block' || parsed.tier === 'flag') &&
      confidence > 0.80
    ) {
      tier = 'flag';
    } else {
      tier = 'pass';
    }

    return {
      tier,
      reason: parsed.reason as ModerationReason,
      confidence,
      details: parsed.details,
    };
  } catch (err) {
    // Fail-safe: if LLM classification fails, flag for human review
    console.error('LLM moderation classification failed, falling back to flag:', err);
    return {
      tier: 'flag',
      reason: 'policy_violation',
      confidence: 0,
      details: `LLM classification failed: ${err instanceof Error ? err.message : 'Unknown error'}. Flagged for human review.`,
    };
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Run the three-tier content moderation pipeline on a submission.
 *
 * 1. Keyword blocklist (instant block for explicit threats)
 * 2. LLM classification via Haiku 4.5 (nuanced analysis)
 * 3. Human review (flagged submissions — handled downstream)
 *
 * @param issueDescription - The user's description of their civic issue
 * @param desiredOutcome - What the user wants to happen
 * @returns ModerationResult with tier, reason, confidence, and details
 */
export async function moderateContent(
  issueDescription: string,
  desiredOutcome: string,
): Promise<ModerationResult> {
  const combinedText = `${issueDescription} ${desiredOutcome}`;

  // Tier 1: Keyword blocklist
  const blocklistResult = checkBlocklist(combinedText);
  if (blocklistResult) {
    return blocklistResult;
  }

  // Tier 2: LLM classification
  return classifyWithLLM(issueDescription, desiredOutcome);
}
