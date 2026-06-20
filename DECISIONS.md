# Decisions

## 2026-06-20 — EIR soul upgrade (wrk.dog)

Changed:

- Created the root `BUSINESS.md`, `ROADMAP.md`, `DECISIONS.md`, `.ultra-start/business-plan.json`, and `.ultra-start/thesis-review.json` soul artifacts. [evidence: environment_context current_date]
- Reframed the project as CivicState, a civic-letter product, while preserving the surprise that the dispatch project id is `brooks-history`. [evidence: user dispatch; evidence: `package.json`; evidence: `.planning/PROJECT.md`]
- Preserved the existing CivicState narrative from `.planning/PROJECT.md`, `.planning/GENESIS.md`, `.planning/ROADMAP.md`, implementation files, and tests, but relabeled market, demand, valuation, and external competitor claims as assumptions because this worker run had no network. [evidence: `.planning/PROJECT.md`; evidence: `.planning/GENESIS.md`; evidence: `.planning/ROADMAP.md`; assumption: workspace-only research limit]
- Made the anti-plan sharper: willingness to pay, deliverability, citation/legal-adjacent risk, official data coverage, template contamination, and registry posture can kill the business. [assumption: EIR critique]
- Set gate status to `needs-revision` / `WAIT`; only operator merge and POM soul-review can adopt it. [evidence: `.ultra-start/business-plan.json`]

Scrutiny gaps addressed:

- `business-file`, `roadmap-file`, `decisions-file`, `gate-json`, `thesis-current`, `financial-figures`, `percent-figures`, `market-sizing`, `customer-definition`, `revenue-model`, `competition`, `risks-antiplan`, `assumption-ledger`, `go-to-market`, `honesty-labels`, `doc-dates`, `doc-structure`, `evidence-sources`, `freshness-stale`, and `roadmap-buildable-shape`. [evidence: user dispatch scrutiny gaps]

What remains `[assumption]` and needs operator/market validation:

- Whether the operator wants this repo pitched as a business at all, given the registry note that it is a personal/research asset and not near-term investible BOS. [evidence: registry note in dispatch]
- Whether users will pay $5, $15, or $25 for this workflow. [evidence: `apps/api/src/routes/payments.ts`; assumption: no paid-customer evidence found]
- Whether `.gov` deliverability can meet >=85% inbox placement. [evidence: `.planning/PROJECT.md`; assumption: no production delivery logs found]
- Whether official coverage can reach >=95% federal/state and >=60% local. [evidence: `.planning/PROJECT.md`; assumption: local provider unchosen]
- Whether legal review approves the AI disclosure, not-legal-advice boundary, citation-backed drafting, opt-out, and moderation posture. [assumption: legal review required; no legal conclusion made]
- Whether WrkPlug becomes the shared platform chassis and makes the current Clerk/Stripe/Postmark implementation prototype-only. [assumption: WrkPlug Phase 0 not yet signed]

External orientation links recorded as assumptions, not evidence: https://resist.bot, https://www.quorum.us, https://votervoice.net. [assumption: no network verification in this run]
