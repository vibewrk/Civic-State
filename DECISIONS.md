# Decisions

## 2026-06-23 - EIR soul upgrade (wrk.dog)

Changed the root soul from missing/thin to a VC-grade but deliberately skeptical plan for CivicState (fleet id: brooks-history). Added root `BUSINESS.md`, root `ROADMAP.md`, `.ultra-start/business-plan.json`, and `.ultra-start/thesis-review.json`; created this decisions log because the configured decisions path is `DECISIONS.md`. [evidence: dispatch brief; `.wrkdog-run/env-boundary.json`]

Scrutiny gaps addressed: business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, and roadmap-buildable-shape. [evidence: dispatch scrutiny gaps]

What changed: preserved the existing CivicState narrative from `.planning/PROJECT.md`, `.planning/GENESIS.md`, and `.planning/ROADMAP.md`; separated real code from aspirational claims; added a bottom-up TAM/SAM/SOM model; added named competitors and substitutes; added a reconciled three-year financial model; added a hard anti-plan; added a validation-driven roadmap; and marked every external market or valuation claim as `[assumption]` because this worker was workspace-only. [evidence: `.planning/PROJECT.md`, `.planning/GENESIS.md`, `.planning/ROADMAP.md`, `package.json`, `apps/api/src/routes/payments.ts`]

What remains `[assumption]` and needs operator/market validation: willingness to pay, preview-to-paid conversion, .gov inbox placement, local official coverage, legal citation relevance, organization/API expansion, WrkPlug chassis adoption, valuation bands, and whether this should be pitched as a business at all given the registry note that it is a watchlist personal/research asset rather than near-term investible BOS. [evidence: dispatch registry notes; assumption: validation priorities synthesized by wrk.dog EIR]
