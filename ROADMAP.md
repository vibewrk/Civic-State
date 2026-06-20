# Roadmap: CivicState / brooks-history Soul Alignment

## Overview

The existing `.planning/ROADMAP.md` describes a four-phase CivicState build [evidence: .planning/ROADMAP.md]: Foundation, AI Pipeline, Payment & Delivery, and Dashboard & Compliance. This root roadmap aligns that build narrative with the VC-grade business plan and the dispatch registry constraint that the project may be a personal/research asset rather than a near-term investible business [evidence: dispatch registry note].

## Current Reality

The product codebase contains the CivicState application skeleton and implementation surfaces for web, API, worker agents, data models, payments, officials, delivery, moderation, and compliance [evidence: package.json; apps; packages/shared/prisma/schema.prisma]. The business evidence is thinner: no repo evidence of paying customers, live production credentials, live deliverability, or external market research was available on 2026-06-20 [evidence: workspace inspection].

## Buildable Next Steps

- [ ] Current Thesis: obtain an operator ruling on whether this repo is CivicState, `brooks-history`, or a registry mismatch, then update the dossier name consistently.
- [ ] What Is Real Today: run the local Docker stack and record whether submissions, jobs, payments in test mode, and delivery stubs work end-to-end.
- [ ] Customer Definition: create a beta validation log for resident persona, issue type, willingness-to-pay outcome, and reason for drop-off.
- [ ] Revenue Model: add a simple transaction ledger sample showing $5, $15, and $25 packages [evidence: apps/api/src/routes/payments.ts] with Stripe fee, token estimate, and contribution math.
- [ ] Market Sizing: replace assumption-only sizing with sourced bottom-up inputs once network research or operator market data is available [assumption: no external market sources available in workspace-only mode].
- [ ] Go To Market: define the initial SEO validation page format and the success metric for indexed impressions, preview starts, and paid conversion.
- [ ] Risks And Anti-Plan: fix or explicitly waive the compliance route/model mismatch before any launch claim.
- [ ] Evidence Sources And Freshness: add a dated validation appendix after each live operator test or market interview.

## Phase Mapping

| Business heading | Existing build phase | Evidence |
|---|---|---|
| What Is Real Today | Phase 1 through Phase 4 implementation claims [evidence: .planning/ROADMAP.md] | [evidence: .planning/ROADMAP.md] |
| Customer Definition | Submission wizard and dashboard | [evidence: apps/web/app/submit; apps/web/app/dashboard] |
| Revenue Model | Payment & Delivery | [evidence: apps/api/src/routes/payments.ts] |
| Go To Market | Public campaign / SEO hypothesis | [evidence: MASTER_PLAN.md; .planning/GENESIS.md] |
| Risks And Anti-Plan | Moderation, compliance, delivery, treasury | [evidence: apps/api/src/routes; apps/worker/src/agents] |

## Gate Criteria

The next upgrade from "proposed soul" to "operator-adopted soul" should require: identity resolved, root soul docs accepted, local app smoke test recorded, unit economics reconciled against current code, and at least one operator-approved validation plan for paid demand and deliverability. The operator merge, not this document, is the adoption event [evidence: dispatch gate rule].
