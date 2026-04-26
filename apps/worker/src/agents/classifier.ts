import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { callWithLogging } from '../lib/anthropic.js';

const config = getAgentConfig('classifier');

const CLASSIFIER_SYSTEM_PROMPT = `You are a civic issue classifier for CivicState, a platform that helps citizens send researched, citation-backed letters to government officials.

Given a civic concern submitted by a user, classify it along the following dimensions. Respond with ONLY valid JSON, no other text.

## Classification Dimensions

**issueType** — one of:
- "policy" — relates to existing or proposed government policies
- "enforcement" — relates to enforcement of existing laws or regulations
- "legislation" — relates to proposed or needed legislation
- "budget" — relates to government spending, funding, or budget allocation
- "service" — relates to government services (infrastructure, utilities, public services)
- "other" — does not clearly fit the above categories

**jurisdiction** — one of:
- "federal" — federal government jurisdiction
- "state" — state-level government jurisdiction
- "local" — city, county, or municipal jurisdiction
- "multiple" — spans multiple jurisdiction levels

**severity** — one of:
- "critical" — immediate public safety or rights concern
- "high" — significant impact on community or individuals
- "medium" — moderate concern with clear civic relevance
- "low" — minor issue or general feedback

**categories** — array of 1-3 descriptive tags (e.g., ["transportation", "safety"], ["education", "funding", "equity"])

**confidence** — number 0.0 to 1.0 indicating your confidence in the classification

## Response Format

{
  "issueType": "...",
  "jurisdiction": "...",
  "severity": "...",
  "categories": ["..."],
  "confidence": 0.0
}`;

interface ClassificationResult {
  issueType: string;
  jurisdiction: string;
  severity: string;
  categories: string[];
  confidence: number;
}

const SAFE_DEFAULTS: ClassificationResult = {
  issueType: 'other',
  jurisdiction: 'local',
  severity: 'medium',
  categories: ['general'],
  confidence: 0.0,
};

function parseClassification(text: string): ClassificationResult {
  // Try to extract JSON from the response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    return SAFE_DEFAULTS;
  }

  const parsed = JSON.parse(jsonMatch[0]) as Record<string, unknown>;

  const validIssueTypes = [
    'policy',
    'enforcement',
    'legislation',
    'budget',
    'service',
    'other',
  ];
  const validJurisdictions = ['federal', 'state', 'local', 'multiple'];
  const validSeverities = ['critical', 'high', 'medium', 'low'];

  const issueType = validIssueTypes.includes(parsed.issueType as string)
    ? (parsed.issueType as string)
    : SAFE_DEFAULTS.issueType;

  const jurisdiction = validJurisdictions.includes(
    parsed.jurisdiction as string,
  )
    ? (parsed.jurisdiction as string)
    : SAFE_DEFAULTS.jurisdiction;

  const severity = validSeverities.includes(parsed.severity as string)
    ? (parsed.severity as string)
    : SAFE_DEFAULTS.severity;

  const categories = Array.isArray(parsed.categories)
    ? (parsed.categories.filter(
        (c: unknown) => typeof c === 'string',
      ) as string[])
    : SAFE_DEFAULTS.categories;

  const confidence =
    typeof parsed.confidence === 'number' &&
    parsed.confidence >= 0 &&
    parsed.confidence <= 1
      ? parsed.confidence
      : SAFE_DEFAULTS.confidence;

  return { issueType, jurisdiction, severity, categories, confidence };
}

async function processJob(job: Job): Promise<void> {
  const { submissionId, subject, body, location } = job.data;

  // Transition to classifying
  await transitionJob(submissionId, 'submitted', 'classifying', config.name);

  let result: ClassificationResult;

  try {
    const userMessage = [
      subject ? `Subject: ${subject}` : '',
      body ? `Concern: ${body}` : '',
      location ? `Location: ${location}` : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const response = await callWithLogging({
      agentName: 'classifier',
      jobId: submissionId,
      action: 'classify',
      systemPrompt: CLASSIFIER_SYSTEM_PROMPT,
      userMessage: userMessage || 'No content provided.',
      temperature: 0.1,
    });

    result = parseClassification(response.text);
  } catch (error) {
    console.error(
      `Classifier API call failed for job ${submissionId}:`,
      error instanceof Error ? error.message : error,
    );
    result = { ...SAFE_DEFAULTS };
  }

  // Store classification result on job data
  await job.updateData({
    ...job.data,
    classification: result,
  });

  // Transition to next state
  await transitionJob(submissionId, 'classifying', 'researching', config.name);
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const classifierWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

classifierWorker.on('failed', (job, err) => {
  console.error(`Classifier failed for job ${job?.id}:`, err.message);
});
