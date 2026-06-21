# CivicState / brooks-history — Roadmap

## Current Read

As of 2026-06-21 [evidence: `.wrkdog-run/stderr.log` session header], this repo contains a CivicState application scaffold: Next.js frontend, Express API, worker agents, Prisma schema, Docker files, and tests [evidence: `apps/`; `packages/shared/prisma/schema.prisma`; `tests/`]. It is not yet an evidence-backed business because no production usage, revenue, conversion, deliverability, or official-response data is present [evidence: `.planning/existing-state.md`; `BUSINESS.md`].

The existing `.planning/ROADMAP.md` narrative is preserved as implementation context, but it is over-optimistic where it marks the full plan complete [evidence: `.planning/ROADMAP.md`]. The buildable roadmap below serves the business plan: validate whether CivicState should graduate from watchlist/research asset to investible operating business [evidence: dispatch registry note].

## Roadmap Principle

Do not broaden the product until the core letter loop proves three things: users pay, officials can be reached, and citations stay verified [assumption: EIR validation sequence]. The root roadmap therefore prioritizes validation gates over feature expansion.

## Next Buildable Steps

- [ ] **Thesis / Operator Ruling:** Confirm whether the public dossier should pitch CivicState, brooks-history, or watchlist-only research status by 2026-07-15 [assumption: governance milestone from `BUSINESS.md`].
- [ ] **Problem & Customer:** Define one launch wedge and recruit 20 beta users for concierge/manual-assisted campaigns [assumption: first-customer plan; launch wedge count is an EIR assumption].
- [ ] **Market:** Run a 25-ZIP official coverage spike across federal, state, and local sources and record coverage confidence [assumption: validation test; evidence need from `.planning/STATE.md`].
- [ ] **Product & Moat:** Verify the end-to-end submission -> research -> draft -> pay -> deliver flow in staging with mocked and then real provider credentials [assumption: build validation].
- [ ] **Business Model:** Reconcile Stripe fees, provider costs, and treasury budgets against the $5/$15/$25 tiers before paid beta [evidence: `apps/api/src/routes/payments.ts`; `tests/treasury.test.ts`].
- [ ] **Risks & Anti-Plan:** Add operator review rules for threats, defamation risk, unverifiable citations, official opt-outs, and AI disclosure before live sends [evidence: `apps/api/src/lib/moderation.ts`; `apps/worker/src/agents/drafter.ts`].
- [ ] **Go-To-Market:** Launch a 100-preview paid beta and measure paid conversion, bounce rate, support minutes, and official-response rate [assumption: validation cohort].

## Validation Gates

| Gate | Pass Standard | Source |
|---|---|---|
| Paid conversion | At least 3% of qualified previews pay [assumption: existing plan gate, not observed]. | `.planning/PROJECT.md` |
| Deliverability | At least 85% delivery success to target government domains [assumption: existing plan gate, not observed]. | `.planning/PROJECT.md` |
| Official coverage | Federal/state coverage materially complete and local coverage good enough for launch geography [assumption: provider spike required]. | `.planning/STATE.md` |
| Citation quality | 0 known fabricated citations in staged sends [assumption: quality gate]. | `apps/worker/src/lib/legal/citation-verifier.ts` |
| Compliance | Human review queue and opt-out enforcement work before live delivery [evidence: `apps/api/src/routes/admin.ts`; `apps/worker/src/agents/delivery.ts`]. | repo code |

## Deferred Until Gates Pass

- Organization API, subscriptions, coalition/community features, certified mail, fax, multilingual flows, and autonomous follow-up letters remain deferred [evidence: `.planning/REQUIREMENTS.md`; `MASTER_PLAN.md`].
- WrkPlug shared-rails migration remains an architectural option, not a blocking dependency [assumption: WrkPlug initial phase not signed].
- Public SEO campaign pages should wait for legal/compliance review and explicit user opt-in [evidence: `MASTER_PLAN.md`].

## Operating Cadence

Weekly until paid beta: update metrics, blockers, and assumption ledger in BUSINESS.md or DECISIONS.md [assumption: EIR cadence]. Monthly after launch: compare actual paid campaigns, conversion, deliverability, support load, and gross margin against the Financial Model [assumption: governance cadence].
