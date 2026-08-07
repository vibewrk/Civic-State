/**
 * Tests for the researcher fail-closed human-review gate.
 *
 * The verifier itself is covered separately; this test covers the job-level
 * authority decision that prevents unverified research from reaching drafting.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  mockCallWithLogging,
  mockComputeRowHmac,
  mockJob,
  mockLogAgentAction,
  mockPrisma,
  mockSearchCourtListener,
  mockSearchECFR,
  mockSearchStateCache,
  mockTransitionJob,
  mockVerifyCitations,
} = vi.hoisted(() => {
  const job = {
    data: {
      submissionId: 'sub-1',
      jobId: 'job-1',
      concern: 'Unsafe crosswalks near the elementary school',
      state: 'CA',
      issueCategories: ['transportation', 'safety'],
    },
    updateData: vi.fn(),
  };

  return {
    mockCallWithLogging: vi.fn(),
    mockComputeRowHmac: vi.fn(() => 'mock-hmac-checksum'),
    mockJob: job,
    mockLogAgentAction: vi.fn(),
    mockPrisma: {
      $transaction: vi.fn(),
      auditLog: {
        create: vi.fn(),
      },
      job: {
        findFirst: vi.fn(),
      },
      submission: {
        findUnique: vi.fn(),
        update: vi.fn(),
      },
    },
    mockSearchCourtListener: vi.fn(),
    mockSearchECFR: vi.fn(),
    mockSearchStateCache: vi.fn(),
    mockTransitionJob: vi.fn(),
    mockVerifyCitations: vi.fn(),
  };
});

vi.mock('bullmq', () => ({
  Job: class MockJob {},
  Worker: vi.fn().mockImplementation(() => ({
    close: vi.fn(),
    name: 'researcher',
    on: vi.fn(),
  })),
}));

vi.mock('shared', () => ({
  computeRowHmac: mockComputeRowHmac,
  prisma: mockPrisma,
}));

vi.mock('shared/hmac', () => ({
  computeRowHmac: mockComputeRowHmac,
}));

vi.mock('../apps/worker/src/engine/connection.js', () => ({
  createRedisConnection: vi.fn(() => ({})),
}));

vi.mock('../apps/worker/src/engine/config.js', () => ({
  getAgentConfig: vi.fn(() => ({
    model: 'test-model',
    name: 'researcher',
    queue: 'researcher',
  })),
}));

vi.mock('../apps/worker/src/engine/state-machine.js', () => ({
  transitionJob: mockTransitionJob,
}));

vi.mock('../apps/worker/src/lib/logger.js', () => ({
  logAgentAction: mockLogAgentAction,
}));

vi.mock('../apps/worker/src/lib/anthropic.js', () => ({
  callWithLogging: mockCallWithLogging,
}));

vi.mock('../apps/worker/src/lib/legal/ecfr.js', () => ({
  searchECFR: mockSearchECFR,
}));

vi.mock('../apps/worker/src/lib/legal/courtlistener.js', () => ({
  searchCourtListener: mockSearchCourtListener,
}));

vi.mock('../apps/worker/src/lib/legal/state-cache.js', () => ({
  searchStateCache: mockSearchStateCache,
}));

vi.mock('../apps/worker/src/lib/legal/citation-verifier.js', () => ({
  verifyCitations: mockVerifyCitations,
}));

const { processJob } = await import('../apps/worker/src/agents/researcher.js');

describe('Researcher human-review gate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockJob.updateData.mockResolvedValue(undefined);
    mockLogAgentAction.mockResolvedValue(undefined);
    mockPrisma.$transaction.mockImplementation(async (callback) =>
      callback(mockPrisma),
    );
    mockPrisma.auditLog.create.mockResolvedValue({});
    mockPrisma.job.findFirst.mockResolvedValue({ id: 'job-1' });
    mockPrisma.submission.findUnique.mockResolvedValue({
      userId: 'user-1',
      status: 'submitted',
    });
    mockPrisma.submission.update.mockResolvedValue({ userId: 'user-1' });
    mockTransitionJob.mockResolvedValue(undefined);
  });

  function arrangeFabricatedCitationRun(): void {
    const failedCitation = {
      text: 'Imaginary Crosswalk Act',
      source: 'courtlistener',
      reference: 'Imaginary Crosswalk Act',
      verified: false,
      qualityTier: 'unverified',
      evidence: {
        citationWellFormed: true,
        canonicalReference: 'Imaginary Crosswalk Act',
        sourceResolved: false,
        checkedAt: '2026-08-07T00:00:00.000Z',
      },
      failureReasons: ['source_unresolved'],
    };

    mockSearchECFR.mockResolvedValue([]);
    mockSearchCourtListener.mockResolvedValue([]);
    mockSearchStateCache.mockResolvedValue([]);
    mockCallWithLogging.mockResolvedValue({
      text: JSON.stringify({
        summary: 'The model cited an authority that was not in search results.',
        citations: [
          {
            text: failedCitation.text,
            source: failedCitation.source,
            reference: failedCitation.reference,
          },
        ],
        researchBrief: 'Use the imaginary authority.',
        recommendedArguments: ['Cite the imaginary authority.'],
      }),
      inputTokens: 10,
      outputTokens: 20,
    });
    mockVerifyCitations.mockResolvedValue({
      verified: [],
      unverified: [failedCitation],
      results: [failedCitation],
      qualityCounts: {
        verified: 0,
        unverified: 1,
        stale: 0,
        malformed: 0,
      },
      total: 1,
      verifiedCount: 0,
      unverifiedCount: 1,
      allFailed: true,
      failClosed: true,
    });
  }

  it('flags the submission and stops before drafting when every citation fails verification', async () => {
    const failedCitation = {
      text: 'Fabricated crosswalk authority',
      source: 'courtlistener',
      reference: '999 Fake Reporter 123',
      verified: false,
      qualityTier: 'unverified',
      canonicalId: 'courtlistener:case:fabricated-crosswalk-authority',
      evidence: {
        citationWellFormed: true,
        canonicalReference: '999 Fake Reporter 123',
        sourceResolved: false,
        checkedAt: '2026-08-07T00:00:00.000Z',
      },
      failureReasons: ['source_unresolved'],
    };

    mockSearchECFR.mockResolvedValue([
      {
        title: 'Traffic control devices',
        heading: 'Crosswalk standards',
        cfrTitle: 23,
        cfrSection: '655.603',
        url: 'https://www.ecfr.gov/current/title-23/section-655.603',
        text: 'Official traffic control devices must conform to standards.',
      },
    ]);
    mockSearchCourtListener.mockResolvedValue([]);
    mockSearchStateCache.mockResolvedValue([]);
    mockCallWithLogging.mockResolvedValue({
      text: JSON.stringify({
        summary: 'The city may need to improve crosswalk controls.',
        citations: [
          {
            text: failedCitation.text,
            source: failedCitation.source,
            reference: failedCitation.reference,
          },
        ],
        researchBrief: 'Use the fabricated authority to draft the letter.',
        recommendedArguments: ['Cite the fabricated authority.'],
      }),
      inputTokens: 10,
      outputTokens: 20,
    });
    mockVerifyCitations.mockResolvedValue({
      verified: [],
      unverified: [failedCitation],
      results: [failedCitation],
      qualityCounts: {
        verified: 0,
        unverified: 1,
        stale: 0,
        malformed: 0,
      },
      total: 1,
      verifiedCount: 0,
      unverifiedCount: 1,
      allFailed: true,
      failClosed: true,
    });

    await processJob(mockJob as never);

    const expectedAuditDetails = {
      tier: 'flag',
      reason: 'citation_verification_failed',
      confidence: 1,
      citationsVerified: 0,
      citationsStripped: 1,
      totalCitations: 1,
      totalSourcesSearched: 1,
      citationQuality: {
        verified: 0,
        unverified: 1,
        stale: 0,
        malformed: 0,
      },
      citationFailures: [
        {
          source: 'courtlistener',
          reference: '999 Fake Reporter 123',
          qualityTier: 'unverified',
          failureReasons: ['source_unresolved'],
          evidence: {
            citationWellFormed: true,
            sourceResolved: false,
            quoteMatched: null,
          },
        },
      ],
      details:
        'All cited authorities failed provenance validation; submission requires human review before drafting.',
    };

    expect(mockJob.updateData).toHaveBeenCalledWith(
      expect.objectContaining({
        research: expect.objectContaining({
          needsHumanReview: true,
          citationsVerified: 0,
          citationsStripped: 1,
        }),
      }),
    );
    expect(mockPrisma.submission.update).toHaveBeenCalledWith({
      where: { id: 'sub-1' },
      data: { status: 'flagged' },
      select: { userId: true },
    });
    expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          userId: 'user-1',
          action: 'submission.flagged',
          resource: 'submission',
          resourceId: 'sub-1',
          hmacChecksum: 'mock-hmac-checksum',
          details: expectedAuditDetails,
        }),
      }),
    );
    expect(mockComputeRowHmac).toHaveBeenCalledWith({
      userId: 'user-1',
      action: 'submission.flagged',
      resource: 'submission',
      resourceId: 'sub-1',
      details: JSON.stringify(expectedAuditDetails),
    });
    expect(mockTransitionJob).toHaveBeenCalledWith(
      'job-1',
      'researching',
      'failed',
      'researcher',
    );
    expect(mockTransitionJob).not.toHaveBeenCalledWith(
      'job-1',
      'researching',
      'drafting',
      'researcher',
    );
  });

  it('continues to drafting when at least one citation passes verification', async () => {
    const verifiedCitation = {
      text: '23 CFR 655.603',
      source: 'ecfr',
      reference: '23 CFR § 655.603',
      verified: true,
      qualityTier: 'verified',
      canonicalId: 'cfr:title-23:section-655.603',
      evidence: {
        citationWellFormed: true,
        canonicalReference: '23 CFR § 655.603',
        sourceResolved: true,
        checkedAt: '2026-08-07T00:00:00.000Z',
      },
      failureReasons: [],
    };

    mockSearchECFR.mockResolvedValue([
      {
        title: 'Traffic control devices',
        heading: 'Crosswalk standards',
        cfrTitle: 23,
        cfrSection: '655.603',
        url: 'https://www.ecfr.gov/current/title-23/section-655.603',
        text: 'Official traffic control devices must conform to standards.',
      },
    ]);
    mockSearchCourtListener.mockResolvedValue([]);
    mockSearchStateCache.mockResolvedValue([]);
    mockCallWithLogging.mockResolvedValue({
      text: JSON.stringify({
        summary: 'The city may need to improve crosswalk controls.',
        citations: [
          {
            text: verifiedCitation.text,
            source: verifiedCitation.source,
            reference: verifiedCitation.reference,
          },
        ],
        researchBrief: 'Use the verified CFR authority to draft the letter.',
        recommendedArguments: ['Request MUTCD-compliant safety review.'],
      }),
      inputTokens: 10,
      outputTokens: 20,
    });
    mockVerifyCitations.mockResolvedValue({
      verified: [verifiedCitation],
      unverified: [],
      results: [verifiedCitation],
      qualityCounts: {
        verified: 1,
        unverified: 0,
        stale: 0,
        malformed: 0,
      },
      total: 1,
      verifiedCount: 1,
      unverifiedCount: 0,
      allFailed: false,
      failClosed: true,
    });

    await processJob(mockJob as never);

    expect(mockPrisma.submission.update).not.toHaveBeenCalled();
    expect(mockPrisma.auditLog.create).not.toHaveBeenCalled();
    expect(mockTransitionJob).toHaveBeenCalledWith(
      'job-1',
      'researching',
      'drafting',
      'researcher',
    );
  });

  it('flags the submission when search finds sources but research omits citations', async () => {
    mockSearchECFR.mockResolvedValue([
      {
        title: 'Traffic control devices',
        heading: 'Crosswalk standards',
        cfrTitle: 23,
        cfrSection: '655.603',
        url: 'https://www.ecfr.gov/current/title-23/section-655.603',
        text: 'Official traffic control devices must conform to standards.',
      },
    ]);
    mockSearchCourtListener.mockResolvedValue([]);
    mockSearchStateCache.mockResolvedValue([]);
    mockCallWithLogging.mockResolvedValue({
      text: JSON.stringify({
        summary: 'The city may need to improve crosswalk controls.',
        citations: [],
        researchBrief: 'Discuss crosswalk controls without citations.',
        recommendedArguments: ['Request MUTCD-compliant safety review.'],
      }),
      inputTokens: 10,
      outputTokens: 20,
    });
    mockVerifyCitations.mockResolvedValue({
      verified: [],
      unverified: [],
      results: [],
      qualityCounts: {
        verified: 0,
        unverified: 0,
        stale: 0,
        malformed: 0,
      },
      total: 0,
      verifiedCount: 0,
      unverifiedCount: 0,
      allFailed: true,
      failClosed: true,
    });

    await processJob(mockJob as never);

    expect(mockJob.updateData).toHaveBeenCalledWith(
      expect.objectContaining({
        research: expect.objectContaining({
          needsHumanReview: true,
          totalSourcesSearched: 1,
        }),
      }),
    );
    expect(mockPrisma.submission.update).toHaveBeenCalledWith({
      where: { id: 'sub-1' },
      data: { status: 'flagged' },
      select: { userId: true },
    });
    expect(mockPrisma.auditLog.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          details: expect.objectContaining({
            totalCitations: 0,
            totalSourcesSearched: 1,
            citationFailures: [],
            details:
              'Search found legal sources, but the research handoff contained no verifiable citations; submission requires human review before drafting.',
          }),
        }),
      }),
    );
    expect(mockTransitionJob).toHaveBeenCalledWith(
      'job-1',
      'researching',
      'failed',
      'researcher',
    );
    expect(mockTransitionJob).not.toHaveBeenCalledWith(
      'job-1',
      'researching',
      'drafting',
      'researcher',
    );
  });

  it('flags fabricated citations even when source search finds nothing', async () => {
    arrangeFabricatedCitationRun();

    await processJob(mockJob as never);

    expect(mockPrisma.submission.update).toHaveBeenCalledWith({
      where: { id: 'sub-1' },
      data: { status: 'flagged' },
      select: { userId: true },
    });
    expect(mockTransitionJob).toHaveBeenCalledWith(
      'job-1',
      'researching',
      'failed',
      'researcher',
    );
  });

  it('keeps the gate closed when flagged job handoff persistence fails', async () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    arrangeFabricatedCitationRun();
    mockJob.updateData.mockRejectedValueOnce(new Error('handoff write failed'));

    try {
      await expect(processJob(mockJob as never)).resolves.toBeUndefined();
    } finally {
      warnSpy.mockRestore();
    }

    expect(mockPrisma.submission.update).toHaveBeenCalledWith({
      where: { id: 'sub-1' },
      data: { status: 'flagged' },
      select: { userId: true },
    });
    expect(mockTransitionJob).toHaveBeenCalledWith(
      'job-1',
      'researching',
      'failed',
      'researcher',
    );
    expect(mockTransitionJob).not.toHaveBeenCalledWith(
      'job-1',
      'researching',
      'drafting',
      'researcher',
    );
    expect(mockLogAgentAction).toHaveBeenCalledWith(
      expect.objectContaining({
        jobId: 'job-1',
        result: expect.objectContaining({ needsHumanReview: true }),
      }),
    );
  });

  it.each([
    {
      caseName: 'the submission is already flagged',
      submission: { userId: 'user-1', status: 'flagged' },
      latestJob: { id: 'job-1' },
    },
    {
      caseName: 'a newer job exists for the submission',
      submission: { userId: 'user-1', status: 'submitted' },
      latestJob: { id: 'job-2' },
    },
  ])(
    'does not duplicate citation-review mutations when $caseName',
    async ({ submission, latestJob }) => {
      arrangeFabricatedCitationRun();
      mockPrisma.submission.findUnique.mockResolvedValue(submission);
      mockPrisma.job.findFirst.mockResolvedValue(latestJob);

      await processJob(mockJob as never);

      expect(mockPrisma.submission.update).not.toHaveBeenCalled();
      expect(mockPrisma.auditLog.create).not.toHaveBeenCalled();
      expect(mockTransitionJob).toHaveBeenCalledWith(
        'job-1',
        'researching',
        'failed',
        'researcher',
      );
      expect(mockTransitionJob).not.toHaveBeenCalledWith(
        'job-1',
        'researching',
        'drafting',
        'researcher',
      );
    },
  );

  it('continues to drafting when no sources and no citations are available', async () => {
    mockSearchECFR.mockResolvedValue([]);
    mockSearchCourtListener.mockResolvedValue([]);
    mockSearchStateCache.mockResolvedValue([]);
    mockCallWithLogging.mockResolvedValue({
      text: JSON.stringify({
        summary: 'No relevant legal authorities were found.',
        citations: [],
        researchBrief: 'No citation-backed research is available.',
        recommendedArguments: [],
      }),
      inputTokens: 10,
      outputTokens: 20,
    });
    mockVerifyCitations.mockResolvedValue({
      verified: [],
      unverified: [],
      results: [],
      qualityCounts: {
        verified: 0,
        unverified: 0,
        stale: 0,
        malformed: 0,
      },
      total: 0,
      verifiedCount: 0,
      unverifiedCount: 0,
      allFailed: true,
      failClosed: true,
    });

    await processJob(mockJob as never);

    expect(mockPrisma.submission.update).not.toHaveBeenCalled();
    expect(mockPrisma.auditLog.create).not.toHaveBeenCalled();
    expect(mockTransitionJob).toHaveBeenCalledWith(
      'job-1',
      'researching',
      'drafting',
      'researcher',
    );
  });
});
