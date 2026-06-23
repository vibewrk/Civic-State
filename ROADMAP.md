# CivicState Roadmap

**As-of date:** 2026-06-23 [evidence: runner current date]. This roadmap merges the existing planning narrative with the new business-plan gate. The prior roadmap says Phase 1 through Phase 4 were completed on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while state tracking still reports Phase 1 as current on 2026-04-25 [evidence: [.planning/STATE.md](.planning/STATE.md)].

## Existing Narrative

CivicState is intended to move a user from civic concern to researched, citation-backed letters delivered to government officials. The planning corpus defines four build phases: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)].

The codebase now includes a web app, API app, worker app, shared Prisma schema, moderation, official lookup, Stripe checkout, delivery/treasury workers, dashboards, admin views, and compliance pages [evidence: repo scan 2026-06-23]. The roadmap therefore shifts from "can it be scaffolded?" to "can the business claims survive validation?"

## Buildable Next Steps

- [ ] Thesis Current: record an operator ruling on whether this is a business pitch or a personal/research asset [evidence: dispatch registry notes].
- [ ] Customer Definition: run a manual validation batch with 10 target residents [assumption: small validation sample] and record willingness-to-pay outcomes.
- [ ] Revenue Model: run Stripe test-mode payments across the $5, $15, and $25 tiers [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)] and reconcile each to ledger entries.
- [ ] Market Sizing Method: replace the $150,000,000 TAM proxy, $15,000,000 SAM proxy, and $900,000 SOM target with sourced or first-party inputs [assumption: current BUSINESS.md model].
- [ ] Go To Market: publish a no-index pilot path first, then enable indexed campaign pages only after delivery and consent controls pass review [assumption: risk-controlled SEO sequencing].
- [ ] Competition: complete a workspace-cited battlecard for Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice after network research is available [evidence: [BUSINESS.md](BUSINESS.md)].
- [ ] Risks And Anti-Plan: execute a deliverability spike against government-like domains and compare results to the >=85% inbox-placement gate [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Validation Gates

- Willingness to pay: >=3% conversion from qualified preview to paid checkout [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Deliverability: >=85% inbox placement on relevant official domains [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Official coverage: >=95% federal/state and >=60% local coverage [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Payment risk: chargebacks below 0.5% [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Unit economics: maintain the 40% net margin floor [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Serving The Plan

This roadmap serves [BUSINESS.md](BUSINESS.md). Work that does not validate demand, delivery, citation quality, compliance posture, or unit economics should stay deferred until the proposed gate is either adopted or rejected.
