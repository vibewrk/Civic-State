import { describe, expect, it, vi, beforeEach } from 'vitest';
import type { OfficialRecord } from 'shared';

vi.mock('../src/lib/officials/congress.js', () => ({
  lookupFederalOfficials: vi.fn(),
}));
vi.mock('../src/lib/officials/openstates.js', () => ({
  lookupStateOfficials: vi.fn(),
}));
vi.mock('../src/lib/officials/cicero.js', () => ({
  lookupLocalOfficials: vi.fn(),
}));

const { resolveZipJurisdiction, filterOfficialsForJurisdiction } = await import(
  '../src/lib/officials/jurisdiction.js'
);
const { lookupOfficials } = await import('../src/lib/officials/lookup.js');
const { lookupFederalOfficials } = await import(
  '../src/lib/officials/congress.js'
);
const { lookupStateOfficials } = await import(
  '../src/lib/officials/openstates.js'
);
const { lookupLocalOfficials } = await import('../src/lib/officials/cicero.js');

function makeOfficial(overrides: Partial<OfficialRecord> = {}): OfficialRecord {
  return {
    name: 'Jane Senator',
    title: 'U.S. Senator',
    email: 'jane@senate.gov',
    jurisdiction: 'CA (statewide)',
    level: 'federal',
    district: 'statewide',
    state: 'CA',
    party: 'Democrat',
    sourceApi: 'congress.gov',
    ...overrides,
  };
}

describe('official ZIP jurisdiction authority', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('resolves fixture-backed authorities from 5-digit ZIP codes', async () => {
    await expect(resolveZipJurisdiction('90210')).resolves.toEqual({
      zipCode: '90210',
      state: 'CA',
      stateFips: '06',
      congressionalDistrict: '36',
      stateSenateDistrict: '24',
      stateHouseDistrict: '51',
    });
    await expect(resolveZipJurisdiction('10001')).resolves.toMatchObject({
      zipCode: '10001',
      state: 'NY',
      congressionalDistrict: '12',
    });
    await expect(resolveZipJurisdiction('39813')).resolves.toMatchObject({
      zipCode: '39813',
      state: 'GA',
      congressionalDistrict: '2',
    });
    await expect(resolveZipJurisdiction('83414')).resolves.toMatchObject({
      zipCode: '83414',
      state: 'WY',
      congressionalDistrict: '0',
    });
    await expect(resolveZipJurisdiction('00000')).resolves.toBeNull();
  });

  it('filters officials to the submitted ZIP jurisdiction', () => {
    const filtered = filterOfficialsForJurisdiction(
      [
        makeOfficial({ name: 'California Senator' }),
        makeOfficial({
          name: 'Wrong California Representative',
          title: 'U.S. Representative',
          district: '12',
        }),
        makeOfficial({
          name: 'Correct California Representative',
          title: 'U.S. Representative',
          district: '36',
        }),
        makeOfficial({
          name: 'Correct California Assemblymember',
          title: 'State Representative',
          level: 'state',
          district: '51',
          sourceApi: 'openstates',
        }),
        makeOfficial({
          name: 'Wrong California Assemblymember',
          title: 'State Representative',
          level: 'state',
          district: '52',
          sourceApi: 'openstates',
        }),
        makeOfficial({
          name: 'Nevada Senator',
          jurisdiction: 'NV (statewide)',
          state: 'NV',
        }),
        makeOfficial({
          name: 'No State Official',
          state: '',
          sourceApi: 'cicero',
        }),
      ],
      {
        zipCode: '90210',
        state: 'CA',
        congressionalDistrict: '36',
        stateSenateDistrict: '24',
        stateHouseDistrict: '51',
      },
    );

    expect(filtered.map((official) => official.name)).toEqual([
      'California Senator',
      'Correct California Representative',
      'Correct California Assemblymember',
    ]);
  });

  it('computes lookup coverage after fail-closed jurisdiction filtering', async () => {
    vi.mocked(lookupFederalOfficials).mockResolvedValue([
      makeOfficial({ name: 'California Senator' }),
      makeOfficial({
        name: 'Nevada Senator',
        jurisdiction: 'NV (statewide)',
        state: 'NV',
      }),
    ]);
    vi.mocked(lookupStateOfficials).mockResolvedValue([
      makeOfficial({
        name: 'California Assemblymember',
        title: 'State Representative',
        level: 'state',
        district: '51',
        sourceApi: 'openstates',
      }),
      makeOfficial({
        name: 'Wrong California Assemblymember',
        title: 'State Representative',
        level: 'state',
        district: '52',
        sourceApi: 'openstates',
      }),
    ]);
    vi.mocked(lookupLocalOfficials).mockResolvedValue([
      makeOfficial({
        name: 'Las Vegas Mayor',
        jurisdiction: 'Las Vegas, NV',
        level: 'local',
        state: 'NV',
        sourceApi: 'cicero',
      }),
    ]);

    const result = await lookupOfficials('90210');

    expect(result.officials.map((official) => official.name)).toEqual([
      'California Senator',
      'California Assemblymember',
    ]);
    expect(result.coverage).toEqual({
      federal: 1,
      state: 1,
      local: 0,
    });
    expect(result.confidenceLabel).toBe('medium');
  });

  it('does not call providers when the ZIP cannot establish authority', async () => {
    const result = await lookupOfficials('00000');

    expect(result).toEqual({
      officials: [],
      coverage: { federal: 0, state: 0, local: 0 },
      confidenceLabel: 'none',
    });
    expect(lookupFederalOfficials).not.toHaveBeenCalled();
    expect(lookupStateOfficials).not.toHaveBeenCalled();
    expect(lookupLocalOfficials).not.toHaveBeenCalled();
  });
});
