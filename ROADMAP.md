# CivicState / brooks-history Roadmap

## Status

As of 2026-06-20 [evidence: runner environment date], this root roadmap reconciles the existing planning narrative with the EIR business plan. The registry project is `brooks-history` [evidence: dispatch registry notes], while the repo product is CivicState [evidence: [MASTER_PLAN.md](MASTER_PLAN.md); [.planning/PROJECT.md](.planning/PROJECT.md)].

## Existing Narrative Preserved

The inherited plan describes four build phases: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. The intended v1 workflow remains issue submission, official lookup, regulation research, citation verification, letter drafting, Stripe payment, Postmark email delivery, dashboard tracking, moderation, and compliance controls [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

The prior roadmap marks all four phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but `.planning/REQUIREMENTS.md` still shows many launch requirements unchecked and `.planning/STATE.md` says only foundation is complete [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [.planning/STATE.md](.planning/STATE.md)]. Treat existing phase completion as implementation progress, not market validation or production readiness.

## Business Alignment

The roadmap now serves the business plan's thesis: prove whether CivicState is a paid civic-correspondence utility before expanding scope. The core proof gates are paid conversion, government-domain deliverability, official coverage, citation integrity, moderation load, and operator confirmation that this repo should pitch as a business [evidence: [BUSINESS.md](BUSINESS.md); dispatch registry notes].

Deferred scope remains deferred: organization API, subscriptions, certified mail, fax, public comments, coalition mechanics, multilingual expansion, legal filings, regulatory submissions, and automated follow-up loops [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [MASTER_PLAN.md](MASTER_PLAN.md)].

## Buildable Next

- [ ] **Customer Definition:** operator ruling on whether `brooks-history` should be pitched as CivicState or remain a personal/research asset [evidence: dispatch registry notes].
- [ ] **What Is Real Today:** reconcile `.planning/ROADMAP.md`, `.planning/STATE.md`, and `.planning/REQUIREMENTS.md` into one launch-readiness truth table [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md); [.planning/STATE.md](.planning/STATE.md); [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- [ ] **Revenue Model:** reconcile `$15.00` three-official pricing in code with the five-letter Amplify language in the master plan [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); [MASTER_PLAN.md](MASTER_PLAN.md)].
- [ ] **Go To Market:** choose one beta geography and one issue-category wedge for official coverage and deliverability tests [assumption: narrow beta reduces validation noise].
- [ ] **Market Sizing:** create a ZIP-sample official coverage report for congress.gov, OpenStates, and one local provider candidate [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] [assumption: provider access must be configured].
- [ ] **Risks And Anti-Plan:** run a deliverability dry run that measures bounce, spam complaint, and reply-routing behavior before accepting paid public traffic [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- [ ] **Assumption Ledger:** instrument preview-to-paid conversion, refund rate, chargeback rate, moderation queue age, and operator minutes per flagged submission [evidence: [BUSINESS.md](BUSINESS.md)].

## Done Criteria

This roadmap is ready to advance only when the operator has confirmed project identity, pricing has one source of truth, a beta wedge is selected, the official coverage report exists, delivery testing is measured, and the first validation dashboard can show paid conversion and exception workload [assumption: EIR readiness criteria derived from the business plan].

