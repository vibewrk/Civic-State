# Decisions

## 2026-06-19 [assumption: session date] - EIR soul upgrade (wrk.dog)

Changed: created root BUSINESS.md, ROADMAP.md, this DECISIONS.md, and .ultra-start/gate.json because the root soul files and native gate artifact were absent in this checkout [evidence: repo root inspection]. The new soul preserves the CivicState narrative from MASTER_PLAN.md and .planning while making the registry mismatch explicit: dispatch calls the project brooks-history, but repo evidence names CivicState [evidence: registry dispatch in worker brief; package.json; MASTER_PLAN.md].

Scrutiny gaps addressed: business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, and roadmap-buildable-shape.

What changed in substance: the plan now treats CivicState as a buildable research asset with real application code, not as an investible company by default [evidence: apps/api/src; apps/worker/src; packages/shared/prisma/schema.prisma]. Financials are a validation model, not a forecast. Market sizing is bottom-up and withheld until live acquisition, payment, delivery, and response data exist. Competitive claims are labeled as assumptions unless supported by repo planning files.

Still assumptive and requiring operator or market validation: willingness to pay at $5/$15/$25 [evidence: apps/api/src/routes/payments.ts], government inbox deliverability, official lookup coverage, moderation-review load, production legality/compliance posture, and whether this registry watchlist item should pitch as a business at all [evidence: registry dispatch in worker brief].
