# CivicState Roadmap

## Context

The prior planning roadmap marks Foundation, AI Pipeline, Payment & Delivery, and Dashboard & Compliance complete on 2026-04-25 [evidence: .planning/ROADMAP.md]. Current repo evidence supports that a broad application surface exists, including web, API, worker, shared Prisma schema, tests, admin routes, payment routes, and compliance routes [evidence: apps/, packages/, tests/]. This roadmap now serves the business plan rather than re-declaring build completion.

## Preserved Narrative

CivicState still aims to move a resident from civic frustration to official action through issue intake, official matching, citation-backed research, letter drafting, payment, delivery, and tracking [evidence: .planning/PROJECT.md]. The original build lanes remain useful as historical structure: infrastructure, AI pipeline, payment/delivery, and dashboard/compliance [evidence: .planning/ROADMAP.md].

## Buildable Soul Upgrade Roadmap

- [ ] **Thesis Current:** reconcile stale planning files with current repo truth, especially the code-present versus greenfield contradiction.
- [ ] **Customer Definition:** run an operator-approved closed beta script for individual residents and record whether the buyer is a consumer, researcher, or non-business user.
- [ ] **Revenue Model:** verify the $5, $15, and $25 tiers end-to-end through Stripe test mode and ledger recording [evidence: apps/api/src/routes/payments.ts].
- [ ] **Financial Figures:** replace planning costs with observed Stripe fees, AI token costs, Postmark costs, and hosting bills from a real test ledger.
- [ ] **Go-to-Market:** test a direct channel before SEO expansion and record checkout conversion against the 3% gate [evidence: .planning/PROJECT.md].
- [ ] **Risks and Anti-Plan:** fix schema/route mismatches in compliance export before any public launch claim [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].
- [ ] **Evidence Sources:** add operator-owned validation artifacts for deliverability, official coverage, citation verification, and human review workload.

## Gate Criteria

CivicState may move out of Watchlist only after the operator confirms this should be pitched as a business and repo evidence shows paid conversion, deliverability, official targeting, citation verification, and exception handling. POM soul-review plus wrk.dog merge constitute adoption under the operator ruling dated 2026-06-12 [evidence: worker dispatch].
