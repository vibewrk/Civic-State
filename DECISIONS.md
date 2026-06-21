# Decisions

## 2026-06-21 - EIR soul upgrade (wrk.dog)

Changed the project soul from a thin planning-oriented profile into a scrutiny-ready data room view across BUSINESS.md, ROADMAP.md, and .ultra-start/gate.json.

Scrutiny gaps addressed: business-file, roadmap-file, decisions-file, gate-json, thesis-current, financial-figures, percent-figures, market-sizing, customer-definition, revenue-model, competition, risks-antiplan, assumption-ledger, go-to-market, honesty-labels, doc-dates, doc-structure, evidence-sources, freshness-stale, and roadmap-buildable-shape.

What changed:

- Reframed CivicState as a watchlist/research asset unless the operator confirms it should pitch as a business [evidence: dispatch registry note].
- Preserved the existing civic letter automation narrative from .planning/PROJECT.md, .planning/GENESIS.md, and .planning/ROADMAP.md.
- Added an assumption-led market sizing and revenue model because no live market research or production metrics were available in workspace-only mode.
- Surfaced surprise spikes instead of smoothing contradictions: older planning docs say zero app code exists, while the repo contains a real app skeleton; planning roadmap status conflicts with pending requirements; frontend/backend checkout tier keys do not align.
- Added a buildable Now / Next / Later roadmap tied back to BUSINESS.md headings.

What remains assumption and needs operator/market validation:

- Whether residents will pay $5, $15, or $25 for this workflow [evidence: apps/api/src/routes/payments.ts; assumption: willingness-to-pay validation required].
- Whether SEO can acquire enough qualified traffic [assumption: channel validation required].
- Whether government-domain deliverability and official response rates are acceptable [assumption: live delivery testing required].
- Whether legal/compliance posture is sufficient [assumption: counsel/operator review required].
- Whether this should be pitched as a business at all, given registry sensitivity that it may be personal/research rather than near-term investible BOS [evidence: dispatch registry note].

