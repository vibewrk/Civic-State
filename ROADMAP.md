# CivicState / brooks-history - Roadmap

Last updated: 2026-06-22 [evidence: dispatch current_date]. This roadmap merges the existing CivicState phase narrative while correcting the buildable next path for business validation [evidence: .planning/ROADMAP.md; BUSINESS.md].

## Current Narrative

CivicState is intended to deliver the pipeline from civic concern to official action: issue submission, official lookup, citation-backed research, letter drafting, payment, delivery, dashboard, admin tools, and compliance [evidence: .planning/PROJECT.md; .planning/ROADMAP.md].

The old roadmap says all four product phases were complete on 2026-04-25 [evidence: .planning/ROADMAP.md], but the state file says only foundation was complete on 2026-04-25 [evidence: .planning/STATE.md]. Current source files show substantial implementation, but no production deployment, revenue, traffic, deliverability, or market validation was found [evidence: apps/api/src; apps/worker/src; .planning/existing-state.md]. This roadmap therefore treats the next stage as validation and reconciliation, not feature expansion.

## Operating Principle

The plan serves the BUSINESS.md thesis: prove or kill the paid civic-letter workflow before adding social, coalition, API, multilingual, mobile, or enterprise features [evidence: BUSINESS.md; .planning/REQUIREMENTS.md].

## Critical Path

- [ ] **Thesis - operator ruling:** resolve whether `brooks-history` should pitch CivicState as a business or remain a personal/research asset [evidence: dispatch registry note].
- [ ] **Problem & Customer - beta cohort:** recruit residents with active civic issues and track preview-to-paid conversion against the 3% gate [evidence: .planning/PROJECT.md; assumption: operator-sourced beta].
- [ ] **Product & Moat - product truth audit:** run the end-to-end flow locally and document blockers across submit, officials, research, draft, pay, webhook, delivery, and dashboard [evidence: apps/api/src; apps/worker/src].
- [ ] **Business Model - margin enforcement:** verify hardcoded $5, $15, and $25 tiers against actual token, delivery, Stripe, and hosting costs before paid launch [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts].
- [ ] **Market - coverage sample:** test ZIP-code official coverage against the 95% federal/state and 60% local targets [evidence: .planning/PROJECT.md; apps/api/src/lib/officials/lookup.ts].
- [ ] **Go-To-Market - private paid beta:** measure paid submissions, CAC source, refunds, chargebacks below 0.5%, and operator review minutes before publishing SEO pages [evidence: .planning/PROJECT.md; BUSINESS.md].
- [ ] **Risks & Anti-Plan - delivery and compliance gate:** prove 85% government inbox placement, pause domains above 10% bounce rate, and verify CCPA export/delete routes match the Prisma schema [evidence: .planning/PROJECT.md; apps/worker/src/agents/delivery.ts; apps/api/src/routes/compliance.ts].

## Deferred

Do not pursue subscriptions, organization API access, coalition features, public campaign search, native mobile apps, paid ads, certified mail, fax, multilingual expansion, or dynamic pricing until the paid consumer workflow clears the validation gates [evidence: MASTER_PLAN.md; .planning/REQUIREMENTS.md; BUSINESS.md].

## Decision Gates

On 2026-08-15 [assumption: EIR milestone], continue only if beta users complete paid checkouts and the product can deliver letters without manual rescue. On 2026-09-15 [assumption: EIR milestone], continue only if inbox placement approaches the 85% target [evidence: .planning/PROJECT.md]. On 2026-12-31 [assumption: EIR milestone], decide whether the asset is ready for a wrk.vc pitch, should stay a research asset, or should be sunset [evidence: dispatch registry note].
