# CivicState Roadmap

## Roadmap Control

As of `2026-06-22` [evidence: worker current_date], this roadmap aligns the root soul with the existing implementation and the business plan in [BUSINESS.md](BUSINESS.md). The prior execution roadmap says all major build phases were completed on `2026-04-25` [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but the business evidence remains unvalidated.

## Existing Narrative To Preserve

CivicState turns a civic concern into a researched, citation-backed letter campaign delivered to relevant officials. The existing implementation already covers foundation, AI pipeline, payment and delivery, dashboard, admin tooling, and compliance pages [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md), [apps](apps), [packages/shared](packages/shared)]. The roadmap now shifts from "build the whole product" to "prove the risky business claims without expanding scope."

## Current Build Baseline

- Monorepo web/API/worker structure is present [evidence: [package.json](package.json), [apps](apps)].
- Prisma schema includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent action logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].
- Payment tiers are implemented at `$5`, `$15`, and `$25` [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- Delivery applies a `10%` bounce-rate gate over `30` days [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- Treasury uses `$0.20`, `$0.40`, and `$0.60` tier cost estimates plus a `150%` budget ceiling [evidence: [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts)].

## Roadmap Themes

- Business validation before feature expansion.
- Deliverability and official-data quality before volume.
- Legal and trust review before public launch.
- Instrumentation before growth spend.
- Repair integration mismatches before beta users see them.

## Next Buildable Steps

- [ ] Fix the revenue-model integration path by reconciling frontend tier keys with API tier keys and tracing it to the `Revenue Model` section in [BUSINESS.md](BUSINESS.md).
- [ ] Add funnel instrumentation for `Customer Definition`: submission started, preview reached, checkout started, payment completed, delivery completed, and refund requested.
- [ ] Create an `Evidence Sources` beta report template that exports conversion, official coverage, bounce, complaint, and citation-verification metrics.
- [ ] Run an `Assumption Ledger` official-coverage sample across federal, state, and local targets using the current lookup stack.
- [ ] Build a `Risks And Anti-Plan` deliverability test harness using seeded official-domain or test-domain addresses before live civic sending.
- [ ] Add operator review workflow notes for `Go To Market` beta cohorts, including issue-source, consent language, and escalation owner.
- [ ] Produce a legal/compliance review packet for `Customer Definition` boundaries: not legal advice, not lobbying firm, AI disclosure, CAN-SPAM, privacy deletion, and content moderation.

## Validation Gates

| Gate | Target | Source |
|---|---:|---|
| Preview-to-paid conversion | `>=3%` | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Government inbox placement | `>=85%` | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Federal/state coverage | `>=95%` | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Local coverage | `>=60%` | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| Chargeback rate | `<0.5%` | [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |

## Out Of Scope Until Gates Clear

- Subscriptions [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Enterprise API sales [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Public campaign pages as a growth loop [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Certified mail, fax, native mobile apps, community comments, and automated follow-up loops [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

## Roadmap Decision

The next roadmap phase is not a new feature phase. It is a validation phase ending in either beta-ready, reposition, or kill. That decision should be made after the evidence report has real paid and deliverability data, not before [assumption: operating discipline for a watchlist asset].
