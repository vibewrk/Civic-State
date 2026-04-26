import { computeRowHmac, type PricingTier, type LedgerEntryType } from 'shared';

/** Cost estimate per pricing tier (cents) */
const TIER_COST_ESTIMATE: Record<PricingTier, number> = {
  single: 20, // $0.20
  three_pack: 40, // $0.40
  full_spread: 60, // $0.60
};

/** Budget ceiling multiplier — jobs exceeding 150% of estimate are paused */
const BUDGET_CEILING_MULTIPLIER = 1.5;

/** Discrepancy threshold for reconciliation (cents) */
const RECONCILIATION_THRESHOLD_CENTS = 10; // $0.10

interface LedgerEntryInput {
  type: LedgerEntryType;
  amount: number; // cents
  currency?: string;
  reference: string;
  description: string;
  jobId?: string;
}

interface ReconciliationResult {
  date: string;
  totalStripePayments: number;
  totalLedgerPayments: number;
  discrepancy: number;
  discrepancyFlagged: boolean;
  missingEntries: string[];
  orphanedEntries: string[];
}

interface PnLReport {
  date: string;
  revenue: number;
  apiCosts: number;
  postageCosts: number;
  refunds: number;
  adjustments: number;
  netIncome: number;
}

/**
 * Record an append-only ledger entry with HMAC checksum for tamper detection.
 */
export async function recordLedgerEntry(input: LedgerEntryInput): Promise<string> {
  const { prisma } = await import('shared');

  const data = {
    type: input.type,
    amount: input.amount,
    currency: input.currency ?? 'usd',
    reference: input.reference,
    description: input.description,
    jobId: input.jobId ?? null,
    createdAt: new Date(),
  };

  const hmacChecksum = computeRowHmac(data);

  const entry = await prisma.ledgerEntry.create({
    data: {
      ...data,
      hmacChecksum,
    },
  });

  return entry.id;
}

/**
 * Authorize a job budget by estimating cost from pricing tier.
 * Returns the estimated cost in cents.
 */
export function authorizeJobBudget(pricingTier: PricingTier): number {
  const estimate = TIER_COST_ESTIMATE[pricingTier];
  if (estimate === undefined) {
    throw new Error(`Unknown pricing tier: ${pricingTier}`);
  }
  return estimate;
}

/**
 * Check whether a job's actual costs exceed 150% of the estimated budget.
 * Returns true if the ceiling is exceeded.
 */
export async function checkBudgetCeiling(
  jobId: string,
  pricingTier: PricingTier,
): Promise<{ exceeded: boolean; actual: number; ceiling: number }> {
  const { prisma } = await import('shared');

  const estimate = authorizeJobBudget(pricingTier);
  const ceiling = Math.round(estimate * BUDGET_CEILING_MULTIPLIER);

  // Sum all cost entries for this job
  const costEntries = await prisma.ledgerEntry.findMany({
    where: {
      jobId,
      type: { in: ['api_cost', 'postage'] },
    },
    select: { amount: true },
  });

  const actual = costEntries.reduce((sum: number, e: { amount: number }) => sum + e.amount, 0);

  return {
    exceeded: actual > ceiling,
    actual,
    ceiling,
  };
}

/**
 * Run daily reconciliation: compare Stripe payments vs ledger entries.
 * Flags discrepancies exceeding $0.10.
 */
export async function runDailyReconciliation(): Promise<ReconciliationResult> {
  const { prisma } = await import('shared');

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Get Stripe payments for yesterday
  const payments = await prisma.payment.findMany({
    where: {
      createdAt: { gte: yesterday, lt: today },
      status: 'completed',
    },
    select: { id: true, amount: true, stripePaymentIntentId: true },
  });

  // Get ledger payment entries for yesterday
  const ledgerEntries = await prisma.ledgerEntry.findMany({
    where: {
      createdAt: { gte: yesterday, lt: today },
      type: 'payment',
    },
    select: { id: true, amount: true, reference: true },
  });

  type PaymentRow = { id: string; amount: number; stripePaymentIntentId: string };
  type LedgerRow = { id: string; amount: number; reference: string };

  const totalStripePayments = payments.reduce((sum: number, p: PaymentRow) => sum + p.amount, 0);
  const totalLedgerPayments = ledgerEntries.reduce(
    (sum: number, e: LedgerRow) => sum + e.amount,
    0,
  );
  const discrepancy = Math.abs(totalStripePayments - totalLedgerPayments);

  // Find payments not in ledger
  const ledgerRefs = new Set(ledgerEntries.map((e: LedgerRow) => e.reference));
  const missingEntries = payments
    .filter((p: PaymentRow) => !ledgerRefs.has(p.stripePaymentIntentId))
    .map((p: PaymentRow) => p.stripePaymentIntentId);

  // Find ledger entries without matching payment
  const paymentIntentIds = new Set(payments.map((p: PaymentRow) => p.stripePaymentIntentId));
  const orphanedEntries = ledgerEntries
    .filter((e: LedgerRow) => !paymentIntentIds.has(e.reference))
    .map((e: LedgerRow) => e.reference);

  return {
    date: yesterday.toISOString().split('T')[0],
    totalStripePayments,
    totalLedgerPayments,
    discrepancy,
    discrepancyFlagged: discrepancy > RECONCILIATION_THRESHOLD_CENTS,
    missingEntries,
    orphanedEntries,
  };
}

/**
 * Generate a daily P&L report email body.
 */
export async function formatPnLEmail(): Promise<{ subject: string; body: string }> {
  const { prisma } = await import('shared');

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const entries = await prisma.ledgerEntry.findMany({
    where: {
      createdAt: { gte: yesterday, lt: today },
    },
    select: { type: true, amount: true },
  });

  const report: PnLReport = {
    date: yesterday.toISOString().split('T')[0],
    revenue: 0,
    apiCosts: 0,
    postageCosts: 0,
    refunds: 0,
    adjustments: 0,
    netIncome: 0,
  };

  for (const entry of entries) {
    switch (entry.type) {
      case 'payment':
        report.revenue += entry.amount;
        break;
      case 'api_cost':
        report.apiCosts += entry.amount;
        break;
      case 'postage':
        report.postageCosts += entry.amount;
        break;
      case 'refund':
        report.refunds += entry.amount;
        break;
      case 'adjustment':
        report.adjustments += entry.amount;
        break;
    }
  }

  report.netIncome =
    report.revenue - report.apiCosts - report.postageCosts - report.refunds + report.adjustments;

  const fmt = (cents: number) => `$${(cents / 100).toFixed(2)}`;

  const subject = `CivicState Daily P&L — ${report.date}`;
  const body = [
    `CivicState Daily P&L Report — ${report.date}`,
    '='.repeat(50),
    '',
    `Revenue:        ${fmt(report.revenue)}`,
    `API Costs:     -${fmt(report.apiCosts)}`,
    `Postage Costs: -${fmt(report.postageCosts)}`,
    `Refunds:       -${fmt(report.refunds)}`,
    `Adjustments:    ${fmt(report.adjustments)}`,
    '-'.repeat(50),
    `Net Income:     ${fmt(report.netIncome)}`,
    '',
    `Total entries processed: ${entries.length}`,
  ].join('\n');

  return { subject, body };
}
