# CivicState Roadmap

## Roadmap Context

The existing planning roadmap describes a four-phase product: foundation, AI pipeline, payment and delivery, then dashboard and compliance [evidence: .planning/ROADMAP.md]. It marks all four phases complete, while `.planning/STATE.md` still says the project is at Phase 1 complete [evidence: .planning/ROADMAP.md; .planning/STATE.md]. This root roadmap aligns the build shape to the VC-grade business plan and treats completion claims as needing operator verification.

## Business Trace

The roadmap serves the current thesis in `BUSINESS.md`: prove that residents will pay for researched, citation-backed constituent letters and that the system can deliver them safely. It does not assume enterprise API, subscriptions, certified mail, community features, or paid acquisition until the core paid delivery loop has evidence [evidence: BUSINESS.md; .planning/GENESIS.md; .planning/REQUIREMENTS.md].

## Existing Narrative Preserved

- Phase 1: foundation, monorepo, database, auth, worker engine, CI, and domain-warming preparation [evidence: .planning/ROADMAP.md].
- Phase 2: submission wizard, officials directory, classifier/researcher/drafter agents, citation verification, and moderation [evidence: .planning/ROADMAP.md].
- Phase 3: Stripe checkout, Postmark delivery, bounce tracking, and treasury controls [evidence: .planning/ROADMAP.md].
- Phase 4: user dashboard, admin tools, legal pages, CCPA deletion, and retention enforcement [evidence: .planning/ROADMAP.md].

## Now

- [ ] **What Is Real Today:** reconcile `.planning/STATE.md` against `.planning/ROADMAP.md` and code paths; produce one operator-accepted implementation status table.
- [ ] **Customer Definition:** run a `50`-person beta recruitment script and record who has a concrete civic issue versus curiosity-only interest [assumption: validation cohort size].
- [ ] **Revenue Model:** complete one authenticated Stripe checkout path in staging using the existing $5.00, $15.00, and $25.00 tiers [evidence: apps/api/src/routes/payments.ts].
- [ ] **Problem And Product:** test the end-to-end submission-to-preview path across `10` representative civic issues and capture failure reasons [assumption: manageable single-worker test batch].
- [ ] **Risks And Anti-Plan:** run deliverability tests to `25` official or test-domain addresses before any public launch [assumption: validation batch size].
- [ ] **Assumption Ledger:** evaluate local-official providers across `25` ZIP codes and document coverage, cost, and stale-contact behavior [assumption: provider spike size].
- [ ] **Evidence Sources:** attach screenshots, logs, or exports for first paid submission, first delivered letter, first bounce, and first flagged moderation case.

## Next

After the Now checklist is complete, the next build tranche should be beta hardening: admin review throughput, visible citation provenance, reply capture, data deletion verification, and operator dashboards. Each item should map back to the business gates: payment conversion, citation reliability, deliverability, and operator workload.

## Later

Only after the validation gates pass should CivicState consider SEO-scale public campaign pages, organization API access, paid acquisition, certified mail, fax fallback, multilingual workflows, or coalition features [evidence: .planning/REQUIREMENTS.md].
