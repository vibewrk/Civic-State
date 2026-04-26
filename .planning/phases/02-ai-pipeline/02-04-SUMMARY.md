# Plan 02-04: Researcher Agent with Legal Database Integration

## Status: COMPLETE

## What was built

### Task 1: eCFR API Client
- **File:** `apps/worker/src/lib/legal/ecfr.ts`
- `searchECFR(query, issueCategories)` -- searches eCFR.gov search API, returns results with title, heading, text, URL, and parsed CFR title/part/section
- `verifyECFRCitation(citation)` -- parses CFR citation format (e.g., "42 CFR SS 483.10") and verifies via HEAD request to the versioner API
- 15-second timeout on searches, 10-second on verification

### Task 2: CourtListener API Client
- **File:** `apps/worker/src/lib/legal/courtlistener.ts`
- `searchCourtListener(query)` -- searches CourtListener REST API v4 for opinions, returns case name, citation, court, date, snippet, URL
- `verifyCourtListenerCitation(caseName)` -- verifies a case exists by exact-phrase search
- Supports optional `COURTLISTENER_API_KEY` env var for higher rate limits

### Task 3: Curated State Statute Cache
- **File:** `apps/worker/src/lib/legal/state-cache.ts`
- In-memory cache organized by state -> category -> statutes
- Pre-populated with real statute data for CA, NY, TX across housing, environment, public_safety
- `searchStateCache(state, categories)` -- returns matching statutes
- All entries have `verified: true` (pre-verified against official sources)

### Task 4: Citation Verification Pipeline
- **File:** `apps/worker/src/lib/legal/citation-verifier.ts`
- `verifyCitations(citations)` -- verifies all citations in parallel using source-appropriate verifier
- eCFR citations -> `verifyECFRCitation()`
- CourtListener citations -> `verifyCourtListenerCitation()`
- State cache citations -> pre-verified (always pass)
- Returns `VerificationSummary` with verified[], unverified[], counts, and `allFailed` flag

### Task 5: Real Researcher Agent
- **File:** `apps/worker/src/agents/researcher.ts` (replaced mock)
- Pipeline:
  1. Searches eCFR, CourtListener, state cache in parallel
  2. Builds structured context from all search results
  3. Calls Sonnet via `callWithLogging()` with system prompt that forbids hallucinated citations
  4. Parses structured JSON response with citations and research brief
  5. Verifies all citations via `verifyCitations()` (SUBM-07)
  6. Strips unverified citations from results (SUBM-07)
  7. Flags for human review if ALL citations fail (SUBM-08)
  8. Stores research data on `job.data` for downstream Drafter
  9. Transitions job: researching -> drafting

## Requirements covered
- **SUBM-07:** Unverified citations are stripped from research output
- **SUBM-08:** Jobs flagged for human review when all citations fail verification
- **AGNT-05/06:** Token usage and agent actions logged via `logAgentAction()`

## TypeScript
- All files compile cleanly with `tsc --noEmit`
- ESM imports with `.js` extensions throughout
