# Decisions

## EIR soul upgrade (wrk.dog)

Date: 2026-06-20 [evidence: system current date]

Changed: created root `BUSINESS.md`, `ROADMAP.md`, `DECISIONS.md`, and `gate.json` so the repo has a VC-grade soul surface aligned to the existing CivicState code and planning record [evidence: BUSINESS.md; ROADMAP.md; gate.json]. The plan preserves the existing thesis around AI-assisted civic letters, official targeting, citation verification, Stripe checkout, Postmark delivery, treasury controls, moderation, and admin review [evidence: .planning/PROJECT.md; .planning/ROADMAP.md; MASTER_PLAN.md; apps/api/src/routes/submissions.ts; apps/api/src/routes/payments.ts; apps/worker/src/agents/researcher.ts].

Scrutiny gaps addressed: business file, roadmap file, decisions file, gate JSON, current thesis, financial figures, percentage figures, market sizing, customer definition, revenue model, competition, anti-plan risks, assumption ledger, go-to-market, honesty labels, document dates, document structure, evidence sources, stale freshness signals, and buildable roadmap shape [evidence: worker dispatch scrutiny list; gate.json].

What remains assumed and needs operator or market validation: willingness to pay for $5-$25 civic-letter packages [assumption: no paid conversion evidence found], 3% preview-to-paid conversion [evidence: .planning/PROJECT.md], 85% government inbox placement [evidence: .planning/PROJECT.md], 95% federal/state coverage and 60% local coverage [evidence: .planning/PROJECT.md], official-contact completeness given the Cicero stub and Congress.gov blank email field [evidence: apps/api/src/lib/officials/cicero.ts; apps/api/src/lib/officials/congress.ts], fee-inclusive margin preservation above 40% [evidence: .planning/PROJECT.md; apps/api/src/routes/payments.ts], and the operator ruling on whether this watchlist personal/research asset should pitch as a business [evidence: registry dispatch].
