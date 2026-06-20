# CivicState Roadmap

**Updated:** 2026-06-20 [evidence: worker dispatch date]

## Narrative

CivicState's existing planning narrative describes a four-phase build: foundation, AI pipeline, payment and delivery, and dashboard/compliance. [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)] The root roadmap now reframes that work for the business plan: the repository has meaningful product implementation, but the next milestone is diligence-grade validation, not feature expansion. [evidence: [BUSINESS.md](BUSINESS.md)]

The plan must also preserve the material mismatch between dispatch identity and repo reality. The wrapper calls this Brooks History, while the code, docs, package metadata, and product surface are CivicState. [evidence: worker dispatch, [package.json](package.json), [.planning/PROJECT.md](.planning/PROJECT.md)]

## Current Evidence State

- Monorepo, Prisma schema, API routes, worker agents, payment, delivery, dashboard, admin, and compliance surfaces exist. [evidence: [package.json](package.json), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts)]
- Existing planning docs were last materially updated on 2026-04-25. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/STATE.md](.planning/STATE.md)]
- There is no workspace evidence of paying users, production delivery rates, official response rates, chargebacks, refunds, or customer interviews. [evidence: repo inspection during EIR upgrade]

## Buildable Next Steps

- [ ] **Thesis Current:** resolve the Brooks History vs CivicState identity mismatch and record the operator ruling in `DECISIONS.md`. [evidence: worker dispatch; [package.json](package.json)]
- [ ] **Customer Definition:** run a 25-person beta recruitment list and document target customer segments before any feature expansion. [assumption: practical manual validation size]
- [ ] **Revenue Model:** execute at least 10 real paid Stripe test/beta campaigns at $5-$25 and record conversion, refunds, and support burden. [assumption: minimum signal threshold; prices are evidence in [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)]
- [ ] **Evidence Sources:** fix the compliance export/schema mismatch and rerun the compliance test surface before calling the app launch-ready. [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]
- [ ] **Market Sizing:** complete a ZIP/provider coverage audit for federal, state, and local official lookup across a small test set of 20 ZIP codes. [assumption: small enough for one worker; provider architecture is evidence in [apps/api/src/lib/officials/lookup.ts](apps/api/src/lib/officials/lookup.ts)]
- [ ] **Go-To-Market:** ship one issue-specific landing/workflow page and measure preview-to-payment conversion before adding public campaign SEO. [assumption: focused GTM validation]
- [ ] **Risks And Anti-Plan:** run a deliverability warm-up and record bounce/spam complaint outcomes before sending production civic letters. [evidence: [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)]

## Not Now

- No organizational API until individual paid campaigns are validated. [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)]
- No automated follow-up letters until compliance and complaint handling are proven. [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)]
- No public SEO campaign index until real delivery quality is known. [assumption: reputation and compliance risk control]
- No VC pitch as a business until the operator confirms business intent and the watchlist conditions clear. [evidence: registry note in worker dispatch]
