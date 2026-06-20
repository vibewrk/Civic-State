# CivicState / brooks-history Roadmap

## Overview

As of 2026-06-20 [evidence: runtime dispatch], the repo contains a CivicState monorepo with web, API, worker, shared schema, and tests [evidence: apps; packages; tests]. The registry, however, identifies this project as `brooks-history` and flags it as a possible personal/research asset rather than a near-term investible business [evidence: dispatch registry notes].

This roadmap preserves the existing four-phase narrative from .planning/ROADMAP.md [evidence: .planning/ROADMAP.md], but it treats validation as incomplete because .planning/STATE.md and the absence of production metrics conflict with the completed-phase claim [evidence: .planning/STATE.md; BUSINESS.md].

## Existing Narrative To Preserve

CivicState's intended path is a full pipeline from civic frustration to official action: infrastructure, submission, official lookup, regulation research, citation verification, letter drafting, moderation, payment, delivery, dashboard, admin tooling, and compliance [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md].

The current implementation already includes meaningful pieces of that shape: pricing tiers, submission moderation, job state machine, Prisma models, official lookup modules, legal citation modules, dashboard/admin pages, delivery and treasury tests [evidence: apps/api; apps/web; apps/worker; packages/shared; tests].

## Buildable Next Steps

- [ ] Product And Customer Definition: resolve the `brooks-history` versus CivicState identity conflict and record the operator ruling.
- [ ] What Is Real Today: run the local app stack and capture which submission, preview, payment, delivery, dashboard, and admin flows actually pass.
- [ ] Market Sizing: replace the assumption-led beta funnel with measured traffic, conversion, and paid submission cohorts.
- [ ] Revenue Model And Pricing: reconcile implemented Stripe tiers with live Stripe test-mode receipts and ledger entries.
- [ ] Go-To-Market: launch a constrained beta and instrument visitor-to-paid conversion, opt-in publication, and source attribution.
- [ ] Risks And Anti-Plan: test official lookup coverage, citation verification failure rates, and government inbox deliverability before broad launch.
- [ ] Assumption Ledger: add operator time, moderation queue depth, refund, bounce, and chargeback measurements to the data room.

## Validation Gates

Do not advance this project from watchlist to investible until operator identity is resolved, at least one paid end-to-end beta delivery is evidenced, and the .planning/ROADMAP.md versus .planning/STATE.md completion conflict is corrected [evidence: dispatch registry notes; .planning/ROADMAP.md; .planning/STATE.md].

## Deferred Work

Keep subscriptions, organization API access, certified mail, coalition features, multilingual support, and public social mechanics deferred until paid citizen demand and email deliverability are proven [evidence: MASTER_PLAN.md; .planning/PROJECT.md].
