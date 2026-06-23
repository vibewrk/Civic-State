# CivicState - Roadmap

## Context

This roadmap aligns the business plan to what the repo can actually build next. It preserves the prior CivicState narrative: a pipeline from civic concern to researched, citation-backed letter delivery, with infrastructure, AI research, payment, delivery, dashboard, admin, and compliance work tracked in `.planning/ROADMAP.md` [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)].

As of 2026-06-23 [evidence: dispatch current_date], the root soul files were missing and the registry posture is watchlist, personal/research asset, and not near-term investible until operator confirmation [evidence: dispatch registry note].

## Reality Check

The existing planning record is internally inconsistent. `.planning/ROADMAP.md` marks all phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while `.planning/STATE.md` says Phase 1 was complete on 2026-04-25 and Phase 2 planning was next [evidence: [.planning/STATE.md](.planning/STATE.md)]. The buildable roadmap therefore uses code and tests as evidence, and treats market demand, deliverability, and official coverage as assumptions.

## Preserved Narrative

Prior phases remain useful as a product map:

- Foundation: monorepo, database, auth, queueing, agent engine, CI, backup, DNS, and deployment scaffolding [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].
- AI Pipeline: submission wizard, official lookup, research, citation verification, drafting, and moderation [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md), [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts)].
- Payment and Delivery: Stripe Checkout, Postmark delivery, bounce handling, reply routing, and treasury [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts), [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts)].
- Dashboard and Compliance: campaign status, admin review, legal pages, audit logs, and retention [evidence: [apps/api/src/routes/admin.ts](apps/api/src/routes/admin.ts), [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx), [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx)].

## Now / Next / Later

### Now

- [ ] Thesis: get an operator ruling on whether CivicState should pitch as a business or stay a personal/research asset [evidence: dispatch registry note].
- [ ] Product & Moat: run one local end-to-end demo from submission through admin review, payment sandbox, delivery sandbox, and ledger review [assumption: demo not evidenced in repo].
- [ ] Risks & Anti-Plan: fix or formally disposition the reconciliation retention/schema mismatch before presenting compliance maturity [evidence: [apps/worker/src/agents/reconciliation.ts](apps/worker/src/agents/reconciliation.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

### Next

- [ ] Problem & Customer: run a small paid-user validation batch and record willingness-to-pay, refund, support, and completion evidence [assumption: no customer data found].
- [ ] Market: replace placeholder TAM/SAM/SOM with sourced bottom-up market evidence once network research is allowed [assumption: workspace-only run].
- [ ] Business Model: reconcile real Stripe, Postmark, LLM, local-official-provider, and hosting costs against the $5, $15, and $25 tiers [evidence: [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts); assumption: actual provider bills unavailable].

### Later

- [ ] Competition: complete a sourced teardown of Resistbot, Change.org, Quorum, VoterVoice, and manual outreach before making investor claims [assumption: external research required].
- [ ] Go-To-Market: run an issue-specific pilot only after official coverage and government-domain deliverability are measured [assumption: no deliverability metrics found].

## Buildability Rules

Each near-term item must be single-worker-sized, tied to a BUSINESS.md heading, and falsifiable. No roadmap item should assume venture status until the operator decision is logged [evidence: dispatch registry note].

## Milestone Gates

| Gate | Target date | Evidence required |
|---|---|---|
| Operator posture gate | 2026-07-15 [assumption: proposed] | DECISIONS.md entry confirming business vs personal/research asset |
| Product reality gate | 2026-08-15 [assumption: proposed] | End-to-end demo notes and bug list |
| Market evidence gate | 2026-09-15 [assumption: proposed] | Paid validation metrics and sourced market sizing |
| Investibility gate | 2026-10-15 [assumption: proposed] | Operator promotion or explicit watchlist continuation |

