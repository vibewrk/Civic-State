import { describe, expect, it } from 'vitest';
import {
  buildPricingPackagesResponse,
  buildPricingTiersResponse,
  getOfficialCountForTier,
  getPricingPackage,
  normalizePricingTier,
} from '../apps/api/src/lib/pricing.js';

describe('Pricing contract', () => {
  it('normalizes canonical and legacy web tier names', () => {
    expect(normalizePricingTier('single')).toBe('single');
    expect(normalizePricingTier('three_pack')).toBe('three_pack');
    expect(normalizePricingTier('full_spread')).toBe('full_spread');

    expect(normalizePricingTier('three')).toBe('three_pack');
    expect(normalizePricingTier('all')).toBe('full_spread');
  });

  it('rejects unknown pricing tier values', () => {
    expect(normalizePricingTier('premium')).toBeNull();
    expect(normalizePricingTier(undefined)).toBeNull();
    expect(normalizePricingTier(null)).toBeNull();
  });

  it('exposes package prices in dollars and cents', () => {
    expect(buildPricingTiersResponse()).toEqual({
      single: 5,
      three_pack: 15,
      full_spread: 25,
    });

    expect(getPricingPackage('three_pack')).toMatchObject({
      tier: 'three_pack',
      amount: 15,
      amountCents: 1500,
      officialCount: 3,
    });
  });

  it('resolves full spread to the drafted official count', () => {
    expect(getOfficialCountForTier('single', 8)).toBe(1);
    expect(getOfficialCountForTier('three_pack', 8)).toBe(3);
    expect(getOfficialCountForTier('full_spread', 8)).toBe(8);
  });

  it('builds selectable package metadata for previews', () => {
    expect(buildPricingPackagesResponse()).toEqual([
      expect.objectContaining({ tier: 'single', label: 'Single Official' }),
      expect.objectContaining({ tier: 'three_pack', label: 'Three Officials' }),
      expect.objectContaining({ tier: 'full_spread', label: 'All Officials' }),
    ]);
  });
});

