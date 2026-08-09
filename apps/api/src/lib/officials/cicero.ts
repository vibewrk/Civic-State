import type { OfficialRecord } from 'shared';

export interface LocalOfficialsProvider {
  readonly id: string;
  lookupByZip(zipCode: string): Promise<OfficialRecord[]>;
}

export const LOCAL_FIXTURE_SOURCE_API = 'local_fixture';
export const LOCAL_FIXTURE_LAST_VERIFIED_AT = '2026-08-09';

const EMPTY_LOCAL_OFFICIALS_PROVIDER: LocalOfficialsProvider = {
  id: 'local_officials_unconfigured',
  async lookupByZip() {
    return [];
  },
};

const LOCAL_OFFICIAL_FIXTURES: Readonly<Record<string, readonly OfficialRecord[]>> = {
  '10001': [
    {
      name: 'Zohran Mamdani',
      title: 'Mayor',
      email: '',
      jurisdiction: 'New York City',
      level: 'local',
      district: 'citywide',
      state: 'NY',
      party: 'Nonpartisan',
      phone: '311',
      sourceApi: LOCAL_FIXTURE_SOURCE_API,
      sourceUrl: 'https://www.nyc.gov/mayors-office',
      sourceLastVerifiedAt: LOCAL_FIXTURE_LAST_VERIFIED_AT,
    },
    {
      name: 'Carl Wilson',
      title: 'Council Member',
      email: 'district3@council.nyc.gov',
      jurisdiction: 'New York City Council District 3',
      level: 'local',
      district: '3',
      state: 'NY',
      party: 'Nonpartisan',
      phone: '212-564-7757',
      sourceApi: LOCAL_FIXTURE_SOURCE_API,
      sourceUrl: 'https://council.nyc.gov/district-3/',
      sourceLastVerifiedAt: LOCAL_FIXTURE_LAST_VERIFIED_AT,
    },
  ],
};

class FixtureLocalOfficialsProvider implements LocalOfficialsProvider {
  readonly id = LOCAL_FIXTURE_SOURCE_API;

  async lookupByZip(zipCode: string): Promise<OfficialRecord[]> {
    const officials = LOCAL_OFFICIAL_FIXTURES[zipCode] ?? [];
    return officials.map((official) => ({ ...official }));
  }
}

class PendingCiceroLocalOfficialsProvider implements LocalOfficialsProvider {
  readonly id = 'cicero';

  constructor(private readonly apiKey: string | undefined) {}

  async lookupByZip(): Promise<OfficialRecord[]> {
    if (!this.apiKey) {
      return [];
    }

    // TODO: Implement Cicero API integration once provider evaluation is complete.
    // Endpoint: https://cicero.azavea.com/v3.1/official
    // Query params: search_loc={zipCode}&search_country=US
    // Auth: via API key header or query param
    console.info('Cicero stub called for requested ZIP — integration pending');
    return [];
  }
}

export function createLocalOfficialsProvider(
  env: NodeJS.ProcessEnv = process.env,
): LocalOfficialsProvider {
  const selectedProvider = env.LOCAL_OFFICIALS_PROVIDER?.trim().toLowerCase();

  if (selectedProvider === 'fixture') {
    return new FixtureLocalOfficialsProvider();
  }

  if (selectedProvider === 'cicero' || env.CICERO_API_KEY) {
    return new PendingCiceroLocalOfficialsProvider(env.CICERO_API_KEY);
  }

  if (selectedProvider) {
    console.warn('Unsupported local officials provider configured; skipping local lookup');
  }

  return EMPTY_LOCAL_OFFICIALS_PROVIDER;
}

export async function lookupLocalOfficials(zipCode: string): Promise<OfficialRecord[]> {
  return createLocalOfficialsProvider().lookupByZip(zipCode);
}
