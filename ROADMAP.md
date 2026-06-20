# Roadmap: CivicState

## Overview

CivicState's existing roadmap describes a full pipeline from civic issue intake to researched letters, payment, delivery, dashboard, admin review, and compliance [evidence: .planning/ROADMAP.md]. This root roadmap aligns that build plan to BUSINESS.md as of 2026-06-20 [evidence: dispatch current_date] and treats the project as Watchlist until operator and market validation are complete [evidence: wrk.dog registry note in dispatch, 2026-06-20].

## Existing Narrative To Preserve

The repo already preserves a four-phase product narrative: Foundation, AI Pipeline, Payment and Delivery, and Dashboard and Compliance [evidence: .planning/ROADMAP.md]. The core value remains AI-powered regulation research with verified legal citations, automatic official targeting from ZIP code, and one-click transactional delivery at $5-$25 [evidence: .planning/PROJECT.md Core Value].

The roadmap correction is not to discard that narrative. The correction is to stop treating all future business proof as complete. The source tree shows real scaffolding across web, API, worker, and shared packages [evidence: apps/web/app/submit/page.tsx; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma], but BUSINESS.md still needs paid conversion, deliverability, legal/compliance, and operator-load validation before the asset is investible [evidence: .planning/PROJECT.md validation gates].

## Build Principles

- Tie each build item to a BUSINESS.md heading.
- Favor validation over breadth until the Watchlist issue is resolved [evidence: wrk.dog registry note in dispatch, 2026-06-20].
- Keep launch scope transactional: $5, $15, and $25 tiers [evidence: apps/api/src/routes/payments.ts].
- Treat market, GTM, and valuation numbers as assumptions until measured in production.
- Do not expand to organization APIs, coalition features, certified mail, or multilingual support until the individual paid campaign loop works [evidence: .planning/REQUIREMENTS.md v2 and Out of Scope].

## Next Buildable Milestones

- [ ] Thesis: resolve the brooks-history versus CivicState identity mismatch and record the operator ruling by 2026-07-15 [assumption: operator scheduling].
- [ ] Problem & Customer: define the first beta ICP and recruit 20 paid-campaign prospects [assumption: validation batch size].
- [ ] Product & Moat: verify the current submission-to-research-to-preview path end-to-end in a local seeded environment [evidence: apps/web/app/submit/page.tsx; apps/api/src/routes/submissions.ts].
- [ ] Business Model: instrument preview-to-paid conversion for the $5, $15, and $25 tiers [evidence: apps/api/src/routes/payments.ts].
- [ ] Go-To-Market: ship a 3-jurisdiction manual official-data pilot before broad SEO expansion [assumption: focused validation wedge].
- [ ] Financial Model: reconcile Stripe fees, token/email COGS, and ledger entries against the 40% net margin floor [evidence: MASTER_PLAN.md section 2.3; packages/shared/prisma/schema.prisma].
- [ ] Risks & Anti-Plan: run a .gov deliverability test against the 85% inbox-placement gate [evidence: .planning/PROJECT.md validation gates].
- [ ] Assumption Ledger: publish a validation dashboard for conversion, deliverability, refund/chargeback rate, official coverage, and operator minutes per campaign [assumption: metrics required to clear Watchlist].

## Validation Gates

| Gate | Threshold | Source | Decision |
|---|---:|---|---|
| Paid conversion | 3% [evidence: .planning/PROJECT.md] | BUSINESS.md Thesis | Promote only if real users pay |
| .gov inbox placement | 85% [evidence: .planning/PROJECT.md] | BUSINESS.md Risks & Anti-Plan | Pause delivery claims if below gate |
| Official data coverage | 95% federal/state and 60% local [evidence: .planning/PROJECT.md] | BUSINESS.md Market/Product | Restrict launch geography if below gate |
| Chargeback rate | Below 0.5% [evidence: MASTER_PLAN.md section 12.10] | BUSINESS.md Financial Model | Refund proactively before disputes |
| Reserve | $1,500 before accepting payment [evidence: MASTER_PLAN.md section 12.10] | BUSINESS.md Business Model | Do not launch paid sends without reserve |

## Deferred Until Proof

- Organization API access [evidence: .planning/REQUIREMENTS.md v2].
- Certified mail and fax delivery [evidence: .planning/REQUIREMENTS.md v2].
- Coalition mechanics and public campaign discovery [evidence: MASTER_PLAN.md section 21].
- Paid legal-data provider expansion [evidence: .planning/REQUIREMENTS.md v2].
- Multi-language and native mobile apps [evidence: .planning/REQUIREMENTS.md Out of Scope].

## Review Cadence

Update this roadmap after the operator identity ruling, after the first paid beta cohort, and after each validation gate decision [assumption: governance cadence]. The next roadmap review date is 2026-10-01 [assumption: validation schedule aligned to BUSINESS.md Milestones].
