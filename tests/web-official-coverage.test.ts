import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('web officials coverage client', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  it('requests the no-store coverage endpoint and returns its payload shape', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        zipCode: '90210',
        count: 2,
        coverage: { federal: 1, state: 1, local: 0 },
        confidence: 'medium',
        sources: ['congress.gov', 'openstates'],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { lookupOfficialCoverage } = await import('../apps/web/lib/api.js');

    await expect(lookupOfficialCoverage('90210')).resolves.toEqual({
      zipCode: '90210',
      count: 2,
      coverage: { federal: 1, state: 1, local: 0 },
      confidence: 'medium',
      sources: ['congress.gov', 'openstates'],
    });
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/api/officials/coverage?zipCode=90210',
      expect.any(Object),
    );
  });

  it('passes abort signals through to fetch', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        zipCode: '10001',
        count: 1,
        coverage: { federal: 1, state: 0, local: 0 },
        confidence: 'medium',
        sources: ['congress.gov'],
      }),
    });
    vi.stubGlobal('fetch', fetchMock);
    const controller = new AbortController();

    const { lookupOfficialCoverage } = await import('../apps/web/lib/api.js');
    await lookupOfficialCoverage('10001', { signal: controller.signal });

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/api/officials/coverage?zipCode=10001',
      expect.objectContaining({ signal: controller.signal }),
    );
  });
});

describe('official coverage summary copy', () => {
  it('describes useful coverage without hiding missing local officials', async () => {
    const { summarizeOfficialCoverage } = await import(
      '../apps/web/lib/official-coverage.js'
    );

    expect(
      summarizeOfficialCoverage({
        zipCode: '90210',
        count: 2,
        coverage: { federal: 1, state: 1, local: 0 },
        confidence: 'medium',
        sources: ['congress.gov', 'openstates'],
      }),
    ).toEqual({
      tone: 'medium',
      title: '2 officials found',
      detail: 'Federal and state coverage found. Local coverage is still pending.',
    });
  });

  it('warns when no officials are found', async () => {
    const { summarizeOfficialCoverage } = await import(
      '../apps/web/lib/official-coverage.js'
    );

    expect(
      summarizeOfficialCoverage({
        zipCode: '00000',
        count: 0,
        coverage: { federal: 0, state: 0, local: 0 },
        confidence: 'none',
        sources: [],
      }),
    ).toEqual({
      tone: 'none',
      title: 'No officials found yet',
      detail: 'You can still submit, but CivicState may need operator review for this ZIP code.',
    });
  });

  it('formats complete federal, state, and local coverage', async () => {
    const { summarizeOfficialCoverage } = await import(
      '../apps/web/lib/official-coverage.js'
    );

    expect(
      summarizeOfficialCoverage({
        zipCode: '30301',
        count: 5,
        coverage: { federal: 2, state: 2, local: 1 },
        confidence: 'high',
        sources: ['congress.gov', 'openstates', 'cicero'],
      }).detail,
    ).toBe('Federal, state, and local coverage found.');
  });
});
