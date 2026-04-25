import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { logAgentAction } from '../lib/logger.js';

const config = getAgentConfig('classifier');

async function processJob(job: Job): Promise<void> {
  const { submissionId } = job.data;
  const startTime = Date.now();

  // Transition to classifying
  await transitionJob(submissionId, 'submitted', 'classifying', config.name);

  // TODO (Phase 2): Call Anthropic API for classification
  // For Phase 1, simulate classification result
  const result = {
    issueType: 'policy',
    jurisdiction: 'federal',
    severity: 'medium',
    confidence: 0.85,
  };

  // Log agent action with token usage (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'classify',
    result,
    modelUsed: config.model,
    inputTokens: 0, // Will be populated from API response in Phase 2
    outputTokens: 0,
    durationMs: Date.now() - startTime,
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
