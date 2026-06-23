# CivicState Roadmap

## Current State

As of 2026-06-23 [evidence: wrk.dog dispatch date], the repo contains a broad CivicState implementation surface: web app, API routes, worker agents, Prisma schema, Stripe route, Postmark delivery worker, dashboards, admin pages, and legal pages [evidence: apps/; evidence: packages/shared/prisma/schema.prisma]. The prior planning docs are inconsistent: .planning/ROADMAP.md marks four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while .planning/STATE.md says Phase 1 is complete and Phase 2 planning is needed [evidence: .planning/STATE.md].

This roadmap treats the business plan as the source of truth: validate the paid civic letter loop before expanding into SEO scale, community, certified mail, enterprise/API, or new platform rails.

## Existing Narrative Preserved

CivicState's original build narrative remains: turn civic concerns into researched, citation-backed letters delivered to government officials through a Next.js, Express, BullMQ, Prisma, Stripe, Postmark, Clerk, and Anthropic-powered workflow [evidence: MASTER_PLAN.md; evidence: .planning/PROJECT.md]. The plan still excludes legal advice, legal filings, community features, automated follow-up, certified mail, and API access from launch [evidence: .planning/GENESIS.md].

## Buildable Next

- [ ] **Thesis payment-loop validation:** fix the payment tier contract mismatch between `apps/web/lib/api.ts` and `apps/api/src/routes/payments.ts`, then run one preview-to-Stripe-session path locally.
- [ ] **Problem & Customer beta script:** create a manual beta checklist for the narrow ICP defined in BUSINESS.md and record why each participant would or would not pay.
- [ ] **Product & Moat official coverage spike:** replace the Cicero stub with either a manual verified local-contact path or a real provider decision, then document coverage limits.
- [ ] **Business Model unit economics check:** instrument one completed job for Stripe amount, token usage, delivery cost, and operator time so the $5/$15/$25 model can be reconciled with reality [evidence: apps/api/src/routes/payments.ts].
- [ ] **Go-To-Market launch cohort:** ship one issue/location landing path and measure preview completion, payment intent creation, and user trust objections.
- [ ] **Risks & Anti-Plan compliance review:** get operator/counsel review of legal-advice, lobbying, CAN-SPAM, AI disclosure, privacy, and moderation claims before public launch.
- [ ] **Assumption Ledger evidence pass:** update BUSINESS.md with live beta evidence or explicitly demote the asset to personal/research status.

## Deferred

- Community, coalition, search-before-create, public campaign archive scale, certified mail, fax, API consumers, nonprofit/HOA integrations, multilingual support, and managed platform migration stay deferred until the paid delivery loop is validated [evidence: .planning/GENESIS.md; evidence: MASTER_PLAN.md].
