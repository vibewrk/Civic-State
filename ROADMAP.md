# Roadmap: CivicState Soul-Aligned Validation

Updated: 2026-06-20 [evidence: system current date]

## Context

This roadmap preserves the existing build narrative: CivicState is a monorepo with a Next.js web app, Express API, worker agents, Prisma/PostgreSQL data model, Stripe payments, Postmark delivery intent, moderation, and admin surfaces [evidence: .planning/ROADMAP.md; package.json; apps/; packages/shared/prisma/schema.prisma]. The prior `.planning/ROADMAP.md` says all phases are complete [evidence: .planning/ROADMAP.md], while `.planning/STATE.md` says Phase 1 is complete and Phase 2 planning is next [evidence: .planning/STATE.md]. This root roadmap resolves that mismatch by focusing the next work on validation gates rather than feature-count completion.

## Existing Narrative To Keep

- Foundation: monorepo, shared TypeScript, database, auth, CI/CD, Docker, Redis/BullMQ, and agent state machine [evidence: .planning/ROADMAP.md; package.json; apps/worker/src/engine/state-machine.ts].
- AI pipeline: issue submission, official lookup, legal-source research, citation verification, drafting, and moderation [evidence: .planning/ROADMAP.md; apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/worker/src/agents/researcher.ts].
- Payment and delivery: fixed Stripe tiers, webhook flow, delivery agent, bounce/complaint concepts, and treasury ledger [evidence: .planning/ROADMAP.md; apps/api/src/routes/payments.ts; packages/shared/prisma/schema.prisma].
- Dashboard and compliance: user campaign tracking, admin tools, legal pages, audit logs, and deletion/retention concepts [evidence: .planning/ROADMAP.md; apps/api/src/routes/campaigns.ts; apps/api/src/routes/admin.ts; apps/api/src/routes/compliance.ts].

## Now / Next

- [ ] **Snapshot Thesis:** settle the public identity mismatch between `brooks-history`, `brookss-history`, and CivicState in the root docs and wrk.vc dossier [evidence: registry dispatch; package.json; BUSINESS.md].
- [ ] **Product Reality:** run an end-to-end local or staging submission through preview, payment, webhook, job transition, and delivery status recording [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts; apps/worker/src/engine/state-machine.ts].
- [ ] **Customer Definition:** define the first beta cohort, excluded use cases, and manual review policy for legal-adjacent or unverifiable claims [evidence: BUSINESS.md; MASTER_PLAN.md; apps/api/src/lib/moderation.ts].
- [ ] **Revenue Model and Pricing:** add or document fee-inclusive margin checks for the $5, $15, and $25 tiers before public payments [evidence: apps/api/src/routes/payments.ts; BUSINESS.md].
- [ ] **Market Sizing:** instrument preview-to-paid conversion so the 3% gate can be measured instead of asserted [evidence: .planning/PROJECT.md; BUSINESS.md].
- [ ] **Go To Market:** run a one-metro beta with operator-recruited users before SEO expansion [assumption: controlled validation path; evidence: BUSINESS.md].
- [ ] **Risks and Anti-Plan:** complete an officials coverage spike covering federal/state/local contacts and explicitly resolve the Cicero/local stub [evidence: apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/congress.ts; BUSINESS.md].
- [ ] **Assumption Ledger:** create the beta scorecard for conversion, coverage, inbox placement, bounce/complaint rate, citation failures, review queue age, and campaign COGS [evidence: BUSINESS.md; packages/shared/prisma/schema.prisma].

## Later

- Public SEO campaign pages only after paid delivery works and privacy/anonymity controls are reviewed [assumption: sequencing; evidence: .planning/GENESIS.md; BUSINESS.md].
- Organization/API access only after the consumer pipeline has reliable unit economics and coverage data [evidence: .planning/PROJECT.md].
- Certified mail, fax, multilingual support, automated follow-ups, and community features remain out of launch scope [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

## Review Gate

Next roadmap review: 2026-07-05 [assumption: two-week validation cadence after the 2026-06-20 soul upgrade]. Operator merge, POM soul-review, and wrk.dog adoption remain separate from this proposed roadmap [evidence: registry dispatch].
