# CivicState — Roadmap

## Overview

CivicState's existing planning narrative describes a four-phase path from foundation to AI pipeline, payment/delivery, and dashboard/compliance. [evidence: `.planning/ROADMAP.md`] This root roadmap keeps that narrative but reframes the next work around business validation, because the repo has more implementation surface than market proof. [evidence: `apps/api/src/index.ts`; evidence: `apps/worker/src/index.ts`; assumption: EIR synthesis]

As of 2026-06-20, roadmap authority is blocked pending operator merge and market validation. [evidence: environment_context current_date; evidence: `.ultra-start/business-plan.json` status `needs-revision`]

## Preserved Existing Narrative

The original roadmap sequence is:

- Phase 1: Foundation, including monorepo, Docker, database, auth, agent engine, CI/CD, and domain warming. [evidence: `.planning/ROADMAP.md`]
- Phase 2: AI pipeline, including submission wizard, officials directory, research, citation verification, letter drafting, and moderation. [evidence: `.planning/ROADMAP.md`]
- Phase 3: Payment and delivery, including Stripe, treasury, Postmark, bounce tracking, and reconciliation. [evidence: `.planning/ROADMAP.md`]
- Phase 4: Dashboard and compliance, including campaign status, admin tools, legal pages, audit enforcement, and deletion workflows. [evidence: `.planning/ROADMAP.md`]

The root business plan changes the interpretation: these phases are not proof of product-market fit. They are prototype and planning evidence until real users, payments, deliverability, official coverage, and legal review are validated. [assumption: EIR synthesis from repo evidence]

## Current State

Built or partially built:

- API routes for submissions, officials, payments, webhooks, campaigns, admin, compliance, and health. [evidence: `apps/api/src/index.ts`]
- Worker agents for classifier, researcher, drafter, delivery, treasury, and reconciliation. [evidence: `apps/worker/src/index.ts`]
- Prisma schema for campaign, payment, delivery, audit, ledger, and job state. [evidence: `packages/shared/prisma/schema.prisma`]
- Tests for payments, moderation/compliance, delivery-adjacent logic, officials, and citation verification. [evidence: `tests/payment.test.ts`; evidence: `tests/compliance.test.ts`; evidence: `tests/citation-verifier.test.ts`]

Unproven:

- Real paid conversion at $5-$25. [assumption: no customer/payment evidence found]
- `.gov` deliverability at >=85%. [evidence: `.planning/PROJECT.md` validation gate; assumption: no production logs found]
- Federal/state coverage at >=95% and local coverage at >=60%. [evidence: `.planning/PROJECT.md` validation gate]
- Legal/regulatory sufficiency of citation-backed consumer letters. [assumption: requires legal/operator review]
- Whether this should be pitched as a business instead of retained as a personal/research asset. [evidence: registry note in dispatch]

## Buildable Next Work (wrk.dog)

- [ ] Problem & Customer: run a 20-user concierge beta script and record paid/declined checkout reasons in DECISIONS.md. [assumption: single-worker validation task]
- [ ] Market: build a ZIP-by-ZIP official coverage audit for 25 representative ZIP codes and compare federal/state/local match rates. [assumption: single-worker validation task]
- [ ] Business Model: add an internal revenue reconciliation note that ties tier mix, Stripe sessions, payments, refunds, and chargebacks to the ledger. [assumption: single-worker validation task]
- [ ] Product & Moat: create a 50-issue citation QA corpus and grade verified vs stripped citations before any production claim. [assumption: single-worker validation task]
- [ ] Go-To-Market: draft 3 opt-in public campaign page templates with compliance review flags before SEO launch. [assumption: single-worker validation task]
- [ ] Risks & Anti-Plan: write an operator legal-review checklist for AI disclosure, not-legal-advice language, opt-out, and moderation escalation. [assumption: single-worker validation task]
- [ ] Platform Posture: produce a WrkPlug migration assessment that names which Clerk, Stripe, identity, and billing code remains prototype-only. [assumption: WrkPlug Phase 0 not yet signed]

## Validation Gates

| Gate | Target | Source |
|---|---:|---|
| Preview-to-paid conversion | >=3% | [evidence: `.planning/PROJECT.md`] |
| `.gov` inbox placement | >=85% | [evidence: `.planning/PROJECT.md`] |
| Federal/state official coverage | >=95% | [evidence: `.planning/PROJECT.md`] |
| Local official coverage | >=60% | [evidence: `.planning/PROJECT.md`] |
| Chargeback rate | <0.5% | [evidence: `.planning/PROJECT.md`] |
| Operator routine load | <30 min/day | [evidence: `.planning/PROJECT.md`] |

## Milestone Timeline

- 2026-06-20: EIR soul refresh created root business, roadmap, decisions, and gate artifacts. [evidence: environment_context current_date]
- 2026-07-15: Operator confirms whether CivicState/brooks-history should be pitched as a business. [assumption: governance milestone]
- 2026-08-15: Concierge paid beta completes with 20 checkout attempts. [assumption: validation milestone]
- 2026-09-30: Delivery, coverage, and legal review gates produce continue/pause recommendation. [assumption: validation milestone]
- 2026-12-31: Continue/kill decision based on paid demand, deliverability, official coverage, and operator load. [assumption: governance milestone]

## Roadmap Tradeoffs

- Do not add new source-code scope before demand validation clears. [assumption: EIR recommendation]
- Do not present CivicState as legal advice, legal filing automation, or lobbying compliance software. [evidence: `.planning/PROJECT.md`; evidence: `.planning/GENESIS.md`]
- Do not migrate to WrkPlug until the operator confirms Phase 0 and the current direct Clerk/Stripe implementation is treated as prototype evidence. [assumption: WrkPlug Phase 0 not yet signed]
- Do not use roadmap completion language as investment evidence; use paid-user, deliverability, coverage, and legal-review results. [assumption: EIR governance]
