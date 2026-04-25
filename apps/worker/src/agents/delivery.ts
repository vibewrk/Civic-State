import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { transitionJob } from '../engine/state-machine.js';
import { logAgentAction } from '../lib/logger.js';

const config = getAgentConfig('delivery');

async function processJob(job: Job): Promise<void> {
  const { submissionId } = job.data;
  const startTime = Date.now();

  // Transition to delivering
  await transitionJob(submissionId, 'paid', 'delivering', config.name);

  // TODO (Phase 3): Send letter via Postmark
  // - Format letter for email delivery
  // - Send to target officials via Postmark API
  // - Track delivery status via webhooks
  const result = {
    delivered: true,
    recipientCount: 0,
    deliveryMethod: 'email',
  };

  // Log agent action with token usage (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'deliver',
    result,
    modelUsed: config.model,
    inputTokens: 0, // Delivery agent may not use LLM
    outputTokens: 0,
    durationMs: Date.now() - startTime,
  });

  // Transition to delivered (terminal state)
  await transitionJob(submissionId, 'delivering', 'delivered', config.name);
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const deliveryWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

deliveryWorker.on('failed', (job, err) => {
  console.error(`Delivery failed for job ${job?.id}:`, err.message);
});
