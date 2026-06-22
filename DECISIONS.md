# Decisions

## EIR soul upgrade (wrk.dog)

Decision date: 2026-06-22 [assumption: runtime current date]. Changed the root soul from missing/thin to a VC-grade, honesty-labeled watchlist plan for the repo-local CivicState product. Added `BUSINESS.md`, `ROADMAP.md`, and `.ultra-start/gate.json`; created this root `DECISIONS.md` because no root decisions file existed.

Scrutiny gaps addressed: business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, and roadmap-buildable-shape.

What changed:

- Reframed the thesis as conditional/watchlist rather than investible, matching the registry warning that this may be a personal/research asset and needs operator confirmation before pitching as a business.
- Preserved the CivicState product narrative from `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `.planning/REQUIREMENTS.md`, and `MASTER_PLAN.md`.
- Separated built repo reality from unvalidated claims by citing current Express, worker, payment, and Prisma files as evidence.
- Added bottom-up financial and market-sizing models using repo prices and explicit assumptions.
- Added a harder anti-plan: no VC-ready pitch until paid conversion, deliverability, and official-data coverage gates clear.

Still assumption and needing operator/market validation:

- Whether `brooks-history` should be represented as CivicState or whether the dispatch identity indicates a renamed/misrouted repo.
- Whether users will pay at `$5`, `$15`, or `$25` price points [evidence: `.planning/PROJECT.md`; evidence: `apps/api/src/routes/payments.ts`].
- Whether `.gov` deliverability, local official coverage, legal/compliance controls, and human moderation workload can meet the repo's own gates.
- Whether this should remain research/IP or become a business-of-scale candidate.
