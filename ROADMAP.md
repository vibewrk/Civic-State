# CivicState / brooks-history - Roadmap

## Overview

This roadmap preserves the existing CivicState narrative: a civic-tech workflow that turns a constituent issue into researched, citation-backed letters delivered to government officials [evidence: .planning/PROJECT.md; .planning/ROADMAP.md]. As of 2026-06-23 [evidence: dispatch current_date], it also corrects the plan shape for wrk.vc scrutiny: the project is a watchlist research asset until identity, demand, local official coverage, deliverability, and platform posture are validated [evidence: dispatch registry notes; BUSINESS.md].

The prior roadmap in `.planning/ROADMAP.md` says all major phases are complete on 2026-04-25 [evidence: .planning/ROADMAP.md], but `.planning/REQUIREMENTS.md` still shows many product requirements unchecked [evidence: .planning/REQUIREMENTS.md]. This root roadmap treats the current codebase as a strong prototype, not a proven launch business.

## Existing Narrative To Preserve

- Foundation: monorepo, Express API, Next.js web app, worker agents, PostgreSQL/Prisma, Redis/BullMQ, CI, Docker, auth, and security scaffolding [evidence: .planning/ROADMAP.md; package.json; apps; packages].
- Core loop: issue submission, moderation, official lookup, legal research, citation verification, letter drafting, preview, payment, webhook-confirmed delivery, and dashboard/admin surfaces [evidence: apps/api/src/index.ts; apps/worker/src/agents; apps/web/app].
- Pricing: $5, $15, and $25 one-time package tiers [evidence: apps/api/src/routes/payments.ts; tests/payment.test.ts].
- Compliance posture: AI disclosure, not-legal-advice framing, opt-out handling, audit logs, CCPA/GDPR deletion, and CAN-SPAM-style hygiene [evidence: .planning/PROJECT.md; apps/api/src/routes/compliance.ts; apps/worker/src/agents/delivery.ts].

## Next Build Slice

- [ ] Problem & Customer: resolve the `brooks-history` versus CivicState identity mismatch and record the operator ruling in `DECISIONS.md` [evidence: dispatch project id; package.json].
- [ ] Product & Moat: run a local smoke path for submission to classifier to researcher to drafter using test fixtures, and document which steps require live credentials [evidence: apps/api/src/routes/submissions.ts; apps/worker/src/agents].
- [ ] Market: design a first paid-beta cohort with a single metro and one or two civic issue categories, using only claims that can be measured in the repo or operator records [assumption: controlled validation approach].
- [ ] Business Model: verify Stripe test-mode payment, webhook campaign status update, delivery queue enqueue, and ledger/audit write path end to end [evidence: apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts].
- [ ] Competition: add a workspace-sourced competitor notes file only after network research is allowed; until then keep all competitor claims tagged as assumptions [assumption: no network in this run].
- [ ] Risks & Anti-Plan: replace the Cicero local-official stub or constrain launch scope to federal/state workflows where local coverage is not promised [evidence: apps/api/src/lib/officials/cicero.ts].
- [ ] Platform Posture: decide whether WrkPlug shared rails supersede current Clerk and Stripe implementation, then create an adapter/migration plan if required [evidence: apps/api/src/middleware/auth.ts; apps/api/src/routes/payments.ts; BUSINESS.md].

## Validation Gates

- Identity gate: operator confirms whether wrk.vc should pitch CivicState under the `brooks-history` project id by 2026-07-15 [assumption: governance milestone].
- Demand gate: preview-to-paid conversion reaches at least 3% in beta [evidence: .planning/PROJECT.md].
- Deliverability gate: government inbox placement reaches at least 85% before scaled paid delivery [evidence: .planning/PROJECT.md].
- Coverage gate: federal/state coverage reaches 95% and local coverage reaches 60%, or the product explicitly narrows launch scope [evidence: .planning/PROJECT.md].
- Citation gate: no sent letter includes an unverified citation [assumption: zero-tolerance quality gate based on legal-adjacent risk].

## Deferred Until Gates Pass

- Public campaign SEO scaling [evidence: .planning/GENESIS.md].
- Certified mail, fax, subscriptions, organization API, community features, coalition mechanics, and multilingual expansion [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md].
- Any claim that the business has a durable moat from official data or public campaign archives [evidence: .planning/GENESIS.md says the moat is volume-dependent].

## Current Status

Status: `needs-revision` until operator adoption and market validation [evidence: .ultra-start/business-plan.json]. The roadmap is buildable because each next slice is single-worker-sized and overlaps a `BUSINESS.md` heading for traceability.
