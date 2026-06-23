# CivicState Roadmap

Document date: 2026-06-23 [evidence: dispatch current_date]. This roadmap merges the existing `.planning/ROADMAP.md` narrative with the EIR business plan in `BUSINESS.md`.

## Existing Narrative Preserved

The existing roadmap describes CivicState as a phased build from civic frustration to official action: foundation, AI pipeline, payment and delivery, then dashboard and compliance [evidence: `.planning/ROADMAP.md`]. That narrative still matches the repo shape: the worktree contains a monorepo, frontend, API, worker agents, Prisma schema, payment flow, delivery flow, admin routes, compliance pages, and tests [evidence: `apps/`; evidence: `packages/shared/prisma/schema.prisma`; evidence: `tests/`].

The roadmap must now serve the business plan rather than imply the company is validated. The right next work is not more broad feature expansion; it is tightening the proof gates named in `BUSINESS.md`: customer willingness to pay, government deliverability, official coverage, legal/compliance safety, and operator workload.

## Roadmap Principles

- Treat this as a provisional watchlist asset until the operator confirms business intent [evidence: dispatch registry note].
- Prefer proof-producing work over speculative features [assumption: EIR prioritization].
- Keep launch scope transactional: submission, research, preview, payment, delivery, tracking, review [evidence: `MASTER_PLAN.md`; evidence: `.planning/GENESIS.md`].
- Defer community, coalition, API, multilingual, certified mail, and search-before-create work until the paid loop is validated [evidence: `.planning/GENESIS.md`].

## Buildable Next Actions

- [ ] **Current Reality:** Fix the compliance export selector to match `packages/shared/prisma/schema.prisma`, then add a regression test for CCPA export fields [evidence: `apps/api/src/routes/compliance.ts`; evidence: `packages/shared/prisma/schema.prisma`].
- [ ] **Product and Customer Definition:** Add a beta-intake note in the submission flow that clarifies constituent communication, not legal advice, before payment [evidence: `apps/web/app/submit/page.tsx`; evidence: `BUSINESS.md`].
- [ ] **Revenue Model and Unit Economics:** Add a small server-side pricing helper shared by payment tests and `apps/api/src/routes/payments.ts` so the $5/$15/$25 tiers and margin assumptions cannot drift silently [evidence: `apps/api/src/routes/payments.ts`; evidence: `tests/payment.test.ts`].
- [ ] **Go-to-Market:** Add UTM/source capture fields to submissions or campaigns so manual beta, organic search, and social sharing can be attributed [assumption: validation instrumentation needed].
- [ ] **Market Sizing:** Create a lightweight beta metrics dashboard showing visitors, submission starts, paid submissions, conversion rate, and average order value [assumption: needed to test the 3% gate from `.planning/PROJECT.md`].
- [ ] **Competition:** Add a comparison-safe positioning block to the About page that states what CivicState is and is not without making unverifiable competitor claims [evidence: `apps/web/app/about/page.tsx`; evidence: `BUSINESS.md`].
- [ ] **Risks and Anti-Plan:** Add an admin-visible deliverability panel showing bounces, spam complaints, and per-domain pause status before any broad launch [evidence: `apps/worker/src/agents/delivery.ts`; evidence: `apps/api/src/routes/admin.ts`].
- [ ] **Assumption Ledger:** Add a future `DECISIONS.md` entry after beta launch recording conversion, deliverability, coverage, and operator-review results [assumption: validation evidence needed].

## Deferred

- Community comments, co-signing, coalition mechanics, and social feed surfaces remain deferred [evidence: `.planning/GENESIS.md`].
- Certified mail and fax remain deferred until email deliverability is measured [evidence: `.planning/REQUIREMENTS.md`].
- Organization/API revenue remains deferred until the individual paid loop is proven [evidence: `.planning/GENESIS.md`].
- Market-size expansion claims remain deferred until external research or first-party traction exists [assumption: workspace-only run].

## Review Gates

- Paid conversion gate: 3% [evidence: `.planning/PROJECT.md`].
- Government deliverability gate: 85% inbox placement [evidence: `.planning/PROJECT.md`].
- Official coverage gate: 95% federal/state and 60% local [evidence: `.planning/PROJECT.md`].
- Business-intent gate: operator confirms whether the asset should pitch as a business or stay personal/research [evidence: dispatch registry note].
