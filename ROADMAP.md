# CivicState (brooks-history) - Roadmap

## Current Narrative

CivicState is a civic-letter workflow: a user describes a concern, the platform identifies officials, researches legal/regulatory context, drafts citation-backed letters, takes payment, delivers through email, and tracks status. [evidence: `.planning/PROJECT.md`, `.planning/GENESIS.md`]

The historical `.planning/ROADMAP.md` describes four completed phases: foundation, AI pipeline, payment and delivery, and dashboard/compliance. [evidence: `.planning/ROADMAP.md`] That narrative is useful as build history, but it is not sufficient for launch or investor readiness because `.planning/STATE.md` is stale and `.planning/REQUIREMENTS.md` still contains unchecked requirements. [evidence: `.planning/STATE.md`, `.planning/REQUIREMENTS.md`]

The roadmap now serves the business plan: prove demand, deliverability, citation quality, compliance correctness, and operator intent before calling this a venture-backed business.

## Prior Build Preserved

- Foundation: monorepo, Prisma/PostgreSQL, Redis/BullMQ worker pattern, auth middleware, Docker, CI scripts, and frontend shell. [evidence: `.planning/ROADMAP.md`, `package.json`]
- AI pipeline: moderation, classifier/researcher/drafter workers, legal-source search, citation verification, and submission wizard surface. [evidence: `.planning/ROADMAP.md`, `apps/api/src/routes/submissions.ts`, `apps/worker/src/agents/researcher.ts`]
- Payment and delivery: Stripe pricing tiers, Checkout session creation, Postmark delivery worker, bounce checks, and treasury route surface. [evidence: `.planning/ROADMAP.md`, `apps/api/src/routes/payments.ts`, `apps/worker/src/agents/delivery.ts`]
- Dashboard and compliance: user/admin pages, admin queues, legal pages, CCPA-style deletion/export routes, and audit logging. [evidence: `.planning/ROADMAP.md`, `apps/api/src/routes/admin.ts`, `apps/api/src/routes/compliance.ts`]

## Validation Gates

- Demand: preview-to-paid conversion must reach at least 3% before scaling self-serve distribution. [assumption: validation gate preserved from `.planning/PROJECT.md`]
- Deliverability: .gov inbox placement must reach at least 85% before broad paid launch. [assumption: validation gate preserved from `.planning/PROJECT.md`]
- Coverage: official lookup must prove federal/state coverage and quantify local gaps across a sample of ZIP codes. [assumption: launch-readiness requirement]
- Citation quality: verified citation existence must be supplemented by human audit of relevance, not just parser success. [assumption: legal-adjacent quality requirement]
- Operator posture: operator must decide whether this is a business candidate or a personal/research asset before investor-facing promotion. [evidence: dispatch registry notes]

## Buildable Next Work (wrk.dog)

- [ ] Problem & Customer: run 25 concierge beta submissions and record issue type, preview reaction, paid intent, and support burden.
- [ ] Market: build a bottom-up validation sheet from actual previews, paid conversions, official coverage, and repeat-use signals.
- [ ] Product & Moat: execute an end-to-end launch-readiness test for submission, officials lookup, research, draft, payment, webhook, delivery, dashboard, admin, and export.
- [ ] Product & Moat: repair or disprove the compliance export schema mismatch between `apps/api/src/routes/compliance.ts` and `packages/shared/prisma/schema.prisma`.
- [ ] Business Model: instrument tier mix, Stripe fees, model tokens, delivery cost, moderation rate, and human review minutes per campaign.
- [ ] Go-To-Market: publish and test 10 narrow issue templates for SEO/share acquisition without paid ads.
- [ ] Risks & Anti-Plan: run .gov deliverability tests with SPF/DKIM/DMARC, warming status, bounce handling, and inbox-placement evidence.
- [ ] Platform Posture: document the reversible boundary between direct Clerk/Stripe integrations and any future WrkPlug chassis adoption.

## Quarter Milestones

- 2026-07-15: launch-readiness evidence packet exists for core flows and known defects. [assumption: next verification target]
- 2026-07-31: beta evidence from 25 submissions exists, including willingness-to-pay and citation-quality notes. [assumption: next demand target]
- 2026-08-31: operator gets a go/pause/pivot decision memo based on conversion, deliverability, coverage, and compliance evidence. [assumption: next business decision target]
- 2026-09-30: registry posture is updated to business candidate, research asset, or archive. [assumption: operator decision target]
