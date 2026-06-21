# Brooks History / CivicState - Roadmap

## Current Narrative

The existing implementation and planning narrative are CivicState-shaped: a web platform that turns civic concerns into researched, citation-backed letters delivered to government officials for $5-$25 [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]. The repo now contains the corresponding app surfaces: Next.js web, Express API, BullMQ workers, Prisma models, payment routes, delivery webhooks, admin views, compliance pages, and citation modules [evidence: [apps/api/src/index.ts](apps/api/src/index.ts); [apps/worker/src/index.ts](apps/worker/src/index.ts); [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

The business roadmap is conditional because the registry note says this project is a watchlist personal/research asset and not near-term investible unless the operator confirms it should pitch as a business [evidence: dispatch registry note]. Until then, roadmap work should validate identity and evidence before adding features.

## Roadmap Principles

- Preserve the CivicState work already present in the repo [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)].
- Treat all market, pricing, conversion, and valuation claims as assumptions until tested against real users.
- Do not expand into organization APIs, subscriptions, certified mail, or public campaign community mechanics before the individual paid-delivery loop works [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Do not claim investibility while the Brooks History versus CivicState identity mismatch remains unresolved [evidence: dispatch registry note].

## Buildable Next Work (wrk.dog)

- [ ] Thesis and Platform Posture: record the operator ruling on whether Brooks History is CivicState, a research archive, or a repo mismatch.
- [ ] Problem & Customer: define the beta ICP and acceptance criteria for paid civic-letter users.
- [ ] Market and Go-To-Market: instrument preview-to-paid conversion, source channel, and campaign topic so the SEO thesis can be tested.
- [ ] Product & Moat: audit citation verification, officials lookup, and delivery status paths against current source code.
- [ ] Business Model: build a small revenue dashboard that reconciles Stripe payments, package tier, direct costs, and margin assumptions.
- [ ] Risks & Anti-Plan: run a deliverability and moderation tabletop before any real official email delivery.
- [ ] Assumption Ledger: convert the biggest assumptions in BUSINESS.md into tracked experiments with pass, fail, or revise outcomes.

## Keep From Existing Plan

Keep the four CivicState workstreams as historical context: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. They remain useful implementation categories, but they should no longer be treated as sufficient business proof.

## Gates Before Scale

- Operator identity ruling is required before investor-facing positioning.
- Paid conversion, official coverage, and deliverability gates from the prior soul must be tested before scaling [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- WrkPlug client posture should be resolved before the app doubles down on standalone auth, billing, and identity rails [assumption: WrkPlug Phase 0 not yet signed].
