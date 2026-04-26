# Plan 02-05 Summary: Drafter Agent + Research/Preview API

**Status:** Complete
**Date:** 2026-04-25

## What was built

### Task 1: Real Drafter Agent (`apps/worker/src/agents/drafter.ts`)

Replaced the mock drafter with a full Anthropic API integration:

- **LLM integration**: Uses `callWithLogging` with Sonnet 4.6 (temperature 0.4) to compose professional, citation-backed letters
- **Per-official personalization**: Iterates over matched officials, drafting a unique letter for each that references their title, jurisdiction, and authority
- **Research consumption**: Reads the research brief, verified citations, and recommended arguments stored on `job.data.research` by the upstream Researcher agent
- **Required disclosures in every letter**:
  - AI disclosure statement (California AI Transparency Law, SB 942)
  - CAN-SPAM footer with `[OPT_OUT_URL]` placeholder, physical address, and Message-ID compliance note
  - "Not legal advice" disclaimer
  - Anonymous letters signed as "A Concerned Constituent of [ZIP Code]"
- **Database records created**:
  - `Campaign` record linking submission to letters (with pricingTier, officialCount)
  - `Letter` records per official (content, officialId, campaignId, aiDisclosure=true)
- **State transitions**: `drafting` -> `payment_pending` on success; `drafting` -> `failed` if all letters fail
- **Graceful partial failure**: If one official's letter fails, remaining officials still get drafted; only transitions to `failed` if ALL drafts fail
- **Token logging**: Aggregates input/output tokens across all letter drafts for accurate cost tracking

### Task 2: Research Status + Letter Preview API (`apps/api/src/routes/submissions.ts`)

Added two new endpoints:

- **GET `/api/submissions/:id/research`**: Returns user-friendly research progress with stage mapping:
  - `submitted` -> "Queued for processing" (0%)
  - `classifying` -> "Classifying your concern" (20%)
  - `researching` -> "Researching regulations" (40%)
  - `drafting` -> "Drafting your letters" (70%)
  - `payment_pending`+ -> "Letters ready" (100%)
  - `failed` -> "Processing failed" (0%)

- **GET `/api/submissions/:id/preview`**: Returns letter previews for collapsible card UI:
  - Queries `Campaign -> Letters -> Officials` via Prisma includes
  - Each letter card contains: official info (name, title, party, jurisdiction), full letter content, AI disclosure text, disclaimer
  - Returns campaign metadata: pricingTier, officialCount, lettersCount, campaignStatus

## Files modified

| File | Change |
|------|--------|
| `apps/worker/src/agents/drafter.ts` | Replaced mock with real Anthropic API integration |
| `apps/api/src/routes/submissions.ts` | Added `/research` and `/preview` endpoints |

## Verification

- TypeScript compilation passes for both `apps/worker` and `apps/api`
- All ESM imports use `.js` extensions
- Follows existing patterns from classifier and researcher agents
