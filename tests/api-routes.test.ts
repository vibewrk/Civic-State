/**
 * Tests for API route handlers.
 *
 * Covers POST /api/submissions, GET /api/submissions/:id/research,
 * GET /api/submissions/:id/preview, and GET /api/officials.
 *
 * All external dependencies (Prisma, BullMQ, Clerk, Redis) are mocked.
 *
 * Note: The Anthropic SDK cannot be cleanly mocked from root vitest context
 * (pnpm module isolation). Tests that exercise moderation use inputs that
 * trigger the blocklist (Tier 1) directly, or accept the LLM fail-safe
 * behavior (flag for human review when no API key is set).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';

// ─── Mocks ────────────────────────────────────────────────────────────────────

// Mock Prisma via shared
const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
  submission: {
    create: vi.fn(),
  },
  job: {
    create: vi.fn(),
    findFirst: vi.fn(),
  },
  campaign: {
    findMany: vi.fn(),
  },
  auditLog: {
    create: vi.fn(),
  },
  official: {
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

vi.mock('shared', () => ({
  prisma: mockPrisma,
}));

vi.mock('shared/hmac', () => ({
  computeRowHmac: vi.fn(() => 'mock-hmac-checksum'),
}));

// Mock Clerk auth
vi.mock('@clerk/express', () => ({
  getAuth: vi.fn(() => null),
  clerkMiddleware: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
}));

// Mock BullMQ Queue
vi.mock('bullmq', () => ({
  Queue: vi.fn(() => ({
    add: vi.fn(),
    close: vi.fn(),
  })),
}));

// Mock ioredis
vi.mock('ioredis', () => ({
  default: vi.fn(() => ({
    status: 'ready',
    disconnect: vi.fn(),
  })),
}));

// Mock express-rate-limit
vi.mock('express-rate-limit', () => ({
  default: vi.fn(() => (_req: unknown, _res: unknown, next: () => void) => next()),
}));

// Mock the officials lookup module
vi.mock('../apps/api/src/lib/officials/lookup.js', () => ({
  lookupOfficials: vi.fn(),
  cacheAndFilterOfficials: vi.fn(),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mockReq(overrides: Record<string, unknown> = {}) {
  return {
    body: {},
    params: {},
    query: {},
    ...overrides,
  };
}

function mockRes() {
  const res: Record<string, unknown> = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res;
}

/**
 * Extract the route handler callback from an Express Router.
 */
function findHandler(
  router: { stack?: Array<{ route?: { path: string; methods: Record<string, boolean>; stack: Array<{ handle: Function }> } }> },
  method: string,
  path: string,
): Function | undefined {
  for (const layer of router.stack ?? []) {
    if (
      layer.route &&
      layer.route.path === path &&
      layer.route.methods[method.toLowerCase()]
    ) {
      const handlers = layer.route.stack;
      return handlers[handlers.length - 1]?.handle;
    }
  }
  return undefined;
}

describe('API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPrisma.user.upsert.mockResolvedValue({
      id: '00000000-0000-0000-0000-000000000000',
    });
    mockPrisma.auditLog.create.mockResolvedValue({});
  });

  // ─── POST /api/submissions ──────────────────────────────────────────────────

  describe('POST /api/submissions', () => {
    it('returns 403 when moderation blocks content (blocklist match)', async () => {
      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'post', '/api/submissions');
      expect(handler).toBeDefined();

      const req = mockReq({
        body: {
          issueDescription: 'I will kill the senator for this decision',
          desiredOutcome: 'Make them pay for their decisions now',
          zipCode: '10001',
          isAnonymous: false,
        },
      });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: 'Submission rejected by content policy',
          reason: 'threat_of_violence',
        }),
      );
    });

    it('creates submission with flagged status when LLM unavailable', async () => {
      // Without API key, moderation falls through to LLM which fails -> flag
      mockPrisma.submission.create.mockResolvedValueOnce({
        id: 'sub-flagged',
        status: 'flagged',
      });

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'post', '/api/submissions');

      const req = mockReq({
        body: {
          issueDescription: 'The roads in my neighborhood need repair urgently',
          desiredOutcome: 'I want the city to repave the roads within 6 months',
          zipCode: '90210',
          isAnonymous: true,
        },
      });
      const res = mockRes();

      await handler!(req, res);

      // Without API key, content passes blocklist, LLM fails, falls back to flag
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'sub-flagged',
          status: 'flagged',
          message: 'Submission received and pending review',
        }),
      );
    });

    it('returns 400 for invalid submission body', async () => {
      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'post', '/api/submissions');

      const req = mockReq({
        body: {
          issueDescription: 'short', // too short (min 10)
          desiredOutcome: 'x',
          zipCode: 'bad',
        },
      });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Validation failed' }),
      );
    });

    it('validates zipCode format in submission', async () => {
      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'post', '/api/submissions');

      const req = mockReq({
        body: {
          issueDescription: 'Sufficient description of the issue at hand',
          desiredOutcome: 'A reasonable desired outcome for the issue',
          zipCode: 'ABCDE', // invalid
          isAnonymous: true,
        },
      });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('accepts ZIP+4 format in submission', async () => {
      // Submission schema accepts ZIP+4: /^\d{5}(-\d{4})?$/
      mockPrisma.submission.create.mockResolvedValueOnce({
        id: 'sub-zip4',
        status: 'flagged',
      });

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'post', '/api/submissions');

      const req = mockReq({
        body: {
          issueDescription: 'Sufficient description of a civic issue to test',
          desiredOutcome: 'A reasonable desired outcome for testing',
          zipCode: '90210-1234',
          isAnonymous: true,
        },
      });
      const res = mockRes();

      await handler!(req, res);

      // Should not fail validation (ZIP+4 accepted)
      expect(res.status).not.toHaveBeenCalledWith(400);
    });
  });

  // ─── GET /api/submissions/:id/research ──────────────────────────────────────

  describe('GET /api/submissions/:id/research', () => {
    it('returns research status with progress info', async () => {
      mockPrisma.job.findFirst.mockResolvedValueOnce({
        id: 'job-1',
        submissionId: 'sub-1',
        status: 'researching',
        createdAt: new Date('2026-01-01'),
        completedAt: null,
      });

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'get', '/api/submissions/:id/research');
      expect(handler).toBeDefined();

      const req = mockReq({ params: { id: 'sub-1' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          submissionId: 'sub-1',
          research: expect.objectContaining({
            stage: 'researching_regulations',
            label: 'Researching regulations',
            progress: 40,
          }),
        }),
      );
    });

    it('maps "drafting" status to 70% progress', async () => {
      mockPrisma.job.findFirst.mockResolvedValueOnce({
        id: 'job-2',
        submissionId: 'sub-2',
        status: 'drafting',
        createdAt: new Date('2026-01-01'),
        completedAt: null,
      });

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'get', '/api/submissions/:id/research');

      const req = mockReq({ params: { id: 'sub-2' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          research: expect.objectContaining({
            stage: 'drafting_letters',
            progress: 70,
          }),
        }),
      );
    });

    it('maps "payment_pending" status to 100% progress', async () => {
      mockPrisma.job.findFirst.mockResolvedValueOnce({
        id: 'job-3',
        submissionId: 'sub-3',
        status: 'payment_pending',
        createdAt: new Date('2026-01-01'),
        completedAt: null,
      });

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'get', '/api/submissions/:id/research');

      const req = mockReq({ params: { id: 'sub-3' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          research: expect.objectContaining({
            stage: 'ready',
            progress: 100,
          }),
        }),
      );
    });

    it('returns 404 when submission not found', async () => {
      mockPrisma.job.findFirst.mockResolvedValueOnce(null);

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'get', '/api/submissions/:id/research');

      const req = mockReq({ params: { id: 'nonexistent' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // ─── GET /api/submissions/:id/preview ───────────────────────────────────────

  describe('GET /api/submissions/:id/preview', () => {
    it('returns letter previews with proper structure', async () => {
      mockPrisma.campaign.findMany.mockResolvedValueOnce([
        {
          id: 'camp-1',
          status: 'pending_payment',
          pricingTier: 'three_pack',
          officialCount: 3,
          createdAt: new Date('2026-01-01'),
          letters: [
            {
              id: 'letter-1',
              status: 'draft',
              content: 'Dear Senator, I am writing about...',
              aiDisclosure: true,
              createdAt: new Date('2026-01-01'),
              official: {
                id: 'off-1',
                name: 'Jane Senator',
                title: 'U.S. Senator',
                email: 'jane@senate.gov',
                jurisdiction: 'CA (statewide)',
                level: 'federal',
                district: 'statewide',
                state: 'CA',
                party: 'Democrat',
              },
            },
          ],
        },
      ]);

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'get', '/api/submissions/:id/preview');
      expect(handler).toBeDefined();

      const req = mockReq({ params: { id: 'sub-1' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          submissionId: 'sub-1',
          campaignId: 'camp-1',
          lettersCount: 1,
          letters: expect.arrayContaining([
            expect.objectContaining({
              letterId: 'letter-1',
              official: expect.objectContaining({
                name: 'Jane Senator',
              }),
              content: expect.any(String),
              disclaimer: expect.any(String),
            }),
          ]),
        }),
      );
    });

    it('includes AI disclosure text when aiDisclosure is true', async () => {
      mockPrisma.campaign.findMany.mockResolvedValueOnce([
        {
          id: 'camp-2',
          status: 'paid',
          pricingTier: 'single',
          officialCount: 1,
          createdAt: new Date('2026-01-01'),
          letters: [
            {
              id: 'letter-2',
              status: 'approved',
              content: 'Letter content...',
              aiDisclosure: true,
              createdAt: new Date('2026-01-01'),
              official: {
                id: 'off-2',
                name: 'Rep Test',
                title: 'U.S. Representative',
                email: 'rep@house.gov',
                jurisdiction: 'CA-12',
                level: 'federal',
                district: '12',
                state: 'CA',
                party: 'Republican',
              },
            },
          ],
        },
      ]);

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'get', '/api/submissions/:id/preview');

      const req = mockReq({ params: { id: 'sub-2' } });
      const res = mockRes();

      await handler!(req, res);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseBody = (res.json as any).mock.calls[0][0];
      expect(responseBody.letters[0].aiDisclosure).toContain('artificial intelligence');
    });

    it('returns 404 when no campaign exists', async () => {
      mockPrisma.campaign.findMany.mockResolvedValueOnce([]);

      const submissionsRouter = (await import('../apps/api/src/routes/submissions.js')).default;
      const handler = findHandler(submissionsRouter, 'get', '/api/submissions/:id/preview');

      const req = mockReq({ params: { id: 'sub-no-campaign' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  // ─── GET /api/officials ─────────────────────────────────────────────────────

  describe('GET /api/officials', () => {
    it('validates ZIP code and returns officials', async () => {
      const { lookupOfficials, cacheAndFilterOfficials } = await import(
        '../apps/api/src/lib/officials/lookup.js'
      );

      vi.mocked(lookupOfficials).mockResolvedValueOnce({
        officials: [
          {
            name: 'Senator Test',
            title: 'U.S. Senator',
            email: 'test@senate.gov',
            jurisdiction: 'CA',
            level: 'federal' as const,
            district: 'statewide',
            state: 'CA',
            party: 'Independent',
            sourceApi: 'congress.gov',
          },
        ],
        coverage: { federal: 1, state: 0, local: 0 },
        confidenceLabel: 'medium',
      });

      vi.mocked(cacheAndFilterOfficials).mockResolvedValueOnce([
        {
          id: 'cached-1',
          name: 'Senator Test',
          title: 'U.S. Senator',
          email: 'test@senate.gov',
          jurisdiction: 'CA',
          level: 'federal' as const,
          district: 'statewide',
          state: 'CA',
          party: 'Independent',
          sourceApi: 'congress.gov',
        },
      ]);

      const officialsRouter = (await import('../apps/api/src/routes/officials.js')).default;
      const handler = findHandler(officialsRouter, 'get', '/api/officials');
      expect(handler).toBeDefined();

      const req = mockReq({ query: { zipCode: '90210' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          zipCode: '90210',
          count: 1,
          officials: expect.arrayContaining([
            expect.objectContaining({ name: 'Senator Test' }),
          ]),
        }),
      );
    });

    it('returns 400 for invalid ZIP code', async () => {
      const officialsRouter = (await import('../apps/api/src/routes/officials.js')).default;
      const handler = findHandler(officialsRouter, 'get', '/api/officials');

      const req = mockReq({ query: { zipCode: 'bad' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ error: 'Validation failed' }),
      );
    });

    it('returns 400 when zipCode query param is missing', async () => {
      const officialsRouter = (await import('../apps/api/src/routes/officials.js')).default;
      const handler = findHandler(officialsRouter, 'get', '/api/officials');

      const req = mockReq({ query: {} });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 400 for ZIP+4 format (officials route requires 5-digit)', async () => {
      const officialsRouter = (await import('../apps/api/src/routes/officials.js')).default;
      const handler = findHandler(officialsRouter, 'get', '/api/officials');

      const req = mockReq({ query: { zipCode: '90210-1234' } });
      const res = mockRes();

      await handler!(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});
