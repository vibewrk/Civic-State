# Roadmap: Brooks History / CivicState

Document date: 2026-06-23 [evidence: worker dispatch]. This roadmap replaces the stale completion narrative in `.planning/ROADMAP.md` with a buildable watchlist plan while preserving the original CivicState direction: a civic concern becomes researched, citation-backed letters delivered to officials [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/PROJECT.md](.planning/PROJECT.md)].

## Existing Narrative To Preserve

The prior roadmap organized CivicState around foundation, AI pipeline, payment and delivery, dashboard, and compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. That shape still matches the codebase: the repo has web, API, worker, shared Prisma schema, agent workers, Stripe checkout, Postmark delivery, admin routes, and compliance routes [evidence: [package.json](package.json), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

What changes is the status. The earlier roadmap marks all phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but source inspection on 2026-06-23 [evidence: worker dispatch] shows the business still needs validation and the implementation still needs end-to-end hardening. This roadmap therefore serves the business plan: prove the narrow paid civic-letter workflow before pitching the asset.

## Current Position

Status: Watchlist / proposed soul. The operator must confirm whether the asset should be Brooks History, CivicState, or a renamed/rescoped project [evidence: worker dispatch, [package.json](package.json)].

Product reality:

- App skeleton and meaningful backend routes exist [evidence: [apps/api/src/index.ts](apps/api/src/index.ts)].
- Core data model exists [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Worker agents exist [evidence: [apps/worker/src/index.ts](apps/worker/src/index.ts)].
- Payment tiers of $5, $15, and $25 exist in code [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Production customer proof, paid revenue, and official-delivery evidence are not present [evidence: [.planning/existing-state.md](.planning/existing-state.md)].

## Near-Term Buildable Roadmap

- [ ] **Current Thesis: resolve project identity.** Operator records whether the repo should be pitched as CivicState, Brooks History, or a research-only asset; update visible naming only after that ruling.
- [ ] **Product Reality: repair end-to-end job flow.** Align API job payload fields, worker payload expectations, and `transitionJob` identifiers so a submitted issue can move through classifier, researcher, drafter, payment_pending, paid, delivering, and delivered.
- [ ] **Revenue Model: enforce margin control.** Add a pre-check that compares the selected $5/$15/$25 tier against estimated token, delivery, and payment costs before checkout [evidence: implemented tiers in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- [ ] **Customer Definition: run a constrained beta.** Recruit a small manual cohort of individual constituents and measure preview-to-payment, completion, refund, complaint, and reply outcomes [assumption: beta cohort needed because no live demand evidence exists].
- [ ] **Market Sizing: audit official coverage.** Build a repeatable ZIP-code sample audit for federal, state, and local official lookup before claiming coverage breadth.
- [ ] **Risks And Anti-Plan: harden compliance paths.** Fix schema mismatches in data export, verify deletion behavior, and document non-legal-advice boundaries before live sends.
- [ ] **Go-To-Market: defer SEO pages until proof.** Ship public campaign pages only after moderation, opt-in privacy, delivery tracking, and conversion are validated.

## Validation Gates

The next gate should remain proposed until these are true:

- Identity is resolved by the operator [evidence: registry note in worker dispatch].
- A paid test campaign completes end-to-end using provider test modes [assumption: safest proof before live sends].
- Official lookup coverage is manually audited for sampled ZIP codes [assumption: no repo evidence currently proves breadth].
- Deliverability tests show government-domain messages are accepted at an agreed threshold [assumption: no live deliverability data in repo].
- Finance controls reconcile Stripe amount, expected provider costs, and ledger entries [evidence: finance requirements in [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

## Out Of Scope Until Validation

- Enterprise API access [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Certified mail, fax delivery, and multilingual expansion [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- Public social/community mechanics [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)].
- Fundraising narrative or near-term VC pitch [evidence: registry note in worker dispatch].
