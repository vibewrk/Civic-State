import { Router, type IRouter } from 'express';
import { z } from 'zod';
import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { getAuth } from '@clerk/express';
import { computeRowHmac } from 'shared/hmac';
import { moderateContent } from '../lib/moderation.js';
import type { ModerationResult } from '../lib/moderation.js';
import { cacheOfficialsForSubmissionZip } from '../lib/officials/submission-cache.js';

const router: IRouter = Router();

const createSubmissionSchema = z.object({
  issueDescription: z.string().min(10).max(5000),
  desiredOutcome: z.string().min(10).max(2000),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
  isAnonymous: z.boolean().default(true),
});

// Singleton Redis connection for queue operations (apps/api owns this connection).
// Each BullMQ Queue needs its own connection (per Pitfall 2 in RESEARCH.md),
// but we reuse the same connection for the single classifier queue used here.
let queueRedis: InstanceType<typeof Redis> | null = null;
function getQueueRedis(): InstanceType<typeof Redis> {
  if (!queueRedis) {
    queueRedis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
      maxRetriesPerRequest: null, // Required by BullMQ
      enableReadyCheck: false,
    });
  }
  return queueRedis;
}

/**
 * Helper: write a moderation decision to audit_logs with HMAC checksum.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- prisma client type from dynamic import
async function logModerationAudit(
  prisma: any,
  userId: string | null,
  action: string,
  resourceId: string,
  moderation: ModerationResult,
): Promise<void> {
  const details = {
    tier: moderation.tier,
    reason: moderation.reason,
    confidence: moderation.confidence,
    details: moderation.details,
  };

  const hmacFields = {
    userId: userId ?? 'anonymous',
    action,
    resource: 'submission',
    resourceId,
    details: JSON.stringify(details),
  };

  const hmacChecksum = computeRowHmac(hmacFields);

  await prisma.auditLog.create({
    data: {
      userId,
      action,
      resource: 'submission',
      resourceId,
      details,
      hmacChecksum,
    },
  });
}

// POST /api/submissions — Create a new submission with content moderation.
// Uses optional Clerk auth: authenticated users get their userId, otherwise falls back
// to a placeholder test user (for development/testing without auth).
// Content is run through the three-tier moderation pipeline before creation.
router.post('/api/submissions', async (req, res) => {
  try {
    const body = createSubmissionSchema.parse(req.body);

    const { prisma } = await import('shared');

    // ── Resolve user identity ────────────────────────────────────────────
    // Use Clerk auth if available; fall back to test user for dev/testing.
    let userId: string;
    try {
      const auth = getAuth(req);
      if (auth?.userId) {
        // Look up internal user by Clerk ID
        const user = await prisma.user.findUnique({
          where: { clerkId: auth.userId },
          select: { id: true },
        });
        if (user) {
          userId = user.id;
        } else {
          // Clerk user exists but no internal record — reject
          return res.status(401).json({ error: 'User not found. Please complete registration.' });
        }
      } else {
        // No Clerk session — fall back to test user for development
        const TEST_USER_ID = '00000000-0000-0000-0000-000000000000';
        await prisma.user.upsert({
          where: { id: TEST_USER_ID },
          update: {},
          create: {
            id: TEST_USER_ID,
            clerkId: 'test_placeholder',
            email: 'test@civicstate.com',
            role: 'user',
          },
        });
        userId = TEST_USER_ID;
      }
    } catch {
      // Clerk middleware not mounted or misconfigured — fall back to test user
      const TEST_USER_ID = '00000000-0000-0000-0000-000000000000';
      await prisma.user.upsert({
        where: { id: TEST_USER_ID },
        update: {},
        create: {
          id: TEST_USER_ID,
          clerkId: 'test_placeholder',
          email: 'test@civicstate.com',
          role: 'user',
        },
      });
      userId = TEST_USER_ID;
    }

    // ── Content moderation pipeline ──────────────────────────────────────
    const moderation = await moderateContent(body.issueDescription, body.desiredOutcome);

    // Block: reject immediately, do NOT create submission
    if (moderation.tier === 'block') {
      // Generate a temporary ID for the audit log (no submission created)
      const blockedResourceId = `blocked-${Date.now()}`;
      await logModerationAudit(prisma, userId, 'submission.blocked', blockedResourceId, moderation);

      return res.status(403).json({
        error: 'Submission rejected by content policy',
        reason: moderation.reason,
      });
    }

    // Flag: create submission with 'flagged' status, do NOT enqueue job
    if (moderation.tier === 'flag') {
      const submission = await prisma.submission.create({
        data: {
          userId,
          issueDescription: body.issueDescription,
          desiredOutcome: body.desiredOutcome,
          zipCode: body.zipCode,
          isAnonymous: body.isAnonymous,
          status: 'flagged',
        },
      });

      await logModerationAudit(prisma, userId, 'submission.flagged', submission.id, moderation);

      return res.status(201).json({
        id: submission.id,
        status: 'flagged',
        message: 'Submission received and pending review',
      });
    }

    // Pass: create submission normally and enqueue classifier job
    const submission = await prisma.submission.create({
      data: {
        userId,
        issueDescription: body.issueDescription,
        desiredOutcome: body.desiredOutcome,
        zipCode: body.zipCode,
        isAnonymous: body.isAnonymous,
        status: 'submitted',
      },
    });

    await logModerationAudit(prisma, userId, 'submission.moderated', submission.id, moderation);

    try {
      await cacheOfficialsForSubmissionZip(body.zipCode);
    } catch (officialErr) {
      console.warn(
        `Could not cache officials for submission ${submission.id}:`,
        officialErr,
      );
    }

    // Create job record
    const job = await prisma.job.create({
      data: {
        submissionId: submission.id,
        type: 'submission',
        status: 'submitted',
        queue: 'submission',
      },
    });

    // Enqueue classifier job via BullMQ Queue directly.
    // apps/api has bullmq + ioredis as direct dependencies.
    // No cross-workspace import from worker -- API uses its own Queue instance.
    try {
      const classifierQueue = new Queue('classifier', {
        connection: getQueueRedis(),
      });

      await classifierQueue.add(`classify-${submission.id}`, {
        submissionId: submission.id,
        jobId: job.id,
        ...body,
      });

      await classifierQueue.close();
    } catch (queueErr) {
      console.warn('Could not enqueue job (worker may not be running):', queueErr);
    }

    res.status(201).json({
      id: submission.id,
      jobId: job.id,
      status: 'submitted',
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.issues });
    }
    throw err;
  }
});

// GET /api/submissions/:id/status — Check job status
router.get('/api/submissions/:id/status', async (req, res) => {
  const { prisma } = await import('shared');

  const job = await prisma.job.findFirst({
    where: { submissionId: req.params.id },
    orderBy: { createdAt: 'desc' },
  });

  if (!job) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  res.json({
    submissionId: req.params.id,
    jobId: job.id,
    status: job.status,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
  });
});

// POST /api/test/postmark-ping — Send a test email via Postmark to verify domain warming pipeline
// This endpoint verifies the Postmark integration is working and contributes to
// domain warming (per D-25, DLVR-04). Remove or protect in production.
router.post('/api/test/postmark-ping', async (req, res) => {
  try {
    const { ServerClient } = await import('postmark');
    const token = process.env.POSTMARK_SERVER_TOKEN;
    if (!token) {
      return res.status(503).json({ error: 'POSTMARK_SERVER_TOKEN not configured' });
    }

    const client = new ServerClient(token);
    const result = await client.sendEmail({
      From: 'noreply@civicstate.com',
      To: req.body.to || 'test@civicstate.com',
      Subject: 'CivicState Domain Warming Test',
      TextBody: 'This is a domain warming test email sent from the CivicState API. If you received this, Postmark integration is working correctly.',
      MessageStream: 'outbound',
    });

    res.json({
      status: 'sent',
      messageId: result.MessageID,
      submittedAt: result.SubmittedAt,
    });
  } catch (err) {
    console.error('Postmark test email failed:', err);
    res.status(500).json({ error: 'Failed to send test email' });
  }
});

// GET /api/submissions/:id/research — Research progress status
// Maps internal job status to user-friendly research progress labels.
router.get('/api/submissions/:id/research', async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const submissionId = req.params.id;

    const job = await prisma.job.findFirst({
      where: { submissionId },
      orderBy: { createdAt: 'desc' },
    });

    if (!job) {
      return res.status(404).json({ error: 'Submission not found' });
    }

    // Map internal statuses to user-friendly research progress labels
    const statusMap: Record<string, { stage: string; label: string; progress: number }> = {
      submitted:       { stage: 'queued',                  label: 'Queued for processing',        progress: 0 },
      classifying:     { stage: 'classifying_issue',       label: 'Classifying your concern',     progress: 20 },
      researching:     { stage: 'researching_regulations', label: 'Researching regulations',      progress: 40 },
      drafting:        { stage: 'drafting_letters',        label: 'Drafting your letters',        progress: 70 },
      payment_pending: { stage: 'ready',                   label: 'Letters ready for review',     progress: 100 },
      paid:            { stage: 'ready',                   label: 'Letters ready for delivery',   progress: 100 },
      delivering:      { stage: 'ready',                   label: 'Letters being delivered',      progress: 100 },
      delivered:       { stage: 'ready',                   label: 'Letters delivered',             progress: 100 },
      failed:          { stage: 'failed',                  label: 'Processing failed',            progress: 0 },
    };

    const mapped = statusMap[job.status] ?? {
      stage: 'queued',
      label: 'Processing',
      progress: 10,
    };

    res.json({
      submissionId,
      jobId: job.id,
      status: job.status,
      research: {
        stage: mapped.stage,
        label: mapped.label,
        progress: mapped.progress,
      },
      createdAt: job.createdAt,
      updatedAt: job.completedAt ?? job.createdAt,
    });
  } catch (err) {
    console.error('Research status lookup failed:', err);
    res.status(500).json({ error: 'Failed to retrieve research status' });
  }
});

// GET /api/submissions/:id/preview — Letter previews per official (collapsible card data)
// Returns all drafted letters for a submission with official info, content, and disclosures.
router.get('/api/submissions/:id/preview', async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const submissionId = req.params.id;

    // Look up campaigns for this submission, including letters and officials
    const campaigns = await prisma.campaign.findMany({
      where: { submissionId },
      orderBy: { createdAt: 'desc' },
      include: {
        letters: {
          include: {
            official: {
              select: {
                id: true,
                name: true,
                title: true,
                email: true,
                jurisdiction: true,
                level: true,
                district: true,
                state: true,
                party: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (campaigns.length === 0) {
      return res.status(404).json({
        error: 'No campaign found for this submission',
        hint: 'Letters are generated during the drafting stage. Check /api/submissions/:id/research for progress.',
      });
    }

    // Use the most recent campaign
    const campaign = campaigns[0];

    const AI_DISCLOSURE_TEXT = 'This letter was drafted with the assistance of artificial intelligence. The research, citations, and legal references have been verified against public government databases.';
    const DISCLAIMER_TEXT = 'This letter does not constitute legal advice. CivicState is a civic technology platform that assists constituents in communicating with their elected officials.';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Prisma include typing
    const letterPreviews = campaign.letters.map((letter: any) => ({
      letterId: letter.id,
      status: letter.status,
      official: {
        id: letter.official.id,
        name: letter.official.name,
        title: letter.official.title,
        email: letter.official.email,
        jurisdiction: letter.official.jurisdiction,
        level: letter.official.level,
        district: letter.official.district,
        state: letter.official.state,
        party: letter.official.party,
      },
      content: letter.content,
      aiDisclosure: letter.aiDisclosure ? AI_DISCLOSURE_TEXT : null,
      disclaimer: DISCLAIMER_TEXT,
      createdAt: letter.createdAt,
    }));

    res.json({
      submissionId,
      campaignId: campaign.id,
      campaignStatus: campaign.status,
      pricingTier: campaign.pricingTier,
      officialCount: campaign.officialCount,
      lettersCount: letterPreviews.length,
      letters: letterPreviews,
    });
  } catch (err) {
    console.error('Letter preview lookup failed:', err);
    res.status(500).json({ error: 'Failed to retrieve letter previews' });
  }
});

export default router;
