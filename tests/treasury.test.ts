/**
 * Tests for treasury helper functions.
 *
 * Covers ledger entry creation with HMAC, budget authorization per tier,
 * budget ceiling enforcement, daily reconciliation, and P&L email generation
 * from apps/worker/src/lib/treasury.ts.
 *
 * All external dependencies (Prisma, HMAC) are mocked.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Prisma via shared
const mockPrisma = {
  ledgerEntry: {
    create: vi.fn(),
    findMany: vi.fn(),
  },
  payment: {
    findMany: vi.fn(),
  },
};

vi.mock('shared', () => ({
  prisma: mockPrisma,
  computeRowHmac: vi.fn(() => 'mock-hmac-checksum'),
}));

vi.mock('shared/hmac', () => ({
  computeRowHmac: vi.fn(() => 'mock-hmac-checksum'),
}));

const {
  recordLedgerEntry,
  authorizeJobBudget,
  checkBudgetCeiling,
  runDailyReconciliation,
  formatPnLEmail,
} = await import('../apps/worker/src/lib/treasury.js');

describe('Treasury', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── recordLedgerEntry ───────────────────────────────────────────────────────

  describe('recordLedgerEntry', () => {
    it('creates entry with correct HMAC checksum', async () => {
      mockPrisma.ledgerEntry.create.mockResolvedValueOnce({ id: 'ledger-1' });

      const id = await recordLedgerEntry({
        type: 'payment',
        amount: 500,
        reference: 'pi_test123',
        description: 'Test payment',
        jobId: 'job-1',
      });

      expect(id).toBe('ledger-1');
      expect(mockPrisma.ledgerEntry.create).toHaveBeenCalledOnce();

      const createCall = mockPrisma.ledgerEntry.create.mock.calls[0][0];
      expect(createCall.data).toMatchObject({
        type: 'payment',
        amount: 500,
        currency: 'usd',
        reference: 'pi_test123',
        description: 'Test payment',
        jobId: 'job-1',
        hmacChecksum: 'mock-hmac-checksum',
      });
    });

    it('defaults currency to usd when not specified', async () => {
      mockPrisma.ledgerEntry.create.mockResolvedValueOnce({ id: 'ledger-2' });

      await recordLedgerEntry({
        type: 'api_cost',
        amount: 15,
        reference: 'cost-ref',
        description: 'API cost',
      });

      const createCall = mockPrisma.ledgerEntry.create.mock.calls[0][0];
      expect(createCall.data.currency).toBe('usd');
    });

    it('sets jobId to null when not provided', async () => {
      mockPrisma.ledgerEntry.create.mockResolvedValueOnce({ id: 'ledger-3' });

      await recordLedgerEntry({
        type: 'refund',
        amount: 500,
        reference: 'refund-ref',
        description: 'Test refund',
      });

      const createCall = mockPrisma.ledgerEntry.create.mock.calls[0][0];
      expect(createCall.data.jobId).toBeNull();
    });
  });

  // ─── authorizeJobBudget ──────────────────────────────────────────────────────

  describe('authorizeJobBudget', () => {
    it('returns 20 cents for single tier', () => {
      expect(authorizeJobBudget('single')).toBe(20);
    });

    it('returns 40 cents for three_pack tier', () => {
      expect(authorizeJobBudget('three_pack')).toBe(40);
    });

    it('returns 60 cents for full_spread tier', () => {
      expect(authorizeJobBudget('full_spread')).toBe(60);
    });

    it('throws for unknown pricing tier', () => {
      expect(() => authorizeJobBudget('invalid' as any)).toThrow(
        'Unknown pricing tier: invalid',
      );
    });
  });

  // ─── checkBudgetCeiling ──────────────────────────────────────────────────────

  describe('checkBudgetCeiling', () => {
    it('flags when actual costs exceed 150% of estimate', async () => {
      // single tier estimate = 20 cents, ceiling = 30 cents
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { amount: 20 },
        { amount: 15 },
      ]); // total = 35 cents, exceeds 30

      const result = await checkBudgetCeiling('job-1', 'single');

      expect(result.exceeded).toBe(true);
      expect(result.actual).toBe(35);
      expect(result.ceiling).toBe(30); // 20 * 1.5
    });

    it('does not flag when costs are within budget', async () => {
      // three_pack estimate = 40 cents, ceiling = 60 cents
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { amount: 25 },
        { amount: 10 },
      ]); // total = 35 cents, under 60

      const result = await checkBudgetCeiling('job-2', 'three_pack');

      expect(result.exceeded).toBe(false);
      expect(result.actual).toBe(35);
      expect(result.ceiling).toBe(60); // 40 * 1.5
    });

    it('does not flag when costs exactly equal the ceiling', async () => {
      // single tier ceiling = 30 cents
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { amount: 30 },
      ]); // total = 30, equals ceiling (not exceeded)

      const result = await checkBudgetCeiling('job-3', 'single');

      expect(result.exceeded).toBe(false);
      expect(result.actual).toBe(30);
      expect(result.ceiling).toBe(30);
    });

    it('queries only api_cost and postage entry types', async () => {
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([]);

      await checkBudgetCeiling('job-4', 'single');

      expect(mockPrisma.ledgerEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            jobId: 'job-4',
            type: { in: ['api_cost', 'postage'] },
          },
        }),
      );
    });
  });

  // ─── runDailyReconciliation ──────────────────────────────────────────────────

  describe('runDailyReconciliation', () => {
    it('detects discrepancies greater than $0.10', async () => {
      mockPrisma.payment.findMany.mockResolvedValueOnce([
        { id: 'pay-1', amount: 500, stripePaymentIntentId: 'pi_1' },
        { id: 'pay-2', amount: 1500, stripePaymentIntentId: 'pi_2' },
      ]);

      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { id: 'le-1', amount: 500, reference: 'pi_1' },
        // pi_2 missing from ledger, and amount differs
      ]);

      const result = await runDailyReconciliation();

      // Stripe total: 2000, Ledger total: 500, discrepancy: 1500
      expect(result.discrepancy).toBe(1500);
      expect(result.discrepancyFlagged).toBe(true);
      expect(result.missingEntries).toContain('pi_2');
    });

    it('does not flag discrepancies of $0.10 or less', async () => {
      mockPrisma.payment.findMany.mockResolvedValueOnce([
        { id: 'pay-1', amount: 500, stripePaymentIntentId: 'pi_1' },
      ]);

      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { id: 'le-1', amount: 495, reference: 'pi_1' },
      ]);

      const result = await runDailyReconciliation();

      // Discrepancy = 5 cents, under threshold of 10 cents
      expect(result.discrepancy).toBe(5);
      expect(result.discrepancyFlagged).toBe(false);
    });

    it('identifies orphaned ledger entries without matching payments', async () => {
      mockPrisma.payment.findMany.mockResolvedValueOnce([]);

      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { id: 'le-orphan', amount: 500, reference: 'pi_orphan' },
      ]);

      const result = await runDailyReconciliation();

      expect(result.orphanedEntries).toContain('pi_orphan');
      expect(result.missingEntries).toHaveLength(0);
    });

    it('returns correct structure with date field', async () => {
      mockPrisma.payment.findMany.mockResolvedValueOnce([]);
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([]);

      const result = await runDailyReconciliation();

      expect(result).toHaveProperty('date');
      expect(result).toHaveProperty('totalStripePayments');
      expect(result).toHaveProperty('totalLedgerPayments');
      expect(result).toHaveProperty('discrepancy');
      expect(result).toHaveProperty('discrepancyFlagged');
      expect(result).toHaveProperty('missingEntries');
      expect(result).toHaveProperty('orphanedEntries');
      expect(result.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  // ─── formatPnLEmail ──────────────────────────────────────────────────────────

  describe('formatPnLEmail', () => {
    it('generates correct report structure with all categories', async () => {
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([
        { type: 'payment', amount: 2500 },
        { type: 'payment', amount: 500 },
        { type: 'api_cost', amount: 15 },
        { type: 'postage', amount: 50 },
        { type: 'refund', amount: 500 },
        { type: 'adjustment', amount: 100 },
      ]);

      const { subject, body } = await formatPnLEmail();

      expect(subject).toContain('CivicState Daily P&L');
      expect(subject).toMatch(/\d{4}-\d{2}-\d{2}$/);

      // Revenue = 2500 + 500 = 3000 cents = $30.00
      expect(body).toContain('$30.00');
      // API Costs = 15 cents = $0.15
      expect(body).toContain('$0.15');
      // Postage = 50 cents = $0.50
      expect(body).toContain('$0.50');
      // Refunds = 500 cents = $5.00
      expect(body).toContain('$5.00');
      // Adjustments = 100 cents = $1.00
      expect(body).toContain('$1.00');

      // Net = 3000 - 15 - 50 - 500 + 100 = 2535 cents = $25.35
      expect(body).toContain('$25.35');

      // Structure elements
      expect(body).toContain('Revenue:');
      expect(body).toContain('API Costs:');
      expect(body).toContain('Postage Costs:');
      expect(body).toContain('Refunds:');
      expect(body).toContain('Adjustments:');
      expect(body).toContain('Net Income:');
      expect(body).toContain('Total entries processed: 6');
    });

    it('handles empty ledger entries', async () => {
      mockPrisma.ledgerEntry.findMany.mockResolvedValueOnce([]);

      const { subject, body } = await formatPnLEmail();

      expect(subject).toContain('CivicState Daily P&L');
      expect(body).toContain('$0.00');
      expect(body).toContain('Total entries processed: 0');
    });
  });
});
