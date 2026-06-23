# CivicState Roadmap

## Overview

CivicState's original roadmap describes a four-phase build: foundation, AI pipeline, payment and delivery, then dashboard and compliance [evidence: .planning/ROADMAP.md]. The repo now contains source code for each of those surfaces, including API routes, worker agents, frontend pages, Prisma models, and tests [evidence: apps/; packages/shared/; tests/].

This root roadmap serves the business plan rather than the other way around. The next work is not feature expansion; it is validation of the thesis in BUSINESS.md: paid conversion, official coverage, inbox placement, and operator risk.

## Current Build Reality

Implemented or represented in code:

- Submission intake, content moderation, and classifier queueing [evidence: apps/api/src/routes/submissions.ts].
- Federal/state/local official lookup orchestration and official caching [evidence: apps/api/src/lib/officials/lookup.ts].
- Research, citation verification, drafting, delivery, treasury, and reconciliation workers [evidence: apps/worker/src/agents/].
- Stripe payment tiers of $5, $15, and $25 [evidence: apps/api/src/routes/payments.ts].
- Postmark delivery with opt-out, invalid-email, and bounce-rate controls [evidence: apps/worker/src/agents/delivery.ts].
- Dashboard, admin, privacy, terms, and submission frontend pages [evidence: apps/web/app/].

Unvalidated:

- Real users, revenue, checkout conversion, inbox placement, official response rate, production deployment, and local-official coverage [assumption: no production/customer metrics in repo].

## Next Buildable Slice

- [ ] **Thesis / Problem & Customer:** instrument preview-to-checkout funnel and record the first 50 preview sessions [assumption: beta validation target].
- [ ] **Market / Go-To-Market:** recruit 20 closed-pilot users from operator-owned channels and log source, issue type, preview completion, and payment outcome [assumption: manual validation plan].
- [ ] **Product & Moat:** run a 10-ZIP official-coverage audit comparing returned officials with a manual checklist [assumption: coverage sample].
- [ ] **Business Model / Financial Model:** add a simple operator ledger export that reconciles Stripe payments, LLM cost estimates, Postmark sends, and fixed burn [assumption: validation need].
- [ ] **Competition / Risks & Anti-Plan:** run a user-choice interview asking each pilot user what they would have done instead: nothing, manual email, Resistbot, Change.org, template, or lawyer [assumption: customer discovery task].
- [ ] **Platform Posture:** decide whether CivicState remains standalone Clerk/Stripe/Postmark or becomes a WrkPlug client before adding new auth/billing surface [assumption: WrkPlug Phase 0 not signed].
- [ ] **Milestones / Assumption Ledger:** publish a 2026-09-30 go/no-go memo against the 3% conversion, 85% inbox placement, and 60% local coverage gates [evidence: .planning/PROJECT.md].

## Validation Gates

| Gate | Required signal | Source |
|---|---|---|
| Customer | 3% preview-to-paid conversion | [evidence: .planning/PROJECT.md] |
| Delivery | 85% .gov inbox placement | [evidence: .planning/PROJECT.md] |
| Coverage | 60% local-official coverage | [evidence: .planning/PROJECT.md] |
| Economics | contribution margin remains above 80% | [assumption: BUSINESS.md unit model] |
| Safety | no unreviewed legal-demand or harassment sends | [evidence: MASTER_PLAN.md; apps/api/src/lib/moderation.ts] |

## Deferred

Do not add subscriptions, coalition features, certified mail, API access, public campaign growth loops, paid acquisition, or new autonomous agents until the current transactional loop clears validation [evidence: .planning/GENESIS.md; MASTER_PLAN.md].
