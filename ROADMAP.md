# CivicState Roadmap

Updated: 2026-06-21 [evidence: worker dispatch current_date]
Status: buildable candidate roadmap aligned to [BUSINESS.md](BUSINESS.md) [evidence: worker dispatch]

## Existing Narrative Preserved

The existing roadmap describes CivicState as a phased platform that turns civic frustration into official action through foundation work, AI pipeline work, payment and delivery, and dashboard/compliance capabilities [evidence: .planning/ROADMAP.md]. That narrative remains directionally right, but it is too complete-sounding for the current data room: the same repo also says the project is at foundation completion and that major submission, official lookup, drafting, payment, delivery, dashboard, and compliance requirements remain pending [evidence: .planning/STATE.md; .planning/REQUIREMENTS.md].

This roadmap therefore keeps the product direction and replaces the completion claim with a buildable validation path.

## Buildable Shape

The roadmap serves the business plan. The near-term goal is not to maximize feature count. The near-term goal is to prove a paid civic-letter workflow with safe moderation, verified citations, deliverability, and a support burden a single operator can handle [evidence: BUSINESS.md].

## Current Reality

Real implementation now includes a Next.js frontend, Express API, worker process, Prisma schema, BullMQ queue concepts, payment routes, moderation tests, compliance tests, and admin surfaces [evidence: apps/api/src/index.ts; apps/web/app/page.tsx; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; tests/api-routes.test.ts; tests/payment.test.ts; tests/compliance.test.ts].

Open questions remain around live deployment, official data coverage, production citation accuracy, real payment conversion, inbox placement, refund/chargeback behavior, and operator workload [evidence: BUSINESS.md].

## Validation Milestones

### Paid Wedge

Goal: prove that the target customer will pay for researched, routed constituent letters [evidence: BUSINESS.md].

Acceptance: a user can submit an issue, preview outputs, choose a $5.00, $15.00, or $25.00 package, authenticate, pay, and reach a payment-confirmed delivery state without manual database repair [evidence: tests/payment.test.ts; .planning/REQUIREMENTS.md].

### Safety and Citation Quality

Goal: do not send unsafe or low-trust civic communications [evidence: BUSINESS.md].

Acceptance: threats are blocked, defamation-risk content is review-queued, unverified citations are removed or escalated, and every moderation/citation outcome is auditable [evidence: tests/api-routes.test.ts; apps/api/src/lib/moderation.ts; apps/worker/src/lib/legal/citation-verifier.ts].

### Officials and Deliverability

Goal: the routing database is useful enough for federal, state, and local workflows [evidence: BUSINESS.md].

Acceptance: official lookup provides clear coverage confidence, opt-outs are enforced, bounces are tracked, and send pausing exists for high-risk recipient domains [evidence: .planning/REQUIREMENTS.md; packages/shared/prisma/schema.prisma].

### Operator Control

Goal: keep the launch workflow reviewable by a small operator team [evidence: BUSINESS.md].

Acceptance: admin queues expose flagged submissions, treasury status, official maintenance, delivery status, and job queues in one operator surface [evidence: apps/web/app/admin/page.tsx; apps/api/src/routes/admin.ts].

## Next Steps

- [ ] Current Thesis: resolve the CivicState versus Brooks History identity mismatch in operator-facing docs before pitching [evidence: BUSINESS.md].
- [ ] Customer Definition: run a paid beta script and record customer source, issue category, package selected, and support time per paid job [assumption: validation task].
- [ ] Product and Workflow: verify one local end-to-end path from submission to payment-confirmed delivery status using mocked external vendors [evidence: apps/api/src/index.ts; tests/payment.test.ts].
- [ ] Safety and Citation Quality: add a manual review checklist for flagged content, citation failures, and legal-adjacent submissions [evidence: BUSINESS.md].
- [ ] Financial Model: instrument actual token cost, delivery cost, refund, and support-time fields so the $12.44 contribution estimate can be replaced with evidence [assumption: BUSINESS.md model].
- [ ] Officials and Deliverability: complete the local official-provider spike and record coverage confidence by ZIP sample [evidence: .planning/STATE.md].
- [ ] Go-To-Market: publish only operator-approved public pages until moderation, defamation handling, and SEO policy are validated [assumption: risk-controlled GTM].
- [ ] Gate Artifact: keep `.ultra-start/gate.json` at candidate until POM soul-review and operator merge adopt it [evidence: worker dispatch gate instructions].

## Deferred

Subscriptions, API access, public campaign search, coalition features, certified mail, fax, dynamic pricing, AI reply summarization, and third-party organizational workflows remain deferred until the paid individual workflow is proven [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].
