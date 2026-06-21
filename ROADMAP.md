# CivicState Roadmap

## Status

As of 2026-06-20 [evidence: worker context], the legacy roadmap says four application phases were completed on 2026-04-25 [evidence: .planning/ROADMAP.md]. The root soul was still missing before this EIR upgrade [evidence: initial workspace scan], so this roadmap reframes the work around validation and data-room readiness rather than raw feature buildout.

## Existing Narrative To Preserve

CivicState is intended to move a user from civic frustration to official action: issue submission, official lookup, legal/regulatory research, citation-backed drafting, payment, email delivery, status tracking, and compliance controls [evidence: .planning/ROADMAP.md; MASTER_PLAN.md].

The repo already contains application surfaces for web, API, worker agents, shared Prisma models, payment, moderation, treasury, and delivery [evidence: apps/*; packages/shared/prisma/schema.prisma]. The next roadmap must prove whether those surfaces create a real paid workflow.

## Buildable Roadmap

- [ ] Thesis Current - resolve the `brooks-history` versus CivicState identity and operator intent before any wrk.vc presentation.
- [ ] Customer Definition - recruit a small beta cohort of U.S. residents with concrete civic issues and record why each issue fits or does not fit the launch ICP.
- [ ] Product And Workflow - run end-to-end dry runs through submission, moderation, research, draft preview, payment, delivery, and dashboard status using the current code.
- [ ] Revenue Model And Unit Economics - instrument actual package mix, token spend, Stripe fees, Postmark costs, refunds, and review labor against the $5/$15/$25 tiers [evidence: apps/api/src/routes/payments.ts].
- [ ] Market Sizing - replace repo-authored scenarios with sourced search-volume, conversion, and issue-frequency evidence when network research is available.
- [ ] Go To Market - test opt-in public campaign pages only after privacy/legal review and measure impressions, clicks, preview starts, and paid conversion.
- [ ] Risks And Anti-Plan - create operator runbooks for threats, defamation-risk submissions, high bounce domains, official opt-outs, refund-before-dispute, and AI citation failures.

## Validation Gates

The roadmap is not complete until the following gates are measured rather than asserted:

| Gate | Target | Source |
|---|---:|---|
| Preview-to-paid conversion | at least 3% | [evidence: .planning/PROJECT.md] |
| Government inbox placement | at least 85% | [evidence: .planning/PROJECT.md; assumption: inbox placement can be measured accurately] |
| Federal/state official coverage | at least 95% | [evidence: .planning/PROJECT.md] |
| Local official coverage | at least 60% | [evidence: .planning/PROJECT.md] |
| Domain bounce control | pause above 10% recent bounce rate | [evidence: apps/worker/src/agents/delivery.ts] |
| Margin floor | at least 40% after Stripe fees | [evidence: MASTER_PLAN.md] |

## Deferred Until Validation

Subscriptions, organization API access, paid acquisition, coalition features, automated follow-up letters, certified mail, fax delivery, native mobile apps, and legal filing workflows remain deferred until paid consumer usage is proven [evidence: MASTER_PLAN.md; .planning/GENESIS.md].
