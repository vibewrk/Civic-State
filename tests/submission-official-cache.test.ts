import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../apps/api/src/lib/officials/lookup.js', () => ({
  lookupOfficials: vi.fn(),
  cacheAndFilterOfficials: vi.fn(),
}));

const { lookupOfficials, cacheAndFilterOfficials } = await import(
  '../apps/api/src/lib/officials/lookup.js'
);
const { cacheOfficialsForSubmissionZip } = await import(
  '../apps/api/src/lib/officials/submission-cache.js'
);

describe('submission official cache bridge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('caches officials for the submitted ZIP before drafting reads from the DB', async () => {
    vi.mocked(lookupOfficials).mockResolvedValueOnce({
      officials: [
        {
          name: 'Senator Test',
          title: 'U.S. Senator',
          email: 'senator@example.gov',
          jurisdiction: 'NY',
          level: 'federal',
          district: 'statewide',
          state: 'NY',
          party: 'Independent',
          sourceApi: 'congress.gov',
        },
        {
          name: 'Assembly Test',
          title: 'State Assemblymember',
          email: 'assembly@example.gov',
          jurisdiction: 'NY District 1',
          level: 'state',
          district: '1',
          state: 'NY',
          party: 'Independent',
          sourceApi: 'openstates',
        },
      ],
      coverage: { federal: 1, state: 1, local: 0 },
      confidenceLabel: 'medium',
    });
    vi.mocked(cacheAndFilterOfficials).mockResolvedValueOnce([
      {
        id: 'off-1',
        name: 'Senator Test',
        title: 'U.S. Senator',
        email: 'senator@example.gov',
        jurisdiction: 'NY',
        level: 'federal',
        district: 'statewide',
        state: 'NY',
        party: 'Independent',
        sourceApi: 'congress.gov',
      },
    ]);

    await expect(cacheOfficialsForSubmissionZip('10001-1234')).resolves.toEqual({
      zipCode: '10001',
      count: 1,
      confidence: 'medium',
    });
    expect(lookupOfficials).toHaveBeenCalledWith('10001');
    expect(cacheAndFilterOfficials).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Senator Test' }),
        expect.objectContaining({ name: 'Assembly Test' }),
      ]),
    );
  });
});
