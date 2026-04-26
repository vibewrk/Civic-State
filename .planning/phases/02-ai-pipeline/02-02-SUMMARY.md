# 02-02 Officials Directory — Summary

**Status:** Complete
**Date:** 2026-04-25

## What was built

### Task 1: Officials lookup types (`packages/shared/src/types/index.ts`)
- Added `OfficialRecord` interface with all 12 fields (id, name, title, email, jurisdiction, level, district, state, party, phone, sourceApi, optedOut)
- Added `OfficialLookupResult` interface with officials array, coverage per level, and confidenceLabel string
- Types are re-exported via the shared package barrel export

### Task 2: Congress.gov API client (`apps/api/src/lib/officials/congress.ts`)
- ZIP to congressional district mapping via Census Bureau geocoder (`geocoding.geo.census.gov`)
- Congress.gov v3 API for member lookup (2 senators + 1 representative per district)
- Optional `CONGRESS_GOV_API_KEY` env var (works without, but rate-limited)
- Graceful error handling returning empty array on any failure
- 10s timeout on Census geocoder, 15s timeout on Congress API

### Task 3: OpenStates v3 API client (`apps/api/src/lib/officials/openstates.ts`)
- OpenStates v3 REST API integration for state legislators
- Requires `OPENSTATES_API_KEY` env var; graceful degradation without it
- ZIP-to-state mapping via prefix lookup table
- Returns state senators and representatives with office contact info
- 15s timeout on API calls

### Task 4: Cicero stub + unified lookup orchestrator
- **Cicero stub** (`apps/api/src/lib/officials/cicero.ts`): Placeholder returning empty array; ready for implementation when API key is provisioned
- **Lookup orchestrator** (`apps/api/src/lib/officials/lookup.ts`):
  - `lookupOfficials(zipCode)` runs all three sources in parallel via `Promise.all`
  - Returns unified `OfficialLookupResult` with coverage stats and confidence label (none/low/medium/high)
  - `cacheAndFilterOfficials()` upserts to PostgreSQL Official table using `findFirst` + create/update pattern (no compound unique constraint needed)
  - Filters opted-out officials from results

### Task 5: Officials API endpoint (`apps/api/src/routes/officials.ts`)
- `GET /api/officials?zipCode=12345` endpoint
- Rate limited to 100 requests per 15 minutes per IP via `express-rate-limit`
- ZIP code validation via Zod (5-digit format)
- Registered in `apps/api/src/index.ts` alongside existing routes
- Returns officials array, coverage breakdown, confidence label, and total count

## Dependencies added
- `express-rate-limit@^8.4.1` in `apps/api`

## Environment variables (optional/required)
| Variable | Required | Purpose |
|---|---|---|
| `CONGRESS_GOV_API_KEY` | Optional | Higher rate limits on Congress.gov API |
| `OPENSTATES_API_KEY` | Required for state data | OpenStates v3 API access |
| `CICERO_API_KEY` | Not yet | Local official lookup (stub) |

## Files changed/created
- `packages/shared/src/types/index.ts` — added OfficialRecord, OfficialLookupResult interfaces
- `apps/api/src/lib/officials/congress.ts` — new (federal lookup)
- `apps/api/src/lib/officials/openstates.ts` — new (state lookup)
- `apps/api/src/lib/officials/cicero.ts` — new (local stub)
- `apps/api/src/lib/officials/lookup.ts` — new (orchestrator)
- `apps/api/src/routes/officials.ts` — new (API endpoint)
- `apps/api/src/index.ts` — registered officials route
- `apps/api/package.json` — added express-rate-limit dependency

## Verification
- TypeScript compilation passes with no errors
- All imports use ESM `.js` extensions per project convention
- Follows existing Express router patterns from `routes/submissions.ts`
- Prisma Official model fields match OfficialRecord interface
