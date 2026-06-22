# CivicState Roadmap

## Status As Of 2026-06-22 [evidence: worker dispatch date]

This roadmap supersedes the stale rootless planning narrative for business-review purposes only. It does not rewrite `.planning/` because the worker brief allows root soul artifacts, not planning internals.

The repo contains a substantial CivicState application surface, but the investible question is no longer "can a worker scaffold the app?" The open question is whether the operator can validate paid demand, reliable official delivery, safe moderation, and legally reviewed positioning.

## Existing Narrative To Preserve

CivicState turns civic concerns into researched, citation-backed letters delivered to the correct public officials. The existing plan centers on a Next.js frontend, Express API, PostgreSQL, Redis/BullMQ workers, OpenClaw-style agents, Clerk auth, Stripe payments, Postmark delivery, legal citation verification, audit logs, and treasury controls [evidence: `.planning/PROJECT.md`; `.planning/REQUIREMENTS.md`; `MASTER_PLAN.md`].

The original roadmap described 4 phases: Foundation, AI Pipeline, Payment & Delivery, and Dashboard & Compliance [evidence: `.planning/ROADMAP.md`]. However, that roadmap marks all phases complete on 2026-04-25 [evidence: `.planning/ROADMAP.md`], while `.planning/STATE.md` says only Phase 1 was complete on 2026-04-25 [evidence: `.planning/STATE.md`] and `.planning/REQUIREMENTS.md` still marks many business-critical capabilities pending. Treat completion status as unverified until the validation queue below is worked.

## Buildable Shape

The next unit of progress is a validation release, not more speculative expansion. Work should be single-worker-sized, measurable, and traceable to `BUSINESS.md` sections.

## Operator Validation Queue

- [ ] Product Reality: reconcile `.planning/ROADMAP.md`, `.planning/STATE.md`, `.planning/REQUIREMENTS.md`, and source files into one truth table for launch-critical capabilities.
- [ ] Thesis: instrument the funnel from landing page to submission, preview, payment, delivery, reply, refund, and support contact.
- [ ] Customer Definition: run a concierge beta with real residents and capture objections, willingness to pay, issue categories, and completion failures.
- [ ] Revenue Model: verify Stripe checkout, webhook fulfillment, ledger entry creation, and package selection using real payment-mode test evidence.
- [ ] Market Sizing: replace workspace-only assumptions with sourced civic-engagement, competitor, and willingness-to-pay evidence before fundraising.
- [ ] Go-To-Market: create a small set of opt-in public campaign pages only after consent, moderation, and legal review are complete.
- [ ] Risks And Anti-Plan: perform a human audit of generated letters for citation accuracy, legal-advice boundary, CAN-SPAM elements, and AI disclosure.
- [ ] Evidence Sources: add dated production evidence for deliverability, official coverage, conversion, chargebacks, and moderation queue health.

## Validation Gates

By 2026-09-30 [assumption: validation review date], the operator should decide whether CivicState remains a research asset, becomes a cash-flow experiment, or graduates to a fundable venture case.

Minimum promotion evidence:

- Paid conversion at or above 3% [evidence: `.planning/PROJECT.md` validation gate].
- Government inbox placement at or above 85% [evidence: `.planning/PROJECT.md` validation gate].
- Official coverage at or above 95% federal/state and 60% local [evidence: `.planning/PROJECT.md` validation gate].
- Chargeback rate below 0.5% [evidence: `.planning/PROJECT.md` constraint].
- No flagged moderation item older than 24 hours during normal beta operations [evidence: `.planning/REQUIREMENTS.md`].

## Deferred Until Validation

- Enterprise API for HOAs, nonprofits, and civic organizations.
- Certified mail, fax, automated follow-up, multilingual support, and native mobile apps.
- Paid acquisition.
- Community/social mechanics.
- Venture-style growth projections beyond the first repeatable paid workflow.
