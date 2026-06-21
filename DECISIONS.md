# Decisions

## 2026-06-21 [evidence: dispatch current_date] - EIR soul upgrade (wrk.dog)

What changed:

- Created root BUSINESS.md, ROADMAP.md, DECISIONS.md, and `.ultra-start/gate.json` because the expected root soul files and native gate artifact were absent in the checkout [evidence: repo file inventory].
- Reframed the asset as CivicState based on package metadata, app code, planning files, and implemented routes, while preserving the dispatch/registry mismatch that names `brooks-history` [evidence: package.json; apps/web/app/page.tsx; dispatch registry notes].
- Replaced unsupported VC claims with honesty-labeled evidence and assumptions, including bottom-up market scenarios, revenue model reconciliation, customer definition, competition, risks, anti-plan, and assumption ledger [evidence: BUSINESS.md].
- Aligned the roadmap around buildable validation work rather than broad phase-complete claims from stale planning docs [evidence: ROADMAP.md; .planning/STATE.md; .planning/ROADMAP.md].

Scrutiny gaps addressed:

- business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, roadmap-buildable-shape [evidence: dispatch brief].

What remains assumption-led and needs operator or market validation:

- Whether the portfolio should present this as CivicState, Brooks History, or a non-investible personal/research asset [evidence: dispatch registry notes].
- Whether users will pay $5, $15, or $25 for constituent-letter delivery at launch [evidence: apps/api/src/routes/payments.ts].
- Whether deliverability, official coverage, official response rates, and legal/compliance posture hold in production [assumption: no live metrics in workspace].
- Whether SEO or public campaign pages can acquire users at low enough cost for a low-price transactional model [assumption: no traffic data in workspace].
