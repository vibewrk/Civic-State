# CivicState - Roadmap

As of 2026-06-23 [evidence: worker session date], CivicState has a substantial implementation scaffold and a prior build roadmap under `.planning/ROADMAP.md` [evidence: `.planning/ROADMAP.md`]. This root roadmap aligns that build work to the updated `BUSINESS.md` posture: watchlist, validation-first, and not near-term investible until operator and market proof exist [evidence: dispatch registry notes].

## Existing Narrative Preserved

CivicState's prior roadmap describes a full pipeline from civic concern to official action: foundation, AI pipeline, payment and delivery, dashboard, admin, and compliance [evidence: `.planning/ROADMAP.md`]. The repo now contains corresponding web, API, worker, database, moderation, payment, delivery, treasury, and admin code paths [evidence: `package.json`; `packages/shared/prisma/schema.prisma`].

The change is not product direction; it is evidence posture. Earlier roadmap language says phases are complete [evidence: `.planning/ROADMAP.md`], while the business plan now requires validation before this is described as investible [evidence: `BUSINESS.md`].

## Build Principles

- Prove customer demand before broadening scope.
- Keep legal, lobbying, and claims boundaries explicit.
- Measure official-domain deliverability before scaling traffic.
- Treat WrkPlug posture as an operator decision, not an assumed dependency [assumption: WrkPlug Phase 0 not yet signed].
- Keep every roadmap item traceable to a `BUSINESS.md` heading.

## Next Buildable Steps

- [ ] Thesis: write a one-page operator ruling on whether CivicState is a business pitch or personal/research asset.
- [ ] Problem & Customer: create a beta interview script and log template for civic-issue users.
- [ ] Market: replace placeholder TAM/SAM/SOM assumptions with a bottom-up worksheet tied to actual beta funnel data.
- [ ] Business Model: instrument preview-to-checkout conversion for the $5, $15, and $25 tiers [evidence: `apps/api/src/routes/payments.ts`].
- [ ] Go-To-Market: run a small nonpartisan beta cohort and record acquisition source, issue type, preview completion, and checkout outcome.
- [ ] Risks & Anti-Plan: execute deliverability tests, bounce tracking review, and moderation failure review before any public launch.
- [ ] Assumption Ledger: update `BUSINESS.md` after beta evidence replaces or falsifies each material assumption.

## Gate Criteria

Advance from watchlist only when operator confirmation is logged, paid conversion is measured against the 3% gate [assumption: preserved planning gate], deliverability is measured against the 85% gate [assumption: preserved planning gate], and legal/compliance review confirms the product can stay outside legal advice and lobbying representation.
