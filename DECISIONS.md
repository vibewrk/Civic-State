# Decisions

## 2026-06-21 [evidence: worker dispatch current date] - EIR soul upgrade (wrk.dog)

Changed the repo soul from thin/missing root artifacts into an investibility-oriented data-room narrative: added `BUSINESS.md`, aligned this root `ROADMAP.md` to the plan, created a gate artifact, and recorded the current diligence posture [evidence: worker dispatch date; workspace scan].

Scrutiny gaps addressed: business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, and roadmap-buildable-shape [evidence: worker dispatch scrutiny list].

What changed materially:

- Treated the implemented asset as CivicState because the code, package metadata, app copy, and planning docs all describe CivicState, while the registry dispatch names `brooks-history` [evidence: registry dispatch; `package.json`; `.planning/PROJECT.md`; `apps/web/app/page.tsx`].
- Preserved the prior CivicState narrative but downgraded unsupported market claims to assumptions [evidence: `.planning/PROJECT.md`; `.planning/GENESIS.md`; `MASTER_PLAN.md`].
- Rebuilt the business case around the paid validation loop: $5, $15, and $25 tiers [evidence: `apps/api/src/routes/payments.ts`], plus explicitly unvalidated demand, deliverability, official coverage, and citation-quality gates.
- Added an anti-plan that can kill the project if beta users do not pay, official inbox deliverability fails, local official coverage is weak, citation verification is brittle, or operator burden exceeds the exception-based model [assumption: EIR diligence judgment grounded in repo risks].

What remains assumption-led and needs operator or market validation:

- Whether ordinary residents will pay for the workflow at the coded prices [assumption: no Stripe/customer evidence in repo].
- Whether the repo identity should stay `brooks-history` or be corrected publicly to CivicState [assumption: requires operator ruling].
- Whether government official inbox placement can meet the inherited 85% validation target [assumption: `.planning/PROJECT.md` target, no live measurement].
- Whether official lookup can meet the inherited 95% federal/state and 60% local coverage targets [assumption: `.planning/PROJECT.md` targets, no live measurement].
- Whether the inherited gross-margin and break-even models survive real token, email, refund, chargeback, hosting, and operator-time data [assumption: `MASTER_PLAN.md` model, no production financials].
