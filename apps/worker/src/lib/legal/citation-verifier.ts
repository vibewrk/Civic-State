/**
 * Citation verification pipeline -- verifies all citations in parallel
 * using the appropriate source for each citation type.
 *
 * - eCFR citations: verified via verifyECFRCitation()
 * - CourtListener citations: verified via verifyCourtListenerCitation()
 * - State cache citations: pre-verified (always pass)
 */

import { verifyECFRCitation } from './ecfr.js';
import { verifyCourtListenerCitation } from './courtlistener.js';

export interface Citation {
  text: string;
  source: 'ecfr' | 'courtlistener' | 'state_cache';
  /** For eCFR: the CFR citation string. For CourtListener: the case name. */
  reference: string;
}

export interface VerifiedCitation extends Citation {
  verified: boolean;
}

export interface VerificationSummary {
  verified: VerifiedCitation[];
  unverified: VerifiedCitation[];
  total: number;
  verifiedCount: number;
  unverifiedCount: number;
  /** True if every citation failed verification */
  allFailed: boolean;
}

/**
 * Verify all citations in parallel using the appropriate verifier per source.
 * State cache citations are pre-verified and always pass.
 */
export async function verifyCitations(
  citations: Citation[],
): Promise<VerificationSummary> {
  if (citations.length === 0) {
    return {
      verified: [],
      unverified: [],
      total: 0,
      verifiedCount: 0,
      unverifiedCount: 0,
      allFailed: true,
    };
  }

  const results = await Promise.all(
    citations.map(async (citation): Promise<VerifiedCitation> => {
      let isVerified = false;

      switch (citation.source) {
        case 'state_cache':
          // Pre-verified in the curated cache
          isVerified = true;
          break;

        case 'ecfr':
          isVerified = await verifyECFRCitation(citation.reference);
          break;

        case 'courtlistener':
          isVerified = await verifyCourtListenerCitation(citation.reference);
          break;

        default:
          isVerified = false;
      }

      return { ...citation, verified: isVerified };
    }),
  );

  const verified = results.filter((c) => c.verified);
  const unverified = results.filter((c) => !c.verified);

  return {
    verified,
    unverified,
    total: results.length,
    verifiedCount: verified.length,
    unverifiedCount: unverified.length,
    allFailed: verified.length === 0,
  };
}
