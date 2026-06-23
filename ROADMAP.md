# CivicState / brooks-history Roadmap

## Current Narrative

The existing planning narrative says CivicState should deliver a full pipeline from civic frustration to official action: issue intake, official lookup, legal research, citation verification, letter drafting, payment, email delivery, dashboard tracking, admin review, and compliance controls [evidence: .planning/PROJECT.md and .planning/ROADMAP.md]. The current source tree supports much of that surface area, including a Next.js frontend, Express API, BullMQ worker, Prisma schema, payment route, moderation route, researcher agent, and tests [evidence: apps and packages source tree].

The roadmap now serves the business plan rather than adding speculative scope. The next work is validation: prove whether CivicState should be pitched as a business at all, whether paid demand exists, whether government email delivery works, whether citation verification is safe enough, and whether one operator can handle exceptions [assumption: validation-first sequencing].

## Preserved Build Phases

- Phase 1 Foundation is marked complete in the planning roadmap [evidence: .planning/ROADMAP.md], but .planning/STATE.md still reports Phase 1 as the current focus [evidence: stale state file].
- Phase 2 AI Pipeline is marked complete in the planning roadmap [evidence: .planning/ROADMAP.md], but requirements still show many unchecked items [evidence: .planning/REQUIREMENTS.md].
- Phase 3 Payment & Delivery is marked complete in the planning roadmap [evidence: .planning/ROADMAP.md], while live payment and deliverability evidence is not present in the workspace [assumption: absence of production artifacts].
- Phase 4 Dashboard & Compliance is marked complete in the planning roadmap [evidence: .planning/ROADMAP.md], while external legal review is not present in the workspace [assumption: absence of legal-review artifact].

## Next

- [ ] **Thesis Current:** Get operator ruling on whether `brooks-history` should pitch as CivicState business or remain a personal/research asset by 2026-06-30 [assumption: governance target].
- [ ] **Evidence Sources:** Create a workspace evidence index that maps source files to business claims, including payment route, schema, submission route, researcher agent, and planning contradictions by 2026-07-03 [assumption: documentation target].
- [ ] **Product Reality:** Run 1 end-to-end dry run covering submission, moderation, classification, research, citation verification, draft preview, Stripe test checkout, and delivery test by 2026-07-15 [assumption: validation target].
- [ ] **Customer Definition:** Recruit 30 beta testers and collect at least 20 paid-submission attempts from the defined individual-resident persona by 2026-08-15 [assumption: beta target].
- [ ] **Revenue Model:** Export Stripe test/live payment results and reconcile AOV, refunds, variable cost, and gross margin against the $5, $15, and $25 tiers by 2026-08-31 [assumption: finance validation target; prices evidenced in apps/api/src/routes/payments.ts].
- [ ] **Go To Market:** Validate 3 narrow issue categories before publishing SEO campaign pages; do not launch public pages until privacy and moderation review is complete [assumption: risk-first GTM].
- [ ] **Risks Anti-Plan:** Produce a beta risk scorecard covering conversion, 85% `.gov` inbox-placement target [evidence: .planning/PROJECT.md], 0 critical citation defects [assumption: quality bar], chargebacks below 0.5% [evidence: .planning/PROJECT.md], and operator time below 30 minutes per day [evidence: .planning/PROJECT.md].

## Buildability Notes

Each Next Work item is scoped to one worker-sized artifact: ruling, index, dry-run report, beta list, finance reconciliation, GTM gate, or scorecard [assumption: execution design]. No item requires building a new speculative product surface before the business gates are answered [assumption: validation-first roadmap].
