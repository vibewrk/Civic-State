import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { logAgentAction } from '../lib/logger.js';

const config = getAgentConfig('researcher');

async function processJob(job: Job): Promise<void> {
  const { submissionId } = job.data;
  const startTime = Date.now();

  // TODO (Phase 2): Call Anthropic API for research
  // - Look up relevant regulations, statutes, case law
  // - Verify citations against official sources
  // - Build research brief for drafter
  const result = {
    regulationsFound: 0,
    citationsVerified: 0,
    researchBrief: 'Placeholder research brief -- Phase 2 implementation',
  };

  // Log agent action with token usage (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'research',
    result,
    modelUsed: config.model,
    inputTokens: 0, // Will be populated from API response in Phase 2
    outputTokens: 0,
    durationMs: Date.now() - startTime,
  });

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
