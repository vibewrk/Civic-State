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

  it('returns source metadata on official lookup responses', async () => {
    const response = {
      zipCode: '10001',
      officials: [
        {
          id: 'off-local-1',
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
      ],
      coverage: { federal: 0, state: 0, local: 1 },
      confidence: 'low',
      count: 1,
    } as const;
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
    vi.stubGlobal('fetch', fetchMock);

    const { lookupOfficials } = await import('../apps/web/lib/api.js');

    await expect(lookupOfficials('10001')).resolves.toEqual(response);
    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/api/officials?zipCode=10001',
      expect.any(Object),
    );
  });
});

describe('web submit flow API client', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllGlobals();
    delete process.env.NEXT_PUBLIC_API_URL;
  });

  it('sends the anonymity choice with the backend submission field name', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 'sub-123',
        status: 'submitted',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { createSubmission } = await import('../apps/web/lib/api.js');
    await createSubmission({
      issueDescription: 'Traffic signals near the school are mistimed',
      desiredOutcome: 'Retune the crossing signals before the school year',
      zipCode: '10001',
      fullName: 'Riley Constituent',
      anonymous: false,
    });

    const requestBody = JSON.parse(String(fetchMock.mock.calls[0][1]?.body));
    expect(requestBody).toEqual({
      issueDescription: 'Traffic signals near the school are mistimed',
      desiredOutcome: 'Retune the crossing signals before the school year',
      zipCode: '10001',
      isAnonymous: false,
    });
  });

  it('maps UI checkout tier names to the payment API contract', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        checkoutUrl: 'https://checkout.stripe.test/session',
        sessionId: 'cs_test_123',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { createPaymentSession } = await import('../apps/web/lib/api.js');
    await createPaymentSession('sub-123', 'all');

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:3001/api/submissions/sub-123/pay',
      expect.objectContaining({
        body: JSON.stringify({ tier: 'full_spread' }),
        credentials: 'include',
      }),
    );
  });

  it('normalizes raw research job status for the wizard', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        submissionId: 'sub-123',
        jobId: 'job-123',
        status: 'payment_pending',
        clientStatus: 'ready',
        progress: 100,
        message: 'Letters ready for review',
        research: {
          stage: 'ready',
          label: 'Letters ready for review',
          progress: 100,
        },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { getResearchStatus } = await import('../apps/web/lib/api.js');

    await expect(getResearchStatus('sub-123')).resolves.toEqual({
      status: 'ready',
      progress: 100,
      message: 'Letters ready for review',
    });
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
