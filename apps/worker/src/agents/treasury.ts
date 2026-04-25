import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { logAgentAction } from '../lib/logger.js';

const config = getAgentConfig('treasury');

async function processJob(job: Job): Promise<void> {
  const { submissionId, amount, paymentId } = job.data;
  const startTime = Date.now();

  // Treasury agent records ledger entries on payment events.
  // It does NOT perform primary state transitions -- the payment webhook
  // transitions payment_pending -> paid, which triggers the delivery agent.

  // TODO (Phase 3): Record actual ledger entries
  // - Create ledger entry for payment received
  // - Calculate and record API costs (Anthropic tokens)
  // - Calculate and record postage costs (Postmark)
  // - Record net revenue
  const result = {
    ledgerEntryCreated: true,
    paymentId: paymentId || 'unknown',
    amount: amount || 0,
    entriesRecorded: 0,
  };

  // Log agent action (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action: 'record_ledger',
    result,
    modelUsed: config.model,
    inputTokens: 0, // Treasury agent typically does not use LLM
    outputTokens: 0,
    durationMs: Date.now() - startTime,
  });
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const treasuryWorker = new Worker(config.queue, processJob, {
  connection: createRedisConnection(),
  concurrency: 5,
});

treasuryWorker.on('failed', (job, err) => {
  console.error(`Treasury failed for job ${job?.id}:`, err.message);
});
