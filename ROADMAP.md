# CivicState / brooks-history — Roadmap

**Document date:** 2026-06-21 [evidence: runner context]. **Status:** validation roadmap, not production launch approval. This keeps the prior CivicState narrative but resets the next work around the business-plan gates in `BUSINESS.md`.

## Existing Narrative Preserved

CivicState aims to turn a civic concern into a researched, citation-backed, professionally drafted letter delivered to the correct government officials [evidence: `.planning/PROJECT.md`]. The prior roadmap described foundation, AI pipeline, payment/delivery, and dashboard/compliance phases, and marked them complete on 2026-04-25 [evidence: `.planning/ROADMAP.md`].

That completion claim is not enough for investment scrutiny. The repo now contains real application surfaces and tests [evidence: `apps/`, `packages/shared/prisma/schema.prisma`, `tests/*.test.ts`], but the business remains unvalidated: no paid demand, production deliverability, official-data accuracy, or legal review evidence is present in the workspace [assumption: inferred from absence of production metrics].

## Roadmap Principle

The roadmap serves the plan, not the other way around. The next tranche is designed to answer the "Risks & Anti-Plan" and "Assumption Ledger" sections in `BUSINESS.md` before any claim that this is a near-term investible business.

## Current State

- Product shell, API, worker agents, Prisma schema, and tests exist [evidence: `apps/`, `packages/shared/prisma/schema.prisma`, `tests/*.test.ts`].
- Pricing tiers are $5, $15, and $25 [evidence: `tests/payment.test.ts`].
- Prior validation gates include 3% conversion, 85% inbox placement, 95% federal/state coverage, and 60% local coverage [evidence: `.planning/PROJECT.md`].
- Registry posture is watchlist / personal-research asset until operator confirmation [evidence: dispatch registry note].

## Near Term

- [ ] **Thesis / operator ruling:** Resolve whether `brooks-history` is the same asset as CivicState and whether the operator wants a business pitch by 2026-07-15 [assumption: proposed date].
- [ ] **Problem & Customer interviews:** Run a concierge discovery script with 15 target residents [assumption: validation sample] and classify issue categories against `BUSINESS.md`.
- [ ] **Market validation:** Publish one issue-specific landing flow [assumption: single-worker scope] and measure preview-to-pay intent against the 3% conversion gate [evidence: `.planning/PROJECT.md`].
- [ ] **Product & Moat proof:** Audit official lookup output for 25 ZIP codes [assumption: single-worker sample] against manual research and record federal/state/local coverage.
- [ ] **Business Model pilot:** Execute a paid concierge test using the existing $5 / $15 / $25 tiers [evidence: `tests/payment.test.ts`] with manual operator approval before delivery.
- [ ] **Go-To-Market wedge:** Pick one initial issue category and one geography [assumption: focused GTM] before spending on broad civic-tech messaging.
- [ ] **Risks & Anti-Plan review:** Complete legal, deliverability, and moderation review notes before public launch claims.

## Buildable Shape

Each unchecked item above is intentionally single-worker-sized: one ruling, one interview batch, one landing flow, one lookup audit, one paid pilot, one GTM wedge, and one risk review. None requires source-code refactoring before the operator decides whether the asset should advance.

## Evidence Gates

| Gate | Threshold | Source |
|---|---:|---|
| Paid conversion | 3% [evidence: `.planning/PROJECT.md`] | Preview-to-payment data |
| Deliverability | 85% inbox placement [evidence: `.planning/PROJECT.md`] | Safe delivery pilot |
| Federal/state coverage | 95% [evidence: `.planning/PROJECT.md`] | Manual lookup audit |
| Local coverage | 60% [evidence: `.planning/PROJECT.md`] | Manual lookup audit |
| Review load | 12 minutes or less per flagged campaign [assumption: solo-operator workload target] | Concierge pilot timing |

## Deferred

- Organization API, nonprofit tooling, HOA sales, certified mail, fax delivery, public campaign pages, automated follow-up, and multi-language support remain deferred until the individual paid-letter workflow proves itself [evidence: `.planning/PROJECT.md`; `MASTER_PLAN.md`].
