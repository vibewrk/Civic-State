# Decisions

## 2026-06-20 [evidence: worker dispatch date] - EIR soul upgrade (wrk.dog)

Changed the root soul from missing/thin artifacts into a diligence-grade business plan, buildable roadmap, and gate artifact. [evidence: worker dispatch; root file inspection]

Scrutiny gaps addressed: business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, and roadmap-buildable-shape. [evidence: worker dispatch]

Key judgment: this should remain watchlist/proposed, not adopted or investible, because the registry flags it as a personal/research asset unless the operator confirms business intent. [evidence: registry note in worker dispatch]

What changed:

- Created `BUSINESS.md` with a current thesis, customer definition, revenue model, financial model, bottom-up market sizing, competition, GTM, risks/anti-plan, assumption ledger, evidence sources, freshness notes, and surprise spikes. [evidence: [BUSINESS.md](BUSINESS.md)]
- Created `ROADMAP.md` with a single-worker buildable next-step list tied back to business-plan headings. [evidence: [ROADMAP.md](ROADMAP.md)]
- Created `gate.json` with proposed authority status and wrk.dog adoption note. [evidence: [gate.json](gate.json)]

What remains assumptions and needs operator/market validation:

- Whether this repo should pitch as CivicState the business, Brooks History, or a misfiled research asset. [evidence: worker dispatch, [package.json](package.json)]
- Whether users will pay $5-$25 for constituent letters. [assumption: no customer/revenue data exists in repo]
- Whether official lookup coverage, citation verification, and Postmark deliverability work in production. [assumption: implementation exists, production data absent]
- Whether compliance and legal posture are sufficient, especially given apparent schema mismatches in compliance export code. [evidence: [apps/api/src/routes/compliance.ts](apps/api/src/routes/compliance.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)]
