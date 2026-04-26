/**
 * Tests for the citation verification pipeline.
 *
 * Covers state cache pass-through, mixed verification results, and the
 * allFailed flag from apps/worker/src/lib/legal/citation-verifier.ts.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock eCFR and CourtListener API clients
vi.mock('../apps/worker/src/lib/legal/ecfr.js', () => ({
  verifyECFRCitation: vi.fn(),
}));
vi.mock('../apps/worker/src/lib/legal/courtlistener.js', () => ({
  verifyCourtListenerCitation: vi.fn(),
}));

const { verifyCitations } = await import(
  '../apps/worker/src/lib/legal/citation-verifier.js'
);
const { verifyECFRCitation } = await import(
  '../apps/worker/src/lib/legal/ecfr.js'
);
const { verifyCourtListenerCitation } = await import(
  '../apps/worker/src/lib/legal/courtlistener.js'
);

import type { Citation } from '../apps/worker/src/lib/legal/citation-verifier.js';

describe('Citation Verifier', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── State Cache Citations ──────────────────────────────────────────────────

  describe('State cache citations', () => {
    it('always marks state_cache citations as verified', async () => {
      const citations: Citation[] = [
        {
          text: 'California Civil Code Section 1940',
          source: 'state_cache',
          reference: 'CA-CIV-1940',
        },
        {
          text: 'New York RPL 235-b',
          source: 'state_cache',
          reference: 'NY-RPL-235-B',
        },
      ];

      const result = await verifyCitations(citations);

      expect(result.verifiedCount).toBe(2);
      expect(result.unverifiedCount).toBe(0);
      expect(result.allFailed).toBe(false);
      expect(result.verified).toHaveLength(2);
      result.verified.forEach((c: { verified: boolean }) => {
        expect(c.verified).toBe(true);
      });
    });

    it('does not call external APIs for state_cache citations', async () => {
      const citations: Citation[] = [
        {
          text: 'Texas Property Code 92',
          source: 'state_cache',
          reference: 'TX-PROP-92',
        },
      ];

      await verifyCitations(citations);

      expect(verifyECFRCitation).not.toHaveBeenCalled();
      expect(verifyCourtListenerCitation).not.toHaveBeenCalled();
    });
  });

  // ─── Mixed Verification Results ─────────────────────────────────────────────

  describe('Mixed verification results', () => {
    it('produces correct summary with mixed pass/fail citations', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(true);
      vi.mocked(verifyCourtListenerCitation).mockResolvedValueOnce(false);

      const citations: Citation[] = [
        {
          text: 'State cache citation',
          source: 'state_cache',
          reference: 'CA-CIV-1940',
        },
        {
          text: '42 CFR 483.10',
          source: 'ecfr',
          reference: '42 CFR § 483.10',
        },
        {
          text: 'Fake Case v. State',
          source: 'courtlistener',
          reference: 'Fake Case v. State',
        },
      ];

      const result = await verifyCitations(citations);

      expect(result.total).toBe(3);
      expect(result.verifiedCount).toBe(2); // state_cache + ecfr
      expect(result.unverifiedCount).toBe(1); // courtlistener
      expect(result.allFailed).toBe(false);
    });

    it('separates verified and unverified citations', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(false);

      const citations: Citation[] = [
        {
          text: 'State law',
          source: 'state_cache',
          reference: 'NY-RPL-227',
        },
        {
          text: 'Invalid CFR citation',
          source: 'ecfr',
          reference: 'not a real citation',
        },
      ];

      const result = await verifyCitations(citations);

      expect(result.verified).toHaveLength(1);
      expect(result.verified[0].source).toBe('state_cache');
      expect(result.unverified).toHaveLength(1);
      expect(result.unverified[0].source).toBe('ecfr');
    });
  });

  // ─── allFailed Flag ─────────────────────────────────────────────────────────

  describe('allFailed flag', () => {
    it('sets allFailed true when all citations fail verification', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(false);
      vi.mocked(verifyCourtListenerCitation).mockResolvedValueOnce(false);

      const citations: Citation[] = [
        {
          text: 'Bad CFR ref',
          source: 'ecfr',
          reference: 'invalid',
        },
        {
          text: 'Bad case ref',
          source: 'courtlistener',
          reference: 'nonexistent',
        },
      ];

      const result = await verifyCitations(citations);

      expect(result.allFailed).toBe(true);
      expect(result.verifiedCount).toBe(0);
      expect(result.unverifiedCount).toBe(2);
    });

    it('sets allFailed true for empty citations array', async () => {
      const result = await verifyCitations([]);

      expect(result.allFailed).toBe(true);
      expect(result.total).toBe(0);
      expect(result.verifiedCount).toBe(0);
      expect(result.unverifiedCount).toBe(0);
    });

    it('sets allFailed false when at least one citation passes', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(false);

      const citations: Citation[] = [
        {
          text: 'Verified state law',
          source: 'state_cache',
          reference: 'CA-HSC-39000',
        },
        {
          text: 'Failed CFR',
          source: 'ecfr',
          reference: 'bad ref',
        },
      ];

      const result = await verifyCitations(citations);

      expect(result.allFailed).toBe(false);
    });
  });

  // ─── eCFR and CourtListener Delegation ──────────────────────────────────────

  describe('API delegation', () => {
    it('calls verifyECFRCitation for ecfr sources', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(true);

      const citations: Citation[] = [
        {
          text: '42 CFR 483',
          source: 'ecfr',
          reference: '42 CFR § 483.10',
        },
      ];

      await verifyCitations(citations);

      expect(verifyECFRCitation).toHaveBeenCalledWith('42 CFR § 483.10');
    });

    it('calls verifyCourtListenerCitation for courtlistener sources', async () => {
      vi.mocked(verifyCourtListenerCitation).mockResolvedValueOnce(true);

      const citations: Citation[] = [
        {
          text: 'Brown v. Board of Education',
          source: 'courtlistener',
          reference: 'Brown v. Board of Education',
        },
      ];

      await verifyCitations(citations);

      expect(verifyCourtListenerCitation).toHaveBeenCalledWith(
        'Brown v. Board of Education',
      );
    });
  });
});
