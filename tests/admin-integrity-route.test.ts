import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const requireAuthHandler = vi.fn((_req: unknown, _res: unknown, next: () => void) => next());

  return {
    prisma: {
      ledgerEntry: {},
      auditLog: {},
      agentActionLog: {},
    },
    verifyPrismaAppendOnlyIntegrity: vi.fn(),
    requireAuthHandler,
    requireAdminHandler: vi.fn((_req: unknown, _res: unknown, next: () => void) => next()),
  };
});

vi.mock('shared', () => ({
  prisma: mocks.prisma,
}));

vi.mock('shared/append-only-integrity', () => ({
  verifyPrismaAppendOnlyIntegrity: mocks.verifyPrismaAppendOnlyIntegrity,
}));

vi.mock('../apps/api/src/middleware/auth.js', () => ({
  requireAdmin: mocks.requireAdminHandler,
}));

function mockReq(overrides: Record<string, unknown> = {}) {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    ...overrides,
  };
}

function mockRes() {
  const res: Record<string, unknown> = {};
  res.status = vi.fn(() => res);
  res.json = vi.fn(() => res);
  return res;
}

interface ExpressRoute {
  path: string;
  methods: Record<string, boolean>;
  stack: Array<{ handle: Function }>;
}

function findRoute(
  router: {
    stack?: Array<{
      route?: ExpressRoute;
    }>;
  },
  method: string,
  path: string,
): ExpressRoute | undefined {
  for (const layer of router.stack ?? []) {
    if (
      layer.route &&
      layer.route.path === path &&
      layer.route.methods[method.toLowerCase()]
    ) {
      return layer.route;
    }
  }
  return undefined;
}

async function getIntegrityRoute(): Promise<ExpressRoute> {
  const adminRouter = (await import('../apps/api/src/routes/admin.js')).default;
  const route = findRoute(adminRouter, 'get', '/api/admin/integrity/append-only');
  expect(route).toBeDefined();
  if (!route) {
    throw new Error('append-only integrity route not registered');
  }
  expect(route.stack.length).toBeGreaterThanOrEqual(3);
  // Clerk's package export is not intercepted by this workspace's Vitest resolver.
  // Clone the registered route and substitute only auth layers so tests still run
  // through the same middleware order instead of calling the terminal handler alone.
  return {
    ...route,
    stack: route.stack.map((layer, index) => ({
      ...layer,
      handle:
        index === 0
          ? mocks.requireAuthHandler
          : index === 1
            ? mocks.requireAdminHandler
            : layer.handle,
    })),
  };
}

async function invokeRoute(
  route: ExpressRoute,
  req: ReturnType<typeof mockReq>,
  res: ReturnType<typeof mockRes>,
) {
  const handlers = route.stack.map((layer) => layer.handle);

  async function invokeAt(index: number): Promise<void> {
    const handler = handlers[index];
    if (!handler) return;

    let nextCalled = false;
    let nextError: unknown;
    const next = (err?: unknown) => {
      nextCalled = true;
      nextError = err;
    };

    await handler(req, res, next);

    if (nextError) {
      throw nextError;
    }

    if (nextCalled) {
      await invokeAt(index + 1);
    }
  }

  await invokeAt(0);
}

describe('GET /api/admin/integrity/append-only', () => {
  beforeEach(() => {
    mocks.verifyPrismaAppendOnlyIntegrity.mockReset();
    mocks.requireAuthHandler.mockReset();
    mocks.requireAuthHandler.mockImplementation(
      (_req: unknown, _res: unknown, next: () => void) => next(),
    );
    mocks.requireAdminHandler.mockReset();
    mocks.requireAdminHandler.mockImplementation(
      (_req: unknown, _res: unknown, next: () => void) => next(),
    );
  });

  it('returns a clean append-only integrity report', async () => {
    const report = {
      ok: true,
      summary: {
        checkedRows: 3,
        verifiedRows: 3,
        failedRows: 0,
        failedTables: 0,
      },
      tables: [],
      scope: { complete: true, perTableLimit: null, truncatedTables: [] },
    };
    mocks.verifyPrismaAppendOnlyIntegrity.mockResolvedValueOnce(report);

    const route = await getIntegrityRoute();
    expect(route.stack.length).toBeGreaterThanOrEqual(3);

    const res = mockRes();
    await invokeRoute(route, mockReq(), res);

    expect(mocks.requireAuthHandler).toHaveBeenCalled();
    expect(mocks.requireAdminHandler).toHaveBeenCalled();
    expect(mocks.verifyPrismaAppendOnlyIntegrity).toHaveBeenCalledWith(mocks.prisma, {
      limit: undefined,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(report);
  });

  it('returns conflict when integrity verification fails', async () => {
    const report = {
      ok: false,
      summary: {
        checkedRows: 1,
        verifiedRows: 0,
        failedRows: 1,
        failedTables: 1,
      },
      tables: [
        {
          table: 'ledger_entries',
          status: 'failed',
          checkedRows: 1,
          verifiedRows: 0,
          failedRows: 1,
          failures: [{ rowId: 'ledger-1', reason: 'hmac_mismatch' }],
        },
      ],
      scope: { complete: true, perTableLimit: null, truncatedTables: [] },
    };
    mocks.verifyPrismaAppendOnlyIntegrity.mockResolvedValueOnce(report);

    const route = await getIntegrityRoute();

    const res = mockRes();
    await invokeRoute(route, mockReq(), res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(report);
  });

  it('passes a valid per-table limit through to the verifier', async () => {
    const report = {
      ok: false,
      summary: {
        checkedRows: 2,
        verifiedRows: 2,
        failedRows: 0,
        failedTables: 0,
      },
      tables: [],
      scope: {
        complete: false,
        perTableLimit: 2,
        truncatedTables: [{ table: 'ledger_entries', totalRows: 3, checkedRows: 2 }],
      },
    };
    mocks.verifyPrismaAppendOnlyIntegrity.mockResolvedValueOnce(report);

    const route = await getIntegrityRoute();
    const res = mockRes();
    await invokeRoute(route, mockReq({ query: { limit: '2' } }), res);

    expect(mocks.verifyPrismaAppendOnlyIntegrity).toHaveBeenCalledWith(mocks.prisma, {
      limit: 2,
    });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith(report);
  });

  it('rejects invalid limits before querying append-only tables', async () => {
    const route = await getIntegrityRoute();

    const res = mockRes();
    await invokeRoute(route, mockReq({ query: { limit: '0' } }), res);

    expect(mocks.verifyPrismaAppendOnlyIntegrity).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Validation failed',
      }),
    );
  });

  it('stops before verification when authentication fails', async () => {
    mocks.requireAuthHandler.mockImplementationOnce(
      (_req: unknown, res: ReturnType<typeof mockRes>) => {
        res.status(401).json({ error: 'Authentication required' });
      },
    );

    const route = await getIntegrityRoute();
    const res = mockRes();
    await invokeRoute(route, mockReq(), res);

    expect(mocks.requireAdminHandler).not.toHaveBeenCalled();
    expect(mocks.verifyPrismaAppendOnlyIntegrity).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('stops before verification when admin authorization fails', async () => {
    mocks.requireAdminHandler.mockImplementationOnce(
      (_req: unknown, res: ReturnType<typeof mockRes>) => {
        res.status(403).json({ error: 'Admin role required' });
      },
    );

    const route = await getIntegrityRoute();
    const res = mockRes();
    await invokeRoute(route, mockReq(), res);

    expect(mocks.requireAuthHandler).toHaveBeenCalled();
    expect(mocks.verifyPrismaAppendOnlyIntegrity).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it('returns unavailable when HMAC secret configuration is missing', async () => {
    mocks.verifyPrismaAppendOnlyIntegrity.mockRejectedValueOnce(
      new Error('HMAC_SECRET_KEY environment variable is required'),
    );

    const route = await getIntegrityRoute();
    const res = mockRes();
    await invokeRoute(route, mockReq(), res);

    expect(res.status).toHaveBeenCalledWith(503);
    expect(res.json).toHaveBeenCalledWith({
      error: 'Append-only integrity verification is unavailable',
      details: 'HMAC_SECRET_KEY environment variable is required',
    });
  });
});
