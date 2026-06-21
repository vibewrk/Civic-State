# CivicState Roadmap

**As of:** 2026-06-21 [evidence: dispatch current_date]  
**Source narrative merged from:** [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md), [MASTER_PLAN.md](MASTER_PLAN.md), and current app code [evidence].

## Current Shape

CivicState is intended to deliver the pipeline from civic frustration to official action: intake, official lookup, legal/regulatory research, citation verification, letter drafting, payment, delivery, dashboards, admin review, and compliance [evidence: .planning/ROADMAP.md].

The existing planning narrative claims broad phase completion, but repo state and stale planning docs disagree. This roadmap therefore uses the existing narrative as context and resets the near-term plan to buildable validation work that supports the business plan [evidence: .planning/STATE.md; .planning/ROADMAP.md; BUSINESS.md].

## Preserved Milestones

- Foundation: monorepo, Docker, CI/CD intent, database schema, auth, agent engine, and domain-warming plan [evidence: .planning/ROADMAP.md].
- AI Pipeline: guided submission, official lookup, research, citation verification, drafting, and moderation [evidence: .planning/ROADMAP.md; apps/api/src/routes/submissions.ts; apps/worker/src/agents/researcher.ts].
- Payment And Delivery: Stripe tiers, Postmark delivery, bounce tracking, and treasury controls [evidence: .planning/ROADMAP.md; apps/api/src/routes/payments.ts].
- Dashboard And Compliance: user campaign tracking, admin tooling, privacy, terms, AI disclosure, deletion workflow, and audit logging [evidence: .planning/ROADMAP.md; apps/api/src/index.ts].

## Now

- [ ] Thesis Current: resolve the `brooks-history` versus CivicState identity conflict and record the operator ruling in DECISIONS.md.
- [ ] Customer Definition: recruit a private beta cohort with real civic issues and log whether they are users, payers, or only research participants.
- [ ] Revenue Model: run checkout validation for the $5, $15, and $25 Stripe tiers and reconcile payment records to ledger entries.
- [ ] Market Sizing: replace the scenario envelope with observed beta volume, tier mix, conversion, and repeat usage.
- [ ] Go To Market: ship only opt-in public campaign pages after compliance review and measure first search impressions.
- [ ] Competition: complete no-network assumptions with sourced competitor research before any investor-facing publication.
- [ ] Risks And Anti-Plan: test deliverability, bounce handling, official opt-outs, and moderation escalation before opening public traffic.

## Next

- Harden official lookup coverage with federal, state, and local provider evaluation [evidence: .planning/PROJECT.md].
- Verify citation stripping and human-review behavior on realistic issue fixtures [evidence: apps/worker/src/agents/researcher.ts].
- Confirm that the compliance pages, CCPA deletion route, and audit logs operate against the deployed data model [evidence: apps/api/src/index.ts; packages/shared/prisma/schema.prisma].
- Add a metrics snapshot that reports paid submissions, gross revenue, refund/chargeback count, bounce rate, inbox placement proxy, official coverage, and response rate [assumption: needed to graduate from watchlist].

## Later

Deferred work remains deferred until validation clears:

- Organization/API revenue for HOAs, nonprofits, and civic groups [evidence: .planning/PROJECT.md].
- Certified mail, fax, multilingual support, and native mobile apps [evidence: .planning/REQUIREMENTS.md].
- AI reply summarization, dynamic pricing, and autonomous follow-up loops [evidence: .planning/REQUIREMENTS.md].
- Public campaign search and coalition/social mechanics [evidence: .planning/GENESIS.md; MASTER_PLAN.md].

## Graduation Gates

- Operator confirms whether this is CivicState, Brooks History, or a renamed research asset [evidence: dispatch registry notes].
- Private beta proves at least one paid end-to-end delivery through the implemented payment and delivery pipeline [assumption: minimum commercial proof].
- Evidence replaces assumptions for conversion, deliverability, official coverage, response rates, and acquisition [assumption: required for wrk.vc investor-grade dossier].
