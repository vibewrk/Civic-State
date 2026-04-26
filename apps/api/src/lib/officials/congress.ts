/**
 * Congress.gov API client for federal official lookup.
 *
 * Flow:
 *   1. ZIP -> congressional district via Census Geocoder
 *   2. Congress.gov API for member lookup (2 senators + 1 representative)
 */

import type { OfficialRecord } from 'shared';

interface CensusGeocoderResult {
  result?: {
    addressMatches?: Array<{
      geographies?: {
        'Congressional Districts'?: Array<{
          STATE: string;
          CD118: string;
          NAME: string;
        }>;
        States?: Array<{
          STATE: string;
          STUSAB: string;
          NAME: string;
        }>;
      };
    }>;
  };
}

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

const CENSUS_GEOCODER_BASE = 'https://geocoding.geo.census.gov/geocoder/geographies/address';
const CONGRESS_API_BASE = 'https://api.congress.gov/v3';

/**
 * Resolve a ZIP code to a state abbreviation and congressional district
 * using the Census Bureau geocoder.
 */
async function zipToDistrict(
  zipCode: string,
): Promise<{ stateAbbr: string; stateFips: string; district: string } | null> {
  try {
    const params = new URLSearchParams({
      zip: zipCode,
      benchmark: 'Public_AR_Current',
      vintage: 'Current_Current',
      layers: 'all',
      format: 'json',
    });

    const url = `${CENSUS_GEOCODER_BASE}?${params.toString()}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });

    if (!res.ok) {
      console.warn(`Census geocoder returned ${res.status} for ZIP ${zipCode}`);
      return null;
    }

    const data = (await res.json()) as CensusGeocoderResult;
    const match = data.result?.addressMatches?.[0];
    if (!match?.geographies) return null;

    const cd = match.geographies['Congressional Districts']?.[0];
    const st = match.geographies['States']?.[0];

    if (!cd || !st) return null;

    return {
      stateAbbr: st.STUSAB,
      stateFips: cd.STATE,
      district: cd.CD118,
    };
  } catch (err) {
    console.warn('Census geocoder lookup failed:', err);
    return null;
  }
}

/**
 * Look up federal officials (2 senators + 1 representative) for a given ZIP code.
 * Returns an empty array on any error.
 */
export async function lookupFederalOfficials(zipCode: string): Promise<OfficialRecord[]> {
  try {
    const geo = await zipToDistrict(zipCode);
    if (!geo) return [];

    const apiKey = process.env.CONGRESS_GOV_API_KEY;
    const headers: Record<string, string> = {
      Accept: 'application/json',
    };
    if (apiKey) {
      headers['X-API-Key'] = apiKey;
    }

    // Fetch current members for this state
    const membersUrl = `${CONGRESS_API_BASE}/member?stateCode=${geo.stateAbbr}&currentMember=true&limit=50`;
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
        String(member.district) === geo.district;

      if (!isSenator && !isRep) continue;

      officials.push({
        name: member.name,
        title: isSenator ? 'U.S. Senator' : 'U.S. Representative',
        email: '', // Congress.gov API does not expose email; populated via contact form URLs
        jurisdiction: isSenator
          ? `${geo.stateAbbr} (statewide)`
          : `${geo.stateAbbr}-${geo.district}`,
        level: 'federal',
        district: isSenator ? 'statewide' : geo.district,
        state: geo.stateAbbr,
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
