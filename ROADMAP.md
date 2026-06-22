# CivicState Roadmap

Prepared as of 2026-06-22 [evidence: dispatch current_date]. This root roadmap preserves the prior `.planning/ROADMAP.md` narrative that CivicState is a four-phase civic letter workflow [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], but reframes the next work around business validation rather than feature completion.

## Existing Narrative To Preserve

CivicState aims to move a resident from civic frustration to official action through a pipeline of submission, moderation, official lookup, regulation research, citation verification, drafting, payment, delivery, dashboarding, and operator controls [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/ROADMAP.md](.planning/ROADMAP.md)].

The previous roadmap marked Phase 1, Phase 2, Phase 3, and Phase 4 complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]. That should be read as build-plan completion, not market proof. `.planning/STATE.md` is stale and still reports Phase 1 complete as the current position [evidence: [.planning/STATE.md](.planning/STATE.md)].

## Now

- [ ] **Thesis - identity ruling:** Resolve whether `brooks-history` should publish as CivicState or remain a personal/research asset; update wrk.vc copy only after operator ruling [evidence: dispatch registry notes].
- [ ] **Problem & Customer - beta cohort:** Define the first 25 operator-approved beta submissions and the issue categories allowed in the closed test [assumption: validation sample sized for manual review].
- [ ] **Market - bottom-up instrumentation:** Add a simple dashboard spec for paid submissions, preview-to-paid conversion, acquisition source, and repeat issue rate before any SEO expansion [assumption: validation-first operating model].
- [ ] **Business Model - checkout proof:** Run Stripe test-to-live readiness for USD 5, USD 15, and USD 25 tiers and record actual fees per paid submission [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- [ ] **Product & Moat - official-data spike:** Decide the federal/state/local official provider mix and measure lookup coverage against the 95 percent federal/state and 60 percent local targets [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- [ ] **Go-To-Market - closed beta launch:** Recruit the first 100 prospective users from operator channels and local civic threads without paid acquisition [assumption: channel hypothesis].
- [ ] **Risks & Anti-Plan - deliverability gate:** Measure government-domain delivery acceptance against the 85 percent target and enforce the 10 percent per-domain bounce pause [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- [ ] **Assumption Ledger - review queue load:** Track flagged submissions, average review age, and operator time to test whether one operator can run launch exceptions [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

## Validation Milestones

| Date | Milestone | Required proof |
| --- | --- | --- |
| 2026-06-30 | Soul gate ready | BUSINESS.md, ROADMAP.md, DECISIONS.md, and `.ultra-start/gate.json` reviewed [assumption: operator workflow] |
| 2026-07-15 | Official-data decision | Provider cost, coverage, and failure modes documented [assumption: spike output] |
| 2026-08-15 | Closed beta completion | 25 operator-approved submissions processed end-to-end [assumption: validation target] |
| 2026-09-30 | Paid validation gate | 3 percent conversion, 85 percent delivery acceptance, and below 0.5 percent chargeback rate [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)] |
| 2026-12-31 | Continue / pause decision | Continue only with real paid usage, measured delivery, and operator intent confirmed [assumption: investor review date] |

## Deferred Until Proof

Organization/API access, paid acquisition, native mobile apps, dynamic pricing, certified mail, fax delivery, public campaign SEO at scale, and automated follow-up letters remain deferred until the closed beta proves willingness to pay and deliverability [evidence: [.planning/PROJECT.md](.planning/PROJECT.md); [.planning/GENESIS.md](.planning/GENESIS.md)].
