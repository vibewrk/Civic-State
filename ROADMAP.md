# CivicState - Roadmap

As of 2026-06-22 [evidence: dispatch context], the root roadmap exists to align the product with `BUSINESS.md`. The prior `.planning/ROADMAP.md` says Phase 1 through Phase 4 were completed on 2026-04-25 [evidence: `.planning/ROADMAP.md`]. This root roadmap preserves that build narrative but shifts the next work from feature completion to validation.

## Existing Build Narrative

CivicState delivers a pipeline from civic concern to official action: submission wizard, official lookup, AI research, citation verification, drafting, payment, delivery, dashboard, admin tools, and compliance pages [evidence: `.planning/ROADMAP.md`; evidence: `packages/shared/prisma/schema.prisma`].

The implementation evidence includes fixed Stripe tiers of $5, $15, and $25 [evidence: `apps/api/src/routes/payments.ts`], BullMQ worker agents [evidence: `apps/worker/src/index.ts`], moderation [evidence: `apps/api/src/lib/moderation.ts`], and Postmark delivery [evidence: `apps/worker/src/agents/delivery.ts`].

## Validation Gates

Continue only if preview-to-paid conversion reaches 3% [evidence: `.planning/PROJECT.md`], government inbox placement reaches 85% [evidence: `.planning/PROJECT.md`], and official coverage reaches the prior federal/state/local gates of 95% federal/state and 60% local [evidence: `.planning/PROJECT.md`]. These are not achieved facts.

## Next Work

- [ ] Thesis - resolve project identity mismatch between `brooks-history` dispatch and CivicState repo evidence.
- [ ] Product & Moat - run the official-routing spike for federal no-email recipients and document email versus web-form coverage.
- [ ] Business Model - instrument the $5, $15, and $25 checkout funnel from preview to paid campaign [evidence: `apps/api/src/routes/payments.ts`].
- [ ] Market - run a 100-preview private beta and replace assumption-led TAM/SAM/SOM with observed conversion data [assumption: validation cohort].
- [ ] Go-To-Market - publish or stage the first issue-specific acquisition pages and measure qualified preview starts.
- [ ] Financial Model - reconcile Stripe, LLM, Postmark, hosting, refunds, and manual-review costs into a real unit-economics sheet.
- [ ] Risks & Anti-Plan - obtain operator/legal review on legal-advice, lobbying, CAN-SPAM, and official opt-out posture.
- [ ] Assumption Ledger - update `BUSINESS.md` after each validation gate with evidence or a kill/continue decision.

## Definition Of Done

This roadmap becomes investible only when the operator can show paid customer behavior, reliable delivery, reconciled costs, and documented legal/compliance posture. Until then, the correct state is watchlist research asset [evidence: dispatch registry notes].
