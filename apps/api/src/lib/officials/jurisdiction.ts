/**
 * Fixture-backed ZIP -> jurisdiction authority checks for official targeting.
 *
 * External official providers can return broad or stale results. CivicState
 * fails closed by resolving the submitted ZIP through a checked-in jurisdiction
 * fixture and dropping any official whose jurisdiction cannot be matched to
 * that authority.
 */

import type { JurisdictionLevel, OfficialRecord } from 'shared';

export interface ZipJurisdiction {
  zipCode: string;
  state: string;
  stateFips?: string;
  congressionalDistrict?: string;
  stateSenateDistrict?: string;
  stateHouseDistrict?: string;
}

const ZIP_JURISDICTION_FIXTURES: Record<string, ZipJurisdiction> = {
  '90210': {
    zipCode: '90210',
    state: 'CA',
    stateFips: '06',
    congressionalDistrict: '36',
    stateSenateDistrict: '24',
    stateHouseDistrict: '51',
  },
  '10001': {
    zipCode: '10001',
    state: 'NY',
    stateFips: '36',
    congressionalDistrict: '12',
    stateSenateDistrict: '28',
    stateHouseDistrict: '75',
  },
  '30301': {
    zipCode: '30301',
    state: 'GA',
    stateFips: '13',
    congressionalDistrict: '5',
    stateSenateDistrict: '39',
    stateHouseDistrict: '56',
  },
  '39813': {
    zipCode: '39813',
    state: 'GA',
    stateFips: '13',
    congressionalDistrict: '2',
    stateSenateDistrict: '12',
    stateHouseDistrict: '153',
  },
  '83414': {
    zipCode: '83414',
    state: 'WY',
    stateFips: '56',
    congressionalDistrict: '0',
    stateSenateDistrict: '17',
    stateHouseDistrict: '23',
  },
};

const VALID_LEVELS = new Set<JurisdictionLevel>([
  'federal',
  'state',
  'local',
]);

export async function resolveZipJurisdiction(
  zipCode: string,
): Promise<ZipJurisdiction | null> {
  const normalizedZip = zipCode.trim();
  if (!/^\d{5}$/.test(normalizedZip)) return null;

  return ZIP_JURISDICTION_FIXTURES[normalizedZip] ?? null;
}

export function normalizeDistrictIdentifier(
  value: string | number | null | undefined,
): string | undefined {
  if (value === null || value === undefined) return undefined;

  const normalized = String(value).trim();
  if (!normalized) return undefined;

  const districtMatch = normalized.match(/[A-Za-z]?\d+[A-Za-z]?/);
  const district = districtMatch?.[0] ?? normalized;
  const withoutLeadingZeroes = district.replace(/^0+(?=\d)/, '');
  return withoutLeadingZeroes.toUpperCase();
}

export function isOfficialEligibleForJurisdiction(
  official: OfficialRecord,
  jurisdiction: ZipJurisdiction,
): boolean {
  if (!VALID_LEVELS.has(official.level)) return false;

  const officialState = official.state.trim().toUpperCase();
  if (!officialState) return false;
  if (officialState !== jurisdiction.state) return false;

  switch (official.level) {
    case 'federal':
      return isFederalOfficialEligible(official, jurisdiction);
    case 'state':
      return isStateOfficialEligible(official, jurisdiction);
    case 'local':
      return isLocalOfficialEligible(official);
    default:
      return false;
  }
}

export function filterOfficialsForJurisdiction(
  officials: OfficialRecord[],
  jurisdiction: ZipJurisdiction,
): OfficialRecord[] {
  return officials.filter((official) =>
    isOfficialEligibleForJurisdiction(official, jurisdiction),
  );
}

export async function filterOfficialsForZip(
  officials: OfficialRecord[],
  zipCode: string,
): Promise<OfficialRecord[]> {
  const jurisdiction = await resolveZipJurisdiction(zipCode);
  if (!jurisdiction) return [];

  return filterOfficialsForJurisdiction(officials, jurisdiction);
}

function isFederalOfficialEligible(
  official: OfficialRecord,
  jurisdiction: ZipJurisdiction,
): boolean {
  const title = official.title.toLowerCase();
  if (title.includes('senator') || official.district.toLowerCase() === 'statewide') {
    return true;
  }

  const officialDistrict = normalizeDistrictIdentifier(official.district);
  return Boolean(
    jurisdiction.congressionalDistrict &&
      officialDistrict === jurisdiction.congressionalDistrict,
  );
}

function isStateOfficialEligible(
  official: OfficialRecord,
  jurisdiction: ZipJurisdiction,
): boolean {
  const title = official.title.toLowerCase();
  const expectedDistrict = title.includes('senator')
    ? jurisdiction.stateSenateDistrict
    : title.includes('representative') ||
        title.includes('assembly') ||
        title.includes('delegate')
      ? jurisdiction.stateHouseDistrict
      : undefined;
  const officialDistrict = normalizeDistrictIdentifier(official.district);

  return Boolean(expectedDistrict && officialDistrict === expectedDistrict);
}

function isLocalOfficialEligible(official: OfficialRecord): boolean {
  const sourceApi = official.sourceApi.trim().toLowerCase();
  return sourceApi === 'cicero' || sourceApi === 'ballotready';
}
