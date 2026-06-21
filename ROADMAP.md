# CivicState Roadmap

## Overview

CivicState's existing planning roadmap says the foundation, AI pipeline, payment and delivery, and dashboard/compliance phases were completed on 2026-04-25 [evidence: `.planning/ROADMAP.md`]. The root roadmap now reframes the next work around investibility evidence: prove whether the implemented CivicState product can earn paid demand safely and repeatably.

This roadmap preserves the prior narrative: CivicState turns civic issues into researched, citation-backed letters to officials using a Next.js frontend, Express API, Prisma/PostgreSQL data model, BullMQ workers, Stripe payments, and Postmark-style delivery [evidence: `.planning/PROJECT.md`; `apps/web`; `apps/api/src`; `apps/worker/src`; `packages/shared/prisma/schema.prisma`]. It changes the build posture from "features complete" to "validation incomplete."

## Existing Build Record

- Foundation, AI pipeline, payment/delivery, and dashboard/compliance are marked complete in the prior roadmap [evidence: `.planning/ROADMAP.md`].
- The repo contains implementation surfaces for submission, official lookup, preview, payment, delivery tracking, admin tools, and compliance [evidence: `apps/api/src/routes`; `apps/web/app`; `apps/worker/src`; `tests`].
- The root soul files were missing before this upgrade [evidence: workspace scan], so the data-room narrative lagged behind the code.

## Current Buildable Shape

The next milestone is not a large feature expansion. It is a diligence sprint that a single worker can execute by touching product instrumentation, QA scripts, docs, and operator review flows in small units. Work should map back to these BUSINESS.md headings: What Is Real Today, Revenue Model, Financial Model, Go To Market, Competition, Risks And Anti-Plan, Assumption Ledger, and Evidence Sources And Freshness.

## Planning

- [ ] Align Revenue Model: reconcile $15 three-official code behavior with the five-letter package language in `MASTER_PLAN.md` [evidence: `apps/api/src/routes/payments.ts`; `MASTER_PLAN.md`].
- [ ] Prove Financial Model: add a simple operator-run report for paid submissions, average price, refunds, Stripe fees, token cost, email cost, and contribution after fixed cost [assumption: needed to validate BUSINESS.md financial model].
- [ ] Validate Go To Market: run a small beta cohort and record visitor-to-preview, preview-to-payment, delivery success, refund, and moderation queue metrics [assumption: needed to validate paid demand].
- [ ] Test Risks And Anti-Plan: run official-domain deliverability checks and record bounce, spam complaint, and suppression outcomes before public launch [assumption: needed because deliverability is a kill risk].
- [ ] Verify Customer Definition: interview or survey beta users after preview and after delivery to learn whether the buyer is an individual resident, neighborhood organizer, nonprofit staffer, or another segment [assumption: customer definition unvalidated].
- [ ] Strengthen Evidence Sources And Freshness: refresh stale API/vendor/legal claims with sourced research before making public or investor claims [assumption: no network research available in this worker].
- [ ] Resolve Surprise Spikes: decide whether the asset is `brooks-history` or CivicState, and update public naming only after operator confirmation [evidence: registry dispatch; `.planning/PROJECT.md`; `package.json`].

## Deferred

- Public campaign SEO engine remains deferred until paid delivery works [evidence: `.planning/GENESIS.md`; `MASTER_PLAN.md`].
- Organization/API sales remain deferred until consumer usage proves repeatable [evidence: `.planning/PROJECT.md`].
- Certified mail, fax, subscriptions, community features, search-before-create, and coalition mechanics remain out of scope for the next validation pass [evidence: `.planning/GENESIS.md`; `MASTER_PLAN.md`].

## Decision Gates

Continue only if the beta shows willingness to pay, safe citation handling, official targeting quality, and email deliverability. The inherited numeric gates are 3% preview-to-payment conversion [assumption: `.planning/PROJECT.md` validation gate], 85% inbox placement [assumption: `.planning/PROJECT.md` validation gate], 95% federal/state official coverage [assumption: `.planning/PROJECT.md` validation gate], and 60% local official coverage [assumption: `.planning/PROJECT.md` validation gate]. These are assumptions until measured in production or a controlled beta.
