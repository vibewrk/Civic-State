# Roadmap: CivicState / brooks-history

## Overview

The existing planning narrative says CivicState delivers a full pipeline from civic concern to official action: submission, official lookup, AI research, citation verification, letter drafting, payment, delivery, dashboard, admin, and compliance [evidence: `.planning/ROADMAP.md`]. The current source tree now contains app, API, worker, Prisma, payment, moderation, delivery, dashboard, admin, and compliance surfaces [evidence: apps and packages source tree].

This roadmap keeps that product narrative but changes the near-term emphasis. The next work is not speculative expansion; it is business validation, registry cleanup, and proof that the implemented loop works under real constraints.

## Current Build Reality

- Root soul files were absent before this upgrade [evidence: initial workspace scan].
- `.planning/ROADMAP.md` marks 4 major phases complete [evidence: `.planning/ROADMAP.md`], while `.planning/STATE.md` still reports Phase 1 complete and Phase 2 pending [evidence: `.planning/STATE.md`]. The planning status is inconsistent.
- The actual repo includes Next.js, Express, worker agents, Prisma models, tests, and integrations [evidence: source tree].
- The registry context calls this `brooks-history` and flags it as watchlist/personal/research, not near-term investible [evidence: dispatch registry note].

## Validation Roadmap

- [ ] **Thesis Current: operator identity ruling** — Confirm whether the asset should be pitched as CivicState, renamed back to Brooks History, or held as a research asset by 2026-06-30 [assumption: governance target].
- [ ] **Product Reality: end-to-end dry run** — Run one local submission through moderation, worker queue, citation verification, draft preview, Stripe test checkout, and delivery stub by 2026-07-08 [assumption: QA target].
- [ ] **Customer Definition: closed beta cohort** — Recruit 30 testers and require at least 20 paid submissions before any public SEO push [assumption: validation design].
- [ ] **Revenue Model: Stripe and ledger reconciliation** — Reconcile every beta payment against campaign, payment, ledger, and delivery records with a $0.10 discrepancy threshold [evidence: requirements threshold].
- [ ] **Go To Market: narrow issue wedge** — Launch only 3 issue categories first, each with verified citation coverage and official matching notes [assumption: focused GTM].
- [ ] **Risks Anti-Plan: citation and moderation audit** — Human-review every beta letter for citation defects, legal-advice drift, defamation risk, and AI disclosure before delivery [assumption: risk control].
- [ ] **Freshness And Evidence Sources: market refresh** — Replace workspace-only competitor and market assumptions with external sources before any wrk.vc investor-facing publication [assumption: no-network limitation].

## Buildable Shape

- [ ] **Thesis Current** — Add a short operator note resolving the `brooks-history` versus CivicState identity mismatch.
- [ ] **Product Reality** — Produce a local QA transcript for the core route set: submission, status, payment, campaign dashboard, admin queue, and compliance endpoints.
- [ ] **Customer Definition** — Add 1 beta intake form or issue-capture page that does not expand the core feature set [assumption: single-worker scope].
- [ ] **Market Sizing** — Replace the current bottom-up assumption table with live beta funnel math after the first 20 paid submissions [assumption: beta threshold].
- [ ] **Revenue Model** — Add a beta finance scorecard using Stripe, internal payment rows, ledger entries, refunds, and variable cost logs.
- [ ] **Competition** — Add sourced competitor notes only after network research is allowed.
- [ ] **Risks Anti-Plan** — Add a red-team review checklist for citation defects, delivery failures, and unsafe user content.
- [ ] **Freshness And Doc Dates** — Update the soul files after beta results or by 2026-08-31, whichever happens first [assumption: doc hygiene target].

## Deferred Expansion

Do not add subscriptions, organization APIs, coalition pages, public campaign search, multilingual support, certified mail, fax fallback, or autonomous follow-up until the one-time paid letter loop passes beta gates [assumption: focus policy]. These expansions appear in prior planning documents [evidence: `.planning/REQUIREMENTS.md`], but they would obscure the real validation question.

## Decision Gates

- Gate A: identity resolved and operator accepts CivicState framing by 2026-06-30 [assumption].
- Gate B: one paid end-to-end test completes with no critical citation defect by 2026-07-15 [assumption].
- Gate C: 20 paid beta submissions show at least 3% qualified preview-to-paid conversion, at least 85% `.gov` inbox placement, and no critical citation defects by 2026-08-15 [evidence: prior gates for conversion/deliverability; assumption for beta size and citation bar].
- Gate D: if Gate C fails, keep the project as research/tooling rather than pitching it as investible [assumption: portfolio policy].
