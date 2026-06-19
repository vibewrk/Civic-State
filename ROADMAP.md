# CivicState Roadmap

## Overview

CivicState delivers a pipeline from civic frustration to official action: a user describes a civic concern, the system identifies officials, researches relevant public authorities, drafts citation-backed letters, collects payment, sends letters, and tracks delivery [evidence: .planning/ROADMAP.md; .planning/PROJECT.md].

This root roadmap supersedes the stale planning interpretation but preserves the original phase narrative: foundation, AI pipeline, payment/delivery, and dashboard/compliance [evidence: .planning/ROADMAP.md]. As of 2026-06-19 [evidence: runner current_date], the repo contains implementation for the API, worker agents, Prisma schema, frontend landing page, and tests [evidence: apps/api/src/index.ts; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma; apps/web/app/page.tsx; tests/*.test.ts]. It does not show validated customers, production traffic, or revenue [evidence: .planning/PROJECT.md].

## Existing Narrative To Preserve

- Phase foundation: monorepo, Docker, CI/CD, database, auth, agent engine, and domain warming [evidence: .planning/ROADMAP.md].
- Phase AI pipeline: submission wizard, officials directory, research, citation verification, letter drafting, and moderation [evidence: .planning/ROADMAP.md].
- Phase payment and delivery: Stripe Checkout, treasury, Postmark email delivery, and bounce tracking [evidence: .planning/ROADMAP.md].
- Phase dashboard and compliance: user dashboard, admin tools, legal pages, and audit enforcement [evidence: .planning/ROADMAP.md].

## Reality Reset

The next work is not a new feature phase. It is a validation and reconciliation phase because `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while `.planning/REQUIREMENTS.md` still marks many core requirements pending [evidence: .planning/REQUIREMENTS.md].

## Buildable Roadmap

- [ ] Current Reality: reconcile implemented routes, worker behavior, tests, and env requirements into a release checklist.
- [ ] Customer Definition: run a closed beta script for one narrow user segment and record conversion objections.
- [ ] Business Model: verify $5/$15/$25 Stripe package flow from preview through paid delivery in a controlled run [evidence: .planning/REQUIREMENTS.md PAY-01].
- [ ] Market Sizing: instrument visitor-to-preview and preview-to-paid conversion before making TAM claims.
- [ ] Go-To-Market: publish a compliant acquisition page or direct-beta path, then measure paid intent.
- [ ] Risks & Anti-Plan: export moderation, citation verification, bounce, spam complaint, and opt-out metrics before scaling sends.
- [ ] Assumption Ledger: review every open assumption in BUSINESS.md and mark evidence gained, invalidated, or still unknown.

## Near-Term Milestones

| Date | Owner shape | Output |
|---|---|---|
| 2026-06-26 [assumption: one-week audit] | Worker-sized | Release checklist mapping code routes to BUSINESS.md Current Reality |
| 2026-07-10 [assumption: two-week validation] | Worker-sized | Controlled paid-flow test with Stripe, Postmark, and audit logs |
| 2026-07-31 [assumption: beta milestone] | Worker-sized | Deliverability and moderation report for operator review |
| 2026-09-30 [assumption: quarter checkpoint] | Operator-led | Decision: remain research asset or continue as business |

## Exit Criteria

CivicState can move from watchlist to active business consideration only when the operator has evidence of paid conversion, low refund/chargeback risk, acceptable email delivery, safe moderation handling, and reliable citation verification [assumption: EIR gate derived from BUSINESS.md].
