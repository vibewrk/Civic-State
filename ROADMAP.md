# CivicState - Roadmap

## Overview
The existing planning narrative says CivicState turns civic concerns into researched, citation-backed letters delivered to government officials for $5-$25 [evidence: .planning/PROJECT.md; evidence: apps/api/src/routes/payments.ts]. The build surface is substantial: web form, API routes, Prisma schema, BullMQ worker agents, Stripe checkout, Postmark delivery, moderation, and audit logging are present in source [evidence: apps/; evidence: packages/shared/prisma/schema.prisma].

The roadmap now serves the business plan: prove the paid civic-letter loop, then decide whether this is an investible company, a WrkPlug-client product, or a personal/research asset. As of 2026-06-19 [assumption: worker current date], the next work should emphasize validation, instrumentation, and operator rulings rather than speculative feature expansion.

## Preserve From Existing Plan
- Core value: AI-powered regulation research, verified citations, official targeting, and paid delivery [evidence: .planning/PROJECT.md].
- Launch scope: individual constituent communications, not legal advice, claim filing, lobbying firm services, or social-network mechanics [evidence: MASTER_PLAN.md].
- Stack direction: Next.js, Express, PostgreSQL, Redis, BullMQ, Prisma, Docker, Clerk, Stripe, Postmark, and Anthropic integration [evidence: package.json; evidence: apps/*/package.json].
- Validation gates: willingness to pay, deliverability, official coverage, and citation verification [evidence: .planning/PROJECT.md].

## Freshness Reset
The root roadmap treats .planning/ROADMAP.md as historical implementation planning, not current business truth. That file marks 4 phases complete [evidence: .planning/ROADMAP.md], while .planning/STATE.md still reports Phase 1 complete and .planning/REQUIREMENTS.md leaves many customer-facing requirements unchecked [evidence: .planning/STATE.md; evidence: .planning/REQUIREMENTS.md]. The buildable path below resolves that conflict by focusing on externally testable proof.

## Now / Next
- [ ] **Thesis - operator ruling:** resolve whether the repo should present as CivicState, brooks-history, or another asset name, and whether it is a business or research asset by 2026-07-15 [assumption: governance milestone].
- [ ] **Problem & Customer - paid beta:** recruit 25 non-affiliated paid submissions and record preview-to-payment conversion, AOV, and abandonment reasons by 2026-09-30 [assumption: validation milestone].
- [ ] **Market - coverage audit:** run a 100 ZIP code official-coverage audit and publish federal/state/local coverage rates before broader launch [assumption: validation sample size].
- [ ] **Product & Moat - citation audit:** test the citation verifier against 50 completed research jobs and log verified, stripped, and all-failed citation rates [assumption: validation sample size].
- [ ] **Business Model - unit economics ledger:** reconcile actual Stripe, AI, email, hosting, and review costs for the first 100 paid jobs [assumption: validation sample size].
- [ ] **Go-To-Market - deliverability gate:** complete domain warming and prove 85%+ accepted delivery / inbox placement before scaling traffic [assumption: threshold from .planning/PROJECT.md].
- [ ] **Risks & Anti-Plan - legal-adjacent review:** obtain operator or counsel review of disclaimers, moderation policy, opt-out handling, AI disclosure, and "not legal advice" boundaries before public paid launch [assumption: compliance gate].
- [ ] **Platform Posture - WrkPlug decision:** decide whether Clerk/Stripe stay as prototype dependencies or migrate behind shared WrkPlug auth/billing before wrk.vc presentation [assumption: D-032 posture not signed in repo].

## Later
- Add opt-in public campaign pages only after paid delivery works [evidence: .planning/GENESIS.md; assumption: SEO depends on public pages].
- Evaluate certified mail, fax, reply summarization, organization API access, and subscriptions only after the first validation gates pass [evidence: .planning/PROJECT.md].
- Revisit scale infrastructure only after sustained volume exceeds 5,000 submissions/month [assumption: threshold carried from MASTER_PLAN.md].

## Metrics
- Paid submissions/month [evidence: .planning/GENESIS.md].
- Preview-to-payment conversion, target 3%+ [assumption: .planning/PROJECT.md validation gate].
- Accepted delivery / inbox placement, target 85%+ [assumption: .planning/PROJECT.md validation gate].
- Official coverage, target 95%+ federal/state and 60%+ local [assumption: .planning/PROJECT.md validation gate].
- Human review rate, warning threshold 20%+ [assumption: one-operator model].
- Gross margin, target 88%-92% from prior plan or better [evidence: MASTER_PLAN.md; assumption: actual costs unknown].
