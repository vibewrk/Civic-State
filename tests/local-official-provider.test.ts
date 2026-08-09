import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalLocalProvider = process.env.LOCAL_OFFICIALS_PROVIDER;
const originalCiceroKey = process.env.CICERO_API_KEY;

function restoreEnv(name: 'LOCAL_OFFICIALS_PROVIDER' | 'CICERO_API_KEY', value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

describe('local official provider seam', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.LOCAL_OFFICIALS_PROVIDER;
    delete process.env.CICERO_API_KEY;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    restoreEnv('LOCAL_OFFICIALS_PROVIDER', originalLocalProvider);
    restoreEnv('CICERO_API_KEY', originalCiceroKey);
  });

  it('resolves deterministic fixture-backed local officials for a known ZIP', async () => {
    process.env.LOCAL_OFFICIALS_PROVIDER = 'fixture';
    const { lookupLocalOfficials } = await import('../apps/api/src/lib/officials/cicero.js');

    const officials = await lookupLocalOfficials('10001');

    expect(officials).toEqual([
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
        sourceApi: 'local_fixture',
        sourceUrl: 'https://www.nyc.gov/mayors-office',
        sourceLastVerifiedAt: '2026-08-09',
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
        sourceApi: 'local_fixture',
        sourceUrl: 'https://council.nyc.gov/district-3/',
        sourceLastVerifiedAt: '2026-08-09',
      },
    ]);
  });

  it('returns no local officials for ZIPs outside the fixture coverage set', async () => {
    process.env.LOCAL_OFFICIALS_PROVIDER = 'fixture';
    const { lookupLocalOfficials } = await import('../apps/api/src/lib/officials/cicero.js');

    await expect(lookupLocalOfficials('99999')).resolves.toEqual([]);
  });

  it('keeps the pending Cicero branch disabled unless selected or keyed', async () => {
    const { lookupLocalOfficials } = await import('../apps/api/src/lib/officials/cicero.js');

    await expect(lookupLocalOfficials('10001')).resolves.toEqual([]);
  });

  it('keeps the selected Cicero provider disabled until an API key exists', async () => {
    process.env.LOCAL_OFFICIALS_PROVIDER = 'cicero';
    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
    const { lookupLocalOfficials } = await import('../apps/api/src/lib/officials/cicero.js');

    await expect(lookupLocalOfficials('10001')).resolves.toEqual([]);
    expect(infoSpy).not.toHaveBeenCalled();
  });

  it('warns and returns no officials for unsupported provider selections', async () => {
    process.env.LOCAL_OFFICIALS_PROVIDER = 'ballotready';
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const { lookupLocalOfficials } = await import('../apps/api/src/lib/officials/cicero.js');

    await expect(lookupLocalOfficials('10001')).resolves.toEqual([]);
    expect(warnSpy).toHaveBeenCalledWith(
      'Unsupported local officials provider configured; skipping local lookup',
    );
  });
});
