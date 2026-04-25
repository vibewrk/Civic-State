# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-25)

**Core value:** AI-powered regulation research with verified legal citations, automatic official targeting from ZIP code, and one-click transactional delivery -- the full pipeline from civic frustration to official action, accessible to any individual for $5-$25.
**Current focus:** Phase 1: Foundation

## Current Position

Phase: 1 of 4 (Foundation)
Plan: 7 of 7 in current phase (COMPLETE)
Status: Phase 1 Complete
Last activity: 2026-04-25 -- Plan 01-07 (CI/CD + Backup + DNS + Submissions) complete

Progress: [██████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 7
- Average duration: 15 min
- Total execution time: 1.82 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-foundation | 7 | 106 min | 15 min |

**Recent Trend:**
- Last 5 plans: 01-03 (3 min), 01-06 (4 min), 01-04 (6 min), 01-05 (3 min), 01-07 (4 min)
- Trend: Stable

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Replaced template ci.yml with application-level CI (pnpm + Prisma + typecheck + test)
- Test submission endpoint uses placeholder user with upsert to satisfy FK constraint
- Zod v4 uses .issues not .errors for validation error details
- Domain warming (SPF/DKIM/DMARC + Postmark) must start in Phase 1 -- needs 2-4 weeks lead time before first user delivery in Phase 3
- COARSE granularity: 4 phases covering 80 requirements
- Split deployment: Next.js on Vercel, Express+Worker on DigitalOcean Docker Compose
- Removed deprecated baseUrl from tsconfig.base.json for TypeScript 6 compatibility
- Express type annotation required for cross-workspace type portability in TS6
- Express type annotation required for clerkAuth (RequestHandler) and router (IRouter) for TypeScript 6 portability
- Approved build scripts for prisma, esbuild, sentry-cli, sharp, clerk, msgpackr-extract
- Tailwind v4 CSS-first config with @theme block (not tailwind.config.ts)
- HSL CSS custom properties for shadcn/ui (raw CSS, not @apply for base styles)
- TypeScript 6 CSS module declaration for side-effect imports
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
Stopped at: Completed 01-07-PLAN.md (CI/CD + Backup + DNS + Submissions) -- Phase 1 COMPLETE
Resume file: .planning/phases/02-ai-pipeline/ (Phase 2 planning needed)
