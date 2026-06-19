# CivicState Roadmap

As of 2026-06-19 [evidence: worker dispatch current_date], this root roadmap supersedes the stale planning-state conflict without deleting the existing narrative. The original planning roadmap says four implementation phases are complete [evidence: .planning/ROADMAP.md], while the project state file still says Phase 1 is current [evidence: .planning/STATE.md]. Treat both as historical planning evidence, not proof of market readiness.

## Existing Narrative

CivicState turns a civic concern into researched, citation-backed constituent letters delivered to government officials for a one-time fee [evidence: .planning/PROJECT.md]. The repo now contains a web app, Express API, BullMQ worker agents, Prisma schema, Stripe payment route, Postmark delivery agent, moderation path, officials lookup path, treasury logic, and tests [evidence: package.json; packages/shared/prisma/schema.prisma; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts; tests/*.test.ts].

The old roadmap optimized for shipping the product surface. The new roadmap must serve the business plan: prove whether this is a business, a personal/research civic asset, or a useful but non-investible demo [evidence: registry dispatch; BUSINESS.md].

## Now / Next

- [ ] Snapshot Thesis: get an operator ruling on whether `brooks-history` should pitch CivicState as a business or remain a watchlist personal/research asset.
- [ ] Product Reality: remove or production-gate the unauthenticated test-user fallback and test Postmark endpoint before any public beta.
- [ ] Customer Definition: define the first beta cohort and excluded use cases in the submission flow and operator review checklist.
- [ ] Market Sizing: build a beta scorecard for preview-to-paid conversion, channel source, issue category, and paid package mix.
- [ ] Revenue Model and Pricing: add campaign-level COGS and fee reconciliation so the $5/$15/$25 tiers can be tested against the 40% margin floor [evidence: apps/api/src/routes/payments.ts; .planning/PROJECT.md].
- [ ] Go To Market: run a single-metro beta before SEO/public campaign expansion.
- [ ] Risks and Anti-Plan: complete the local-official provider spike and document federal/state/local coverage gaps across a ZIP-code sample.
- [ ] Milestones and Gates: instrument delivery acceptance, bounce rate, response rate, chargebacks, and flagged-queue age for the 2026-09-30 investibility gate [evidence: BUSINESS.md].

## Buildable Shape

Each item above is single-worker-sized and maps to a BUSINESS.md heading. The immediate goal is not more feature breadth; it is a measured beta that can prove or kill the thesis with conversion, coverage, deliverability, margin, and operator-load data [evidence: BUSINESS.md].

## Deferred

- Dynamic pricing remains deferred until fixed tiers fail live margin tests [evidence: MASTER_PLAN.md; apps/api/src/routes/payments.ts].
- Public SEO pages remain deferred until paid delivery works [evidence: .planning/GENESIS.md; BUSINESS.md].
- Organization/API access remains out of launch scope [evidence: .planning/PROJECT.md].
- Certified mail, fax, multi-language support, community features, and automated follow-ups remain future-only [evidence: .planning/REQUIREMENTS.md].
