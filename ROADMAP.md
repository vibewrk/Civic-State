# CivicState Roadmap

## Status

As of 2026-06-21 [evidence: wrk.dog dispatch current_date], this root roadmap supersedes the stale/conflicting planning state while preserving the original CivicState direction. The prior roadmap says all phases are complete [evidence: .planning/ROADMAP.md], but the requirements file still marks many launch items pending [evidence: .planning/REQUIREMENTS.md]. The current repo contains substantial application code and tests [evidence: apps/api/src/index.ts; apps/worker/src/engine/state-machine.ts; tests/api-routes.test.ts], so the remaining roadmap is about validation and hardening, not greenfield scaffolding.

## Existing Narrative Preserved

CivicState turns civic concerns into researched, citation-backed letters delivered to government officials [evidence: .planning/PROJECT.md; apps/web/app/page.tsx]. The intended launch loop is issue intake, jurisdiction/official matching, citation-backed research, letter drafting, payment, delivery, dashboard visibility, admin review, and compliance controls [evidence: .planning/REQUIREMENTS.md; packages/shared/prisma/schema.prisma].

## Buildable Next Slice

- [ ] Current Thesis: resolve whether the repo should be pitched as CivicState or belongs to brooks-history before any external dossier is published.
- [ ] Product Reality: audit requirements against the current routes, worker agents, Prisma schema, and tests; replace stale completion claims with verified status.
- [ ] Customer Definition: instrument the submission wizard so preview starts, auth starts, checkout starts, and paid conversions are measurable.
- [ ] Revenue Model: reconcile Stripe pricing, ledger entries, treasury checks, and package tiers into one testable payment path.
- [ ] Go To Market: prepare a closed beta path before SEO publication; keep public campaign pages opt-in and moderation-gated.
- [ ] Risks And Anti-Plan: complete official-provider, deliverability, citation-verification, and legal-copy readiness checks before live sends.
- [ ] Source Freshness: mark .planning/existing-state.md stale or replace it with a current audit so future reviewers do not rely on obsolete evidence.

## Validation Gates

Closed beta readiness requires identity resolution, a working end-to-end paid path, citation verification for generated letters, official opt-out enforcement, content moderation audit logging, and delivery controls [evidence: .planning/REQUIREMENTS.md; apps/api/src/routes/submissions.ts; apps/worker/src/engine/state-machine.ts].

Commercial readiness requires at least 3% preview-to-paid conversion [evidence: .planning/PROJECT.md], at least 85% government inbox placement [evidence: .planning/PROJECT.md], and at least 95% federal/state plus 60% local official coverage [evidence: .planning/PROJECT.md].

## Deferred

Subscriptions, certified mail, fax delivery, public community features, API access for organizations, multi-language support, mobile native apps, and automated follow-up letters remain deferred until the paid individual-user loop is validated [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].
