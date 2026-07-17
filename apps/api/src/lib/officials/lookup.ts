/**
 * Unified official lookup orchestrator.
 *
 * Runs federal, state, and local lookups in parallel and merges results
 * into a single OfficialLookupResult with coverage stats.
 */

import type { OfficialRecord, OfficialLookupResult, JurisdictionLevel } from 'shared';
import { lookupFederalOfficials } from './congress.js';
import { lookupStateOfficials } from './openstates.js';
import { lookupLocalOfficials } from './cicero.js';
import {
  filterOfficialsForJurisdiction,
  resolveZipJurisdiction,
} from './jurisdiction.js';

/**
 * Derive a confidence label from the coverage counts.
 */
function deriveConfidence(coverage: Record<JurisdictionLevel, number>): string {
  const total = coverage.federal + coverage.state + coverage.local;
  if (total === 0) return 'none';
  if (coverage.federal >= 2 && coverage.state >= 1) return 'high';
  if (coverage.federal >= 1 || coverage.state >= 1) return 'medium';
  return 'low';
}

function countCoverage(officials: OfficialRecord[]): Record<JurisdictionLevel, number> {
  const coverage: Record<JurisdictionLevel, number> = {
    federal: 0,
    state: 0,
    local: 0,
  };

  for (const official of officials) {
    coverage[official.level] += 1;
  }

  return coverage;
}

/**
 * Look up all officials for a ZIP code across federal, state, and local sources.
 * Runs all three API clients in parallel via Promise.all.
 */
export async function lookupOfficials(zipCode: string): Promise<OfficialLookupResult> {
  const jurisdiction = await resolveZipJurisdiction(zipCode);
  if (!jurisdiction) {
    const coverage = countCoverage([]);
    return {
      officials: [],
      coverage,
      confidenceLabel: deriveConfidence(coverage),
    };
  }

  const [federal, state, local] = await Promise.all([
    lookupFederalOfficials(zipCode, jurisdiction),
    lookupStateOfficials(zipCode, jurisdiction),
    lookupLocalOfficials(zipCode),
  ]);

  const officials = filterOfficialsForJurisdiction(
    [...federal, ...state, ...local],
    jurisdiction,
  );
  const coverage = countCoverage(officials);

  return {
    officials,
    coverage,
    confidenceLabel: deriveConfidence(coverage),
  };
}

/**
 * Cache officials in the PostgreSQL Official table and filter out opted-out officials.
 * Uses findFirst + create/update pattern since the Official model does not have
 * a compound unique constraint on email+level.
 */
export async function cacheAndFilterOfficials(
  officials: OfficialRecord[],
): Promise<OfficialRecord[]> {
  const { prisma } = await import('shared');
  const filtered: OfficialRecord[] = [];

  for (const official of officials) {
    // Skip officials with no email — we can't deliver to them anyway
    if (!official.email) {
      filtered.push(official);
      continue;
    }

    // Look up existing record by name + level + state (more reliable than email alone)
    const existing = await prisma.official.findFirst({
      where: {
        name: official.name,
        level: official.level,
        state: official.state,
      },
    });

    if (existing) {
      // Update if data changed
      await prisma.official.update({
        where: { id: existing.id },
        data: {
          title: official.title,
          email: official.email,
          jurisdiction: official.jurisdiction,
          district: official.district,
          party: official.party,
          phone: official.phone ?? null,
          sourceApi: official.sourceApi,
          lastVerifiedAt: new Date(),
        },
      });

      // Filter out opted-out officials
      if (existing.optedOut) continue;

      filtered.push({ ...official, id: existing.id, optedOut: existing.optedOut });
    } else {
      // Create new record
      const created = await prisma.official.create({
        data: {
          name: official.name,
          title: official.title,
          email: official.email,
          jurisdiction: official.jurisdiction,
          level: official.level,
          district: official.district,
          state: official.state,
          party: official.party,
          phone: official.phone ?? null,
          sourceApi: official.sourceApi,
        },
      });

      filtered.push({ ...official, id: created.id });
    }
  }

  return filtered;
}
