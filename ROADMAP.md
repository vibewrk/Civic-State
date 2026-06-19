# CivicState Roadmap

## Document Control

Updated 2026-06-19 [assumption: session date]. This roadmap merges the existing CivicState plan with the stricter business posture in BUSINESS.md. The repo planning files still matter, but they conflict on completion status: .planning/STATE.md says foundation only, while .planning/ROADMAP.md says all phases complete [evidence: .planning/STATE.md; .planning/ROADMAP.md].

## Existing Narrative To Preserve

CivicState's intended product loop remains: issue submission, official lookup, regulation and case-law research, citation verification, letter drafting, payment, delivery, dashboard tracking, admin review, and compliance support [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; MASTER_PLAN.md].

The implementation now has real parts: API routes, worker agents, Prisma models, payment and delivery hooks, official lookup clients, moderation, admin routes, and tests [evidence: apps/api/src; apps/worker/src; packages/shared/prisma/schema.prisma; tests].

## Roadmap Principle

The next roadmap must serve the business plan, not the older build plan. The objective is not to add more scope; it is to convert the current research asset into an operator-validated civic delivery workflow with measured willingness-to-pay, deliverability, official coverage, and review load [assumption: EIR prioritization].

## Buildable Next

- [ ] Thesis Current: reconcile the project identity mismatch between brooks-history and CivicState in the operator-facing dossier [evidence: registry dispatch in worker brief; package.json].
- [ ] Product Evidence: run the API and worker locally, then record which submission-to-draft states actually execute without mocked services [assumption: local verification method].
- [ ] Revenue Model: exercise the $5/$15/$25 Stripe Checkout path in test mode and confirm the webhook advances campaigns to paid [evidence: apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts].
- [ ] Customer Definition: define the first manual beta segment and the exact civic issue categories allowed for launch [assumption: operator validation task].
- [ ] Market Sizing: replace placeholder TAM with a bottom-up beta ledger of contacted prospects, paid submissions, completed deliveries, and official replies [assumption: evidence-building method].
- [ ] Risks And Anti-Plan: fix the compliance export schema mismatch before claiming CCPA data export support [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].
- [ ] Go To Market: instrument official lookup coverage, bounce rate, spam complaint rate, and review queue depth before any SEO/public-campaign launch [evidence: apps/api/src/lib/officials/lookup.ts; apps/worker/src/agents/delivery.ts; apps/api/src/routes/admin.ts].
- [ ] Assumption Ledger: add an operator validation log after the first paid end-to-end delivery [assumption: gating milestone].

## Deferred Until Evidence Exists

- Public campaign SEO pages remain deferred until privacy, defamation, opt-in, and moderation workflows are proven [evidence: MASTER_PLAN.md; .planning/GENESIS.md].
- Organization/API revenue remains deferred until the individual constituent workflow works repeatably [evidence: .planning/REQUIREMENTS.md].
- Certified mail, fax, multilingual support, public community features, and automated follow-up remain out of launch scope [evidence: .planning/REQUIREMENTS.md; MASTER_PLAN.md].
