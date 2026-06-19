# Roadmap: CivicState / Brooks History

## Purpose

This roadmap aligns the root soul with the existing CivicState implementation while preserving the original planning narrative in `.planning/ROADMAP.md` [evidence]. The original roadmap describes a four-phase civic-letter platform; this root roadmap reframes the next work around diligence, validation, and buildability because the registry marks the asset as watchlist/personal research rather than near-term investible [evidence: dispatch].

## Existing Narrative To Preserve

CivicState aims to move a user from civic frustration to official action through issue submission, official lookup, AI-assisted research, citation verification, letter drafting, payment, delivery, dashboard tracking, admin review, and compliance controls [evidence: .planning/ROADMAP.md; BUSINESS.md]. The repo already contains web, API, worker, database, and test surfaces for that workflow [evidence: apps; packages/shared; tests].

## Reconciled Build Shape

The next roadmap should not claim venture readiness. It should prove the smallest paid loop that can be honestly measured: one authenticated user, one real issue, verified citations, a paid tier, delivery status, moderation/audit logging, and an operator review path [evidence: BUSINESS.md]. Work that does not support that loop stays deferred.

## Buildable Next Steps

- [ ] **Snapshot / Existing Asset:** reconcile `.planning/STATE.md`, `.planning/existing-state.md`, and `.planning/ROADMAP.md` so build status matches the actual app folders.
- [ ] **Customer Definition:** run a tiny closed-beta intake script and record who the first paying user is, what issue they brought, and why they paid.
- [ ] **Product And Workflow:** verify one end-to-end local flow from submission to queued worker job to preview to Stripe Checkout test mode.
- [ ] **Revenue Model:** replace test cost estimates with ledgered per-job token, delivery, payment fee, and refund data.
- [ ] **Go To Market:** publish only opt-in beta pages and measure search impressions before expanding SEO content.
- [ ] **Risks And Anti-Plan:** complete the official-data provider spike and document local coverage failure modes before sending real letters.
- [ ] **Evidence Sources:** add a beta metrics log that records conversion, deliverability, official coverage, complaint rate, and operator minutes.

## Deferred Until Validation

Enterprise API access, subscriptions, community features, certified mail, fax delivery, multilingual support, paid acquisition, automated follow-up letters, and public campaign search remain deferred until the first paid loop proves demand and delivery reliability [evidence: .planning/REQUIREMENTS.md; BUSINESS.md].

## Gate Criteria

The project should remain `provisional` until an operator validates paid demand, delivery quality, official coverage, legal/compliance posture, and the naming mismatch between `brooks-history` and CivicState [evidence: BUSINESS.md; .ultra-start/gate.json].
