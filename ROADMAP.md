# CivicState Roadmap

## Context

This root roadmap is aligned to the EIR business plan as of 2026-06-21 [evidence: dispatch current_date]. It preserves the existing four-phase narrative from `.planning/ROADMAP.md`, but reframes the next work around proof gates because code and planning docs disagree about what is complete [evidence: .planning/ROADMAP.md; .planning/REQUIREMENTS.md; apps/].

## Existing Narrative

CivicState's planned product flow is: infrastructure, AI pipeline, payment and delivery, dashboard and compliance [evidence: .planning/ROADMAP.md]. The original roadmap marks those phases complete on 2026-04-25 [evidence: .planning/ROADMAP.md], while the requirements file still lists many launch requirements as pending [evidence: .planning/REQUIREMENTS.md]. Current planning should therefore use implementation evidence and live validation rather than phase checkboxes.

## Buildable Next

- [ ] Snapshot the Current Truth by reconciling `.planning/REQUIREMENTS.md` against `apps/`, `packages/shared/prisma/schema.prisma`, and `tests/` [evidence: apps/; packages/shared/prisma/schema.prisma; tests/].
- [ ] Fix Product integrity issues where API routes select fields that do not match Prisma schema names, including compliance export fields [evidence: apps/api/src/routes/compliance.ts; packages/shared/prisma/schema.prisma].
- [ ] Validate Revenue Model flow with one local Stripe test checkout from selected tier to payment record to delivery enqueue [evidence: apps/api/src/routes/payments.ts; apps/api/src/routes/webhooks.ts].
- [ ] Validate Customer Definition with a constrained beta script for one geography and one issue category [assumption: reduces coverage variance before broader rollout].
- [ ] Validate Evidence Sources by running citation-verifier tests and adding a fixture for all-citations-fail human-review behavior [evidence: apps/worker/src/lib/legal/citation-verifier.ts; tests/citation-verifier.test.ts].
- [ ] Validate Go To Market prerequisites by auditing official lookup coverage for a small ZIP sample before any SEO or public campaign claims [evidence: apps/api/src/lib/officials/lookup.ts; .planning/PROJECT.md].
- [ ] Validate Risks And Anti-Plan by recording deliverability metrics, bounce rate, spam complaints, refunds, and flagged-queue age in an operator review note [evidence: apps/worker/src/agents/delivery.ts; apps/api/src/routes/admin.ts].

## Gate Metrics

Do not present as investible until these gates are measured:

- Paid conversion at or above 3% [evidence: .planning/PROJECT.md].
- Government inbox placement at or above 85% [evidence: .planning/PROJECT.md].
- Federal/state coverage at or above 95% and local coverage at or above 60% [evidence: .planning/PROJECT.md].
- Chargeback rate below 0.5% [evidence: .planning/PROJECT.md].
- Net margin floor of 40% after fees [evidence: MASTER_PLAN.md; .planning/PROJECT.md].

## Deferred

Subscriptions, public coalition/community features, certified mail, fax, API access, multilingual support, paid acquisition, and automated follow-up remain deferred until the one-time paid citizen workflow is validated [evidence: .planning/GENESIS.md; .planning/REQUIREMENTS.md].

