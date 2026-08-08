import { cacheAndFilterOfficials, lookupOfficials } from './lookup.js';

export interface CachedSubmissionOfficials {
  zipCode: string;
  count: number;
  confidence: string;
}

export async function cacheOfficialsForSubmissionZip(
  zipCode: string,
): Promise<CachedSubmissionOfficials> {
  const normalizedZip = zipCode.slice(0, 5);
  const result = await lookupOfficials(normalizedZip);
  const filtered = await cacheAndFilterOfficials(result.officials);

  return {
    zipCode: normalizedZip,
    count: filtered.length,
    confidence: result.confidenceLabel,
  };
}
