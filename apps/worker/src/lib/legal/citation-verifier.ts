/**
 * Fail-closed legal citation provenance validator.
 *
 * A citation is marked verified only when it is well-formed, canonicalized,
 * resolved through an authoritative source, fresh enough, and any supplied
 * quote matches the cited source text.
 */

import { verifyECFRCitation } from './ecfr.js';
import { verifyCourtListenerCitation } from './courtlistener.js';
import {
  findStateCacheEntry,
  STATE_CACHE_LAST_VERIFIED_AT,
} from './state-cache.js';

export type CitationSource =
  | 'ecfr'
  | 'courtlistener'
  | 'state_cache'
  | 'congress_bill'
  | 'official_record';

export type CitationQualityTier =
  | 'verified'
  | 'unverified'
  | 'stale'
  | 'malformed';

export interface Citation {
  text: string;
  source: CitationSource | string;
  /** Source-specific reference: CFR citation, case name, statute ID, bill ref, or official URL. */
  reference: string;
  /** The claim this citation is supposed to support. */
  claim?: string;
  /** Quoted text that must appear in the source when present. */
  quote?: string;
  /** Backward-compatible alias for quote. */
  quotedText?: string;
  /** Source text or excerpt used for quote matching. */
  sourceText?: string;
  /** Official source URL when the resolver or cache cannot supply one. */
  sourceUrl?: string;
  /** Timestamp for source freshness checks. */
  sourceLastVerifiedAt?: string;
  /** Backward-compatible source retrieval timestamp. */
  retrievedAt?: string;
}

export interface CitationEvidence {
  citationWellFormed: boolean;
  canonicalReference?: string;
  sourceResolved: boolean;
  sourceUrl?: string;
  sourceLastVerifiedAt?: string;
  checkedAt: string;
  quoteMatched?: boolean;
}

export interface VerifiedCitation extends Citation {
  verified: boolean;
  qualityTier: CitationQualityTier;
  canonicalId?: string;
  evidence: CitationEvidence;
  failureReasons: string[];
}

export interface VerificationSummary {
  verified: VerifiedCitation[];
  unverified: VerifiedCitation[];
  results: VerifiedCitation[];
  qualityCounts: Record<CitationQualityTier, number>;
  total: number;
  verifiedCount: number;
  unverifiedCount: number;
  /** True if every citation failed verification */
  allFailed: boolean;
  /** Always true: this verifier never promotes unknown evidence to verified. */
  failClosed: true;
}

export interface CitationProvenanceOptions {
  now?: Date;
  maxAgeDays?: number;
}

type CitationInput = Citation | Partial<Citation> | null | undefined;

interface CanonicalCitation {
  canonicalId: string;
  canonicalReference: string;
  sourceUrl?: string;
  sourceText?: string;
  sourceLastVerifiedAt?: string;
}

const DEFAULT_MAX_AGE_DAYS = 180;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Verify a single citation and return provenance evidence.
 */
export async function validateCitationProvenance(
  citationInput: CitationInput,
  options: CitationProvenanceOptions = {},
): Promise<VerifiedCitation> {
  const now = options.now ?? new Date();
  const maxAgeDays = options.maxAgeDays ?? DEFAULT_MAX_AGE_DAYS;
  const checkedAt = now.toISOString();
  const failureReasons: string[] = [];
  const citation = normalizeCitationInput(citationInput);

  const canonical = canonicalizeCitation(citation);
  if (!canonical) {
    return {
      ...citation,
      verified: false,
      qualityTier: 'malformed',
      evidence: {
        citationWellFormed: false,
        sourceResolved: false,
        checkedAt,
      },
      failureReasons: ['malformed_citation'],
    };
  }

  const evidence: CitationEvidence = {
    citationWellFormed: true,
    canonicalReference: canonical.canonicalReference,
    sourceResolved: false,
    sourceUrl: canonical.sourceUrl ?? citation.sourceUrl,
    sourceLastVerifiedAt:
      canonical.sourceLastVerifiedAt ??
      citation.sourceLastVerifiedAt ??
      citation.retrievedAt,
    checkedAt,
  };

  const sourceResolved = await resolveCitationSource(citation, canonical);
  evidence.sourceResolved = sourceResolved;
  if (!sourceResolved) {
    failureReasons.push('source_unresolved');
  }

  const quote = citation.quote ?? citation.quotedText;
  if (quote && quote.trim().length > 0) {
    const sourceText = canonical.sourceText;
    if (!sourceText) {
      evidence.quoteMatched = false;
      failureReasons.push('quote_source_missing');
    } else if (containsNormalized(sourceText, quote)) {
      evidence.quoteMatched = true;
    } else {
      evidence.quoteMatched = false;
      failureReasons.push('quote_mismatch');
    }
  }

  if (isStale(evidence.sourceLastVerifiedAt, now, maxAgeDays)) {
    failureReasons.push('stale_evidence');
  }

  const qualityTier = chooseQualityTier(failureReasons);

  return {
    ...citation,
    verified: qualityTier === 'verified',
    qualityTier,
    canonicalId: canonical.canonicalId,
    evidence,
    failureReasons,
  };
}

/**
 * Verify all citations in parallel using the appropriate verifier per source.
 */
export async function verifyCitations(
  citations: Citation[],
  options: CitationProvenanceOptions = {},
): Promise<VerificationSummary> {
  if (citations.length === 0) {
    return buildSummary([]);
  }

  const results = await Promise.all(
    citations.map((citation) => validateCitationProvenance(citation, options)),
  );

  return buildSummary(results);
}

function buildSummary(results: VerifiedCitation[]): VerificationSummary {
  const verified = results.filter((citation) => citation.verified);
  const unverified = results.filter((citation) => !citation.verified);
  const qualityCounts: Record<CitationQualityTier, number> = {
    verified: 0,
    unverified: 0,
    stale: 0,
    malformed: 0,
  };

  for (const result of results) {
    qualityCounts[result.qualityTier] += 1;
  }

  return {
    verified,
    unverified,
    results,
    qualityCounts,
    total: results.length,
    verifiedCount: verified.length,
    unverifiedCount: unverified.length,
    allFailed: verified.length === 0,
    failClosed: true,
  };
}

function normalizeCitationInput(citationInput: CitationInput): Citation {
  if (!citationInput || typeof citationInput !== 'object') {
    return { text: '', source: 'unknown', reference: '' };
  }

  return {
    text: typeof citationInput.text === 'string' ? citationInput.text : '',
    source:
      typeof citationInput.source === 'string'
        ? citationInput.source
        : 'unknown',
    reference:
      typeof citationInput.reference === 'string'
        ? citationInput.reference
        : '',
    claim:
      typeof citationInput.claim === 'string' ? citationInput.claim : undefined,
    quote:
      typeof citationInput.quote === 'string' ? citationInput.quote : undefined,
    quotedText:
      typeof citationInput.quotedText === 'string'
        ? citationInput.quotedText
        : undefined,
    sourceText:
      typeof citationInput.sourceText === 'string'
        ? citationInput.sourceText
        : undefined,
    sourceUrl:
      typeof citationInput.sourceUrl === 'string'
        ? citationInput.sourceUrl
        : undefined,
    sourceLastVerifiedAt:
      typeof citationInput.sourceLastVerifiedAt === 'string'
        ? citationInput.sourceLastVerifiedAt
        : undefined,
    retrievedAt:
      typeof citationInput.retrievedAt === 'string'
        ? citationInput.retrievedAt
        : undefined,
  };
}

function canonicalizeCitation(citation: Citation): CanonicalCitation | null {
  switch (citation.source) {
    case 'ecfr':
      return canonicalizeCfr(citation);
    case 'courtlistener':
      return canonicalizeCourtListener(citation);
    case 'state_cache':
      return canonicalizeStateCache(citation);
    case 'congress_bill':
      return canonicalizeCongressBill(citation);
    case 'official_record':
      return canonicalizeOfficialRecord(citation);
    default:
      return null;
  }
}

function canonicalizeCfr(citation: Citation): CanonicalCitation | null {
  const match = citation.reference
    .trim()
    .match(
      /^(\d+)\s+C\.?\s*F\.?\s*R\.?\s*(?:§|section)?\s*(\d+(?:\.[A-Za-z0-9().-]+)?)$/i,
    );
  if (!match) return null;

  const title = Number.parseInt(match[1], 10);
  const section = match[2];
  const part = section.split('.')[0];
  const canonicalReference = `${title} CFR § ${section}`;
  const suffix = section.includes('.')
    ? `section-${section}`
    : `part-${part}`;

  return {
    canonicalId: `cfr:title-${title}:section-${section}`,
    canonicalReference,
    sourceUrl: `https://www.ecfr.gov/current/title-${title}/${suffix}`,
  };
}

function canonicalizeCourtListener(
  citation: Citation,
): CanonicalCitation | null {
  const reference = citation.reference.trim().replace(/\s+/g, ' ');
  if (!reference) return null;

  const reporterMatch = reference.match(/^(\d+)\s+([A-Za-z][A-Za-z0-9.]*)\s+(\d+)$/);

  if (reporterMatch) {
    const [, volume, reporter, page] = reporterMatch;
    return {
      canonicalId: `courtlistener:reporter:${volume}-${reporter.toLowerCase().replace(/\./g, '')}-${page}`,
      canonicalReference: `${volume} ${reporter} ${page}`,
      sourceUrl: citation.sourceUrl,
      sourceLastVerifiedAt: citation.sourceLastVerifiedAt,
    };
  }

  return {
    canonicalId: `courtlistener:case:${slugify(reference)}`,
    canonicalReference: reference,
    sourceUrl: citation.sourceUrl,
    sourceLastVerifiedAt: citation.sourceLastVerifiedAt,
  };
}

function canonicalizeStateCache(citation: Citation): CanonicalCitation | null {
  const reference = citation.reference.trim().toUpperCase();
  const match = reference.match(/^([A-Z]{2})-([A-Z0-9]+)-([A-Z0-9.-]+(?:-[A-Z0-9.-]+)*)$/);
  if (!match) return null;

  const [, state, code, section] = match;
  const entry = findStateCacheEntry(reference);

  return {
    canonicalId: `state:${state}:${code}:${section}`,
    canonicalReference: reference,
    sourceUrl: entry?.url,
    sourceText: entry?.text,
    sourceLastVerifiedAt: STATE_CACHE_LAST_VERIFIED_AT,
  };
}

function canonicalizeCongressBill(citation: Citation): CanonicalCitation | null {
  const reference = citation.reference.trim().replace(/\s+/g, ' ');
  const match = reference.match(
    /^(H\.R\.|S\.|H\.J\.Res\.|S\.J\.Res\.|H\.Res\.|S\.Res\.)\s*(\d+)(?:\s*,?\s*(\d{3})(?:st|nd|rd|th)?\s+Cong\.?)?(?:\s*(?:§|section)\s*([A-Za-z0-9.-]+))?$/i,
  );
  if (!match) return null;

  const [, chamber, number, congress, section] = match;
  const chamberId = chamber.toLowerCase().replace(/\./g, '');
  const congressId = congress ? `:${congress}` : '';
  const sectionId = section ? `:section-${section}` : '';

  return {
    canonicalId: `congress-bill:${chamberId}-${number}${congressId}${sectionId}`,
    canonicalReference: reference,
    sourceUrl: citation.sourceUrl,
    sourceLastVerifiedAt: citation.sourceLastVerifiedAt ?? citation.retrievedAt,
  };
}

function canonicalizeOfficialRecord(citation: Citation): CanonicalCitation | null {
  const sourceUrl = citation.sourceUrl ?? citation.reference;
  if (!isOfficialSourceUrl(sourceUrl)) return null;

  return {
    canonicalId: `official-record:${new URL(sourceUrl).href}`,
    canonicalReference: new URL(sourceUrl).href,
    sourceUrl,
    sourceLastVerifiedAt: citation.sourceLastVerifiedAt ?? citation.retrievedAt,
  };
}

async function resolveCitationSource(
  citation: Citation,
  canonical: CanonicalCitation,
): Promise<boolean> {
  try {
    switch (citation.source) {
      case 'ecfr':
        return verifyECFRCitation(canonical.canonicalReference);
      case 'courtlistener':
        return verifyCourtListenerCitation(canonical.canonicalReference);
      case 'state_cache':
        return Boolean(findStateCacheEntry(citation.reference)?.verified);
      case 'congress_bill':
      case 'official_record':
        return false;
      default:
        return false;
    }
  } catch {
    return false;
  }
}

function chooseQualityTier(
  failureReasons: string[],
): CitationQualityTier {
  if (failureReasons.includes('malformed_citation')) return 'malformed';
  if (failureReasons.includes('stale_evidence')) return 'stale';
  if (failureReasons.length > 0) return 'unverified';
  return 'verified';
}

function isStale(
  sourceLastVerifiedAt: string | undefined,
  now: Date,
  maxAgeDays: number,
): boolean {
  if (!sourceLastVerifiedAt) return false;

  const timestamp = Date.parse(sourceLastVerifiedAt);
  if (Number.isNaN(timestamp)) return true;

  return now.getTime() - timestamp > maxAgeDays * DAY_MS;
}

function containsNormalized(sourceText: string, quote: string): boolean {
  return normalizeText(sourceText).includes(normalizeText(quote));
}

function normalizeText(value: string): string {
  return value
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function isOfficialSourceUrl(value: string | undefined): value is string {
  if (!value) return false;

  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.endsWith('.gov');
  } catch {
    return false;
  }
}
