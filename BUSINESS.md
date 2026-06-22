# CivicState Business Plan

## Snapshot

As of 2026-06-22 [evidence: worker dispatch date], CivicState is best treated as a personal/research civic-tech asset, not a near-term investible business, until operator validation proves paid demand, official-contact coverage, and deliverability [evidence: registry note in dispatch].

The product thesis is a paid workflow that turns a resident's civic concern into researched, citation-backed letters to public officials, with published price points of $5, $15, and $25 per package [evidence: `.planning/PROJECT.md`; `apps/web/app/page.tsx`]. The repo contains real application code for a Next.js frontend, Express API, Prisma/PostgreSQL data model, BullMQ workers, legal citation search, moderation, Stripe, Postmark, Clerk, and admin/compliance routes [evidence: `package.json`; `apps/api/src/index.ts`; `packages/shared/prisma/schema.prisma`; `apps/worker/src/agents/researcher.ts`].

The investment posture is Watchlist: the build has unusually complete technical intent, but the business has $0 validated revenue, 0 known users, 0 production traffic, and 0 externally verified market evidence in this workspace [evidence: `.planning/existing-state.md`; assumption: no live analytics or customer files are present in repo].

## Thesis

CivicState's core bet is that ordinary United States residents will pay a small transactional fee to avoid the research, drafting, and routing work required to contact the right officials with credible supporting citations [evidence: `.planning/GENESIS.md`; `.planning/PROJECT.md`].

The wedge is not "AI writes a letter." The wedge is the full civic-action chain: issue intake, jurisdiction inference, official lookup, legal/regulatory research, citation verification, professional drafting, payment, delivery tracking, and reply capture [evidence: `.planning/REQUIREMENTS.md`; `packages/shared/prisma/schema.prisma`].

The investible version of this company requires proof of 3 claims by 2026-09-30 [assumption: 100-day validation window from 2026-06-22]: customers convert to paid submissions at or above 3% [evidence: `.planning/PROJECT.md` states this as a validation gate], government email deliverability reaches at least 85% inbox placement [evidence: `.planning/PROJECT.md` states this as a validation gate], and official data coverage reaches at least 95% federal/state with at least 60% local coverage [evidence: `.planning/PROJECT.md` states this as a validation gate].

## Product Reality

Real today: the repo has monorepo structure, typed Node packages, API routing, worker agents, Prisma models, audit/ledger tables, content moderation, legal-source integration modules, and test files covering admin, API routes, campaigns, citation verification, compliance, delivery, moderation, officials, payment, state cache, and treasury [evidence: `package.json`; `tests/*.test.ts`; `apps/api/src`; `apps/worker/src`; `packages/shared/prisma/schema.prisma`].

Not yet proven today: production deployment, live domain configuration, real Postmark delivery to officials, real Stripe payment capture, real Clerk users, real official-response capture, real market demand, and legal/compliance adequacy [evidence: `.planning/existing-state.md`; assumption: no production credentials, logs, or customer data are present in workspace].

Surprise spike: `.planning/ROADMAP.md` says all 4 phases were completed on 2026-04-25 [evidence: `.planning/ROADMAP.md`], while `.planning/STATE.md` says only Phase 1 was complete on 2026-04-25 [evidence: `.planning/STATE.md`] and `.planning/REQUIREMENTS.md` still marks most submission, official lookup, letter, payment, delivery, dashboard, moderation, treasury, admin, and legal requirements pending [evidence: `.planning/REQUIREMENTS.md`].

## Customer Definition

Primary customer: a United States resident with a specific civic frustration who would contact government if the product handled research, targeting, drafting, and delivery [evidence: `.planning/GENESIS.md`; `.planning/PROJECT.md`].

Early adopter segment: mobile-first residents with concrete local issues such as noise, potholes, zoning, school policy, enforcement failure, or legislative demands [evidence: `.planning/GENESIS.md`].

Future customer segment: HOAs, nonprofits, and civic organizations through API or organization workflows, explicitly deferred until the consumer pipeline is validated [evidence: `.planning/PROJECT.md`; `.planning/REQUIREMENTS.md`].

Non-customer: users seeking legal advice, claim filing, regulatory submissions, litigation support, automated threats, harassment, or partisan moderation advantages [evidence: `.planning/PROJECT.md`; `.planning/REQUIREMENTS.md`; `apps/api/src/lib/moderation.ts`].

## Market Sizing

Workspace-only sizing method: because network research is unavailable, the market is sized bottom-up from the repo's own pricing, volume assumptions, and validation gates rather than from external TAM reports [evidence: worker dispatch says no network; `.planning/PROJECT.md`; `MASTER_PLAN.md`].

Beachhead serviceable obtainable market: 1,000 paid submissions per month at a blended $15 price implies $15,000 monthly revenue and $180,000 annual revenue [assumption: modeled from repo price tiers of $5/$15/$25; evidence for tiers: `.planning/REQUIREMENTS.md`]. This is not a market claim; it is the first scale target at which the repo's "moat becomes real" language starts to be testable [evidence: `.planning/GENESIS.md` says the moat is weak at 50 submissions/month and becomes real at 1,000+].

Bootstrap viability line: 25 Amplify-tier submissions per month produce roughly $340 MRR [evidence: `.planning/GENESIS.md`], while the older project note also states break-even at 11 submissions [evidence: `.planning/PROJECT.md`]. This conflict needs operator reconciliation before investor use.

Expansion model: at 5,000 submissions per month, the infrastructure plan still expects a single droplet architecture [evidence: `MASTER_PLAN.md`]. At a modeled $15 blended price, that is $75,000 monthly revenue and $900,000 annual revenue [assumption: arithmetic model using repo price tiers, not validated demand].

TAM proxy: if 0.1% of an assumed 100,000,000 adult United States residents with periodic civic concerns bought 1 package per year at $15, annual gross revenue would be $1,500,000 [assumption: external population and incidence proxy, not network-verified]. This is intentionally conservative and should be replaced with sourced civic-engagement and willingness-to-pay data before fundraising.

## Revenue Model

Launch revenue is transactional, not subscription: $5 single-official package, $15 three-official package, and $25 all-officials package [evidence: `.planning/REQUIREMENTS.md`; `apps/web/app/page.tsx`].

The repo requires Stripe Checkout, webhook-confirmed fulfillment, and a 40% net-margin floor after fees [evidence: `.planning/REQUIREMENTS.md`].

The financial control design includes a $1,500 Mercury reserve, $2,000 warning alert, $500 emergency alert, 150% job-cost overage pause, and reconciliation discrepancies above $0.10 flagged for review [evidence: `.planning/PROJECT.md`; `.planning/REQUIREMENTS.md`].

Variable cost assumptions in the existing soul range from $0.20 per submission [evidence: `.planning/PROJECT.md`] to $0.35-$0.75 per job [evidence: `.planning/GENESIS.md`]. The plan must use the higher range until measured production token logs prove otherwise [assumption: conservative underwriting principle].

## Financial Model

| Month state | Paid submissions | Blended price | Gross revenue | Variable cost | Gross profit | Notes |
|---|---:|---:|---:|---:|---:|---|
| Validation | 25/mo [evidence: `.planning/GENESIS.md`] | $15 [assumption: midpoint of $5/$15/$25 tiers] | $375/mo [assumption: 25 x $15] | $18.75/mo [assumption: 25 x $0.75 high-end job cost] | $356.25/mo [assumption: revenue minus variable cost] | Reconciles with repo's ~$340 MRR statement after fees and mix [evidence: `.planning/GENESIS.md`] |
| Early traction | 250/mo [assumption: 10x validation volume] | $15 [assumption: midpoint tier] | $3,750/mo [assumption: 250 x $15] | $187.50/mo [assumption: 250 x $0.75] | $3,562.50/mo [assumption: revenue minus variable cost] | Requires deliverability and moderation queue proof |
| Moat threshold | 1,000/mo [evidence: `.planning/GENESIS.md` threshold language] | $15 [assumption: midpoint tier] | $15,000/mo [assumption: 1,000 x $15] | $750/mo [assumption: 1,000 x $0.75] | $14,250/mo [assumption: revenue minus variable cost] | Contact/citation data begins compounding |
| Single-droplet ceiling | 5,000/mo [evidence: `MASTER_PLAN.md`] | $15 [assumption: midpoint tier] | $75,000/mo [assumption: 5,000 x $15] | $3,750/mo [assumption: 5,000 x $0.75] | $71,250/mo [assumption: revenue minus variable cost] | Infra plan says single droplet, but ops risk rises |

These figures exclude fixed costs such as the $96/mo DigitalOcean droplet, $50/mo managed PostgreSQL option, $25/mo Spaces option, and $12/mo load balancer option [evidence: `MASTER_PLAN.md`]. They also exclude Stripe fees, Postmark fees, paid local official-data providers, legal review, support, chargebacks, and operator time [assumption: missing measured cost file].

## Go-To-Market

The repo's stated GTM is organic search and opt-in public campaign pages, with social sharing as secondary and paid acquisition excluded at launch [evidence: `.planning/GENESIS.md`].

This is plausible but unvalidated. The first GTM experiment should be a manual concierge beta with 20 target users by 2026-07-31 [assumption: operator-sized validation sprint], not SEO. SEO depends on indexed pages, public campaign consent, safe moderation, and enough successful deliveries to create credible examples.

The required funnel metrics are visitor-to-submission start, submission-start-to-preview, preview-to-payment, payment-to-delivered, delivered-to-official-response, refund/chargeback rate, and support minutes per paid job [assumption: standard funnel needed to validate repo thesis].

## Competition

Named competitors and alternatives in the existing soul are Resistbot, Change.org, LegalZoom, manual constituent contact, Quorum, and VoterVoice [evidence: `.planning/PROJECT.md`; `MASTER_PLAN.md`].

Competitive frame:

| Alternative | Buyer/user | Threat | CivicState response |
|---|---|---|---|
| Resistbot | Individual constituents [assumption: category knowledge not network-verified] | Free or low-friction civic messaging | Differentiate on legal/regulatory research and citation verification [evidence: `.planning/PROJECT.md`] |
| Change.org | Petition creators/signers [assumption: category knowledge not network-verified] | Massive petition-distribution brand | Differentiate on direct official delivery and specific researched letters [evidence: `MASTER_PLAN.md`] |
| Quorum / VoterVoice | Organizations [evidence: `.planning/PROJECT.md`] | Enterprise advocacy budgets and contact databases | Avoid enterprise head-on until consumer loop works |
| LegalZoom | Consumers seeking documents [evidence: `MASTER_PLAN.md`] | Trust and paid document behavior | Avoid legal-advice claims; stay in constituent communication |
| Manual outreach | Any resident | Free, authentic, no platform risk | Win only when research/routing time pain is high |

## Risks And Anti-Plan

The skeptic's anti-plan: do not fund this as a venture-scale company until the operator proves that people pay for civic letters, officials receive them, and the product does not create legal, deliverability, or abuse blowback.

Kill conditions by 2026-09-30 [assumption: validation deadline]: paid conversion below 3% [evidence: `.planning/PROJECT.md` target], inbox placement below 85% [evidence: `.planning/PROJECT.md` target], local official coverage below 60% [evidence: `.planning/PROJECT.md` target], chargeback rate above 0.5% [evidence: `.planning/PROJECT.md`], or moderation queue older than 24 hours at normal volume [evidence: `.planning/REQUIREMENTS.md`].

Major risks:

- Demand risk: civic anger may not convert to paid action at $5-$25 [evidence: `.planning/GENESIS.md`; `.planning/REQUIREMENTS.md`].
- Deliverability risk: government inboxes may treat generated civic mail as spam even with SPF/DKIM/DMARC and domain warming [evidence: `.planning/PROJECT.md`].
- Data risk: federal/state/local official lookup may be incomplete, stale, paid, or restricted [evidence: `.planning/PROJECT.md`; `.planning/REQUIREMENTS.md`].
- Legal/compliance risk: "not legal advice," CAN-SPAM, privacy, AI disclosure, opt-outs, and retention policies need legal review before scale [evidence: `.planning/REQUIREMENTS.md`].
- Abuse risk: threats, harassment, defamation, impersonation, and bulk campaigns can damage officials and the platform [evidence: `.planning/REQUIREMENTS.md`; `apps/api/src/lib/moderation.ts`].
- Soul risk: the repo's planning history contradicts itself about completion status [evidence: `.planning/ROADMAP.md`; `.planning/STATE.md`; `.planning/REQUIREMENTS.md`].

## Assumption Ledger

| Assumption | Basis | Validation |
|---|---|---|
| Users will pay $5-$25 | Existing project thesis and pricing [evidence: `.planning/PROJECT.md`] | Concierge beta with real payments |
| 3% conversion is enough for launch signal | Existing validation gate [evidence: `.planning/PROJECT.md`] | Instrument funnel by 2026-07-31 [assumption: sprint date] |
| Email-only delivery is enough | Existing scope choice [evidence: `.planning/GENESIS.md`] | Measure bounce, spam, and official responses |
| Citation verification is defensible | Worker code verifies citations from eCFR, CourtListener, and state cache [evidence: `apps/worker/src/agents/researcher.ts`] | Human audit sample of 50 letters [assumption: sample size] |
| One operator can handle exceptions | Existing operating constraint [evidence: `.planning/GENESIS.md`] | Track support minutes and queue age |
| SEO can become distribution | Existing GTM hypothesis [evidence: `.planning/GENESIS.md`] | Only after 100 public opt-in pages [assumption: content threshold] |

## Evidence Sources

- `.planning/PROJECT.md` [evidence] - existing product definition, pricing, constraints, validation gates, and decisions.
- `.planning/GENESIS.md` [evidence] - original assumptions, value chain, distribution hypothesis, moat hypothesis, and success metrics.
- `.planning/REQUIREMENTS.md` [evidence] - requirement checklist, status, pricing, moderation, treasury, and compliance requirements.
- `.planning/ROADMAP.md` [evidence] - existing roadmap and the stale all-phases-complete claim.
- `.planning/STATE.md` [evidence] - project state showing Phase 1 complete and later phases pending.
- `.planning/existing-state.md` [evidence] - earlier audit stating no production infrastructure, no users, no revenue, and no traffic at that point.
- `MASTER_PLAN.md` [evidence] - detailed architecture, infrastructure costs, pricing philosophy, and scaling model.
- `apps/api/src`, `apps/worker/src`, `packages/shared/prisma/schema.prisma`, and `tests/*.test.ts` [evidence] - implemented technical surface.

## Surprise Spikes

The largest positive surprise is that the current repo has meaningful application code despite the earlier audit saying there was zero application source [evidence: `.planning/existing-state.md`; `apps/api/src`; `apps/worker/src`; `packages/shared/prisma/schema.prisma`].

The largest negative surprise is that roadmap completion claims cannot be trusted without source-level verification because `.planning/ROADMAP.md`, `.planning/STATE.md`, and `.planning/REQUIREMENTS.md` disagree [evidence: those files].

The registry note says this may be a personal/research asset, and the upgraded soul should not pitch it as investible until the operator confirms intent and validation data exists [evidence: dispatch registry note].

## Roadmap Implications

The next roadmap should stop celebrating implementation phases and focus on evidence production: instrument the funnel, reconcile true feature status, run a paid concierge beta, prove deliverability, audit citations, and obtain legal/compliance review [assumption: EIR recommendation based on evidence gaps].

