# CivicState / brooks-history - Roadmap

## Current Posture

As of **2026-06-19** [evidence: worker current_date], this repo should be treated as a CivicState validation asset with a registry identity mismatch, not a fully investible BOS [evidence: dispatch registry notes; package.json]. The existing planning narrative describes a four-phase civic-tech build, and the current codebase contains API, web, worker, shared database, legal, payment, delivery, admin, and test surfaces [evidence: .planning/ROADMAP.md; apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests].

## Preserved Narrative

The original plan remains directionally valid: CivicState turns a civic concern into a researched, citation-backed letter sent to the correct public officials [evidence: .planning/PROJECT.md]. The roadmap still depends on a guided submission flow, official lookup, research and citation verification, compliant letter drafting, payment, delivery tracking, user dashboard, admin review, and legal/privacy controls [evidence: .planning/REQUIREMENTS.md].

The roadmap must now be narrowed around proof, not scale. The next work should validate paid demand, government inbox delivery, official coverage, citation reliability, and operator workload before adding public campaign SEO, API access, certified mail, multilingual support, or coalition features [evidence: .planning/GENESIS.md; BUSINESS.md].

## Build Principles

- Treat `BUSINESS.md` as the seed plan and `.ultra-start/business-plan.json` as the draft gate until operator merge [evidence: BUSINESS.md; .ultra-start/business-plan.json].
- Preserve the existing stack unless an operator explicitly decides to move onto WrkPlug shared rails [assumption: WrkPlug Phase 0 not yet signed].
- Keep every new feature tied to a measurable validation gate: conversion, deliverability, coverage, citation quality, support burden, or margin [evidence: BUSINESS.md].
- Do not add new source work from this soul upgrade; this roadmap is documentation alignment only [evidence: dispatch ground rules].

## Next Build Slice

- [ ] **Thesis**: Resolve the `brooks-history` versus CivicState identity mismatch and record the operator ruling by **2026-07-15** [assumption: validation schedule].
- [ ] **Problem & Customer**: Define the closed-beta ICP and recruit the first **25** paid submissions through concierge/manual channels [assumption: validation schedule].
- [ ] **Product & Moat**: Run an end-to-end dry run covering official lookup, citation verification, preview, payment, delivery, and dashboard status [evidence: apps/api/src/index.ts; tests/api-routes.test.ts].
- [ ] **Business Model**: Instrument actual AOV, Stripe fees, token costs, delivery costs, refund events, and human-review minutes per submission [evidence: tests/payment.test.ts; tests/treasury.test.ts].
- [ ] **Go-To-Market**: Publish or draft a narrow SEO test set around specific civic jobs only after legal/privacy review [assumption: channel validation].
- [ ] **Risks & Anti-Plan**: Test government inbox placement and bounce suppression before opening broad signups [evidence: .planning/PROJECT.md; tests/delivery.test.ts].
- [ ] **Assumption Ledger**: Review the validation gates on **2026-09-30** and decide continue, pivot, or archive [assumption: validation schedule].

## Validation Gates

The venture should not graduate from draft/watchlist until it proves:

- Preview-to-payment conversion at or above **3%** [evidence: .planning/PROJECT.md].
- Government inbox placement at or above **85%** [evidence: .planning/PROJECT.md].
- Federal/state official coverage at or above **95%** and local coverage at or above **60%** [evidence: .planning/PROJECT.md].
- Gross margin above the **40%** floor after payment, AI, email, and review costs [evidence: .planning/PROJECT.md].
- Operator workload low enough for one operator to run routine review without continuous staffing [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

## Deferred

- Enterprise API access, subscriptions, certified mail, fax, paid ads, mobile apps, coalition features, multilingual support, public social mechanics, automated follow-up letters, and real-time legal filing workflows remain deferred [evidence: .planning/REQUIREMENTS.md; .planning/GENESIS.md].

