# CivicState Roadmap

Document date: 2026-06-22 [evidence: worker dispatch current_date]. This roadmap merges the existing CivicState narrative with the current EIR business plan.

## Current Position

The roadmap inherits the original four-phase story: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: .planning/ROADMAP.md]. The repo contains implementation for each major surface, including web, API, worker, Prisma schema, payments, delivery, admin, and compliance routes [evidence: apps/; packages/shared/prisma/schema.prisma].

However, roadmap status is not clean. `.planning/ROADMAP.md` says all four phases were complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/STATE.md` says only Phase 1 was complete and Phase 2 planning was next on 2026-04-25 [evidence: .planning/STATE.md]. Treat this roadmap as a validation and hardening roadmap, not a claim that production launch is complete.

## Roadmap Principle

The plan now serves the business thesis: prove that citizens will pay $5 to $25 for citation-backed civic letters and that the system can deliver them safely [evidence: apps/api/src/routes/payments.ts; BUSINESS.md]. Anything not required for paid delivery, citation trust, deliverability, or operator control stays deferred.

## Near-Term Buildable Shape

- [ ] Snapshot Product Reality: run a single local end-to-end submission through wizard, API, worker, preview, payment stub, and delivery stub; record what is real versus mocked.
- [ ] Validate Customer Definition: recruit a 25-submission concierge beta [assumption: small-batch validation threshold] and classify each buyer by issue type, urgency, and willingness to pay.
- [ ] Prove Revenue Model: reconcile Stripe payment records, ledger entries, and campaign status for each paid test order.
- [ ] Harden Evidence Sources: audit citation verification output for a representative sample before any real official delivery.
- [ ] Test Go To Market: publish only opt-in real campaign pages and track impressions, clicks, preview starts, and paid conversion.
- [ ] Measure Risks And Anti-Plan: log bounce rate, spam complaints, refunds, flagged submissions, and operator review minutes.
- [ ] Resolve Surprise Spikes: get operator confirmation on `brooks-history` versus CivicState naming and update public positioning accordingly.

## Deferred

- Organization/API access remains deferred until the individual paid loop works [evidence: .planning/GENESIS.md].
- Public community features, comments, votes, coalition mechanics, automated follow-up letters, certified mail, and multilingual support remain out of launch scope [evidence: .planning/GENESIS.md; .planning/PROJECT.md].
- Dynamic pricing and autonomous publisher behavior remain deferred until real variable costs and trust metrics are known [evidence: .planning/PROJECT.md].

## Validation Gates

- Paid demand: at least 25 paid beta submissions before claiming product-market signal [assumption: small-batch validation threshold].
- Conversion: preview-to-payment conversion at or above 3.0% before investing in SEO scale [assumption: validation gate from .planning/PROJECT.md].
- Deliverability: pause any official domain above 10% bounce rate [evidence: .planning/ROADMAP.md].
- Operations: flagged queue oldest item below 24 hours during beta [evidence: .planning/ROADMAP.md].
- Trust: zero delivered letters with fabricated citations in audited sample [assumption: launch-quality bar].
