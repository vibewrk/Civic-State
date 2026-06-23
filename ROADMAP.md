# CivicState Roadmap

Last updated: 2026-06-23 [evidence: worker current_date and dispatch context]. This roadmap aligns to BUSINESS.md and treats `.planning/ROADMAP.md` as historical execution evidence, not proof of market validation [evidence: .planning/ROADMAP.md; BUSINESS.md].

## Context

CivicState is a watchlist/personal research asset until operator validation confirms it should be pitched as a business [evidence: dispatch registry note]. The historical roadmap says foundation, AI pipeline, payment/delivery, dashboard, and compliance phases were completed on 2026-04-25 [evidence: .planning/ROADMAP.md], but the requirements file still lists many product requirements as pending [evidence: .planning/REQUIREMENTS.md]. The next roadmap therefore focuses on verification and buildable fixes rather than new speculative scope.

## Historical Narrative To Preserve

The original plan delivers the pipeline from civic frustration to official action: infrastructure, auth, agent engine, submission wizard, official lookup, regulation research, citation verification, letter drafting, content moderation, Stripe payment, Postmark delivery, dashboard, admin tools, and legal pages [evidence: .planning/ROADMAP.md]. The repo contains corresponding web, API, worker, and shared database surfaces [evidence: package.json; packages/shared/prisma/schema.prisma].

The current plan keeps that narrative but changes the gate: "built in repo" is not the same as "validated in market" [assumption: EIR operating standard].

## Buildable Now

- [ ] **Product & Moat: preview/payment contract repair** - align frontend payment keys with API pricing tiers so $5, $15, and $25 checkout paths work from the letter preview [evidence: apps/web/lib/api.ts; apps/api/src/routes/payments.ts].
- [ ] **Product & Moat: preview route verification** - confirm `/api/submissions/:id/preview` and `/api/submissions/:id/research` contracts exist or add the smallest compatible routes for the current wizard [evidence: apps/web/lib/api.ts; apps/web/app/submit/page.tsx].
- [ ] **Market: official coverage report** - run one metro-area coverage audit across federal, state, and local lookup sources and compare to the 95% federal/state and 60% local gates [evidence: .planning/PROJECT.md].
- [ ] **Go-To-Market: beta cohort instrumentation** - add or verify funnel events for submission started, preview reached, checkout started, paid, delivered, and reply received [assumption: EIR GTM instrumentation need].
- [ ] **Business Model: unit-cost reconciliation** - compare actual token, Postmark, Stripe, and hosting cost per campaign to the $1.20 and $1.94 package cost assumptions [evidence: MASTER_PLAN.md].
- [ ] **Risks & Anti-Plan: deliverability seed test** - run a controlled domain-warming and .gov inbox-placement test before accepting broad paid traffic, using the 85% gate [evidence: .planning/PROJECT.md].
- [ ] **Platform Posture: operator architecture ruling** - decide whether CivicState keeps Clerk/Stripe directly or migrates identity/billing to WrkPlug shared rails [evidence: apps/api/src/routes/payments.ts; BUSINESS.md].

## Phase Gate

| Gate | Required proof | Current status |
|---|---|---|
| Demand | At least 3% paid conversion from preview to payment [evidence: .planning/PROJECT.md] | Unknown [evidence: no analytics evidence found] |
| Deliverability | At least 85% .gov inbox placement [evidence: .planning/PROJECT.md] | Unknown [evidence: no deliverability report found] |
| Data coverage | At least 95% federal/state and 60% local official coverage [evidence: .planning/PROJECT.md] | Unknown [evidence: no coverage report found] |
| Unit economics | Revenue build reconciles to cost ledger and payment fees [evidence: apps/worker/src/lib/treasury.ts; MASTER_PLAN.md] | Unvalidated [assumption: no production ledger data found] |
| Legal boundary | No legal-advice or filing behavior beyond constituent letters [evidence: MASTER_PLAN.md; apps/worker/src/agents/drafter.ts] | Needs operator review [assumption: legal review not found] |

## Sequencing

| Window | Work | Exit condition |
|---|---|---|
| 2026-06-30 [assumption: next operator checkpoint] | Contract fixes and route verification | Local preview-to-checkout flow succeeds |
| 2026-07-15 [assumption: validation window] | Official coverage audit | Coverage report attached to decisions log |
| 2026-08-15 [assumption: validation window] | Deliverability seed test | 85% inbox-placement gate passes or beta pauses [evidence: .planning/PROJECT.md] |
| 2026-09-30 [assumption: beta decision date] | Paid beta | 3% conversion gate passes or project remains research-only [evidence: .planning/PROJECT.md] |
| 2026-12-31 [assumption: portfolio review date] | wrk.vc posture decision | Kill, keep watchlist, or pitch as business |

## Non-Goals

Do not add organization API, community features, certified mail, fax, multilingual support, or automated follow-up letters until the paid individual workflow proves demand and delivery reliability [evidence: .planning/PROJECT.md; MASTER_PLAN.md].
