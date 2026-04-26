import { Worker, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { getAgentConfig } from '../engine/config.js';
import { logAgentAction } from '../lib/logger.js';
import { recordLedgerEntry, checkBudgetCeiling } from '../lib/treasury.js';
import type { PricingTier, LedgerEntryType } from 'shared';

const config = getAgentConfig('treasury');

interface TreasuryJobData {
  submissionId: string;
  action: 'record_payment' | 'record_cost';
  amount: number; // cents
  paymentId?: string;
  pricingTier?: PricingTier;
  costType?: LedgerEntryType;
  description?: string;
  reference?: string;
}

async function processJob(job: Job<TreasuryJobData>): Promise<void> {
  const { submissionId, action, amount, paymentId, pricingTier, costType, description, reference } =
    job.data;
  const startTime = Date.now();

  let result: Record<string, unknown>;

  switch (action) {
    case 'record_payment': {
      const entryId = await recordLedgerEntry({
        type: 'payment',
        amount,
        reference: reference ?? paymentId ?? 'unknown',
        description: description ?? `Payment received for submission ${submissionId}`,
        jobId: submissionId,
      });

      result = {
        action: 'record_payment',
        ledgerEntryId: entryId,
        paymentId: paymentId ?? 'unknown',
        amount,
      };
      break;
    }

    case 'record_cost': {
      const entryType: LedgerEntryType = costType ?? 'api_cost';
      const entryId = await recordLedgerEntry({
        type: entryType,
        amount,
        reference: reference ?? `cost-${submissionId}-${Date.now()}`,
        description: description ?? `${entryType} cost for submission ${submissionId}`,
        jobId: submissionId,
      });

      result = {
        action: 'record_cost',
        ledgerEntryId: entryId,
        costType: entryType,
        amount,
      };

      // Check budget ceiling if pricing tier is known
      if (pricingTier) {
        const budgetCheck = await checkBudgetCeiling(submissionId, pricingTier);
        result.budgetCheck = budgetCheck;

        if (budgetCheck.exceeded) {
          console.warn(
            `[Treasury] BUDGET EXCEEDED for job ${submissionId}: ` +
              `actual=${budgetCheck.actual} ceiling=${budgetCheck.ceiling} — pausing job`,
          );

          // Pause the job by updating its status via the submission
          const { prisma } = await import('shared');
          await prisma.submission.update({
            where: { id: submissionId },
            data: { status: 'flagged' },
          });

          result.paused = true;
          result.pauseReason = 'budget_ceiling_exceeded';
        }
      }
      break;
    }

    default: {
      const exhaustive: never = action;
      throw new Error(`Unknown treasury action: ${exhaustive}`);
    }
  }

  // Log agent action (per AGNT-05, AGNT-06)
  await logAgentAction({
    jobId: submissionId,
    agent: config.name,
    action,
    result,
    modelUsed: config.model,
    inputTokens: 0, // Treasury agent does not use LLM
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
