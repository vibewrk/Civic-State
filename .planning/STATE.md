# Project State

## Project Reference

See: `.planning/PROJECT.md` and `.planning/ROADMAP.md`.

**Core value:** CivicState turns a civic concern into official-targeted, citation-backed constituent letters with payment, delivery tracking, compliance controls, and an operator review path.

**Current focus:** Production-currentness and launch readiness after completion of the original four build phases.

## Current Position

Lifecycle phase: BUILD
Implementation phase: Post-Phase 4 readiness
Status: Original v1 build phases are repo-complete; production/account truth is not verified.
Last activity reflected in repo planning: 2026-04-25 Phase 4 legal compliance completion; 2026-06-05 roadmap refresh issue #20.

Progress: [████████░░] feature build complete, launch readiness gated

## Completed Build Evidence

| Area | Repo evidence | Status |
|------|---------------|--------|
| Foundation | `.planning/phases/01-foundation/*-SUMMARY.md`, `01-VERIFICATION.md` | Complete with Vercel deployment gap |
| AI pipeline | `.planning/phases/02-ai-pipeline/*-SUMMARY.md`, API/worker implementation | Complete in repo |
| Payment and delivery | `.planning/phases/03-payment-delivery/*-SUMMARY.md`, Stripe/Postmark/treasury paths | Complete in repo |
| Dashboard and compliance | `.planning/phases/04-dashboard-compliance/*-SUMMARY.md`, dashboard/admin/legal routes | Complete in repo |

## Current Gates

- Vercel deployment for `apps/web` remains unverified from repo truth. Phase 1 verification found no `vercel.json` or workflow evidence for frontend deployment.
- Live credentials and account configuration remain unverified for Clerk, Stripe, Postmark, Anthropic, OpenStates, congress.gov, DigitalOcean, Vercel, Mercury, Sentry, and Plausible.
- Email DNS/domain warming cannot be treated as production-ready from code alone; live DNS and Postmark account evidence are required.
- Local officials provider remains a product/vendor decision: Cicero integration exists as a stub/integration surface, but Cicero vs BallotReady must be evaluated before launch commitment.
- AI model IDs and pricing are implementation assumptions until verified against current official provider docs.
- Public campaign/SEO publishing remains a decision gate, not an active launch commitment.

## Performance Metrics

Historical execution metrics from the initial phase runner are no longer a reliable current-state signal. Preserve phase summaries as build evidence; use fresh CI, deployment, credential, and provider checks for readiness decisions.

## Decisions Carried Forward

- Keep the launch product narrow: individual civic letter campaigns, email delivery, human review for flagged content, and compliance-first data handling.
- Treat protected UltraStart schema/lifecycle/workflow/authority paths as review-only until explicit elevated authorization is granted.
- Keep pricing, compliance posture, deployment authority, provider contracts, and account configuration gated until verified by an owner with production access.

## Pending Work

Next-wave work has been decomposed into draft handshake issue bodies under `.binary-star/plans/issue-20/`.

## Session Continuity

Resume from the next-wave issue drafts, not from Phase 1. The next operator should select one launch-readiness slice, verify prerequisites, and run it as its own bounded handshake issue.
