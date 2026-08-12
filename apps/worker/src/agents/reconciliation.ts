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

  // 4. Auto-escalation: flagged submission alerts
  try {
    const { prisma } = await import('shared');

    // Count currently flagged submissions
    const flaggedCount = await prisma.submission.count({
      where: { status: 'flagged', deletedAt: null },
    });

    // Find oldest flagged submission
    const oldestFlagged = await prisma.submission.findFirst({
      where: { status: 'flagged', deletedAt: null },
      orderBy: { createdAt: 'asc' },
      select: { id: true, createdAt: true },
    });

    const escalationAlerts: string[] = [];

    if (flaggedCount > 10) {
      escalationAlerts.push(
        `ESCALATION: ${flaggedCount} flagged submissions in queue (threshold: 10).`,
      );
    }

    if (oldestFlagged) {
      const ageMs = Date.now() - new Date(oldestFlagged.createdAt).getTime();
      const ageHours = ageMs / (1000 * 60 * 60);
      if (ageHours > 24) {
        escalationAlerts.push(
          `ESCALATION: Oldest flagged submission (${oldestFlagged.id.slice(0, 8)}...) ` +
            `is ${ageHours.toFixed(1)} hours old (threshold: 24h).`,
        );
      }
    }

    if (escalationAlerts.length > 0) {
      const alertBody = [
        'CivicState Admin Escalation Alert',
        '',
        ...escalationAlerts,
        '',
        `Flagged queue size: ${flaggedCount}`,
        `Checked at: ${new Date().toISOString()}`,
        '',
        'Review at: /admin/flagged',
      ].join('\n');

      if (postmarkToken && operatorEmail) {
        try {
          const alertResponse = await fetch('https://api.postmarkapp.com/email', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Postmark-Server-Token': postmarkToken,
            },
            body: JSON.stringify({
              From: process.env.POSTMARK_FROM_EMAIL ?? 'system@civicstate.com',
              To: operatorEmail,
              Subject: `[CivicState] Escalation: ${escalationAlerts.length} alert(s) — flagged queue`,
              TextBody: alertBody,
            }),
          });

          if (!alertResponse.ok) {
            console.error(`[Reconciliation] Escalation email failed: ${alertResponse.status}`);
          } else {
            console.log(`[Reconciliation] Escalation email sent to ${operatorEmail}`);
          }
        } catch (alertErr) {
          console.error('[Reconciliation] Failed to send escalation email:', alertErr);
        }
      } else {
        // Log to console as fallback
        for (const alert of escalationAlerts) {
          console.error(`[Reconciliation] ${alert}`);
        }
      }
    } else {
      console.log('[Reconciliation] No escalation alerts — flagged queue is healthy.');
    }
  } catch (escalationErr) {
    console.error('[Reconciliation] Escalation check failed:', escalationErr);
  }

  // 5. Data retention enforcement (LGAL-05)
  try {
    const { prisma } = await import('shared');
    const { computeRowHmac } = await import('shared/hmac');
    const { auditLogHmacFields } = await import('shared/append-only-integrity');

    const now = new Date();
    const twentyFourMonthsAgo = new Date(now);
    twentyFourMonthsAgo.setMonth(twentyFourMonthsAgo.getMonth() - 24);

    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    // 5a. Agent action logs older than 24 months — soft delete
    const expiredAgentLogs = await prisma.agentActionLog.updateMany({
      where: {
        createdAt: { lt: twentyFourMonthsAgo },
        deletedAt: null,
      },
      data: { deletedAt: now },
    });

    if (expiredAgentLogs.count > 0) {
      console.log(
        `[Reconciliation] Data retention: soft-deleted ${expiredAgentLogs.count} agent action logs older than 24 months`,
      );
    }

    // 5b. Completed jobs older than 12 months — soft delete
    const expiredJobs = await prisma.job.updateMany({
      where: {
        createdAt: { lt: twelveMonthsAgo },
        status: { in: ['delivered', 'failed'] },
        deletedAt: null,
      },
      data: { deletedAt: now },
    });

    if (expiredJobs.count > 0) {
      console.log(
        `[Reconciliation] Data retention: soft-deleted ${expiredJobs.count} completed jobs older than 12 months`,
      );
    }

    // 5c. Financial/audit records: 7-year retention — never delete.
    //     No action needed; this comment documents the policy.
    //     audit_logs, ledger_entries, and payment records are exempt from automated deletion.

    // 5d. Log retention actions to audit trail
    if (expiredAgentLogs.count > 0 || expiredJobs.count > 0) {
      const retentionDetails = {
        agentLogsDeleted: expiredAgentLogs.count,
        agentLogsCutoff: twentyFourMonthsAgo.toISOString(),
        completedJobsDeleted: expiredJobs.count,
        jobsCutoff: twelveMonthsAgo.toISOString(),
        executedAt: now.toISOString(),
        policy: 'LGAL-05: agent logs 24mo, completed jobs 12mo, financial/audit 7yr (no delete)',
      };

      const hmacFields = auditLogHmacFields({
        userId: 'system',
        action: 'data_retention_enforcement',
        resource: 'system',
        resourceId: 'daily-reconciliation',
        details: retentionDetails,
      });

      await prisma.auditLog.create({
        data: {
          userId: 'system',
          action: 'data_retention_enforcement',
          resource: 'system',
          resourceId: 'daily-reconciliation',
          details: retentionDetails,
          hmacChecksum: computeRowHmac(hmacFields),
        },
      });

      console.log('[Reconciliation] Data retention audit log entry created.');
    } else {
      console.log('[Reconciliation] Data retention: no expired records found.');
    }
  } catch (retentionErr) {
    console.error('[Reconciliation] Data retention enforcement failed:', retentionErr);
  }

  // 6. Mercury balance check placeholder
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
