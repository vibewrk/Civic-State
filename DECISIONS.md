# Decisions

## 2026-06-19 [evidence: dispatch current_date] - EIR soul upgrade (wrk.dog)

Changed: created root soul artifacts for CivicState, including a VC-grade business plan, aligned roadmap, and proposed gate artifact. The upgrade preserves the original thesis from `MASTER_PLAN.md` and `.planning/PROJECT.md`, but re-anchors it to current repo evidence: the worktree now contains application code, Prisma schema, payment routes, worker agents, admin/compliance routes, and tests.

Scrutiny gaps addressed: business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, and roadmap-buildable-shape.

Remaining assumptions needing operator or market validation: whether this personal/research asset should be pitched as a business at all; whether residents will pay the $5-$25 implemented price points [evidence: apps/api/src/routes/payments.ts; willingness-to-pay remains assumption]; whether government inbox deliverability and official coverage meet the existing validation gates; whether AI citation verification is reliable enough; and whether one operator can safely handle flagged legal-adjacent content [assumption: inherited operating model from .planning/GENESIS.md].
