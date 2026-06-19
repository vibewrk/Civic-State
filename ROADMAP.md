# CivicState — Roadmap

**Document date:** 2026-06-19 [evidence: runner current_date]. This roadmap merges the existing `.planning/ROADMAP.md` narrative with the EIR business plan and resets priority from feature completion to validation.

## Existing Narrative Preserved

The original roadmap describes CivicState as a full pipeline from civic frustration to official action: infrastructure, auth, agent engine, official lookup, legal research, citation verification, drafting, payment, delivery, dashboard, admin, and compliance [evidence: .planning/ROADMAP.md]. The repo shows substantial implementation across those areas, including Express API routes, Next.js screens, BullMQ workers, Prisma models, Stripe payment flow, Postmark delivery handling, and admin/compliance surfaces [evidence: apps/api/src/index.ts; apps/web/app/submit/page.tsx; apps/worker/src/index.ts; packages/shared/prisma/schema.prisma].

The roadmap now serves the business plan: prove the thesis before adding more product surface.

## Roadmap Principles

- Treat CivicState as watchlist until operator confirms business intent and resolves the `brooks-history` registry mismatch [evidence: registry dispatch].
- Prioritize paid demand, official-data coverage, deliverability, and compliance safety over new features [assumption: validation-first EIR posture].
- Keep all quantitative targets honestly labeled and traceable to `BUSINESS.md` or repo evidence.

## Now / Next

- [ ] **Thesis:** resolve the `brooks-history` versus CivicState identity spike and record the operator ruling.
- [ ] **Problem & Customer:** run a paid beta script with direct users and record why each user did or did not pay.
- [ ] **Market:** build a ZIP-code coverage test set and measure official lookup quality before claiming a reachable market.
- [ ] **Business Model:** complete one safe paid end-to-end run through Stripe, webhook fulfillment, delivery queue, ledger, and audit trail.
- [ ] **Go-To-Market:** create a no-paid-ads beta acquisition log for local civic groups, neighborhood associations, and issue communities.
- [ ] **Risks & Anti-Plan:** run a deliverability and complaint-rate drill using test recipients before sending to public officials.
- [ ] **Assumption Ledger:** update each validation gate with observed data or mark the business thesis failed.

## Buildable Shape

Each item above is intentionally single-worker-sized: one worker can inspect the code, add or update the relevant soul evidence, run manual validation where credentials exist, and leave measured results without speculative platform expansion [assumption: wrk.dog worker operating model].

## Later

After the Now / Next gates pass, consider optional public campaign pages for SEO, organization/API access, certified mail fallback, advanced reply summarization, and deeper analytics [evidence: .planning/REQUIREMENTS.md; MASTER_PLAN.md]. These remain deferred until paid demand and delivery trust are proven.
