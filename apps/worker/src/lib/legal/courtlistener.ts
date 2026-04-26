/**
 * CourtListener API client — searches the CourtListener REST API v4
 * for case law relevant to civic submissions.
 *
 * API docs: https://www.courtlistener.com/help/api/rest/
 * Optional: set COURTLISTENER_API_KEY env var for higher rate limits.
 */

const CL_BASE_URL = 'https://www.courtlistener.com/api/rest/v4';

export interface CourtListenerResult {
  caseName: string;
  citation: string;
  court: string;
  dateFiled: string;
  snippet: string;
  url: string;
  source: 'courtlistener';
}

function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  const apiKey = process.env.COURTLISTENER_API_KEY;
  if (apiKey) {
    headers.Authorization = `Token ${apiKey}`;
  }

  return headers;
}

/**
 * Search CourtListener for case law matching a query.
 */
export async function searchCourtListener(
  query: string,
): Promise<CourtListenerResult[]> {
  const params = new URLSearchParams({
    q: query,
    type: 'o', // opinions
    order_by: 'score desc',
    page_size: '10',
  });

  try {
    const response = await fetch(
      `${CL_BASE_URL}/search/?${params.toString()}`,
      {
        headers: getHeaders(),
        signal: AbortSignal.timeout(15_000),
      },
    );

    if (!response.ok) {
      console.error(
        `CourtListener search failed: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const data = (await response.json()) as {
      results?: Array<{
        caseName?: string;
        citation?: Array<{ volume?: number; reporter?: string; page?: number }>;
        court?: string;
        court_citation_string?: string;
        dateFiled?: string;
        snippet?: string;
        absolute_url?: string;
        id?: number;
      }>;
    };

    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((r) => {
      const cite =
        r.citation && r.citation.length > 0
          ? `${r.citation[0].volume} ${r.citation[0].reporter} ${r.citation[0].page}`
          : r.court_citation_string ?? '';

      return {
        caseName: r.caseName ?? 'Unknown Case',
        citation: cite,
        court: r.court ?? '',
        dateFiled: r.dateFiled ?? '',
        snippet: r.snippet ?? '',
        url: r.absolute_url
          ? `https://www.courtlistener.com${r.absolute_url}`
          : `https://www.courtlistener.com/opinion/${r.id ?? 0}/`,
        source: 'courtlistener' as const,
      };
    });
  } catch (err) {
    console.error(
      'CourtListener search error:',
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}

/**
 * Verify that a case exists in CourtListener by searching for it.
 * Returns true if at least one matching result is found.
 */
export async function verifyCourtListenerCitation(
  caseName: string,
): Promise<boolean> {
  const params = new URLSearchParams({
    q: `"${caseName}"`,
    type: 'o',
    page_size: '1',
  });

  try {
    const response = await fetch(
      `${CL_BASE_URL}/search/?${params.toString()}`,
      {
        headers: getHeaders(),
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!response.ok) return false;

    const data = (await response.json()) as {
      count?: number;
      results?: unknown[];
    };

    return (data.count ?? data.results?.length ?? 0) > 0;
  } catch {
    console.error(`CourtListener verification failed for: ${caseName}`);
    return false;
  }
}
