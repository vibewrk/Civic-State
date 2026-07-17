/**
 * Tests for the citation verification pipeline.
 *
 * Covers fail-closed provenance validation, mixed verification results, and
 * the allFailed flag from apps/worker/src/lib/legal/citation-verifier.ts.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock eCFR and CourtListener API clients
vi.mock('../apps/worker/src/lib/legal/ecfr.js', () => ({
  verifyECFRCitation: vi.fn(),
}));
vi.mock('../apps/worker/src/lib/legal/courtlistener.js', () => ({
  verifyCourtListenerCitation: vi.fn(),
}));

const { validateCitationProvenance, verifyCitations } = await import(
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

  // ─── Provenance Quality Tiers ───────────────────────────────────────────────

  describe('Provenance validation', () => {
    const now = new Date('2026-07-17T00:00:00.000Z');

    it.each([
      {
        name: 'well-formed resolvable state statute with matching quote',
        citation: {
          text: 'California Civil Code Section 1940',
          source: 'state_cache',
          reference: 'CA-CIV-1940',
          claim: 'California law establishes tenant habitability protections.',
          quote: 'tenant rights including habitability requirements',
        },
        options: { now, maxAgeDays: 120 },
        expectedTier: 'verified',
        expectedVerified: true,
        expectedCanonicalId: 'state:CA:CIV:1940',
        expectedReason: undefined,
      },
      {
        name: 'malformed CFR citation',
        citation: {
          text: 'Broken federal regulation',
          source: 'ecfr',
          reference: 'CFR forty two section no',
          claim: 'A malformed citation must never verify.',
        },
        options: { now },
        expectedTier: 'malformed',
        expectedVerified: false,
        expectedCanonicalId: undefined,
        expectedReason: 'malformed_citation',
      },
      {
        name: 'mismatched quoted span',
        citation: {
          text: 'California Civil Code Section 1940',
          source: 'state_cache',
          reference: 'CA-CIV-1940',
          claim: 'The cited source supposedly promises free parking.',
          quote: 'landlords must provide free parking to all tenants',
        },
        options: { now, maxAgeDays: 120 },
        expectedTier: 'unverified',
        expectedVerified: false,
        expectedCanonicalId: 'state:CA:CIV:1940',
        expectedReason: 'quote_mismatch',
      },
      {
        name: 'stale cached statute evidence',
        citation: {
          text: 'California Civil Code Section 1940',
          source: 'state_cache',
          reference: 'CA-CIV-1940',
          claim: 'California law establishes tenant habitability protections.',
          quote: 'tenant rights including habitability requirements',
        },
        options: { now, maxAgeDays: 30 },
        expectedTier: 'stale',
        expectedVerified: false,
        expectedCanonicalId: 'state:CA:CIV:1940',
        expectedReason: 'stale_evidence',
      },
    ] as const)('$name', async ({
      citation,
      options,
      expectedTier,
      expectedVerified,
      expectedCanonicalId,
      expectedReason,
    }) => {
      const result = await validateCitationProvenance(citation, options);

      expect(result.qualityTier).toBe(expectedTier);
      expect(result.verified).toBe(expectedVerified);
      expect(result.canonicalId).toBe(expectedCanonicalId);
      if (expectedReason) {
        expect(result.failureReasons).toContain(expectedReason);
      }
      if (expectedTier === 'verified') {
        expect(result.evidence.citationWellFormed).toBe(true);
        expect(result.evidence.sourceResolved).toBe(true);
        expect(result.evidence.quoteMatched).toBe(true);
        expect(result.evidence.sourceUrl).toMatch(/^https:\/\//);
      }
    });

    it('canonicalizes and verifies a well-formed eCFR citation', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(true);

      const result = await validateCitationProvenance(
        {
          text: '42 CFR 483.10',
          source: 'ecfr',
          reference: '42 CFR § 483.10',
          claim: 'Residents have rights under federal nursing facility rules.',
        },
        { now },
      );

      expect(result.qualityTier).toBe('verified');
      expect(result.verified).toBe(true);
      expect(result.canonicalId).toBe('cfr:title-42:section-483.10');
      expect(result.evidence.canonicalReference).toBe('42 CFR § 483.10');
      expect(verifyECFRCitation).toHaveBeenCalledWith('42 CFR § 483.10');
    });

    it('resolves accepted eCFR variants with the canonical reference', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(true);

      const result = await validateCitationProvenance(
        {
          text: '42 CFR section 483.10',
          source: 'ecfr',
          reference: '42 CFR section 483.10',
        },
        { now },
      );

      expect(result.qualityTier).toBe('verified');
      expect(result.evidence.canonicalReference).toBe('42 CFR § 483.10');
      expect(verifyECFRCitation).toHaveBeenCalledWith('42 CFR § 483.10');
    });

    it('does not call external resolvers for malformed citations', async () => {
      const result = await validateCitationProvenance(
        {
          text: 'Broken federal regulation',
          source: 'ecfr',
          reference: 'not a citation',
        },
        { now },
      );

      expect(result.qualityTier).toBe('malformed');
      expect(result.verified).toBe(false);
      expect(verifyECFRCitation).not.toHaveBeenCalled();
    });

    it('does not allow caller metadata to freshen stale cache evidence', async () => {
      const result = await validateCitationProvenance(
        {
          text: 'California Civil Code Section 1940',
          source: 'state_cache',
          reference: 'CA-CIV-1940',
          sourceLastVerifiedAt: '2026-07-17',
        },
        { now, maxAgeDays: 30 },
      );

      expect(result.qualityTier).toBe('stale');
      expect(result.verified).toBe(false);
      expect(result.evidence.sourceLastVerifiedAt).toBe('2026-04-25');
      expect(result.failureReasons).toContain('stale_evidence');
    });

    it('does not allow caller source text to spoof state cache quote matching', async () => {
      const result = await validateCitationProvenance(
        {
          text: 'California Civil Code Section 1940',
          source: 'state_cache',
          reference: 'CA-CIV-1940',
          quote: 'landlords must provide free parking to all tenants',
          sourceText: 'landlords must provide free parking to all tenants',
        },
        { now, maxAgeDays: 120 },
      );

      expect(result.qualityTier).toBe('unverified');
      expect(result.verified).toBe(false);
      expect(result.failureReasons).toContain('quote_mismatch');
    });

    it('does not allow caller source text to spoof external quote matching', async () => {
      vi.mocked(verifyECFRCitation).mockResolvedValueOnce(true);

      const result = await validateCitationProvenance(
        {
          text: '42 CFR 483.10',
          source: 'ecfr',
          reference: '42 CFR § 483.10',
          quote: 'fabricated quoted span',
          sourceText: 'fabricated quoted span',
        },
        { now },
      );

      expect(result.qualityTier).toBe('unverified');
      expect(result.verified).toBe(false);
      expect(result.failureReasons).toContain('quote_source_missing');
    });

    it('fails closed for official records without an implemented resolver', async () => {
      const result = await validateCitationProvenance(
        {
          text: 'Official meeting minutes',
          source: 'official_record',
          reference: 'https://records.city.gov/minutes/2026-07-01',
        },
        { now },
      );

      expect(result.qualityTier).toBe('unverified');
      expect(result.verified).toBe(false);
      expect(result.canonicalId).toBe(
        'official-record:https://records.city.gov/minutes/2026-07-01',
      );
      expect(result.failureReasons).toContain('source_unresolved');
    });

    it('delegates non-adversarial CourtListener case names to the resolver', async () => {
      vi.mocked(verifyCourtListenerCitation).mockResolvedValueOnce(true);

      const result = await validateCitationProvenance(
        {
          text: 'In re Gault',
          source: 'courtlistener',
          reference: 'In re Gault',
        },
        { now },
      );

      expect(result.qualityTier).toBe('verified');
      expect(result.canonicalId).toBe('courtlistener:case:in-re-gault');
      expect(verifyCourtListenerCitation).toHaveBeenCalledWith('In re Gault');
    });

    it('returns malformed for structurally invalid citation objects', async () => {
      const citations = [
        {
          text: 'Bad CFR ref',
          source: 'ecfr',
          reference: null,
        },
      ] as unknown as Citation[];

      await expect(verifyCitations(citations)).resolves.toMatchObject({
        verifiedCount: 0,
        unverifiedCount: 1,
        allFailed: true,
      });

      const result = await verifyCitations(citations);
      expect(result.unverified[0].qualityTier).toBe('malformed');
      expect(result.unverified[0].failureReasons).toContain(
        'malformed_citation',
      );
    });
  });

  // ─── State Cache Citations ──────────────────────────────────────────────────

  describe('State cache citations', () => {
    it('marks known state_cache citations as verified with evidence', async () => {
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
      result.verified.forEach((c: { verified: boolean; qualityTier: string }) => {
        expect(c.verified).toBe(true);
        expect(c.qualityTier).toBe('verified');
      });
    });

    it('fails closed for unknown state_cache references', async () => {
      const citations: Citation[] = [
        {
          text: 'Unknown state law',
          source: 'state_cache',
          reference: 'CA-CIV-999999',
        },
      ];

      const result = await verifyCitations(citations);

      expect(result.verifiedCount).toBe(0);
      expect(result.unverifiedCount).toBe(1);
      expect(result.unverified[0].qualityTier).toBe('unverified');
      expect(result.unverified[0].failureReasons).toContain('source_unresolved');
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
