# Roadmap: CivicState / Brooks History

## Overview

The existing `.planning/ROADMAP.md` says the original four implementation phases were completed on 2026-04-25 [evidence: `.planning/ROADMAP.md`]. The current root roadmap reframes that work for a VC-grade data room: preserve what is built, then validate whether the project is a business or a research asset.

The plan serves the business thesis in `BUSINESS.md`: paid civic-letter delivery is only investible if demand, deliverability, official data, compliance, and operator workload clear evidence gates.

## Existing Narrative Preserved

The repo narrative remains: a resident submits a civic concern, CivicState researches relevant sources, identifies officials, drafts citation-backed letters, collects payment, sends the letters, and lets the user track outcomes [evidence: `.planning/PROJECT.md`, `.planning/ROADMAP.md`, `MASTER_PLAN.md`].

The prior phase structure is preserved as historical build record:

- Foundation: monorepo, Docker, database, auth, agent engine, and domain-warming plan [evidence: `.planning/ROADMAP.md`].
- AI pipeline: submission wizard, officials directory, research, citation verification, drafting, moderation [evidence: `.planning/ROADMAP.md`].
- Payment and delivery: Stripe, treasury, Postmark, bounce tracking [evidence: `.planning/ROADMAP.md`].
- Dashboard and compliance: user dashboard, admin tools, legal pages, audit enforcement [evidence: `.planning/ROADMAP.md`].

## Current Buildable Roadmap

- [ ] **Current Thesis: operator ruling** - Decide whether `brooks-history` is a personal/research asset or a commercial CivicState business, and align repo naming, dossier copy, and product domain.
- [ ] **Customer Definition: beta cohort** - Pick one narrow geography or issue category and recruit a small manually reviewed beta cohort before any broad launch.
- [ ] **Revenue Model: paid funnel instrumentation** - Add a measurement plan for preview, checkout, paid send, refund, and chargeback events without changing the checkout promise.
- [ ] **Market Sizing: bottoms-up evidence** - Replace assumption traffic and conversion rows in `BUSINESS.md` with observed beta and search-console data when available.
- [ ] **Competition: substitute testing** - Ask beta users what they would have done instead: manual email, Resistbot, petition, legal help, or no action.
- [ ] **Go To Market: deliverability gate** - Run controlled Postmark/domain tests to validate inbox placement before sending real paid user letters at scale.
- [ ] **Risks and Anti-Plan: compliance review** - Obtain operator/legal review for AI disclosure, CAN-SPAM, privacy, deletion, official opt-out, and political-content moderation.
- [ ] **Assumption Ledger: official-data audit** - Sample ZIP codes and measure federal, state, and local official coverage before promising full-spread delivery.

## Validation Gates

The next milestone is not more features; it is evidence. Continue only if the project can show paid conversion near or above 3% [assumption: `.planning/PROJECT.md` target], `.gov` inbox placement near or above 85% [assumption: `.planning/PROJECT.md` target], and official-data coverage near or above 95% federal/state plus 60% local [assumption: `.planning/PROJECT.md` target].

If the gates miss, keep the repo as a research/personal asset and avoid pitching it as a venture business.

## Build Notes

Do not expand into social features, coalition mechanics, API access, multilingual support, certified mail, fax, or automated follow-up until the paid letter loop is validated [evidence: `.planning/PROJECT.md`, `MASTER_PLAN.md`].
