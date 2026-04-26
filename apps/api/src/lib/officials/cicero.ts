/**
 * Cicero API client stub for local official lookup.
 *
 * Cicero (by CIVISN / Azavea) provides local-level official data
 * that is not available from Congress.gov or OpenStates.
 * This is a stub — Cicero evaluation and API key provisioning are pending.
 *
 * When implemented, this will provide:
 *   - City council members
 *   - County commissioners / supervisors
 *   - Mayors
 *   - Other local elected officials
 */

import type { OfficialRecord } from 'shared';

/**
 * Look up local officials for a given ZIP code via the Cicero API.
 * Currently returns an empty array (stub implementation).
 */
export async function lookupLocalOfficials(zipCode: string): Promise<OfficialRecord[]> {
  const apiKey = process.env.CICERO_API_KEY;
  if (!apiKey) {
    // Expected — Cicero integration is pending evaluation
    return [];
  }

  // TODO: Implement Cicero API integration once API key is provisioned.
  // Endpoint: https://cicero.azavea.com/v3.1/official
  // Query params: search_loc={zipCode}&search_country=US
  // Auth: via API key header or query param
  console.info(`Cicero stub called for ZIP ${zipCode} — integration pending`);
  return [];
}
