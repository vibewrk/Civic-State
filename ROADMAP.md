# CivicState - Roadmap

**Document date:** 2026-06-19 [evidence: runner current_date].  
**Roadmap source:** merged from `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, `MASTER_PLAN.md`, and the current app structure [evidence: .planning/ROADMAP.md; evidence: .planning/REQUIREMENTS.md; evidence: MASTER_PLAN.md; evidence: apps].

## Current Narrative

CivicState is a civic-action workflow that turns a resident's issue description and ZIP code into researched, cited, official-targeted letters, then gates delivery behind payment [evidence: .planning/PROJECT.md; evidence: apps/api/src/routes/submissions.ts; evidence: apps/api/src/routes/payments.ts].

The previous roadmap marked Phase 1 through Phase 4 complete on 2026-04-25 [evidence: .planning/ROADMAP.md]. The current repo supports part of that claim because web, API, worker, database schema, payment, delivery, admin, compliance, and tests exist [evidence: apps; evidence: packages/shared/prisma/schema.prisma; evidence: tests]. It does not prove live production use, paid customers, or deliverability [evidence: .planning/existing-state.md].

The business plan now treats this as a watchlist research asset until operator validation, not a near-term investible BOS [evidence: dispatch registry notes].

## Built Shape

- Web: submit wizard, dashboard, admin surfaces, privacy, and terms [evidence: apps/web/app].
- API: submissions, officials, campaigns, payments, webhooks, admin, health, and compliance [evidence: apps/api/src/routes].
- Worker: classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src/agents].
- Data: Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, jobs, ledger, audit, and agent action logs [evidence: packages/shared/prisma/schema.prisma].
- Financial path: $5, $15, and $25 package tiers with Stripe Checkout and webhook-driven delivery [evidence: apps/api/src/routes/payments.ts; evidence: apps/api/src/routes/webhooks.ts].

## Roadmap Gate

Do not expand scope until three gates are measured:

- Willingness to pay: at least 3% conversion from qualified preview to payment [evidence: .planning/PROJECT.md].
- Deliverability: at least 85% inbox placement or delivered-state confidence for official email pilots [evidence: .planning/PROJECT.md].
- Official coverage: at least 95% federal/state and 60% local coverage before broad launch [evidence: .planning/PROJECT.md].

## Current Next

- [ ] **Thesis: operator business/no-business ruling** - add an operator decision by 2026-07-03 [assumption: two-week validation window] confirming whether CivicState remains a personal/research asset or becomes a business pitch [evidence: dispatch registry notes].
- [ ] **Problem & Customer: paid beta cohort** - recruit and instrument 100 target users [assumption: validation cohort size] across local civic issues, then record preview-to-payment conversion against the 3% gate [evidence: .planning/PROJECT.md].
- [ ] **Product & Moat: real-vs-aspirational audit** - update stale planning state so repo docs reflect the built web/API/worker shape and no longer claim zero application code [evidence: .planning/existing-state.md; evidence: apps].
- [ ] **Business Model: pricing reconciliation** - verify that the $5, $15, and $25 tiers cover Stripe, AI, delivery, refund, and review costs in the ledger path [evidence: apps/api/src/routes/payments.ts; evidence: apps/worker/src/agents/treasury.ts].
- [ ] **Competition: substitute test** - interview users who would otherwise use manual email, Resistbot, Change.org, LegalZoom, or enterprise advocacy tools, and capture why they would or would not pay [assumption: competitor set from business plan].
- [ ] **Go-To-Market: deliverability pilot** - run a controlled official-email pilot by 2026-08-14 [assumption: eight-week validation window] and compare bounce/spam/delivered outcomes to the 85% gate [evidence: .planning/PROJECT.md; evidence: apps/worker/src/agents/delivery.ts].
- [ ] **Risks & Anti-Plan: legal-adjacent review** - review terms, privacy, AI disclosure, moderation, and citation verification before any public launch [evidence: apps/web/app/terms/page.tsx; evidence: apps/web/app/privacy/page.tsx; evidence: apps/api/src/lib/moderation.ts; evidence: apps/worker/src/lib/legal/citation-verifier.ts].

## Deferred

- Certified mail and fax remain deferred until email-first delivery proves value [evidence: .planning/REQUIREMENTS.md].
- Organization/API revenue remains deferred until individual citizen workflow is validated [evidence: .planning/REQUIREMENTS.md].
- Publisher, Discovery Search, and broader coalition/community mechanics remain deferred until moderation and SEO evidence exists [evidence: .planning/GENESIS.md; evidence: MASTER_PLAN.md].

## Roadmap Operating Rule

The roadmap serves the business plan. Any new build item must map to a BUSINESS.md heading, name the evidence gap it closes, and be single-worker-sized.
