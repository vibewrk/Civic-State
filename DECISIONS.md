# Decision Log

This file is append-only. Dates use ISO format.

## 2026-06-23 - EIR soul upgrade (wrk.dog) [evidence: dispatch current_date]

Changed:

- Created root `BUSINESS.md` as the VC-grade but provisional plan for CivicState.
- Created root `ROADMAP.md` aligned to `BUSINESS.md` and constrained to buildable validation work.
- Created root `.ultra-start/gate.json` as the provisional gate artifact.
- Preserved the repo's existing CivicState narrative from `MASTER_PLAN.md`, `.planning/PROJECT.md`, `.planning/GENESIS.md`, and `.planning/ROADMAP.md`.

Scrutiny gaps addressed:

- business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, roadmap-buildable-shape.

What remains assumption and needs operator/market validation:

- Whether the registry's personal/research asset should be operated and pitched as a business.
- Whether residents will pay $5-$25 for the workflow [evidence: `apps/api/src/routes/payments.ts`; assumption: willingness to pay unvalidated].
- Whether government email deliverability can clear the 85% gate [evidence: `.planning/PROJECT.md`].
- Whether official data coverage can clear the 95% federal/state and 60% local gates [evidence: `.planning/PROJECT.md`].
- Whether one operator can safely handle flagged submissions and legal/compliance review at launch volume.
- Whether SEO can become a reliable acquisition channel without paid acquisition.

Rationale:

The codebase is materially more advanced than stale planning docs imply, but it still lacks evidence of live revenue, deployed production traction, government inbox placement, and independent market sizing. The correct authority is provisional until operator adoption and market proof exist.
