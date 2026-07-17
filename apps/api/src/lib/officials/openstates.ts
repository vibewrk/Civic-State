/**
 * OpenStates v3 API client for state legislator lookup.
 *
 * Requires OPENSTATES_API_KEY environment variable.
 * Returns state legislators (typically 1 senator + 1 representative) for a jurisdiction.
 */

import type { OfficialRecord } from 'shared';
import {
  filterOfficialsForJurisdiction,
  resolveZipJurisdiction,
  type ZipJurisdiction,
} from './jurisdiction.js';

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
 * Look up state legislators for a given ZIP code via OpenStates v3 API.
 * Gracefully degrades (returns empty array) when API key is missing or on error.
 */
export async function lookupStateOfficials(
  zipCode: string,
  zipJurisdictionOverride?: ZipJurisdiction,
): Promise<OfficialRecord[]> {
  const apiKey = process.env.OPENSTATES_API_KEY;
  if (!apiKey) {
    console.warn('OPENSTATES_API_KEY not set — skipping state legislator lookup');
    return [];
  }

  try {
    const zipJurisdiction =
      zipJurisdictionOverride ?? (await resolveZipJurisdiction(zipCode));
    if (!zipJurisdiction) {
      console.warn(`Could not map ZIP ${zipCode} to a state`);
      return [];
    }
    const stateAbbr = zipJurisdiction.state;

    const openStatesJurisdiction = `ocd-jurisdiction/country:us/state:${stateAbbr.toLowerCase()}/government`;

    const params = new URLSearchParams({
      jurisdiction: openStatesJurisdiction,
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

    return filterOfficialsForJurisdiction(officials, zipJurisdiction);
  } catch (err) {
    console.error('State official lookup failed:', err);
    return [];
  }
}
