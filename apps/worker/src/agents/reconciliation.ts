import { Worker, Queue, Job } from 'bullmq';
import { createRedisConnection } from '../engine/connection.js';
import { runDailyReconciliation, formatPnLEmail } from '../lib/treasury.js';

const QUEUE_NAME = 'reconciliation';

/** Queue for scheduling the daily reconciliation repeatable job */
export const reconciliationQueue = new Queue(QUEUE_NAME, {
  connection: createRedisConnection(),
});

async function processJob(_job: Job): Promise<void> {
  console.log('[Reconciliation] Starting daily reconciliation...');

  // 1. Run reconciliation
  const reconciliation = await runDailyReconciliation();

  if (reconciliation.discrepancyFlagged) {
    console.warn(
      `[Reconciliation] DISCREPANCY FLAGGED for ${reconciliation.date}: ` +
        `Stripe=${reconciliation.totalStripePayments} Ledger=${reconciliation.totalLedgerPayments} ` +
        `diff=${reconciliation.discrepancy} cents`,
    );
  } else {
    console.log(
      `[Reconciliation] ${reconciliation.date} reconciled OK — ` +
        `Stripe=${reconciliation.totalStripePayments} Ledger=${reconciliation.totalLedgerPayments}`,
    );
  }

  if (reconciliation.missingEntries.length > 0) {
    console.warn(
      `[Reconciliation] Missing ledger entries for payments: ${reconciliation.missingEntries.join(', ')}`,
    );
  }

  if (reconciliation.orphanedEntries.length > 0) {
    console.warn(
      `[Reconciliation] Orphaned ledger entries: ${reconciliation.orphanedEntries.join(', ')}`,
    );
  }

  // 2. Generate P&L email
  const { subject, body } = await formatPnLEmail();

  // 3. Send via Postmark or log
  const postmarkToken = process.env.POSTMARK_SERVER_TOKEN;
  const operatorEmail = process.env.OPERATOR_EMAIL;

  if (postmarkToken && operatorEmail) {
    try {
      const response = await fetch('https://api.postmarkapp.com/email', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Postmark-Server-Token': postmarkToken,
        },
        body: JSON.stringify({
          From: process.env.POSTMARK_FROM_EMAIL ?? 'system@civicstate.com',
          To: operatorEmail,
          Subject: subject,
          TextBody: body,
        }),
      });

      if (!response.ok) {
        console.error(`[Reconciliation] Postmark send failed: ${response.status}`);
      } else {
        console.log(`[Reconciliation] P&L email sent to ${operatorEmail}`);
      }
    } catch (err) {
      console.error('[Reconciliation] Failed to send P&L email:', err);
    }
  } else {
    console.log('[Reconciliation] No POSTMARK_SERVER_TOKEN or OPERATOR_EMAIL set — logging P&L:');
    console.log(body);
  }

  // 4. Mercury balance check placeholder
  if (!process.env.MERCURY_API_KEY) {
    console.warn(
      '[Reconciliation] MERCURY_API_KEY not set — skipping bank balance check. ' +
        'Set MERCURY_API_KEY to enable automated balance monitoring.',
    );
  } else {
    // TODO: Implement Mercury balance check when API integration is ready
    console.log('[Reconciliation] Mercury balance check placeholder — API key is set');
  }

  console.log('[Reconciliation] Daily reconciliation complete.');
}

// Each Worker gets its own Redis connection (CRITICAL -- per BullMQ docs)
export const reconciliationWorker = new Worker(QUEUE_NAME, processJob, {
  connection: createRedisConnection(),
  concurrency: 1, // Only one reconciliation at a time
});

reconciliationWorker.on('failed', (job, err) => {
  console.error(`Reconciliation failed for job ${job?.id}:`, err.message);
});

/**
 * Register the daily reconciliation repeatable job.
 * Runs at 7:00 AM UTC daily.
 */
export async function registerReconciliationSchedule(): Promise<void> {
  await reconciliationQueue.upsertJobScheduler(
    'daily-reconciliation',
    { pattern: '0 7 * * *' },
    {
      name: 'daily-reconciliation',
      data: {},
    },
  );
  console.log('[Reconciliation] Registered daily reconciliation schedule (7:00 AM UTC)');
}
