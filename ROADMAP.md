# CivicState Roadmap

## Current State

This roadmap aligns the existing CivicState implementation with the upgraded business plan dated 2026-06-21 [evidence: dispatch current_date]. It preserves the original build narrative: CivicState is a monorepo product with web, API, worker agents, Prisma data model, Stripe payments, Postmark delivery, moderation, admin, dashboard, and compliance surfaces [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md), [apps](apps), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

## What Is Already Built

- Foundation stack: pnpm workspaces, Express API, Next.js app, worker app, shared package, Docker assets, CI files, and tests [evidence: [package.json](package.json), [.github/workflows/ci.yml](.github/workflows/ci.yml)].
- Core workflow: submission creation, content moderation, classifier queueing, official lookup, research/drafting agents, payment session creation, Stripe webhook handling, delivery worker, dashboard/admin pages [evidence: [apps/api/src/routes](apps/api/src/routes), [apps/worker/src/agents](apps/worker/src/agents), [apps/web/app](apps/web/app)].
- Financial controls: ledger entries, treasury worker, reconciliation helper, budget ceiling logic, and admin treasury endpoint [evidence: [apps/worker/src/lib/treasury.ts](apps/worker/src/lib/treasury.ts), [apps/api/src/routes/admin.ts](apps/api/src/routes/admin.ts)].
- Compliance controls: privacy page, terms page, AI disclosure language, moderation tiers, audit logs, HMAC checksums, delivery suppression on spam complaints [evidence: [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx), [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx), [apps/api/src/lib/moderation.ts](apps/api/src/lib/moderation.ts), [apps/api/src/routes/webhooks.ts](apps/api/src/routes/webhooks.ts)].

## Surprise Spikes

- Existing `.planning/ROADMAP.md` marks all launch phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but `.planning/REQUIREMENTS.md` still has many unchecked requirements [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)]. Treat "complete" as code-generation phase completion, not market or production validation.
- Local official lookup is not complete: `lookupLocalOfficials` returns an empty array unless future Cicero integration is implemented, and even with an API key the file still contains a TODO [evidence: [apps/api/src/lib/officials/cicero.ts](apps/api/src/lib/officials/cicero.ts)].
- Registry context says the project is a personal/research watchlist asset, not near-term investible unless the operator confirms the business posture [evidence: dispatch registry note].

## Near-Term Roadmap

- [ ] **Thesis Current: operator ruling** - Confirm whether CivicState should be pitched as a business, a research asset, or a civic-tech demo; record the ruling in `DECISIONS.md` [evidence: dispatch registry note].
- [ ] **Customer Definition: beta cohort** - Define one constrained launch geography and recruit the first 25 beta users [assumption: small cohort is single-worker-sized and enough to expose workflow failures].
- [ ] **Market Sizing: bottom-up instrumenting** - Add analytics events for submit-start, preview-view, checkout-start, payment-complete, delivery-sent, delivery-delivered, bounce, spam complaint, and reply [assumption: instrumentation work, not source-code task in this soul upgrade].
- [ ] **Revenue Model: paid workflow audit** - Run an end-to-end paid test for the `$5.00`, `$15.00`, and `$25.00` tiers in Stripe test mode and verify ledger/audit records reconcile [evidence: pricing code exists in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- [ ] **Competition: manual benchmark** - Compare one CivicState output against one manually written constituent letter and one generic AI draft using the same issue prompt [assumption: practical differentiation test].
- [ ] **Risks And Anti-Plan: local official coverage spike** - Replace the Cicero stub with a real local-data decision: implement Cicero, pick another provider, or explicitly launch federal/state-only [evidence: [apps/api/src/lib/officials/cicero.ts](apps/api/src/lib/officials/cicero.ts)].
- [ ] **Go To Market: deliverability gate** - Send a limited internal domain-warming and delivery test, then document bounce/spam complaint behavior before accepting public users [evidence: Postmark delivery code in [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- [ ] **Evidence Sources And Freshness: external research refresh** - When network access is available, refresh competitor, legal, market, AI-pricing, and email-deliverability claims with dated source links [assumption: workspace-only mode prevented this on 2026-06-21].

## Validation Gates

The next operator review should require:

- At least 1 paid test order in each pricing tier [assumption: minimum smoke coverage].
- At least 1 completed delivery to a controlled recipient per tier [assumption: delivery smoke coverage].
- 0 untagged quantitative claims in the soul files [evidence: scrutiny requirement].
- A written local official data decision before public launch [evidence: Cicero stub].
- A legal/compliance review before any public campaign-page SEO rollout [assumption: risk-control requirement].

## Deferred

- Organization/API revenue remains future work until the consumer workflow has paid evidence [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Certified mail, fax, multilingual support, public campaign interaction, automated follow-up, and AI reply summarization remain deferred [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- Venture fundraising should remain deferred until demand, CAC, delivery, and compliance proof exist [evidence: dispatch registry note; assumption: VC-readiness standard].
