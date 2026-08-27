# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-03 — v3 thesis revision block appended; v2.1 baseline preserved above)

> **v3 thesis pivot in flight — 2026-06-03 (issue #12).** v2.1 Phases 1–4 shipped; v3 adds Phases 5–8 (Cause Board MVP → Crowdfunding & Escrow → Threshold-Triggered Multi-Channel Dispatch → SEO/Share + Cause-Author Dashboard) per `MASTER_PLAN.md` v3.0 §18 and §24. Conditional-GO gated on six pre-launch guardrails (Stripe Connect AUP, Lob AUP, platform-owns-funds posture, constituent-to-elected-official policy, named-individual review, per-jurisdiction lobbying logic). v3 BUILD slices follow as separately decomposed handshake issues.

**Core value (v3):** A community-funded civic-action board where anyone can post a cause, others sign and share, contributions pool against a vendor-cost-plus-platform-fee threshold, and dispatch fires automatically as researched/cited mail + email to the right officials. Platform fee on contributions. v2.1 single-buyer paid-letter path preserved as legacy secondary route.
**Core value (v2.1 legacy):** AI-powered regulation research with verified legal citations, automatic official targeting from ZIP code, and one-click transactional delivery — the full pipeline from civic frustration to official action, accessible to any individual for $5-$25. Preserved verbatim.
**Current focus:** v3 thesis revision complete (issue #12, this commit); Phase 5 (Cause Board MVP) is next BUILD slice.

## Current Position

Phase: 4 of 4 (v2.1) Complete; v3 Phase 5 of 8 (Cause Board MVP) is next
Plan: v2.1 7/7 (Phase 1) + 6/6 (Phase 2) + 4/4 (Phase 3) + 3/3 (Phase 4) = 20/20 v2.1 plans complete; v3 plans not yet authored
Status: v2.1 BUILD complete; v3 thesis pivot landed 2026-06-03
Last activity: 2026-06-03 — v3 MASTER_PLAN.md authored (issue #12 — community-funded civic-action board)
Last v2.1 activity: 2026-04-25 — Plan 04-03 complete (Legal compliance)

Progress (v2.1): [██████████] 100% (Phases 1–4 shipped)
Progress (v3):   [▒▒▒▒▒▒▒▒▒▒]   5% (thesis revision authored; Phase 5 BUILD not yet started)

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

Last session: 2026-06-03 — v3 thesis revision (issue #12)
Stopped at: v3 MASTER_PLAN.md + .planning/{PROJECT,REQUIREMENTS,ROADMAP,STATE,existing-state}.md all updated for the community-funded civic-action board pivot. v3 Phase 5–8 roadmap drafted; decomposed handshake-issue table in MASTER_PLAN.md §18.x. Pre-launch guardrails (§24) documented but not yet cleared.
Resume file: operator/orchestrator opens decomposed v3 BUILD handshake issues per MASTER_PLAN.md §18.x table; Phase 5 plans authored before Phase 5 BUILD slices start.

Last v2.1 session: 2026-04-25 — Plan 04-03 complete (Legal compliance); Phase 4 COMPLETE; v2.1 BUILD finished.
