# CivicState Roadmap

## Current Shape

The existing `.planning/ROADMAP.md` describes four completed build phases: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: `.planning/ROADMAP.md`]. The codebase supports much of that surface, including the monorepo, API routes, Prisma schema, worker agents, Stripe route, Postmark delivery worker, dashboard pages, and compliance pages [evidence: `package.json`, `packages/shared/prisma/schema.prisma`, `apps/api/src/routes`, `apps/worker/src/agents`, `apps/web/app`].

This root roadmap reframes the next work as validation and hardening. The plan serves `BUSINESS.md`: prove paid delivery and official coverage before treating CivicState as investible.

## Buildable Roadmap

- [ ] **Product Surface:** Fix the payment tier mismatch between frontend `three` / `all` and API `three_pack` / `full_spread`, then verify checkout from letter preview to webhook.
- [ ] **Customer Definition:** Run a manual validation batch with operator-recruited users and log whether they are individual constituents, organizations, or legal-adjacent users.
- [ ] **Official Coverage:** Replace the local officials stub with one evaluated provider path, then record federal, state, and local match counts per ZIP [assumption: one-provider spike is the smallest buildable validation step].
- [ ] **Revenue Model:** Instrument paid submissions, selected tier, refunds, failed checkout sessions, and gross revenue per campaign.
- [ ] **Evidence Sources:** Store citation verification outcomes and show when citations were stripped or escalated for review.
- [ ] **Risks And Anti-Plan:** Add an operator review report for flagged content, queue age, queue depth, and moderation reason.
- [ ] **Go-To-Market:** Ship only opt-in public examples after compliance review, then measure search impressions before claiming an SEO flywheel.
- [ ] **Financial Figures:** Reconcile Stripe receipts, delivery costs, model token costs, and ledger entries against the $0.10 discrepancy threshold [evidence: `.planning/REQUIREMENTS.md`].

## Milestones

### Validation Milestone

Goal: complete paid delivery for real individual users without hiding operator involvement [assumption: next milestone chosen from BUSINESS.md risk profile].

Exit criteria:

- 25 operator-recruited users have attempted the flow [assumption: validation sample size].
- Payment conversion, refund rate, failed checkout rate, and delivery success are recorded [assumption: required validation metrics].
- Official coverage is measured across at least 25 ZIP codes [assumption: validation sample size].
- Any legal-adjacent or defamation-risk submissions are reviewed by the operator before delivery [evidence: `MASTER_PLAN.md` escalation rules].

### Coverage Milestone

Goal: prove the routing layer can reliably find reachable officials.

Exit criteria:

- Local officials provider evaluation is complete and documented [evidence: `apps/api/src/lib/officials/cicero.ts` marks this pending].
- Federal officials without email addresses have an alternate contact-path decision [evidence: `apps/api/src/lib/officials/congress.ts`].
- Bounce monitoring and opted-out official suppression are visible in admin workflows [evidence: `apps/worker/src/agents/delivery.ts` and `packages/shared/prisma/schema.prisma`].

### GTM Milestone

Goal: test whether paid usage can create compliant acquisition content.

Exit criteria:

- Public campaign pages are opt-in and read-only [evidence: `MASTER_PLAN.md`].
- Search impressions and paid conversion are tracked before any paid acquisition [assumption: GTM test design].
- Messaging remains "constituent communication," not legal demand, lobbying firm, or claim filing [evidence: `.planning/PROJECT.md` and `MASTER_PLAN.md`].

## Deferred

Do not build subscriptions, social/community features, coalition features, certified mail, fax, paid acquisition, third-party API access, or autonomous follow-up until paid email delivery and official coverage are validated [evidence: `.planning/PROJECT.md`, `.planning/GENESIS.md`, `MASTER_PLAN.md`].

## Roadmap Dates

- Existing initialization date: 2026-04-25 [evidence: `.planning/PROJECT.md` and `.planning/STATE.md`].
- Root soul upgrade date: 2026-06-22 [evidence: worker current-date context].
- Adoption note date: 2026-06-12 [evidence: worker brief gate instruction].
