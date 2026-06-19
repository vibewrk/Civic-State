# CivicState Roadmap

Last updated: 2026-06-19 [evidence: runner context].

## Roadmap Position

The existing planning narrative says CivicState is a four-phase product: foundation, AI pipeline, payment and delivery, and dashboard/compliance [evidence: .planning/ROADMAP.md]. The root roadmap should now serve the business plan rather than repeat stale completion claims. The repo contains meaningful implementation across those areas, but the investible risk is not "can code be written"; it is whether a paid, compliant, deliverable civic-letter workflow works with real users and real officials [evidence: BUSINESS.md].

## Buildable Shape

Ship one constrained wedge before expanding. The next work should prove customer willingness to pay, official data quality, citation trust, email deliverability, and operator review load. Community, search, API, certified mail, fax, subscriptions, and coalition features stay deferred [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; MASTER_PLAN.md].

## Next Actions

- [ ] Customer Definition: choose one metro and one issue category for the beta wedge.
- [ ] Product: run a real end-to-end submission through research, citation verification, draft preview, payment, and email delivery.
- [ ] Market Sizing: replace the placeholder bottom-up market model with Search Console, keyword, or landing-page data.
- [ ] Revenue Model: record actual Stripe, AI, Postmark, and hosting cost per completed paid submission.
- [ ] Go To Market: recruit beta users only after the target officials and delivery path are manually verified.
- [ ] Risks And Anti-Plan: document every flagged submission and operator review minute during beta.
- [ ] Evidence Sources: resolve the `.planning/ROADMAP.md` versus `.planning/STATE.md` completion mismatch.

## Gates

Continue only if the beta clears these gates: payment conversion at or above 3% [evidence: .planning/PROJECT.md], government inbox placement at or above 85% [evidence: .planning/PROJECT.md], federal/state official coverage at or above 95% [evidence: .planning/PROJECT.md], local official coverage at or above 60% [evidence: .planning/PROJECT.md], and no unresolved citation-fabrication incidents [assumption: EIR safety gate].

## Deferred

Keep the following out of scope until the constrained wedge proves repeatable: comments, votes, co-signing, public feeds, automated follow-up letters, legal filings, third-party API, paid acquisition, native mobile apps, multilingual support, certified mail, fax, and real-time official chat [evidence: .planning/PROJECT.md; .planning/REQUIREMENTS.md; MASTER_PLAN.md].
