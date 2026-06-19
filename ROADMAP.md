# CivicState / brooks-history - Roadmap

As of 2026-06-19 [evidence: dispatch current_date], this roadmap aligns the existing CivicState build narrative with the business plan in BUSINESS.md [evidence: BUSINESS.md]. The prior `.planning/ROADMAP.md` says the original foundation, AI pipeline, payment/delivery, and dashboard/compliance phases were completed on 2026-04-25 [evidence: .planning/ROADMAP.md]. This root roadmap does not discard that work; it reframes the next work around investability, validation, and operator decision gates.

## What Exists

- Monorepo scaffold with web, API, worker, shared Prisma schema, and tests [evidence: package.json; apps/web/package.json; apps/api/package.json; apps/worker/package.json; packages/shared/prisma/schema.prisma].
- CivicState workflow surfaces: issue submission, official lookup, research, drafting, payment, delivery, dashboard, admin, and compliance routes/pages [evidence: apps/api/src/routes/submissions.ts; apps/api/src/routes/officials.ts; apps/worker/src/agents/researcher.ts; apps/worker/src/agents/drafter.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts; apps/web/app/dashboard/page.tsx; apps/api/src/routes/compliance.ts].
- Implemented pricing tiers of $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].

## What Is Not Yet Proven

- No paid customer evidence was found [assumption: workspace audit].
- No production Stripe, Postmark, Anthropic, or hosting telemetry was found [assumption: workspace audit].
- No legal review evidence was found [assumption: workspace audit].
- Registry status says Watchlist and personal/research asset, not near-term investible BOS [evidence: dispatch registry notes].

## Now

- [ ] Thesis - operator ruling: confirm by 2026-07-15 [assumption: validation schedule] whether CivicState should be pitched as a business, kept as a research asset, or archived.
- [ ] Product & Moat - run a repo-to-runtime audit of the implemented submission, research, drafting, payment, delivery, dashboard, and compliance loop [evidence: BUSINESS.md].
- [ ] Market - define the first paid test cohort and instrumentation for 100 paid submissions [assumption: validation target] without using paid ads [assumption: low-budget GTM].
- [ ] Business Model - replace model assumptions with real Stripe, Postmark, Anthropic, and hosting costs after the first paid cohort [assumption: no live cost exports found].
- [ ] Go-To-Market - publish a narrow set of issue-specific acquisition pages tied to housing, environment, public safety, and local services [assumption: categories visible in state-cache and planning docs].
- [ ] Risks & Anti-Plan - obtain operator/legal review of disclaimers, AI disclosure, moderation, and "not legal advice" boundaries before public launch [assumption: legal review not present].
- [ ] Platform Posture - decide whether direct Clerk/Stripe/Postmark integrations remain acceptable or should migrate toward WrkPlug shared rails [assumption: WrkPlug Phase 0 not signed].

## Next Validation Gates

| Gate | Date | Pass condition |
|---|---|---|
| Operator intent | 2026-07-15 [assumption: schedule] | Written decision on business vs research asset |
| Runtime readiness | 2026-08-15 [assumption: schedule] | End-to-end dry run with payment and delivery disabled or sandboxed |
| First cohort | 2026-09-30 [assumption: schedule] | 100 paid submissions [assumption: validation target] and 2.0% preview-to-pay conversion [assumption: threshold] |
| Deliverability | 2026-09-30 [assumption: schedule] | 85.0% accepted/delivered official email rate [assumption: threshold] |
| Investability | 2026-12-31 [assumption: schedule] | Evidence supports continuing beyond Watchlist status |

## Later

Only after validation should the project expand into enterprise API access, certified mail, multilingual support, coalition features, social/community mechanics, or autonomous follow-up loops [evidence: .planning/PROJECT.md; MASTER_PLAN.md]. Those are deliberately excluded from the current buildable roadmap because they do not answer the core question: will strangers pay for citation-backed civic communications?
