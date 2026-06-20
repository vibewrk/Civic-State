# CivicState Roadmap

Review date: 2026-06-20 [evidence: assistant runtime]. Worker envelope date: 2026-06-19 [evidence: dispatch context]. This roadmap aligns the repo's existing build narrative with the provisional business plan in [BUSINESS.md](BUSINESS.md).

## Current Build Reality

The repo already contains the shape of a CivicState MVP: web submission flow, API routes, agent workers, Stripe, Postmark, Prisma, audit logging, and admin review surfaces [evidence: `.planning/REQUIREMENTS.md`; `apps/api/src/routes/submissions.ts`; `apps/worker/src/agents/delivery.ts`].

The next roadmap must treat "launched business" as unproven. The buildable goal is to reach a measured beta, not to add more product surface.

## Existing Narrative Preserved

The original phased plan remains useful as architecture history:

- Foundation: monorepo, Docker, database, auth, agent engine, and domain warming [evidence: `.planning/ROADMAP.md`].
- AI Pipeline: submission wizard, officials, research, citation verification, drafting, and moderation [evidence: `.planning/ROADMAP.md`].
- Payment & Delivery: Stripe checkout, treasury, Postmark delivery, and bounce tracking [evidence: `.planning/ROADMAP.md`].
- Dashboard & Compliance: user dashboard, admin tools, legal pages, and audit enforcement [evidence: `.planning/ROADMAP.md`].

However, `.planning/STATE.md` records Foundation as the only complete phase, while `.planning/ROADMAP.md` marks all phases complete on 2026-04-25 [evidence: `.planning/STATE.md`; `.planning/ROADMAP.md`]. This root roadmap resolves the conflict by focusing on verification work that can be done by a single worker at a time.

## Build Principles

- Prefer measured beta readiness over feature expansion.
- Preserve the non-legal, non-partisan constituent communication boundary.
- Use repo evidence for shipped status and label all market/financial claims as assumptions.
- Keep each work item small enough for one worker to complete and verify.

## Next Build Slice

- [ ] Thesis Current: reconcile project identity by adding an operator note that confirms whether wrk.vc should present this as CivicState or Brooks History [evidence: dispatch context; `package.json`].
- [ ] Customer Definition: create a beta intake checklist for allowed user issues, excluded legal/demand-letter cases, and operator escalation triggers [evidence: `MASTER_PLAN.md`].
- [ ] Evidence Sources: add a deploy/readiness evidence log with production URL, API health, worker status, and environment dependencies [assumption: no production proof found in repo].
- [ ] Revenue Model: run a local Stripe webhook test and document whether `$5`, `$15`, and `$25` tiers create payments and enqueue delivery as expected [evidence: `apps/api/src/routes/payments.ts`; `apps/api/src/routes/webhooks.ts`].
- [ ] Market Sizing: instrument preview, pay-click, paid, delivered, bounced, and reply events so the `3%` conversion and `85%` deliverability assumptions can be replaced with evidence [assumption: validation targets from planning docs].
- [ ] Risks And Anti-Plan: test moderation and admin approval paths for threats, defamation-risk text, and unverifiable misconduct claims [evidence: `apps/api/src/routes/submissions.ts`; `apps/api/src/routes/admin.ts`].
- [ ] Financial Model: reconcile one synthetic end-to-end job across Stripe amount, ledger entry, delivery cost estimate, and agent token logging [evidence: `packages/shared/prisma/schema.prisma`; `apps/worker/src/lib/logger.ts`].

## Validation Gates

Move from watchlist to operator-review candidate only after:

- A real user completes a paid campaign without manual database intervention [assumption: no such evidence exists].
- Delivery succeeds to at least one verified official inbox [assumption: no such evidence exists].
- The operator can approve, reject, or edit a flagged submission from the admin UI [assumption: route exists, end-to-end evidence not found].
- Legal/compliance posture is reviewed by a qualified human [assumption: no legal review artifact found].

## Deferred Until Evidence

- Public campaign pages and SEO flywheel.
- Organization/API product.
- Certified mail and fax.
- Dynamic pricing agent.
- Autonomous follow-up letters.
- Community, comments, voting, or co-signatures.

These remain strategically plausible but commercially distracting before the core paid loop is proven [evidence: `.planning/GENESIS.md`].
