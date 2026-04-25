# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-25)

**Core value:** AI-powered regulation research with verified legal citations, automatic official targeting from ZIP code, and one-click transactional delivery -- the full pipeline from civic frustration to official action, accessible to any individual for $5-$25.
**Current focus:** Phase 1: Foundation

## Current Position

Phase: 1 of 4 (Foundation)
Plan: 3 of 7 in current phase
Status: Executing
Last activity: 2026-04-25 -- Plan 01-03 (Docker Compose Stack) complete

Progress: [███░░░░░░░] 43%

## Performance Metrics

**Velocity:**
- Total plans completed: 3
- Average duration: 30 min
- Total execution time: 1.5 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 3 | 89 min | 30 min |

**Recent Trend:**
- Last 5 plans: 01-01 (49 min), 01-02 (37 min), 01-03 (3 min)
- Trend: Improving

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Domain warming (SPF/DKIM/DMARC + Postmark) must start in Phase 1 -- needs 2-4 weeks lead time before first user delivery in Phase 3
- COARSE granularity: 4 phases covering 80 requirements
- Split deployment: Next.js on Vercel, Express+Worker on DigitalOcean Docker Compose
- Removed deprecated baseUrl from tsconfig.base.json for TypeScript 6 compatibility
- Express type annotation required for cross-workspace type portability in TS6
- Approved build scripts for prisma, esbuild, sentry-cli, sharp, clerk, msgpackr-extract
- Prisma 7 requires prisma.config.ts for datasource URL (url no longer in schema.prisma)
- Prisma 7 requires @prisma/adapter-pg driver adapter instead of direct URL connection
- Generated Prisma client excluded from git (regenerated on install)
- PM2 fork mode (not cluster) in containers per RESEARCH anti-pattern guidance
- Nginx profiles used to disable nginx in dev mode (docker-compose.dev.yml)
- POSTGRES_PASSWORD uses required error syntax; other env vars default to blank

### Pending Todos

None yet.

### Blockers/Concerns

- Local officials API provider (Cicero vs BallotReady) needs evaluation spike in Phase 2
- Domain warming timeline: must complete before Phase 3 delivery begins

## Deferred Items

Items acknowledged and carried forward from previous milestone close:

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| *(none)* | | | |

## Session Continuity

Last session: 2026-04-25
Stopped at: Completed 01-03-PLAN.md (Docker Compose Stack)
Resume file: .planning/phases/01-foundation/01-04-PLAN.md
