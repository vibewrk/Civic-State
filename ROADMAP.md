# CivicState / Brooks History Roadmap

## Roadmap Posture

As of 2026-06-22 [evidence: dispatch current_date], the root roadmap supersedes the stale planning roadmap for investor/data-room review. The legacy `.planning/ROADMAP.md` says four phases were completed on 2026-04-25 [evidence: .planning/ROADMAP.md], but requirements and code inspection show the business is not validated and several core integrations remain partial or stubbed [evidence: .planning/REQUIREMENTS.md; apps/api/src/lib/officials/cicero.ts].

The build posture is therefore validation-first: keep the existing CivicState narrative, but reduce the next work to a pilot that can prove or kill the business thesis without pretending the registry watchlist has become an investible company [evidence: dispatch registry notes].

## Existing Narrative to Preserve

CivicState helps residents turn civic concerns into researched, citation-backed letters delivered to the correct government officials for $5-$25 [evidence: .planning/PROJECT.md]. The product differentiates from manual outreach by handling research, official targeting, drafting, payment, delivery, and tracking [evidence: .planning/GENESIS.md].

The planned architecture remains Next.js frontend, Express API, PostgreSQL, Redis/BullMQ worker agents, Stripe payments, Postmark delivery, Clerk auth, and Prisma data model [evidence: MASTER_PLAN.md; apps/; packages/shared/prisma/schema.prisma].

## Buildable Shape

The roadmap should not chase all civic use cases at once. The immediate goal is a narrow paid pilot with measured conversion, coverage, deliverability, and operator load. Each task below is single-worker-sized and maps to a `BUSINESS.md` heading for traceability.

## Next Buildable Slice

- [ ] Business Definition: add an operator-facing repo note that resolves whether `brooks-history` should pitch CivicState as a business or remain a personal/research asset [evidence: dispatch registry notes].
- [ ] Customer Definition: instrument the preview-to-paid funnel and record whether the 3% beta conversion gate is met [evidence: .planning/PROJECT.md].
- [ ] Product and Current State: replace the Cicero local-official stub with a measured provider spike result or an explicit manual-pilot fallback [evidence: apps/api/src/lib/officials/cicero.ts].
- [ ] Revenue Model and Financial Figures: reconcile live Stripe payments, ledger entries, and treasury estimates for the $5, $15, and $25 tiers [evidence: .planning/REQUIREMENTS.md; apps/worker/src/lib/treasury.ts].
- [ ] Go-to-Market: run one geography and one issue-category pilot before enabling broad SEO campaign publishing [assumption: focused pilot reduces moderation and official-coverage risk].
- [ ] Competition: document user-visible comparison against Resistbot, Change.org, manual outreach, and legal-document tools in the product FAQ [evidence: MASTER_PLAN.md].
- [ ] Risks and Anti-Plan: add a stop/go review that kills business pitching if paid conversion, inbox placement, or official coverage misses the gates [evidence: .planning/PROJECT.md].

## Validation Gates

- Preview-to-paid conversion at or above 3% [evidence: .planning/PROJECT.md].
- Inbox placement at or above 85% for government recipients [evidence: .planning/PROJECT.md].
- Federal/state official coverage at or above 95% and local official coverage at or above 60% [evidence: .planning/PROJECT.md].
- Chargeback rate below 0.5% [evidence: .planning/PROJECT.md].
- Operator review queue stays below 10 flagged items and oldest flagged item remains under 24 hours [evidence: .planning/ROADMAP.md].

## Deferred Until Validation

- Enterprise API access for organizations [evidence: .planning/REQUIREMENTS.md].
- Certified mail, fax delivery, and automated follow-up letters [evidence: .planning/REQUIREMENTS.md].
- Public campaign SEO scale-up beyond reviewed opt-in pilot pages [evidence: .planning/GENESIS.md].
- Paid acquisition [evidence: .planning/GENESIS.md].
- Multi-language support and mobile native apps [evidence: .planning/REQUIREMENTS.md].

