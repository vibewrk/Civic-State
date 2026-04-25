import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { logAgentAction } from '../lib/logger.js';

const config = getAgentConfig('drafter');

async function processJob(job: Job): Promise<void> {
  const { submissionId } = job.data;
  const startTime = Date.now();

  // TODO (Phase 2): Call Anthropic API for letter drafting
  // - Use research brief from researcher agent
  // - Draft formal letter with citations
  // - Format for official delivery
  const result = {
    letterDrafted: true,
    wordCount: 0,
    citationsIncluded: 0,
  };

  // Log agent action with token usage (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'draft',
    result,
    modelUsed: config.model,
    inputTokens: 0, // Will be populated from API response in Phase 2
    outputTokens: 0,
    durationMs: Date.now() - startTime,
  });

  // Transition to payment_pending
  await transitionJob(submissionId, 'drafting', 'payment_pending', config.name);
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const drafterWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

drafterWorker.on('failed', (job, err) => {
  console.error(`Drafter failed for job ${job?.id}:`, err.message);
});
