# CivicState Roadmap

Document date: 2026-06-19 [evidence: wrk.dog dispatch current_date]. This root roadmap preserves the existing `.planning/ROADMAP.md` narrative while correcting it into a buildable validation plan [evidence: .planning/ROADMAP.md].

## Current Narrative

The original roadmap says CivicState delivers the pipeline from civic frustration to official action in four phases: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: .planning/ROADMAP.md]. It marks all four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md].

The repo has meaningful implementation across those phases: monorepo structure, Prisma schema, API routes, worker agents, Stripe payment flow, Postmark delivery handling, dashboard/admin pages, compliance pages, and tests [evidence: package.json; packages/shared/prisma/schema.prisma; apps/api/src/routes; apps/worker/src/agents; apps/web/app; tests]. However, `.planning/STATE.md` still says the current position is Phase Foundation complete and Phase AI Pipeline planning needed as of 2026-04-25 [evidence: .planning/STATE.md].

This roadmap resolves the conflict by treating the product as code-present but market-unvalidated. The next roadmap is not more phase completion; it is evidence collection against the business plan in `BUSINESS.md` [evidence: BUSINESS.md].

## Milestones

| Milestone | Goal | Evidence needed |
| --- | --- | --- |
| Identity cleanup | Resolve `brooks-history` vs CivicState mismatch | Operator ruling and docs alignment [evidence: registry dispatch; package.json] |
| Paid beta readiness | A resident can submit, preview, pay, deliver, and track status | End-to-end run with Stripe, Postmark, jobs, and dashboard [evidence: apps/api/src/routes/payments.ts; apps/worker/src/agents/delivery.ts] |
| Citation safety | No fabricated citations reach delivered letters | Adversarial citation tests and verified-source logs [evidence: apps/worker/src/agents/researcher.ts; tests/citation-verifier.test.ts] |
| Deliverability proof | Government email delivery clears the planning gate | At least 85% inbox placement target [evidence: .planning/PROJECT.md] |
| Demand proof | Preview users convert to paid customers | At least 3% paid conversion target [evidence: .planning/PROJECT.md] |
| Operator proof | One operator can manage moderation and exceptions | Flagged queue under 10 items and under 24 hours oldest age [evidence: .planning/REQUIREMENTS.md] |

## Buildable Next Slice

- [ ] **Thesis Current:** add an operator-visible product identity check that records whether this repo is CivicState or `brooks-history` before any pitch export [evidence: registry dispatch; package.json].
- [ ] **Customer Definition:** instrument the submit preview funnel so qualified visitors, preview viewers, checkout starts, and paid campaigns can be counted [assumption: analytics implementation needed to validate BUSINESS.md].
- [ ] **Revenue Model:** replace hardcoded margin confidence with a fee-inclusive per-job cost summary covering token cost, Stripe fees, Postmark cost, and delivery count [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts].
- [ ] **Market Sizing:** create a beta scorecard that reports monthly qualified visitors, paid conversion, paid campaigns, average order value, and revenue using the bottom-up model [evidence: BUSINESS.md].
- [ ] **Compliance And Sensitivities:** add an operator preflight checklist for CAN-SPAM, AI disclosure, not-legal-advice language, opt-out, and data deletion before live delivery [evidence: .planning/REQUIREMENTS.md; apps/worker/src/agents/delivery.ts].
- [ ] **Risks And Anti-Plan:** run a seeded deliverability test against government-like domains and enforce the 10% domain bounce pause behavior in an integration test [evidence: apps/worker/src/agents/delivery.ts].
- [ ] **Evidence Sources And Freshness:** produce a live beta evidence log that links every investor-facing metric to a repo artifact, dashboard export, or operator decision [evidence: BUSINESS.md].

## Deferred Until Validation

Subscriptions remain deferred because the current master plan removed them from active scope [evidence: MASTER_PLAN.md]. Organization API access, certified mail, fax delivery, multi-language support, public coalition/community features, automated follow-up letters, and dynamic pricing remain outside the immediate roadmap [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; MASTER_PLAN.md].

## Review Gate

The next adoption gate should remain proposed until the operator merges the soul upgrade and rules on whether this watchlist personal/research asset should be represented as a business [evidence: registry dispatch]. The roadmap graduates from validation to growth only after paid conversion, deliverability, official coverage, and citation safety are measured with live data [evidence: BUSINESS.md; .planning/PROJECT.md].

