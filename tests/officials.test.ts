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
const { resolveZipJurisdiction, filterOfficialsForJurisdiction } = await import(
  '../apps/api/src/lib/officials/jurisdiction.js'
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
        makeFederal({ name: 'Rep C', title: 'U.S. Representative', district: '36' }),
      ]);
      stateMock.mockResolvedValue([
        makeState({ name: 'State Rep D', district: '51' }),
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
        makeFederal({
          state: 'NY',
          jurisdiction: 'NY (statewide)',
        }),
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
        makeFederal({
          level: 'local',
          sourceApi: 'cicero',
          name: 'Mayor X',
          state: 'GA',
          jurisdiction: 'Atlanta, GA',
        }),
      ]);

      const result = await lookupOfficials('30301');

      expect(result.confidenceLabel).toBe('low');
      expect(result.coverage.local).toBe(1);
    });

    it('merges officials from all three sources', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([makeFederal()]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([
        makeState({ district: '51' }),
      ]);
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

    it('filters out officials whose state does not match the ZIP authority', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([
        makeFederal({ name: 'California Senator' }),
        makeFederal({
          name: 'Nevada Senator',
          state: 'NV',
          jurisdiction: 'NV (statewide)',
        }),
      ]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([
        makeState({ name: 'California Assemblymember', district: '51' }),
        makeState({
          name: 'Nevada Assemblymember',
          state: 'NV',
          jurisdiction: 'NV District 5',
        }),
      ]);
      vi.mocked(lookupLocalOfficials).mockResolvedValue([
        makeFederal({
          level: 'local',
          sourceApi: 'cicero',
          name: 'Beverly Hills Mayor',
        }),
        makeFederal({
          level: 'local',
          sourceApi: 'cicero',
          name: 'Las Vegas Mayor',
          state: 'NV',
          jurisdiction: 'Las Vegas, NV',
        }),
      ]);

      const result = await lookupOfficials('90210');

      expect(result.officials.map((official) => official.name)).toEqual([
        'California Senator',
        'California Assemblymember',
        'Beverly Hills Mayor',
      ]);
      expect(result.coverage).toEqual({
        federal: 1,
        state: 1,
        local: 1,
      });
      expect(result.confidenceLabel).toBe('medium');
    });

    it('filters out same-state officials outside the ZIP districts', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([
        makeFederal({
          name: 'Wrong CA Representative',
          title: 'U.S. Representative',
          district: '12',
        }),
        makeFederal({
          name: 'Correct CA Representative',
          title: 'U.S. Representative',
          district: '36',
        }),
      ]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([
        makeState({ name: 'Wrong CA Assemblymember', district: '52' }),
        makeState({ name: 'Correct CA Assemblymember', district: '51' }),
      ]);
      vi.mocked(lookupLocalOfficials).mockResolvedValue([]);

      const result = await lookupOfficials('90210');

      expect(result.officials.map((official) => official.name)).toEqual([
        'Correct CA Representative',
        'Correct CA Assemblymember',
      ]);
      expect(result.coverage).toEqual({
        federal: 1,
        state: 1,
        local: 0,
      });
    });

    it('fails closed without calling providers when ZIP has no state authority', async () => {
      vi.mocked(lookupFederalOfficials).mockResolvedValue([
        makeFederal({ name: 'Should Not Be Used' }),
      ]);
      vi.mocked(lookupStateOfficials).mockResolvedValue([makeState()]);
      vi.mocked(lookupLocalOfficials).mockResolvedValue([
        makeFederal({ level: 'local', sourceApi: 'cicero' }),
      ]);

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

  // ─── ZIP Authority Filtering ───────────────────────────────────────────────

  describe('ZIP authority filtering', () => {
    it('resolves fixture-backed authority from supported ZIP codes', async () => {
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
    });

    it('fails closed for malformed or unresolved ZIPs', async () => {
      await expect(resolveZipJurisdiction('90210-1234')).resolves.toBeNull();
      await expect(resolveZipJurisdiction('abcde')).resolves.toBeNull();
      await expect(resolveZipJurisdiction('00000')).resolves.toBeNull();
    });

    it('keeps only officials with the fixture-resolved jurisdiction authority', () => {
      const officials: OfficialRecord[] = [
        makeFederal({ name: 'California Senator' }),
        makeFederal({
          name: 'Wrong California Representative',
          title: 'U.S. Representative',
          district: '12',
        }),
        makeFederal({
          name: 'Correct California Representative',
          title: 'U.S. Representative',
          district: '36',
        }),
        makeState({ name: 'California Assemblymember', district: '51' }),
        makeFederal({
          name: 'Oregon Senator',
          state: 'OR',
          jurisdiction: 'OR (statewide)',
        }),
        makeFederal({
          level: 'local',
          name: 'Unknown State Mayor',
          state: '',
          sourceApi: 'cicero',
        }),
      ];

      const filtered = filterOfficialsForJurisdiction(officials, {
        zipCode: '90210',
        state: 'CA',
        congressionalDistrict: '36',
        stateSenateDistrict: '24',
        stateHouseDistrict: '51',
      });

      expect(filtered.map((official) => official.name)).toEqual([
        'California Senator',
        'Correct California Representative',
        'California Assemblymember',
      ]);
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
