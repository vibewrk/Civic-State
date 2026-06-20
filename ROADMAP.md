# CivicState Roadmap

## Overview

CivicState's original roadmap framed the build in foundation, AI pipeline, payment and delivery, and dashboard/compliance phases [evidence: .planning/ROADMAP.md]. That narrative remains directionally right, but the current repo already contains much of the application structure: Next.js web app, Express API, BullMQ worker agents, Prisma schema, Stripe flow, Postmark-oriented delivery code, treasury logic, admin pages, compliance routes, and tests [evidence: apps; evidence: packages/shared/prisma/schema.prisma; evidence: tests].

The next roadmap should therefore shift from "scaffold the app" to "produce investible evidence." The plan below keeps the original product shape while making the remaining work single-worker-sized and traceable to the business plan.

## Current Build State

- Web application routes exist for home, submission, dashboard, admin, privacy, terms, auth, success, and cancel flows [evidence: apps/web/app].
- API routes exist for health, submissions, officials, payments, webhooks, campaigns, admin, and compliance [evidence: apps/api/src/index.ts].
- Worker agents exist for classifier, researcher, drafter, delivery, treasury, and reconciliation [evidence: apps/worker/src].
- Prisma models cover the main launch data surface [evidence: packages/shared/prisma/schema.prisma].
- Test files cover payment, admin, moderation, compliance, delivery, campaigns, officials, treasury, and citation verification behaviors [evidence: tests].

## Validation Priorities

- Customer Definition: prove that an individual user completes the civic issue workflow and understands the product promise.
- Revenue Model And Pricing: prove actual willingness to pay across the $5.00, $15.00, and $25.00 tiers [evidence: apps/api/src/routes/payments.ts].
- Market Sizing Method: replace scenario math with observed acquisition, conversion, and repeat-use data.
- Go To Market: test manual beta acquisition before SEO claims.
- Risks And Anti-Plan: measure deliverability, citation accuracy, moderation workload, and platform-policy risk.
- Assumption Ledger: turn each major assumption into logged product telemetry or an operator review artifact.

## Next 6 Weeks

- [ ] Customer Definition: add a beta-intake rubric that records user segment, issue category, ZIP, motivation, and whether the user expected legal advice.
- [ ] Revenue Model And Pricing: add an internal pricing-conversion report by tier using completed Stripe payments and abandoned checkout sessions.
- [ ] Market Sizing Method: create a bottom-up validation worksheet from actual beta traffic, submissions, paid campaigns, refunds, and repeat users.
- [ ] Go To Market: run a manual beta cohort tracker with source, invite date, activation status, paid status, and qualitative objection notes.
- [ ] Risks And Anti-Plan: add an operator deliverability review checklist for bounced, failed, complained, and ignored official emails.
- [ ] Assumption Ledger: add a citation audit report that samples generated letters and records verified, unverifiable, and corrected citations.
- [ ] Competition: add a lightweight user-interview question that asks what the user would have done instead of CivicState.
- [ ] Investment Posture: produce a weekly validation memo that updates watchlist, continue, pause, or kill recommendation.

## Deferred Until Evidence Exists

- SEO public campaign archive beyond minimal opt-in pages [assumption: channel not yet proven].
- Organizational API access [evidence: .planning/PROJECT.md].
- Subscriptions or recurring billing [evidence: .planning/GENESIS.md].
- Certified mail, fax, or physical delivery [evidence: .planning/PROJECT.md].
- Automated follow-up campaigns [evidence: .planning/PROJECT.md].
- Crowdfunding adjacency [evidence: MASTER_PLAN.md].

## Exit Criteria For Watchlist Upgrade

CivicState should remain a watchlist project until it can show paid beta conversion, repeatable acquisition, safe official delivery, citation reliability, manageable moderation, and an internally reconciled unit-economics report [assumption: EIR gate].
