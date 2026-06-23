# CivicState Roadmap

Document date: 2026-06-23 [evidence: wrk.dog dispatch]. This roadmap merges the existing `.planning/ROADMAP.md` build narrative with the new EIR business gate.

## Existing Build Narrative

The existing planning roadmap says CivicState was built in 4 phases ending 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)]: foundation, AI pipeline, payment and delivery, and dashboard/compliance. Current source files support the presence of those surfaces: Next.js web app, Express API, BullMQ worker, Prisma schema, Stripe route, officials lookup, admin tools, dashboard, and compliance routes [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

Commercially, the next roadmap is not "more features." It is proof that the built loop creates paid, compliant, deliverable civic action.

## Now / Next / Later

- [ ] Thesis: resolve the `brooks-history` versus CivicState identity mismatch and record the operator ruling by 2026-07-15 [assumption: EIR checkpoint].
- [ ] Problem & Customer: create a validation script and interview tracker for 20 target users [assumption: small discovery sample].
- [ ] Product & Moat: run and document an end-to-end staging smoke test across submission, official lookup, research, preview, payment, delivery, dashboard, admin, and compliance paths by 2026-08-15 [assumption: build validation checkpoint].
- [ ] Market: replace the USD 30,000,000 TAM assumption with sourced market evidence or observed funnel data [assumption: no network research available in this run].
- [ ] Business Model: instrument the USD 5, USD 15, and USD 25 checkout funnel and reconcile paid submissions x tier mix to revenue [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts)].
- [ ] Competition: complete a no-network placeholder matrix for Resistbot, Change.org, Quorum, VoterVoice/Capitol Canary, manual outreach, and legal-help substitutes, then refresh with sources when network is available [assumption: named competitor set from EIR review].
- [ ] Risks & Anti-Plan: turn deliverability, legal-advice, harassment, defamation, and opt-out risks into launch-gate checklists before paid public launch [evidence: repo moderation/compliance surfaces].
- [ ] Financial Model: test the paid beta gate of 25 paid campaigns, 3.0% conversion, and 85.0% delivery success by 2026-09-30 [assumption: EIR validation target].

## Buildable Shape

Each item above is sized for one worker because it produces one concrete artifact: a decision entry, tracker, smoke-test note, market evidence update, funnel instrumentation plan, competitor matrix, risk checklist, or beta-readiness readout. None require speculative new product lines.

## Deferred

Subscriptions, public community mechanics, native apps, certified mail, API access for organizations, multilingual support, and automated follow-up remain deferred [evidence: [.planning/GENESIS.md](.planning/GENESIS.md)]. Re-open only after paid demand and delivery quality are proven.
