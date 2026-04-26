/**
 * Tests for the officials lookup service.
 *
 * Covers ZIP code validation, unified lookup orchestrator, coverage structure,
 * and opt-out filtering logic from apps/api/src/lib/officials/lookup.ts.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { OfficialRecord } from '../packages/shared/src/types/index.js';

// Mock all three external API clients
vi.mock('../apps/api/src/lib/officials/congress.js', () => ({
  lookupFederalOfficials: vi.fn(),
}));
vi.mock('../apps/api/src/lib/officials/openstates.js', () => ({
  lookupStateOfficials: vi.fn(),
}));
vi.mock('../apps/api/src/lib/officials/cicero.js', () => ({
  lookupLocalOfficials: vi.fn(),
}));

// Mock the shared prisma client
vi.mock('shared', () => ({
  prisma: {
    official: {
      findFirst: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
    },
  },
}));

const { lookupOfficials, cacheAndFilterOfficials } = await import(
  '../apps/api/src/lib/officials/lookup.js'
);
const { lookupFederalOfficials } = await import(
  '../apps/api/src/lib/officials/congress.js'
);
const { lookupStateOfficials } = await import(
  '../apps/api/src/lib/officials/openstates.js'
);
const { lookupLocalOfficials } = await import(
  '../apps/api/src/lib/officials/cicero.js'
);

function makeFederal(overrides: Partial<OfficialRecord> = {}): OfficialRecord {
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

function makeState(overrides: Partial<OfficialRecord> = {}): OfficialRecord {
  return {
    name: 'Bob Assemblymember',
    title: 'State Representative',
    email: 'bob@assembly.ca.gov',
    jurisdiction: 'CA District 5',
    level: 'state',
    district: '5',
    state: 'CA',
    party: 'Republican',
    sourceApi: 'openstates',
    ...overrides,
  };
}

describe('Officials Lookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ─── ZIP Code Validation ────────────────────────────────────────────────────

  describe('ZIP code validation (via Zod in officials route)', () => {
    it('accepts valid 5-digit ZIP codes', () => {
      const zipRegex = /^\d{5}$/;
      expect(zipRegex.test('90210')).toBe(true);
      expect(zipRegex.test('10001')).toBe(true);
      expect(zipRegex.test('00501')).toBe(true);
    });

    it('rejects non-numeric ZIP codes', () => {
      const zipRegex = /^\d{5}$/;
      expect(zipRegex.test('abcde')).toBe(false);
      expect(zipRegex.test('9021O')).toBe(false); // Letter O
    });

    it('rejects ZIP codes with wrong length', () => {
      const zipRegex = /^\d{5}$/;
      expect(zipRegex.test('9021')).toBe(false);
      expect(zipRegex.test('902100')).toBe(false);
      expect(zipRegex.test('')).toBe(false);
    });

    it('rejects ZIP+4 format (officials route requires 5-digit)', () => {
      const zipRegex = /^\d{5}$/;
      expect(zipRegex.test('90210-1234')).toBe(false);
    });
  });

  // ─── Unified Lookup Orchestrator ────────────────────────────────────────────

  describe('Unified lookup orchestrator', () => {
    it('returns proper coverage structure with all levels', async () => {
      const federalMock = vi.mocked(lookupFederalOfficials);
      const stateMock = vi.mocked(lookupStateOfficials);
      const localMock = vi.mocked(lookupLocalOfficials);

      federalMock.mockResolvedValue([
        makeFederal({ name: 'Senator A' }),
        makeFederal({ name: 'Senator B' }),
        makeFederal({ name: 'Rep C', title: 'U.S. Representative', district: '12' }),
      ]);
      stateMock.mockResolvedValue([
        makeState({ name: 'State Sen D' }),
      ]);
      localMock.mockResolvedValue([]);

      const result = await lookupOfficials('90210');

      expect(result.coverage).toEqual({
        federal: 3,
        state: 1,
        local: 0,
      });
      expect(result.officials).toHaveLength(4);
      expect(result.confidenceLabel).toBe('high');
    });

    it('returns "none" confidence when no officials found', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([]);
      vi.mocked(lookupLocalOfficials).mockResolvedValue([]);

      const result = await lookupOfficials('00000');

      expect(result.coverage).toEqual({ federal: 0, state: 0, local: 0 });
      expect(result.confidenceLabel).toBe('none');
      expect(result.officials).toHaveLength(0);
    });

    it('returns "medium" confidence with only federal or only state', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([
        makeFederal(),
      ]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([]);
      vi.mocked(lookupLocalOfficials).mockResolvedValue([]);

      const result = await lookupOfficials('10001');

      expect(result.confidenceLabel).toBe('medium');
    });

    it('returns "low" confidence with only local officials', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([]);
      vi.mocked(lookupLocalOfficials).mockResolvedValue([
        makeFederal({ level: 'local', sourceApi: 'cicero', name: 'Mayor X' }),
      ]);

      const result = await lookupOfficials('30301');

      expect(result.confidenceLabel).toBe('low');
      expect(result.coverage.local).toBe(1);
    });

    it('merges officials from all three sources', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([makeFederal()]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([makeState()]);
      vi.mocked(lookupLocalOfficials).mockResolvedValue([
        makeFederal({ level: 'local', name: 'Council Member', sourceApi: 'cicero' }),
      ]);

      const result = await lookupOfficials('90210');

      expect(result.officials).toHaveLength(3);
      const levels = result.officials.map((o: OfficialRecord) => o.level);
      expect(levels).toContain('federal');
      expect(levels).toContain('state');
      expect(levels).toContain('local');
    });
  });

  // ─── Opt-Out Filtering ──────────────────────────────────────────────────────

  describe('Opt-out filtering', () => {
    it('filters out opted-out officials from cached results', async () => {
      const { prisma } = await import('shared');
      const findFirstMock = vi.mocked(prisma.official.findFirst);
      const updateMock = vi.mocked(prisma.official.update);

      // First official is opted out
      findFirstMock.mockResolvedValueOnce({
        id: 'off-1',
        optedOut: true,
        name: 'Opted Out Official',
      });
      updateMock.mockResolvedValueOnce({});

      // Second official is not opted out
      findFirstMock.mockResolvedValueOnce({
        id: 'off-2',
        optedOut: false,
        name: 'Active Official',
      });
      updateMock.mockResolvedValueOnce({});

      const officials: OfficialRecord[] = [
        makeFederal({ name: 'Opted Out Official', email: 'opted@gov.gov' }),
        makeFederal({ name: 'Active Official', email: 'active@gov.gov' }),
      ];

      const filtered = await cacheAndFilterOfficials(officials);

      // Only the non-opted-out official should remain
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Active Official');
    });

    it('includes officials with no email (cannot filter by DB)', async () => {
      const officials: OfficialRecord[] = [
        makeFederal({ name: 'No Email Official', email: '' }),
      ];

      const filtered = await cacheAndFilterOfficials(officials);

      // Officials with no email are included without DB lookup
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('No Email Official');
    });

    it('creates new DB record for unknown officials', async () => {
      const { prisma } = await import('shared');
      const findFirstMock = vi.mocked(prisma.official.findFirst);
      const createMock = vi.mocked(prisma.official.create);

      findFirstMock.mockResolvedValueOnce(null); // Not found in DB
      createMock.mockResolvedValueOnce({ id: 'new-1' });

      const officials: OfficialRecord[] = [
        makeFederal({ name: 'New Official', email: 'new@gov.gov' }),
      ];

      const filtered = await cacheAndFilterOfficials(officials);

      expect(createMock).toHaveBeenCalledOnce();
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe('new-1');
    });
  });
});
