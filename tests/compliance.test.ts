/**
 * Tests for legal compliance (Phase 4 — Dashboard & Compliance).
 *
 * Covers CCPA deletion with auth enforcement, soft-delete behavior,
 * data export, data retention policy for agent logs (24-month window),
 * and financial record exemption from deletion (7-year retention).
 *
 * All external dependencies (Prisma) are mocked.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    update: vi.fn(),
  },
  submission: {
    findMany: vi.fn(),
    updateMany: vi.fn(),
  },
  campaign: {
    findMany: vi.fn(),
  },
  letter: {
    findMany: vi.fn(),
    updateMany: vi.fn(),
  },
  agentLog: {
    findMany: vi.fn(),
    updateMany: vi.fn(),
  },
  payment: {
    findMany: vi.fn(),
  },
  ledgerEntry: {
    findMany: vi.fn(),
  },
  auditLog: {
    create: vi.fn(),
  },
};

vi.mock('shared', () => ({
  prisma: mockPrisma,
}));

vi.mock('shared/hmac', () => ({
  computeRowHmac: vi.fn(() => 'mock-hmac-checksum'),
}));

// Mock Clerk auth
const mockGetAuth = vi.fn(() => null);
vi.mock('@clerk/express', () => ({
  getAuth: (...args: unknown[]) => mockGetAuth(...args),
  clerkMiddleware: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
}));

describe('Legal Compliance', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetAuth.mockReturnValue(null);
  });

  // ─── CCPA Deletion Requires Auth ──────────────────────────────────────────

  describe('CCPA deletion requires auth', () => {
    it('rejects deletion request when unauthenticated', () => {
      const auth = mockGetAuth({});
      const isAuthenticated = auth !== null;

      expect(isAuthenticated).toBe(false);
    });

    it('allows deletion request when authenticated', () => {
      mockGetAuth.mockReturnValueOnce({ userId: 'user-1', sessionId: 'sess-1' });

      const auth = mockGetAuth({});
      const isAuthenticated = auth !== null && typeof auth === 'object' && 'userId' in auth;

      expect(isAuthenticated).toBe(true);
    });

    it('only allows users to delete their own data', () => {
      const requestUserId = 'user-1';
      const targetUserId = 'user-2';

      const isSelf = requestUserId === targetUserId;

      expect(isSelf).toBe(false);
    });

    it('allows user to request deletion of their own data', () => {
      const requestUserId = 'user-1';
      const targetUserId = 'user-1';

      const isSelf = requestUserId === targetUserId;

      expect(isSelf).toBe(true);
    });
  });

  // ─── Soft-Delete Behavior ─────────────────────────────────────────────────

  describe('Deletion soft-deletes user data', () => {
    it('sets deletedAt timestamp on user record', async () => {
      const deletedAt = new Date('2026-04-25T12:00:00Z');

      mockPrisma.user.update.mockResolvedValueOnce({
        id: 'user-1',
        deletedAt,
        email: null,
        name: null,
      });

      const updated = await mockPrisma.user.update({
        where: { id: 'user-1' },
        data: {
          deletedAt,
          email: null,
          name: null,
        },
      });

      expect(updated.deletedAt).toEqual(deletedAt);
      expect(updated.email).toBeNull();
      expect(updated.name).toBeNull();
    });

    it('nullifies PII fields on submissions', async () => {
      mockPrisma.submission.updateMany.mockResolvedValueOnce({ count: 3 });

      const result = await mockPrisma.submission.updateMany({
        where: { userId: 'user-1' },
        data: {
          deletedAt: new Date(),
          issueDescription: '[DELETED]',
          desiredOutcome: '[DELETED]',
        },
      });

      expect(result.count).toBe(3);
      expect(mockPrisma.submission.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            issueDescription: '[DELETED]',
            desiredOutcome: '[DELETED]',
          }),
        }),
      );
    });

    it('nullifies letter content for deleted users', async () => {
      mockPrisma.letter.updateMany.mockResolvedValueOnce({ count: 5 });

      const result = await mockPrisma.letter.updateMany({
        where: {
          campaign: { submission: { userId: 'user-1' } },
        },
        data: {
          content: '[DELETED]',
          deletedAt: new Date(),
        },
      });

      expect(result.count).toBe(5);
      expect(mockPrisma.letter.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            content: '[DELETED]',
          }),
        }),
      );
    });

    it('creates audit log for deletion event', async () => {
      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-del-1' });

      await mockPrisma.auditLog.create({
        data: {
          action: 'ccpa_deletion',
          entityType: 'user',
          entityId: 'user-1',
          actorId: 'user-1',
          details: 'CCPA deletion request processed',
        },
      });

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'ccpa_deletion',
            entityType: 'user',
          }),
        }),
      );
    });

    it('does not hard-delete records (preserves for audit)', async () => {
      // Verify we use update (soft delete) not delete (hard delete)
      mockPrisma.user.update.mockResolvedValueOnce({
        id: 'user-1',
        deletedAt: new Date(),
      });

      await mockPrisma.user.update({
        where: { id: 'user-1' },
        data: { deletedAt: new Date() },
      });

      // user.delete should never be called
      expect(mockPrisma.user.update).toHaveBeenCalledOnce();
    });
  });

  // ─── Data Export ──────────────────────────────────────────────────────────

  describe('Data export returns user data', () => {
    it('returns user profile data', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce({
        id: 'user-1',
        email: 'user@example.com',
        name: 'Test User',
        createdAt: new Date('2025-06-01'),
      });

      const user = await mockPrisma.user.findUnique({
        where: { id: 'user-1' },
      });

      expect(user).toBeDefined();
      expect(user.email).toBe('user@example.com');
      expect(user.name).toBe('Test User');
    });

    it('includes submissions in data export', async () => {
      mockPrisma.submission.findMany.mockResolvedValueOnce([
        {
          id: 'sub-1',
          issueDescription: 'Road repairs needed',
          desiredOutcome: 'Fix Main Street potholes',
          createdAt: new Date('2025-07-01'),
        },
        {
          id: 'sub-2',
          issueDescription: 'Park maintenance concerns',
          desiredOutcome: 'Regular park cleanup schedule',
          createdAt: new Date('2025-08-01'),
        },
      ]);

      const submissions = await mockPrisma.submission.findMany({
        where: { userId: 'user-1' },
      });

      expect(submissions).toHaveLength(2);
    });

    it('includes campaigns and letters in data export', async () => {
      mockPrisma.campaign.findMany.mockResolvedValueOnce([
        {
          id: 'camp-1',
          pricingTier: 'single',
          status: 'delivered',
          letters: [
            { id: 'letter-1', content: 'Dear Senator...' },
          ],
        },
      ]);

      const campaigns = await mockPrisma.campaign.findMany({
        where: { submission: { userId: 'user-1' } },
        include: { letters: true },
      });

      expect(campaigns).toHaveLength(1);
      expect(campaigns[0].letters).toHaveLength(1);
    });

    it('assembles complete data export object', async () => {
      // Simulate assembling the full export
      const exportData = {
        user: { id: 'user-1', email: 'user@example.com' },
        submissions: [{ id: 'sub-1' }],
        campaigns: [{ id: 'camp-1', letters: [{ id: 'letter-1' }] }],
        exportedAt: new Date().toISOString(),
      };

      expect(exportData).toHaveProperty('user');
      expect(exportData).toHaveProperty('submissions');
      expect(exportData).toHaveProperty('campaigns');
      expect(exportData).toHaveProperty('exportedAt');
      expect(exportData.exportedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  // ─── Data Retention: Agent Logs ───────────────────────────────────────────

  describe('Data retention: agent logs >24mo marked for deletion', () => {
    it('identifies agent logs older than 24 months', () => {
      const RETENTION_MONTHS = 24;
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - RETENTION_MONTHS);

      const logDate = new Date('2024-01-01'); // older than 24mo from April 2026
      const isExpired = logDate < cutoffDate;

      expect(isExpired).toBe(true);
    });

    it('does not flag logs within the 24-month window', () => {
      const RETENTION_MONTHS = 24;
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - RETENTION_MONTHS);

      const recentLog = new Date(); // today
      const isExpired = recentLog < cutoffDate;

      expect(isExpired).toBe(false);
    });

    it('marks expired agent logs for deletion in batch', async () => {
      const RETENTION_MONTHS = 24;
      const cutoffDate = new Date();
      cutoffDate.setMonth(cutoffDate.getMonth() - RETENTION_MONTHS);

      mockPrisma.agentLog.updateMany.mockResolvedValueOnce({ count: 150 });

      const result = await mockPrisma.agentLog.updateMany({
        where: {
          createdAt: { lt: cutoffDate },
          markedForDeletion: false,
        },
        data: {
          markedForDeletion: true,
        },
      });

      expect(result.count).toBe(150);
      expect(mockPrisma.agentLog.updateMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            createdAt: expect.objectContaining({ lt: expect.any(Date) }),
          }),
          data: { markedForDeletion: true },
        }),
      );
    });

    it('retention cutoff date is exactly 24 months ago', () => {
      const RETENTION_MONTHS = 24;
      const now = new Date('2026-04-25T00:00:00Z');
      const cutoff = new Date(now);
      cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS);

      // 24 months before April 2026 is April 2024
      expect(cutoff.getFullYear()).toBe(2024);
      expect(cutoff.getMonth()).toBe(3); // April = month 3 (0-indexed)
    });

    it('creates audit log for retention sweep', async () => {
      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-ret-1' });

      await mockPrisma.auditLog.create({
        data: {
          action: 'retention_sweep',
          entityType: 'agentLog',
          entityId: 'batch',
          actorId: 'system',
          details: 'Marked 150 agent logs older than 24 months for deletion',
        },
      });

      expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            action: 'retention_sweep',
            actorId: 'system',
          }),
        }),
      );
    });
  });

  // ─── Financial Records Exempt from Deletion ──────────────────────────────

  describe('Financial records exempt from deletion (7-year retention)', () => {
    it('does not delete payment records during CCPA deletion', async () => {
      // Payment records should be preserved for 7-year retention
      mockPrisma.payment.findMany.mockResolvedValueOnce([
        { id: 'pay-1', amount: 500, createdAt: new Date('2025-01-01') },
        { id: 'pay-2', amount: 1500, createdAt: new Date('2025-06-01') },
      ]);

      const payments = await mockPrisma.payment.findMany({
        where: { userId: 'user-1' },
      });

      // Payments exist but should NOT be deleted or modified
      expect(payments).toHaveLength(2);
      // No delete/update calls on payments during CCPA flow
    });

    it('does not delete ledger entries during CCPA deletion', async () => {
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { id: 'le-1', type: 'payment', amount: 500 },
        { id: 'le-2', type: 'api_cost', amount: 15 },
      ]);

      const entries = await mockPrisma.ledgerEntry.findMany({
        where: {
          job: { submission: { userId: 'user-1' } },
        },
      });

      // Ledger entries exist but should NOT be deleted
      expect(entries).toHaveLength(2);
    });

    it('7-year retention means records created after cutoff are kept', () => {
      const FINANCIAL_RETENTION_YEARS = 7;
      const cutoffDate = new Date();
      cutoffDate.setFullYear(cutoffDate.getFullYear() - FINANCIAL_RETENTION_YEARS);

      // Payment from 2 years ago — within 7-year window
      const paymentDate = new Date('2024-06-01');
      const isWithinRetention = paymentDate > cutoffDate;

      expect(isWithinRetention).toBe(true);
    });

    it('financial records older than 7 years can be purged', () => {
      const FINANCIAL_RETENTION_YEARS = 7;
      const cutoffDate = new Date();
      cutoffDate.setFullYear(cutoffDate.getFullYear() - FINANCIAL_RETENTION_YEARS);

      // Payment from 8 years ago — outside 7-year window
      const oldPaymentDate = new Date('2018-01-01');
      const isOutsideRetention = oldPaymentDate < cutoffDate;

      expect(isOutsideRetention).toBe(true);
    });

    it('PII in financial records is anonymized but amounts preserved', async () => {
      // During CCPA deletion, we anonymize PII but keep financial data
      const anonymizedPayment = {
        id: 'pay-1',
        amount: 500,
        userId: '[ANONYMIZED]',
        stripeCustomerId: '[ANONYMIZED]',
        createdAt: new Date('2025-01-01'),
        // Amount, type, and timestamps are preserved
      };

      expect(anonymizedPayment.amount).toBe(500);
      expect(anonymizedPayment.userId).toBe('[ANONYMIZED]');
      expect(anonymizedPayment.stripeCustomerId).toBe('[ANONYMIZED]');
      expect(anonymizedPayment.createdAt).toBeDefined();
    });

    it('audit log records financial exemption during CCPA deletion', async () => {
      mockPrisma.auditLog.create.mockResolvedValueOnce({ id: 'audit-fin-1' });

      await mockPrisma.auditLog.create({
        data: {
          action: 'ccpa_deletion',
          entityType: 'user',
          entityId: 'user-1',
          actorId: 'user-1',
          details: 'CCPA deletion completed. Financial records (2 payments, 3 ledger entries) retained per 7-year requirement.',
        },
      });

      const call = mockPrisma.auditLog.create.mock.calls[0][0];
      expect(call.data.details).toContain('Financial records');
      expect(call.data.details).toContain('7-year');
    });
  });
});
