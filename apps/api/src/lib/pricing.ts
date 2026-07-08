export type PricingTier = 'single' | 'three_pack' | 'full_spread';

export interface PricingPackage {
  tier: PricingTier;
  amount: number;
  amountCents: number;
  officialCount: number;
  label: string;
  description: string;
}

export const PRICING_TIERS: Record<PricingTier, PricingPackage> = {
  single: {
    tier: 'single',
    amount: 5,
    amountCents: 500,
    officialCount: 1,
    label: 'Single Official',
    description: 'Send to the most relevant official by email.',
  },
  three_pack: {
    tier: 'three_pack',
    amount: 15,
    amountCents: 1500,
    officialCount: 3,
    label: 'Three Officials',
    description: 'Send to the top three matched officials by email.',
  },
  full_spread: {
    tier: 'full_spread',
    amount: 25,
    amountCents: 2500,
    officialCount: -1,
    label: 'All Officials',
    description: 'Send to every matched official by email.',
  },
};

const TIER_ALIASES: Record<string, PricingTier> = {
  single: 'single',
  three: 'three_pack',
  three_pack: 'three_pack',
  all: 'full_spread',
  full_spread: 'full_spread',
};

export function normalizePricingTier(value: unknown): PricingTier | null {
  if (typeof value !== 'string') return null;
  return TIER_ALIASES[value] ?? null;
}

export function getPricingPackage(tier: PricingTier): PricingPackage {
  return PRICING_TIERS[tier];
}

export function getOfficialCountForTier(
  tier: PricingTier,
  matchedOfficialCount: number,
): number {
  const configuredCount = PRICING_TIERS[tier].officialCount;
  return configuredCount === -1 ? matchedOfficialCount : configuredCount;
}

export function buildPricingTiersResponse(): Record<PricingTier, number> {
  return {
    single: PRICING_TIERS.single.amount,
    three_pack: PRICING_TIERS.three_pack.amount,
    full_spread: PRICING_TIERS.full_spread.amount,
  };
}

export function buildPricingPackagesResponse(): PricingPackage[] {
  return Object.values(PRICING_TIERS);
}

