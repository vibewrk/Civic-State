import { Router, type IRouter } from 'express';
import { z } from 'zod';
import { Queue } from 'bullmq';
import Redis from 'ioredis';

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

// POST /api/submissions — Create a new submission and trigger agent flow
// TEST-ONLY endpoint for Phase 1 pipeline verification.
// Tier 1 fields stored UNENCRYPTED here -- acceptable for test data only.
// Phase 2 implements the production submission flow with CryptoService encryption
// before persisting any real user data.
router.post('/api/submissions', async (req, res) => {
  try {
    const body = createSubmissionSchema.parse(req.body);

    const { prisma } = await import('shared');

    // Create submission in database
    // WARNING: issueDescription and desiredOutcome are stored unencrypted.
    // This is a test-only code path. The production submission flow in Phase 2
    // encrypts Tier 1 fields via CryptoService before database persistence.
    // For test-only endpoint: upsert a placeholder test user since Submission requires a user relation (FK).
    // The production submission flow in Phase 2 will use the authenticated Clerk userId.
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

    const submission = await prisma.submission.create({
      data: {
        userId: TEST_USER_ID,
        issueDescription: body.issueDescription,
        desiredOutcome: body.desiredOutcome,
        zipCode: body.zipCode,
        isAnonymous: body.isAnonymous,
        status: 'submitted',
      },
    });

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

export default router;
