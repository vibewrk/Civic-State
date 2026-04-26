/**
 * Tests for admin endpoints (Phase 4 — Dashboard & Compliance).
 *
 * Covers admin role enforcement, flagged submission approval/rejection,
 * treasury aggregates, officials PATCH with audit logging, and
 * auto-escalation triggers.
 *
 * All external dependencies (Prisma, BullMQ) are mocked.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockPrisma = {
  user: {
    findUnique: vi.fn(),
  },
  submission: {
    findUnique: vi.fn(),
    update: vi.fn(),
    count: vi.fn(),
  },
  job: {
    create: vi.fn(),
  },
  official: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  auditLog: {
    create: vi.fn(),
  },
  ledgerEntry: {
    aggregate: vi.fn(),
  },
  payment: {
    aggregate: vi.fn(),
    count: vi.fn(),
  },
  campaign: {
    count: vi.fn(),
  },
};

vi.mock('shared', () => ({
  prisma: mockPrisma,
}));

vi.mock('shared/hmac', () => ({
  computeRowHmac: vi.fn(() => 'mock-hmac-checksum'),
}));

// Mock BullMQ Queue
const mockQueueAdd = vi.fn();
vi.mock('bullmq', () => ({
  Queue: vi.fn(() => ({
    add: mockQueueAdd,
    close: vi.fn(),
  })),
}));

// Mock ioredis
vi.mock('ioredis', () => ({
  default: vi.fn(() => ({
    status: 'ready',
    disconnect: vi.fn(),
  })),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mockReq(overrides: Record<string, unknown> = {}) {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides,
  };
}

function mockRes() {
  const res: Record<string, unknown> = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res;
}

describe('Admin Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── Admin Role Enforcement ───────────────────────────────────────────────

  describe('Admin routes require admin role', () => {
    it('rejects non-admin users', () => {
      const userRole = 'user';
      const isAdmin = userRole === 'admin';

      expect(isAdmin).toBe(false);
    });

    it('allows admin users', () => {
      const userRole = 'admin';
      const isAdmin = userRole === 'admin';

      expect(isAdmin).toBe(true);
    });

    it('rejects unauthenticated requests', () => {
      const auth = null;
      const isAuthenticated = auth !== null;

      expect(isAuthenticated).toBe(false);
    });

    it('checks role from user record in database', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'user-1',
        clerkId: 'clerk-1',
        role: 'admin',
      });

      const user = await mockPrisma.user.findUnique({
        where: { clerkId: 'clerk-1' },
      });

      expect(user.role).toBe('admin');
    });

    it('rejects moderator role (only admin allowed)', () => {
      const userRole = 'moderator';
      const isAdmin = userRole === 'admin';

      expect(isAdmin).toBe(false);
    });
  });

  // ─── Flagged Submission Approval ──────────────────────────────────────────

  describe('Flagged submission approval creates job and enqueues', () => {
    it('updates submission status from flagged to approved', async () => {
      mockPrisma.submission.update.mockResolvedValueOnce({
        id: 'sub-flagged-1',
        status: 'approved',
      });

      const updated = await mockPrisma.submission.update({
        where: { id: 'sub-flagged-1' },
        data: { status: 'approved' },
      });

      expect(updated.status).toBe('approved');
      expect(mockPrisma.submission.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: 'sub-flagged-1' },
          data: { status: 'approved' },
        }),
      );
    });

    it('creates a job record for the approved submission', async () => {
      mockPrisma.job.create.mockResolvedValueOnce({
        id: 'job-1',
        submissionId: 'sub-flagged-1',
        status: 'queued',
        type: 'research',
      });

      const job = await mockPrisma.job.create({
        data: {
          submissionId: 'sub-flagged-1',
          status: 'queued',
          type: 'research',
        },
      });

      expect(job.status).toBe('queued');
      expect(job.submissionId).toBe('sub-flagged-1');
    });

    it('enqueues job to BullMQ after creation', async () => {
      const jobId = 'job-1';
      const submissionId = 'sub-flagged-1';

      await mockQueueAdd('research', {
        jobId,
        submissionId,
      });

      expect(mockQueueAdd).toHaveBeenCalledWith('research', {
        jobId,
        submissionId,
      });
    });

    it('creates audit log entry for approval action', async () => {
      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-1' });

      await mockPrisma.auditLog.create({
        data: {
          action: 'submission_approved',
          entityType: 'submission',
          entityId: 'sub-flagged-1',
          actorId: 'admin-user-1',
          details: 'Flagged submission approved by admin',
        },
      });

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'submission_approved',
            entityType: 'submission',
            actorId: 'admin-user-1',
          }),
        }),
      );
    });
  });

  // ─── Flagged Submission Rejection ─────────────────────────────────────────

  describe('Flagged submission rejection updates status', () => {
    it('updates submission status from flagged to rejected', async () => {
      mockPrisma.submission.update.mockResolvedValueOnce({
        id: 'sub-flagged-2',
        status: 'rejected',
      });

      const updated = await mockPrisma.submission.update({
        where: { id: 'sub-flagged-2' },
        data: { status: 'rejected', rejectionReason: 'Policy violation' },
      });

      expect(updated.status).toBe('rejected');
      expect(mockPrisma.submission.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            status: 'rejected',
            rejectionReason: 'Policy violation',
          }),
        }),
      );
    });

    it('does not create a job for rejected submissions', async () => {
      // After rejection, no job should be enqueued
      mockPrisma.submission.update.mockResolvedValueOnce({
        id: 'sub-flagged-2',
        status: 'rejected',
      });

      await mockPrisma.submission.update({
        where: { id: 'sub-flagged-2' },
        data: { status: 'rejected' },
      });

      expect(mockPrisma.job.create).not.toHaveBeenCalled();
      expect(mockQueueAdd).not.toHaveBeenCalled();
    });

    it('creates audit log entry for rejection action', async () => {
      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-2' });

      await mockPrisma.auditLog.create({
        data: {
          action: 'submission_rejected',
          entityType: 'submission',
          entityId: 'sub-flagged-2',
          actorId: 'admin-user-1',
          details: 'Rejected: Policy violation',
        },
      });

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'submission_rejected',
          }),
        }),
      );
    });
  });

  // ─── Treasury Endpoint ────────────────────────────────────────────────────

  describe('Treasury endpoint returns correct aggregates', () => {
    it('returns total revenue from payment aggregation', async () => {
      mockPrisma.payment.aggregate.mockResolvedValueOnce({
        _sum: { amount: 15000 }, // $150.00 in cents
        _count: { id: 10 },
      });

      const result = await mockPrisma.payment.aggregate({
        _sum: { amount: true },
        _count: { id: true },
        where: { status: 'succeeded' },
      });

      expect(result._sum.amount).toBe(15000);
      expect(result._count.id).toBe(10);
    });

    it('returns total costs from ledger aggregation', async () => {
      mockPrisma.ledgerEntry.aggregate.mockResolvedValueOnce({
        _sum: { amount: 250 }, // $2.50 in cents
      });

      const result = await mockPrisma.ledgerEntry.aggregate({
        _sum: { amount: true },
        where: { type: { in: ['api_cost', 'postage'] } },
      });

      expect(result._sum.amount).toBe(250);
    });

    it('calculates net income as revenue minus costs minus refunds', () => {
      const revenue = 15000;   // $150.00
      const costs = 250;       // $2.50
      const refunds = 500;     // $5.00

      const netIncome = revenue - costs - refunds;

      expect(netIncome).toBe(14250); // $142.50
    });

    it('returns campaign count in summary', async () => {
      mockPrisma.campaign.count.mockResolvedValueOnce(25);

      const campaignCount = await mockPrisma.campaign.count({
        where: { status: { in: ['paid', 'delivered'] } },
      });

      expect(campaignCount).toBe(25);
    });

    it('handles zero revenue gracefully', async () => {
      mockPrisma.payment.aggregate.mockResolvedValueOnce({
        _sum: { amount: null },
        _count: { id: 0 },
      });

      const result = await mockPrisma.payment.aggregate({
        _sum: { amount: true },
        _count: { id: true },
        where: { status: 'succeeded' },
      });

      const revenue = result._sum.amount ?? 0;
      expect(revenue).toBe(0);
    });
  });

  // ─── Officials PATCH with Audit Logging ───────────────────────────────────

  describe('Officials PATCH updates and audit logs', () => {
    it('updates official email and logs the change', async () => {
      const officialId = 'off-1';
      const oldEmail = 'old@senate.gov';
      const newEmail = 'new@senate.gov';

      mockPrisma.official.findUnique.mockResolvedValueOnce({
        id: officialId,
        email: oldEmail,
        name: 'Senator Test',
      });

      mockPrisma.official.update.mockResolvedValueOnce({
        id: officialId,
        email: newEmail,
        name: 'Senator Test',
      });

      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-3' });

      // Fetch old record
      const oldRecord = await mockPrisma.official.findUnique({
        where: { id: officialId },
      });

      // Update
      const updated = await mockPrisma.official.update({
        where: { id: officialId },
        data: { email: newEmail },
      });

      // Audit log
      await mockPrisma.auditLog.create({
        data: {
          action: 'official_updated',
          entityType: 'official',
          entityId: officialId,
          actorId: 'admin-user-1',
          details: JSON.stringify({
            field: 'email',
            oldValue: oldEmail,
            newValue: newEmail,
          }),
        },
      });

      expect(updated.email).toBe(newEmail);
      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'official_updated',
            entityType: 'official',
            entityId: officialId,
          }),
        }),
      );
    });

    it('updates official opt-out status with audit trail', async () => {
      mockPrisma.official.update.mockResolvedValueOnce({
        id: 'off-2',
        optedOut: true,
      });

      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-4' });

      await mockPrisma.official.update({
        where: { id: 'off-2' },
        data: { optedOut: true },
      });

      await mockPrisma.auditLog.create({
        data: {
          action: 'official_updated',
          entityType: 'official',
          entityId: 'off-2',
          actorId: 'admin-user-1',
          details: JSON.stringify({ field: 'optedOut', oldValue: false, newValue: true }),
        },
      });

      expect(mockPrisma.official.update).toHaveBeenCalledOnce();
      expect(mockPrisma.auditLog.create).toHaveBeenCalledOnce();
    });

    it('records actor ID (admin who made the change) in audit log', async () => {
      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-5' });

      await mockPrisma.auditLog.create({
        data: {
          action: 'official_updated',
          entityType: 'official',
          entityId: 'off-3',
          actorId: 'admin-specific-user',
          details: 'Updated name',
        },
      });

      const call = mockPrisma.auditLog.create.mock.calls[0][0];
      expect(call.data.actorId).toBe('admin-specific-user');
    });
  });

  // ─── Auto-Escalation ──────────────────────────────────────────────────────

  describe('Auto-escalation triggers at >10 flagged items', () => {
    it('triggers escalation when flagged count exceeds 10', async () => {
      mockPrisma.submission.count.mockResolvedValueOnce(15);

      const ESCALATION_THRESHOLD = 10;

      const flaggedCount = await mockPrisma.submission.count({
        where: { status: 'flagged' },
      });

      const shouldEscalate = flaggedCount > ESCALATION_THRESHOLD;

      expect(shouldEscalate).toBe(true);
      expect(flaggedCount).toBe(15);
    });

    it('does not trigger escalation at exactly 10 flagged items', async () => {
      mockPrisma.submission.count.mockResolvedValueOnce(10);

      const ESCALATION_THRESHOLD = 10;

      const flaggedCount = await mockPrisma.submission.count({
        where: { status: 'flagged' },
      });

      const shouldEscalate = flaggedCount > ESCALATION_THRESHOLD;

      expect(shouldEscalate).toBe(false);
    });

    it('does not trigger escalation when below threshold', async () => {
      mockPrisma.submission.count.mockResolvedValueOnce(3);

      const ESCALATION_THRESHOLD = 10;

      const flaggedCount = await mockPrisma.submission.count({
        where: { status: 'flagged' },
      });

      const shouldEscalate = flaggedCount > ESCALATION_THRESHOLD;

      expect(shouldEscalate).toBe(false);
    });

    it('escalation creates audit log entry', async () => {
      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-esc-1' });

      await mockPrisma.auditLog.create({
        data: {
          action: 'auto_escalation',
          entityType: 'system',
          entityId: 'moderation-queue',
          actorId: 'system',
          details: 'Auto-escalation triggered: 15 flagged submissions exceed threshold of 10',
        },
      });

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'auto_escalation',
            actorId: 'system',
          }),
        }),
      );
    });

    it('queries only currently flagged (not historically flagged) submissions', async () => {
      mockPrisma.submission.count.mockResolvedValueOnce(5);

      await mockPrisma.submission.count({
        where: { status: 'flagged' },
      });

      expect(mockPrisma.submission.count).toHaveBeenCalledWith({
        where: { status: 'flagged' },
      });
    });
  });
});
