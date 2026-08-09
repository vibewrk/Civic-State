/**
 * Admin API endpoints (ADMN-02, ADMN-03, ADMN-04, ADMN-06, ADMN-07).
 *
 * All routes require admin role via requireAdmin middleware.
 * Every mutation is logged to audit_logs with HMAC checksum.
 */

import { Router, type IRouter } from 'express';
import { z } from 'zod';
import { requireAuth } from '@clerk/express';

// Express 5 params can be string | string[] — helper to extract string
function paramStr(val: string | string[] | undefined): string {
  return Array.isArray(val) ? val[0] : val || '';
}
import { requireAdmin } from '../middleware/auth.js';
import { computeRowHmac } from 'shared/hmac';
import { getAuth } from '@clerk/express';

const router: IRouter = Router();
type SharedPrismaClient = typeof import('shared')['prisma'];

// All admin routes require authentication + admin role
const adminAuth = [requireAuth(), requireAdmin];

// ── Helpers ─────────────────────────────────────────────────────────────

/**
 * Write an admin action to audit_logs with HMAC (ADMN-07).
 */
async function logAdminAudit(
  prisma: SharedPrismaClient,
  userId: string,
  action: string,
  resource: string,
  resourceId: string,
  details: Record<string, unknown>,
): Promise<void> {
  const hmacFields = {
    userId,
    action,
    resource,
    resourceId,
    details: JSON.stringify(details),
  };

  const hmacChecksum = computeRowHmac(hmacFields);

  await prisma.auditLog.create({
    data: {
      userId,
      action,
      resource,
      resourceId,
      details,
      hmacChecksum,
    },
  });
}

// ── Flagged Submissions ─────────────────────────────────────────────────

// GET /api/admin/flagged — list flagged submissions (ADMN-02)
router.get('/api/admin/flagged', ...adminAuth, async (req, res) => {
  try {
    const { prisma } = await import('shared');

    const flagged = await prisma.submission.findMany({
      where: { status: 'flagged', deletedAt: null },
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: { id: true, email: true } },
        campaigns: {
          include: {
            letters: { select: { id: true, content: true, status: true } },
          },
        },
      },
    });

    // Pull the moderation flag reason from audit_logs
    const submissionIds = flagged.map((s: { id: string }) => s.id);
    const auditEntries = await prisma.auditLog.findMany({
      where: {
        action: 'submission.flagged',
        resourceId: { in: submissionIds },
      },
      orderBy: { createdAt: 'desc' },
    });

    const flagReasonMap = new Map<string, unknown>();
    for (const entry of auditEntries) {
      if (!flagReasonMap.has(entry.resourceId)) {
        flagReasonMap.set(entry.resourceId, entry.details);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const results = flagged.map((s: any) => ({
      id: s.id,
      userId: s.userId,
      userEmail: s.user?.email,
      issueDescription: s.issueDescription,
      desiredOutcome: s.desiredOutcome,
      zipCode: s.zipCode,
      isAnonymous: s.isAnonymous,
      status: s.status,
      flagReason: flagReasonMap.get(s.id) ?? null,
      aiDraft: s.campaigns?.[0]?.letters?.[0]?.content ?? null,
      createdAt: s.createdAt,
    }));

    res.json({ flagged: results, count: results.length });
  } catch (err) {
    console.error('Admin flagged list failed:', err);
    res.status(500).json({ error: 'Failed to list flagged submissions' });
  }
});

// POST /api/admin/flagged/:id/approve — approve flagged submission (ADMN-03)
router.post('/api/admin/flagged/:id/approve', ...adminAuth, async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const id = paramStr(req.params.id);
    const auth = getAuth(req);
    const adminUserId = auth!.userId!;

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission || submission.status !== 'flagged') {
      return res.status(404).json({ error: 'Flagged submission not found' });
    }

    // Update status to submitted so the classifier picks it up
    await prisma.submission.update({
      where: { id },
      data: { status: 'submitted' },
    });

    // Create a job for the classifier queue
    const job = await prisma.job.create({
      data: {
        submissionId: id,
        type: 'submission',
        status: 'submitted',
        queue: 'classifier',
      },
    });

    // Enqueue via BullMQ
    try {
      const { Queue } = await import('bullmq');
      const Redis = (await import('ioredis')).default;
      const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
      });
      const classifierQueue = new Queue('classifier', { connection: redis });
      await classifierQueue.add(`classify-${id}`, {
        submissionId: id,
        jobId: job.id,
        issueDescription: submission.issueDescription,
        desiredOutcome: submission.desiredOutcome,
        zipCode: submission.zipCode,
      });
      await classifierQueue.close();
      await redis.quit();
    } catch (queueErr) {
      console.warn('Could not enqueue approved submission:', queueErr);
    }

    await logAdminAudit(prisma, adminUserId, 'admin.flagged.approve', 'submission', id, {
      previousStatus: 'flagged',
      newStatus: 'submitted',
      jobId: job.id,
    });

    res.json({ id, status: 'submitted', jobId: job.id });
  } catch (err) {
    console.error('Admin approve failed:', err);
    res.status(500).json({ error: 'Failed to approve submission' });
  }
});

// POST /api/admin/flagged/:id/reject — reject flagged submission (ADMN-03)
const rejectSchema = z.object({
  reason: z.string().min(1).max(1000),
});

router.post('/api/admin/flagged/:id/reject', ...adminAuth, async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const id = paramStr(req.params.id);
    const { reason } = rejectSchema.parse(req.body);
    const auth = getAuth(req);
    const adminUserId = auth!.userId!;

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission || submission.status !== 'flagged') {
      return res.status(404).json({ error: 'Flagged submission not found' });
    }

    await prisma.submission.update({
      where: { id },
      data: { status: 'rejected' },
    });

    await logAdminAudit(prisma, adminUserId, 'admin.flagged.reject', 'submission', id, {
      reason,
      previousStatus: 'flagged',
      newStatus: 'rejected',
    });

    res.json({ id, status: 'rejected', reason });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.issues });
    }
    console.error('Admin reject failed:', err);
    res.status(500).json({ error: 'Failed to reject submission' });
  }
});

// POST /api/admin/flagged/:id/edit — edit content and approve (ADMN-03)
const editSchema = z.object({
  issueDescription: z.string().min(10).max(5000).optional(),
  desiredOutcome: z.string().min(10).max(2000).optional(),
});

router.post('/api/admin/flagged/:id/edit', ...adminAuth, async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const id = paramStr(req.params.id);
    const updates = editSchema.parse(req.body);
    const auth = getAuth(req);
    const adminUserId = auth!.userId!;

    const submission = await prisma.submission.findUnique({ where: { id } });
    if (!submission || submission.status !== 'flagged') {
      return res.status(404).json({ error: 'Flagged submission not found' });
    }

    // Update content and set status to submitted
    await prisma.submission.update({
      where: { id },
      data: {
        ...(updates.issueDescription && { issueDescription: updates.issueDescription }),
        ...(updates.desiredOutcome && { desiredOutcome: updates.desiredOutcome }),
        status: 'submitted',
      },
    });

    // Create a job for classifier
    const job = await prisma.job.create({
      data: {
        submissionId: id,
        type: 'submission',
        status: 'submitted',
        queue: 'classifier',
      },
    });

    // Enqueue via BullMQ
    try {
      const { Queue } = await import('bullmq');
      const Redis = (await import('ioredis')).default;
      const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
        maxRetriesPerRequest: null,
        enableReadyCheck: false,
      });
      const classifierQueue = new Queue('classifier', { connection: redis });
      await classifierQueue.add(`classify-${id}`, {
        submissionId: id,
        jobId: job.id,
        issueDescription: updates.issueDescription ?? submission.issueDescription,
        desiredOutcome: updates.desiredOutcome ?? submission.desiredOutcome,
        zipCode: submission.zipCode,
      });
      await classifierQueue.close();
      await redis.quit();
    } catch (queueErr) {
      console.warn('Could not enqueue edited submission:', queueErr);
    }

    await logAdminAudit(prisma, adminUserId, 'admin.flagged.edit', 'submission', id, {
      previousStatus: 'flagged',
      newStatus: 'submitted',
      editedFields: Object.keys(updates),
      jobId: job.id,
    });

    res.json({ id, status: 'submitted', jobId: job.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.issues });
    }
    console.error('Admin edit failed:', err);
    res.status(500).json({ error: 'Failed to edit submission' });
  }
});

// ── Treasury ────────────────────────────────────────────────────────────

// GET /api/admin/treasury — treasury overview (ADMN-04)
router.get('/api/admin/treasury', ...adminAuth, async (req, res) => {
  try {
    const { prisma } = await import('shared');

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Today's revenue (payment_received entries)
    const todayRevenue = await prisma.ledgerEntry.aggregate({
      where: {
        type: 'payment_received',
        createdAt: { gte: today },
      },
      _sum: { amount: true },
    });

    // Today's costs (cost entries)
    const todayCosts = await prisma.ledgerEntry.aggregate({
      where: {
        type: { in: ['ai_cost', 'delivery_cost', 'platform_fee'] },
        createdAt: { gte: today },
      },
      _sum: { amount: true },
    });

    // All-time balance
    const allRevenue = await prisma.ledgerEntry.aggregate({
      where: { type: 'payment_received' },
      _sum: { amount: true },
    });

    const allCosts = await prisma.ledgerEntry.aggregate({
      where: {
        type: { in: ['ai_cost', 'delivery_cost', 'platform_fee', 'refund'] },
      },
      _sum: { amount: true },
    });

    // Recent ledger entries (last 50)
    const recentEntries = await prisma.ledgerEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    const revenue = todayRevenue._sum.amount ?? 0;
    const costs = todayCosts._sum.amount ?? 0;
    const totalRevenue = allRevenue._sum.amount ?? 0;
    const totalCosts = allCosts._sum.amount ?? 0;

    res.json({
      today: {
        revenue,
        costs,
        net: revenue - costs,
      },
      allTime: {
        revenue: totalRevenue,
        costs: totalCosts,
        balance: totalRevenue - totalCosts,
      },
      recentEntries,
    });
  } catch (err) {
    console.error('Admin treasury failed:', err);
    res.status(500).json({ error: 'Failed to load treasury data' });
  }
});

// ── Officials ───────────────────────────────────────────────────────────

// GET /api/admin/officials — officials directory (ADMN-06)
router.get('/api/admin/officials', ...adminAuth, async (req, res) => {
  try {
    const { prisma } = await import('shared');

    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 50));
    const skip = (page - 1) * limit;

    const [officials, total] = await Promise.all([
      prisma.official.findMany({
        orderBy: { name: 'asc' },
        skip,
        take: limit,
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
          phone: true,
          bounceCount: true,
          optedOut: true,
          lastVerifiedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.official.count(),
    ]);

    res.json({
      officials,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error('Admin officials failed:', err);
    res.status(500).json({ error: 'Failed to load officials' });
  }
});

// PATCH /api/admin/officials/:id — update official info (ADMN-06)
const updateOfficialSchema = z.object({
  name: z.string().min(1).optional(),
  title: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  jurisdiction: z.string().optional(),
  level: z.string().optional(),
  district: z.string().optional(),
  state: z.string().optional(),
  party: z.string().optional(),
  optedOut: z.boolean().optional(),
});

router.patch('/api/admin/officials/:id', ...adminAuth, async (req, res) => {
  try {
    const { prisma } = await import('shared');
    const id = paramStr(req.params.id);
    const updates = updateOfficialSchema.parse(req.body);
    const auth = getAuth(req);
    const adminUserId = auth!.userId!;

    const existing = await prisma.official.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: 'Official not found' });
    }

    const updated = await prisma.official.update({
      where: { id },
      data: {
        ...updates,
        lastVerifiedAt: new Date(),
      },
    });

    await logAdminAudit(prisma, adminUserId, 'admin.official.update', 'official', id, {
      updatedFields: Object.keys(updates),
      previousValues: Object.fromEntries(
        Object.keys(updates).map((k) => [k, (existing as Record<string, unknown>)[k]]),
      ),
    });

    res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.issues });
    }
    console.error('Admin official update failed:', err);
    res.status(500).json({ error: 'Failed to update official' });
  }
});

export default router;
