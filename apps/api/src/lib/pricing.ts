import type { PricingTier } from 'shared';

export const PRICING_TIERS = {
  single:      { amount: 500,  officialCount: 1,  label: 'Single Official' },
  three_pack:  { amount: 1500, officialCount: 3,  label: 'Three Officials' },
  full_spread: { amount: 2500, officialCount: -1, label: 'All Officials' },
} satisfies Record<PricingTier, { amount: number; officialCount: number; label: string }>;

export const PREVIEW_PRICING_TIERS = {
  single: PRICING_TIERS.single.amount / 100,
  three: PRICING_TIERS.three_pack.amount / 100,
  all: PRICING_TIERS.full_spread.amount / 100,
} as const;

export function isPricingTier(tier: unknown): tier is PricingTier {
  return typeof tier === 'string' && Object.hasOwn(PRICING_TIERS, tier);
}
