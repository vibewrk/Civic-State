/**
 * eCFR API client — searches the Electronic Code of Federal Regulations
 * at eCFR.gov for relevant regulatory text.
 */

const ECFR_BASE_URL = 'https://www.ecfr.gov/api/versioner/v1';
const ECFR_SEARCH_URL = 'https://www.ecfr.gov/api/search/v1/results';

export interface ECFRResult {
  title: string;
  heading: string;
  text: string;
  url: string;
  cfrTitle: number;
  cfrPart: number;
  cfrSection: string;
  source: 'ecfr';
}

/**
 * Search the eCFR API for regulations matching a query.
 */
export async function searchECFR(
  query: string,
  issueCategories: string[] = [],
): Promise<ECFRResult[]> {
  const searchTerms = [query, ...issueCategories].join(' ');

  const params = new URLSearchParams({
    query: searchTerms,
    per_page: '10',
    page: '1',
  });

  try {
    const response = await fetch(`${ECFR_SEARCH_URL}?${params.toString()}`, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(15_000),
    });

    if (!response.ok) {
      console.error(`eCFR search failed: ${response.status} ${response.statusText}`);
      return [];
    }

    const data = (await response.json()) as {
      results?: Array<{
        full_text_excerpt?: string;
        headings?: { title?: string; subtitle?: string; section?: string };
        hierarchy?: { title?: string; part?: string; section?: string };
        starts_on?: string;
        structure_index?: string;
      }>;
    };

    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((r) => {
      const cfrTitle = parseInt(r.hierarchy?.title ?? '0', 10);
      const cfrPart = parseInt(r.hierarchy?.part ?? '0', 10);
      const cfrSection = r.hierarchy?.section ?? '';

      return {
        title: r.headings?.title ?? `${cfrTitle} CFR Part ${cfrPart}`,
        heading: r.headings?.section ?? r.headings?.subtitle ?? '',
        text: r.full_text_excerpt ?? '',
        url: `https://www.ecfr.gov/current/title-${cfrTitle}/part-${cfrPart}${cfrSection ? `/section-${cfrSection}` : ''}`,
        cfrTitle,
        cfrPart,
        cfrSection,
        source: 'ecfr' as const,
      };
    });
  } catch (err) {
    console.error('eCFR search error:', err instanceof Error ? err.message : err);
    return [];
  }
}

/**
 * Parse a CFR citation string like "42 CFR § 483.10" into components.
 */
function parseCFRCitation(citation: string): {
  title: number;
  part: number;
  section: string;
} | null {
  // Match patterns like "42 CFR § 483.10", "42 CFR 483.10", "42 C.F.R. § 483.10"
  const match = citation.match(
    /(\d+)\s+C\.?F\.?R\.?\s*§?\s*(\d+)(?:\.(\d+))?/i,
  );
  if (!match) return null;

  const title = parseInt(match[1], 10);
  const part = parseInt(match[2], 10);
  const section = match[3] ? `${match[2]}.${match[3]}` : match[2];

  return { title, part, section };
}

/**
 * Verify a CFR citation exists by checking the eCFR API.
 * Returns true if the citation resolves to an existing regulation.
 */
export async function verifyECFRCitation(citation: string): Promise<boolean> {
  const parsed = parseCFRCitation(citation);
  if (!parsed) return false;

  const url = `${ECFR_BASE_URL}/full/${new Date().toISOString().split('T')[0]}/title-${parsed.title}.json?part=${parsed.part}`;

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok;
  } catch {
    console.error(`eCFR verification failed for: ${citation}`);
    return false;
  }
}
