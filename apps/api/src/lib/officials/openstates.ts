/**
 * OpenStates v3 API client for state legislator lookup.
 *
 * Requires OPENSTATES_API_KEY environment variable.
 * Returns state legislators (typically 1 senator + 1 representative) for a jurisdiction.
 */

import type { OfficialRecord } from 'shared';

const OPENSTATES_API_BASE = 'https://v3.openstates.org';

interface OpenStatesLegislator {
  id: string;
  name: string;
  party: string;
  current_role?: {
    title: string;
    org_classification: string;
    district: string;
    division_id: string;
  };
  email?: string;
  offices?: Array<{
    voice?: string;
    address?: string;
  }>;
}

interface OpenStatesSearchResponse {
  results?: OpenStatesLegislator[];
}

/**
 * Map a 5-digit ZIP code to a state abbreviation.
 * Uses a simplified ZIP prefix -> state mapping for the most common prefixes.
 * Falls back to null if no match found.
 */
function zipToStateAbbr(zipCode: string): string | null {
  // ZIP prefix -> state mapping (first 3 digits)
  const prefix = parseInt(zipCode.substring(0, 3), 10);

  // Simplified mapping based on USPS ZIP code ranges
  const ranges: Array<[number, number, string]> = [
    [1, 2, 'MA'], [3, 4, 'RI'], [5, 5, 'CT'], [6, 6, 'CT'],
    [7, 8, 'NJ'], [10, 14, 'NY'], [15, 19, 'PA'],
    [20, 20, 'DC'], [21, 21, 'MD'], [22, 24, 'VA'],
    [25, 26, 'WV'], [27, 28, 'NC'], [29, 29, 'SC'],
    [30, 31, 'GA'], [32, 34, 'FL'], [35, 36, 'AL'],
    [37, 38, 'TN'], [39, 39, 'MS'], [40, 42, 'KY'],
    [43, 45, 'OH'], [46, 47, 'IN'], [48, 49, 'MI'],
    [50, 52, 'IA'], [53, 54, 'WI'], [55, 56, 'MN'],
    [57, 57, 'SD'], [58, 58, 'ND'], [59, 59, 'MT'],
    [60, 62, 'IL'], [63, 65, 'MO'], [66, 67, 'KS'],
    [68, 69, 'NE'], [70, 71, 'LA'], [72, 72, 'AR'],
    [73, 74, 'OK'], [75, 79, 'TX'], [80, 81, 'CO'],
    [82, 83, 'WY'], [83, 83, 'ID'], [84, 84, 'UT'],
    [85, 86, 'AZ'], [87, 88, 'NM'], [89, 89, 'NV'],
    [90, 96, 'CA'], [97, 97, 'OR'], [98, 99, 'WA'],
  ];

  for (const [lo, hi, st] of ranges) {
    if (prefix >= lo && prefix <= hi) return st;
  }
  return null;
}

/**
 * Look up state legislators for a given ZIP code via OpenStates v3 API.
 * Gracefully degrades (returns empty array) when API key is missing or on error.
 */
export async function lookupStateOfficials(zipCode: string): Promise<OfficialRecord[]> {
  const apiKey = process.env.OPENSTATES_API_KEY;
  if (!apiKey) {
    console.warn('OPENSTATES_API_KEY not set — skipping state legislator lookup');
    return [];
  }

  try {
    const stateAbbr = zipToStateAbbr(zipCode);
    if (!stateAbbr) {
      console.warn('Could not map requested ZIP to a state');
      return [];
    }

    const jurisdiction = `ocd-jurisdiction/country:us/state:${stateAbbr.toLowerCase()}/government`;

    const params = new URLSearchParams({
      jurisdiction,
      include: 'other_names',
      page: '1',
      per_page: '50',
    });

    const url = `${OPENSTATES_API_BASE}/people?${params.toString()}`;
    const res = await fetch(url, {
      headers: {
        'X-API-KEY': apiKey,
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(15_000),
    });

    if (!res.ok) {
      console.warn(`OpenStates API returned ${res.status}`);
      return [];
    }

    const data = (await res.json()) as OpenStatesSearchResponse;
    if (!data.results) return [];

    const officials: OfficialRecord[] = [];

    for (const legislator of data.results) {
      if (!legislator.current_role) continue;

      const role = legislator.current_role;
      const isSenate = role.org_classification === 'upper';
      const title = isSenate ? 'State Senator' : 'State Representative';

      officials.push({
        name: legislator.name,
        title,
        email: legislator.email || '',
        jurisdiction: `${stateAbbr} District ${role.district}`,
        level: 'state',
        district: role.district,
        state: stateAbbr,
        party: legislator.party || 'Unknown',
        phone: legislator.offices?.[0]?.voice ?? undefined,
        sourceApi: 'openstates',
      });
    }

    return officials;
  } catch (err) {
    console.error('State official lookup failed:', err);
    return [];
  }
}
