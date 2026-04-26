/**
 * Tests for the curated state statute cache.
 *
 * Covers searchStateCache, getCachedStates, getCachedCategories, and
 * invariants (all entries verified: true) from
 * apps/worker/src/lib/legal/state-cache.ts.
 */

import { describe, it, expect } from 'vitest';
import {
  searchStateCache,
  getCachedStates,
  getCachedCategories,
} from '../apps/worker/src/lib/legal/state-cache.js';

describe('State Statute Cache', () => {
  // ─── searchStateCache ───────────────────────────────────────────────────────

  describe('searchStateCache', () => {
    it('returns results for known state + category (CA housing)', () => {
      const results = searchStateCache('CA', ['housing']);

      expect(results.length).toBeGreaterThan(0);
      results.forEach((entry) => {
        expect(entry.state).toBe('CA');
        expect(entry.category).toBe('housing');
      });
    });

    it('returns results for NY environment', () => {
      const results = searchStateCache('NY', ['environment']);

      expect(results.length).toBeGreaterThan(0);
      results.forEach((entry) => {
        expect(entry.state).toBe('NY');
        expect(entry.category).toBe('environment');
      });
    });

    it('returns results for TX public_safety', () => {
      const results = searchStateCache('TX', ['public_safety']);

      expect(results.length).toBeGreaterThan(0);
      results.forEach((entry) => {
        expect(entry.state).toBe('TX');
        expect(entry.category).toBe('public_safety');
      });
    });

    it('returns all statutes for a state when no categories specified', () => {
      const results = searchStateCache('CA');
      const housingResults = searchStateCache('CA', ['housing']);
      const envResults = searchStateCache('CA', ['environment']);
      const safetyResults = searchStateCache('CA', ['public_safety']);

      expect(results.length).toBe(
        housingResults.length + envResults.length + safetyResults.length,
      );
    });

    it('returns empty array for unknown state', () => {
      const results = searchStateCache('ZZ');
      expect(results).toEqual([]);
    });

    it('returns empty array for unknown state code', () => {
      const results = searchStateCache('XX', ['housing']);
      expect(results).toEqual([]);
    });

    it('returns empty array for unknown category in valid state', () => {
      const results = searchStateCache('CA', ['transportation']);
      expect(results).toEqual([]);
    });

    it('handles case-insensitive state codes', () => {
      const upper = searchStateCache('CA', ['housing']);
      const lower = searchStateCache('ca', ['housing']);

      expect(upper.length).toBe(lower.length);
      expect(upper.length).toBeGreaterThan(0);
    });

    it('handles multiple categories in a single query', () => {
      const results = searchStateCache('CA', ['housing', 'environment']);
      const housingOnly = searchStateCache('CA', ['housing']);
      const envOnly = searchStateCache('CA', ['environment']);

      expect(results.length).toBe(housingOnly.length + envOnly.length);
    });
  });

  // ─── Verified Invariant ─────────────────────────────────────────────────────

  describe('All cached entries have verified: true', () => {
    it('every CA entry is verified', () => {
      const results = searchStateCache('CA');
      expect(results.length).toBeGreaterThan(0);
      results.forEach((entry) => {
        expect(entry.verified).toBe(true);
      });
    });

    it('every NY entry is verified', () => {
      const results = searchStateCache('NY');
      expect(results.length).toBeGreaterThan(0);
      results.forEach((entry) => {
        expect(entry.verified).toBe(true);
      });
    });

    it('every TX entry is verified', () => {
      const results = searchStateCache('TX');
      expect(results.length).toBeGreaterThan(0);
      results.forEach((entry) => {
        expect(entry.verified).toBe(true);
      });
    });

    it('all entries across all states have verified: true and source: state_cache', () => {
      const states = getCachedStates();
      for (const state of states) {
        const entries = searchStateCache(state);
        entries.forEach((entry) => {
          expect(entry.verified).toBe(true);
          expect(entry.source).toBe('state_cache');
        });
      }
    });
  });

  // ─── Cache Metadata ─────────────────────────────────────────────────────────

  describe('getCachedStates', () => {
    it('returns at least CA, NY, TX', () => {
      const states = getCachedStates();
      expect(states).toContain('CA');
      expect(states).toContain('NY');
      expect(states).toContain('TX');
    });
  });

  describe('getCachedCategories', () => {
    it('returns housing, environment, public_safety for CA', () => {
      const categories = getCachedCategories('CA');
      expect(categories).toContain('housing');
      expect(categories).toContain('environment');
      expect(categories).toContain('public_safety');
    });

    it('returns empty array for unknown state', () => {
      const categories = getCachedCategories('ZZ');
      expect(categories).toEqual([]);
    });
  });

  // ─── Entry Structure ────────────────────────────────────────────────────────

  describe('StateCacheEntry structure', () => {
    it('each entry has all required fields', () => {
      const results = searchStateCache('CA', ['housing']);
      expect(results.length).toBeGreaterThan(0);

      for (const entry of results) {
        expect(entry).toHaveProperty('state');
        expect(entry).toHaveProperty('category');
        expect(entry).toHaveProperty('statuteId');
        expect(entry).toHaveProperty('title');
        expect(entry).toHaveProperty('text');
        expect(entry).toHaveProperty('url');
        expect(entry).toHaveProperty('verified');
        expect(entry).toHaveProperty('source');
        expect(typeof entry.state).toBe('string');
        expect(typeof entry.category).toBe('string');
        expect(typeof entry.statuteId).toBe('string');
        expect(typeof entry.title).toBe('string');
        expect(typeof entry.text).toBe('string');
        expect(typeof entry.url).toBe('string');
      }
    });
  });
});
