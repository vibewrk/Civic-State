/**
 * Tests for the researcher -> drafter handoff payload.
 *
 * Citation verifier tests cover provenance validation itself; these tests cover
 * what the drafter is allowed to see after mixed verification results.
 */

import { describe, expect, it, vi } from 'vitest';
import type {
  Citation,
  VerificationSummary,
  VerifiedCitation,
} from '../apps/worker/src/lib/legal/citation-verifier.js';

vi.mock('bullmq', () => ({
  Job: class MockJob {},
  Worker: vi.fn().mockImplementation(() => ({
    close: vi.fn(),
    name: 'researcher',
    on: vi.fn(),
  })),
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
  transitionJob: vi.fn(),
}));

vi.mock('../apps/worker/src/lib/logger.js', () => ({
  logAgentAction: vi.fn(),
}));

vi.mock('../apps/worker/src/lib/anthropic.js', () => ({
  callWithLogging: vi.fn(),
}));

vi.mock('../apps/worker/src/lib/legal/ecfr.js', () => ({
  searchECFR: vi.fn(),
}));

vi.mock('../apps/worker/src/lib/legal/courtlistener.js', () => ({
  searchCourtListener: vi.fn(),
}));

vi.mock('../apps/worker/src/lib/legal/state-cache.js', () => ({
  searchStateCache: vi.fn(),
}));

const { buildResearchHandoff } = await import(
  '../apps/worker/src/agents/researcher.js'
);

describe('Researcher handoff', () => {
  it('does not forward failed citation substance to the drafter', () => {
    const failedCitationText = 'Fabricated Wetlands Case v. City';
    const failedCitationReference = '999 Fake Reporter 123';
    const verifiedCitation: VerifiedCitation = {
      text: 'California Civil Code Section 1940',
      source: 'state_cache',
      reference: 'CA-CIV-1940',
      verified: true,
      qualityTier: 'verified',
      canonicalId: 'state:CA:CIV:1940',
      evidence: {
        citationWellFormed: true,
        canonicalReference: 'CA-CIV-1940',
        sourceResolved: true,
        checkedAt: '2026-07-17T00:00:00.000Z',
      },
      failureReasons: [],
    };
    const failedCitation: VerifiedCitation = {
      text: failedCitationText,
      source: 'courtlistener',
      reference: failedCitationReference,
      verified: false,
      qualityTier: 'unverified',
      canonicalId: 'courtlistener:case:fabricated-wetlands-case-v-city',
      evidence: {
        citationWellFormed: true,
        canonicalReference: failedCitationReference,
        sourceResolved: false,
        checkedAt: '2026-07-17T00:00:00.000Z',
      },
      failureReasons: ['source_unresolved'],
    };
    const verification: VerificationSummary = {
      verified: [verifiedCitation],
      unverified: [failedCitation],
      results: [verifiedCitation, failedCitation],
      qualityCounts: {
        verified: 1,
        unverified: 1,
        stale: 0,
        malformed: 0,
      },
      total: 2,
      verifiedCount: 1,
      unverifiedCount: 1,
      allFailed: false,
      failClosed: true,
    };
    const citations: Citation[] = [
      {
        text: verifiedCitation.text,
        source: verifiedCitation.source,
        reference: verifiedCitation.reference,
      },
      {
        text: failedCitationText,
        source: failedCitation.source,
        reference: failedCitationReference,
      },
    ];

    const handoff = buildResearchHandoff(
      {
        summary: `Raw summary cites ${failedCitationText} at ${failedCitationReference}.`,
        citations,
        researchBrief: `Raw brief cites ${failedCitationText} at ${failedCitationReference}.`,
        recommendedArguments: [
          `Draft argument using ${failedCitationText} at ${failedCitationReference}.`,
        ],
      },
      verification,
      {
        regulationsFound: 0,
        caseLawFound: 1,
        stateStatutesFound: 1,
        totalSourcesFound: 2,
      },
    );

    const drafterVisiblePayload = {
      researchBrief: handoff.researchBrief,
      summary: handoff.summary,
      recommendedArguments: handoff.recommendedArguments,
      citations: handoff.citations,
      citationProvenance: handoff.citationProvenance,
    };
    const failedProvenance = handoff.citationProvenance.results[1];

    expect(handoff.summary).not.toContain('Raw summary cites');
    expect(handoff.researchBrief).not.toContain('Raw brief cites');
    expect(handoff.recommendedArguments).toEqual([]);
    expect(handoff.citations).toEqual([
      {
        text: verifiedCitation.text,
        source: verifiedCitation.source,
        reference: verifiedCitation.reference,
      },
    ]);
    expect(JSON.stringify(drafterVisiblePayload)).not.toContain(
      failedCitationText,
    );
    expect(JSON.stringify(drafterVisiblePayload)).not.toContain(
      failedCitationReference,
    );
    expect(failedProvenance).not.toHaveProperty('text');
    expect(failedProvenance).not.toHaveProperty('reference');
    expect(failedProvenance).not.toHaveProperty('canonicalId');
    expect(failedProvenance.evidence).not.toHaveProperty('canonicalReference');
    expect(handoff.citationProvenance).toMatchObject({
      total: 2,
      verifiedCount: 1,
      unverifiedCount: 1,
      qualityCounts: {
        verified: 1,
        unverified: 1,
        stale: 0,
        malformed: 0,
      },
      results: [
        {
          index: 0,
          verified: true,
          qualityTier: 'verified',
          failureReasons: [],
        },
        {
          index: 1,
          verified: false,
          qualityTier: 'unverified',
          failureReasons: ['source_unresolved'],
        },
      ],
    });
  });
});
