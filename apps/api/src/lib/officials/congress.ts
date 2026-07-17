/**
 * Congress.gov API client for federal official lookup.
 *
 * Flow:
 *   1. ZIP -> congressional district via checked-in jurisdiction fixture
 *   2. Congress.gov API for member lookup (2 senators + 1 representative)
 */

import type { OfficialRecord } from 'shared';
import {
  normalizeDistrictIdentifier,
  resolveZipJurisdiction,
  type ZipJurisdiction,
} from './jurisdiction.js';

interface CongressMember {
  name: string;
  state: string;
  district?: number;
  party: string;
  url?: string;
  phone?: string;
  terms?: Array<{
    chamber: string;
    startYear: number;
    endYear: number;
  }>;
  depiction?: {
    imageUrl: string;
    attribution: string;
  };
}

interface CongressApiResponse {
  members?: CongressMember[];
}

const CONGRESS_API_BASE = 'https://api.congress.gov/v3';

/**
 * Look up federal officials (2 senators + 1 representative) for a given ZIP code.
 * Returns an empty array on any error.
 */
export async function lookupFederalOfficials(
  zipCode: string,
  jurisdiction?: ZipJurisdiction,
): Promise<OfficialRecord[]> {
  try {
    const geo = jurisdiction ?? (await resolveZipJurisdiction(zipCode));
    if (!geo?.congressionalDistrict) return [];

    const apiKey = process.env.CONGRESS_GOV_API_KEY;
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (apiKey) {
      headers['X-API-Key'] = apiKey;
    }

    // Fetch current members for this state
    const membersUrl = `${CONGRESS_API_BASE}/member?stateCode=${geo.state}&currentMember=true&limit=50`;
    const res = await fetch(membersUrl, {
      headers,
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.warn(`Congress.gov API returned ${res.status}`);
      return [];
    }

    const data = (await res.json()) as CongressApiResponse;
    if (!data.members) return [];

    const officials: OfficialRecord[] = [];

    for (const member of data.members) {
      // Determine if senator or representative
      const latestTerm = member.terms?.[member.terms.length - 1];
      const isSenator = latestTerm?.chamber === 'Senate';
      const isRep =
        latestTerm?.chamber === 'House of Representatives' &&
        normalizeDistrictIdentifier(member.district) === geo.congressionalDistrict;

      if (!isSenator && !isRep) continue;

      officials.push({
        name: member.name,
        title: isSenator ? 'U.S. Senator' : 'U.S. Representative',
        email: '', // Congress.gov API does not expose email; populated via contact form URLs
        jurisdiction: isSenator
          ? `${geo.state} (statewide)`
          : `${geo.state}-${geo.congressionalDistrict}`,
        level: 'federal',
        district: isSenator ? 'statewide' : geo.congressionalDistrict,
        state: geo.state,
        party: member.party || 'Unknown',
        phone: member.phone ?? undefined,
        sourceApi: 'congress.gov',
      });
    }

    return officials;
  } catch (err) {
    console.error('Federal official lookup failed:', err);
    return [];
  }
}
