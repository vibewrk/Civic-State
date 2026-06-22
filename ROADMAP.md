# CivicState Roadmap

## Status

As of 2026-06-22 [evidence: dispatch current_date], the repo contains substantial CivicState application code, but the business remains a watchlist personal/research asset until operator validation says otherwise [evidence: dispatch registry notes; apps/]. This roadmap merges the prior four-phase narrative from `.planning/ROADMAP.md` with the diligence posture in `BUSINESS.md`: build only what proves or de-risks the core paid civic-letter loop.

## Existing Narrative To Preserve

The original roadmap framed CivicState as a four-phase product: foundation, AI pipeline, payment and delivery, then dashboard and compliance [evidence: .planning/ROADMAP.md]. The intended loop remains correct: a resident describes an issue, the system finds relevant officials and citations, drafts compliant letters, accepts payment, delivers via email, and tracks outcomes [evidence: .planning/PROJECT.md; MASTER_PLAN.md].

The correction is evidentiary. `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/REQUIREMENTS.md` still marks many requirements pending [evidence: .planning/REQUIREMENTS.md]. Current roadmap status should therefore be based on runnable code, tests, staging verification, and validation metrics rather than historical checkboxes.

## Buildable Shape

- [ ] **Snapshot Thesis:** resolve the `brooks-history` versus CivicState identity mismatch in public-facing soul and operator notes [evidence: dispatch; package.json].
- [ ] **Product Reality:** run a staging smoke test for web, API, worker queues, PostgreSQL, Redis, Clerk, Stripe webhook, and Postmark webhook [evidence: apps/web; apps/api/src/index.ts; apps/worker/src/index.ts].
- [ ] **Product Reality:** fix or explicitly document the compliance export field mismatch against the Prisma schema before any launch claim [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].
- [ ] **Customer Definition:** define the first validation cohort by geography, issue category, inclusion criteria, and excluded legal-adjacent use cases [evidence: BUSINESS.md].
- [ ] **Market Sizing:** run a ZIP-code official coverage audit against the repo gates of at least 95% federal/state coverage and at least 60% local coverage [evidence: .planning/PROJECT.md].
- [ ] **Financial Model:** instrument checkout tier mix, token cost, delivery cost, refunds, chargebacks, and human-review time for each paid beta submission [evidence: BUSINESS.md; apps/api/src/routes/payments.ts].
- [ ] **Go To Market:** run an operator-led beta before SEO claims, measuring preview completion and at least 3% preview-to-payment conversion [evidence: .planning/PROJECT.md; BUSINESS.md].
- [ ] **Risks And Anti-Plan:** complete legal/compliance review for AI disclosure, not-legal-advice language, opt-out handling, data deletion, and political-speech privacy before scale-up [evidence: MASTER_PLAN.md; apps/api/src/routes/compliance.ts].

## Proof Gates

1. Product identity is resolved by operator decision [evidence: dispatch registry notes].
2. Staging deploy passes an end-to-end unpaid preview and paid delivery dry run [assumption: required launch-readiness gate].
3. Official coverage clears at least 95% federal/state and at least 60% local coverage [evidence: .planning/PROJECT.md].
4. Deliverability clears at least 85% .gov inbox placement [evidence: .planning/PROJECT.md].
5. Paid beta clears at least 3% preview-to-payment conversion and chargebacks remain below 0.5% [evidence: .planning/PROJECT.md].
6. Operator confirms this should be positioned as a business rather than only a personal/research asset [evidence: dispatch registry notes].

## Deferred Until Gates Clear

Do not prioritize paid acquisition, organization APIs, certified mail, fax, public coalition features, multi-language support, native mobile apps, multi-state scale-up, or automated follow-up letters until the proof gates above are met [evidence: .planning/REQUIREMENTS.md; BUSINESS.md].

## Freshness

Updated 2026-06-22 [evidence: dispatch current_date]. Re-review by 2026-09-22 [assumption: quarterly soul refresh cadence] or immediately after production deployment, paid beta results, legal review, or operator identity decision.
