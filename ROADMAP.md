# CivicState — Roadmap

## Current Posture

CivicState has progressed beyond a paper plan: the repository contains web, API, worker, and shared packages with auth, submissions, officials lookup, AI worker agents, payments, delivery, treasury, dashboard, admin, and compliance surfaces [evidence: [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [apps/web/app/submit/page.tsx](apps/web/app/submit/page.tsx), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

The roadmap is not approved for scale work. As of 2026-06-23 [evidence: runner current_date], the business posture is watchlist / validation-required because the repo has no workspace evidence of live revenue, paid conversion, live deliverability, or market pull [evidence: [.planning/existing-state.md](.planning/existing-state.md); registry note in dispatch].

## Preserved Narrative

The existing planning narrative is still directionally useful: CivicState aims to turn a civic concern into researched, citation-backed letters delivered to the correct government officials, with moderation, citation verification, payment-before-delivery, delivery tracking, treasury controls, dashboard views, and compliance pages [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/ROADMAP.md](.planning/ROADMAP.md)].

The corrected roadmap serves the business plan by proving the narrow commercial loop before expanding scope: customer willingness to pay, official coverage, inbox delivery, citation quality, operator review burden, and legal/compliance comfort [assumption: EIR roadmap synthesis from BUSINESS.md].

## Buildable Next Work (wrk.dog)

- [ ] Problem & Customer: resolve the `brooks-history` versus CivicState identity mismatch in operator-facing records before publication.
- [ ] Market: run a ZIP coverage audit for federal, state, and local official lookup and record gaps by jurisdiction.
- [ ] Product & Moat: add an evidence report for citation verification outcomes, including stripped citations and human-review flags.
- [ ] Business Model: instrument the preview-to-payment funnel so $5, $15, and $25 tier selection [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] can be measured separately.
- [ ] Go-To-Market: define one constrained metro or issue-category launch lane with manual review before any broad SEO push.
- [ ] Risks & Anti-Plan: produce a deliverability proof report for SPF/DKIM/DMARC, bounce rate, spam complaints, and government-domain inbox placement.
- [ ] Platform Posture: decide whether CivicState remains standalone Clerk/Stripe/Postmark infrastructure or becomes a future WrkPlug-client candidate.

## Gates Before Scale

- Paid conversion must reach 3.0% [assumption: .planning/PROJECT.md validation gate] before broad acquisition spend.
- Government-domain inbox placement must reach 85% [assumption: .planning/PROJECT.md validation gate] before uncapped delivery.
- Federal/state official coverage must reach 95% [assumption: .planning/PROJECT.md validation gate] before national messaging.
- Chargeback rate must remain below 0.5% [assumption: .planning/PROJECT.md financial constraint] before higher-volume payments.
- Operator routine load must remain below 30 minutes per day [assumption: .planning/PROJECT.md operational constraint] before autonomous expansion.

## Deferred Work

Community features, certified mail, fax, automated follow-ups, real-time legal provider integrations, API products for organizations, multilingual support, and native mobile apps remain deferred until the paid letter loop is proven [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md), [MASTER_PLAN.md](MASTER_PLAN.md)].
