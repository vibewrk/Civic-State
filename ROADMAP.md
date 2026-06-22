# CivicState Roadmap

Document date: 2026-06-22 [assumption: runtime current date]. This roadmap preserves the existing narrative: CivicState is a phased build from infrastructure to AI pipeline, payment/delivery, dashboard, and compliance [evidence: `.planning/ROADMAP.md`]. It updates the operating stance: repo-local implementation exists, but business adoption remains unvalidated [evidence: `apps/api/src/index.ts`; evidence: `.planning/REQUIREMENTS.md`; evidence: registry note in wrk.dog dispatch].

## Roadmap Principle

The roadmap serves the business plan: validate paid constituent communication before adding breadth. Anything that does not test customer payment, official coverage, citation reliability, deliverability, or compliance stays deferred.

## Existing Narrative To Preserve

The prior roadmap organizes work into `4` phases: Foundation, AI Pipeline, Payment & Delivery, and Dashboard & Compliance [evidence: `.planning/ROADMAP.md`]. It marks all `4` phases complete [evidence: `.planning/ROADMAP.md`], but the requirements file still has many unchecked launch requirements [evidence: `.planning/REQUIREMENTS.md`]. The new interpretation is "implemented or scaffolded enough to inspect," not "market-ready."

## Buildable Validation Roadmap

- [ ] **Current Thesis:** reconcile repo identity and operator intent so wrk.vc presents CivicState as watchlist/research unless the operator confirms a business pitch.
- [ ] **Product Reality:** run one local end-to-end dry path from submission to worker queue to payment session with mocked external services and document the remaining failure points.
- [ ] **Customer Definition:** define the first beta cohort, exclusion rules, and consent/disclosure copy for individual constituent communications only.
- [ ] **Market Sizing:** instrument preview, checkout, and completion events needed to validate the `>=3%` conversion gate [evidence: `.planning/PROJECT.md`].
- [ ] **Revenue Model:** verify that `$5`, `$15`, and `$25` tiers reconcile with Stripe records, ledger entries, and treasury alerts [evidence: `apps/api/src/routes/payments.ts`; evidence: `.planning/REQUIREMENTS.md`].
- [ ] **Go To Market:** run the official-data provider spike for federal, state, and local coverage before any broad launch.
- [ ] **Risks And Anti-Plan:** complete deliverability, moderation, citation-verification, and legal-disclaimer checks before sending real user letters.

## Deferred

- Subscriptions, crowdfunding, social/community features, certified mail, fax, native mobile, multilingual support, API consumers, and autonomous follow-up letters remain out of launch scope [evidence: `.planning/REQUIREMENTS.md`; evidence: `MASTER_PLAN.md`].

## Evidence

- [`.planning/ROADMAP.md`](.planning/ROADMAP.md) [evidence].
- [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md) [evidence].
- [`.planning/PROJECT.md`](.planning/PROJECT.md) [evidence].
- [`apps/api/src/index.ts`](apps/api/src/index.ts) [evidence].
- [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts) [evidence].
