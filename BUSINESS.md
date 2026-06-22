# CivicState Business Plan

**As-of date:** 2026-06-22 [evidence: worker dispatch current_date].  
**Project identity:** The runner labels this repo `brooks-history`, but the repository evidence describes `CivicState`, a civic technology product for researched constituent letters [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md), [package.json](package.json)].  
**Authority status:** Proposed soul upgrade only; POM soul-review plus wrk.dog merge constitute adoption -- operator ruling 2026-06-12 [evidence: worker brief].

## Snapshot

CivicState helps a US resident turn a civic concern into a researched, citation-backed letter campaign to relevant government officials. The repository now contains a Next.js web app, Express API, BullMQ worker, Prisma schema, legal/compliance pages, Stripe payment flow, Postmark delivery hooks, and agent scaffolding [evidence: [apps/web/app/page.tsx](apps/web/app/page.tsx), [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

The investability stance is **watchlist, not near-term investible**. The registry note says this may be a personal/research asset and asks the operator to confirm whether it should pitch as a business [evidence: worker dispatch registry note]. The plan below treats it as a business hypothesis, not a validated business.

## Thesis

The strongest version of the thesis is narrow: people already write to elected officials, but most individuals lack the time, confidence, legal context, and targeting data to produce a credible multi-recipient letter. CivicState can package research, targeting, drafting, payment, delivery, and tracking into a paid transaction at $5, $15, and $25 tiers [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

The venture-scale version is unproven. Without organic acquisition, repeat behavior, deliverability proof, and official-response utility, this is more likely a useful civic workflow tool than a fundable VC company [assumption: EIR judgment from repository-only review].

## Product And Current State

Built or represented in code:

- Monorepo workspaces for `apps/web`, `apps/api`, `apps/worker`, and `packages/shared` [evidence: [package.json](package.json)].
- Web UI for home, submit flow, dashboard, admin, privacy, terms, and about pages [evidence: [apps/web/app](apps/web/app)].
- Express API with health, submissions, officials, payments, campaigns, admin, webhooks, and compliance routers [evidence: [apps/api/src/index.ts](apps/api/src/index.ts)].
- Worker process registering classifier, researcher, drafter, delivery, treasury, and reconciliation workers [evidence: [apps/worker/src/index.ts](apps/worker/src/index.ts)].
- Prisma models for users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma)].

Not yet proven:

- Live production traffic, paid conversion, live DNS/domain warming, .gov deliverability, official reply rate, and consumer willingness to pay are not evidenced in the repository [assumption: absence of production metrics in workspace review].
- Local official data remains a known gap because Cicero is present as a stub and the provider decision remains open [evidence: [apps/api/src/lib/officials/cicero.ts](apps/api/src/lib/officials/cicero.ts), [.planning/STATE.md](.planning/STATE.md)].

## Customer Definition

Primary customer: an ordinary US resident with a concrete local, state, or federal civic issue who wants a professional letter delivered but does not want to research jurisdiction, law, formatting, and official contacts manually [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].

Early adopter segments are best framed as use cases, not demographic certainties:

- Tenants, neighbors, parents, commuters, small business owners, and local issue advocates with urgent but non-legal civic complaints [assumption: inferred from product job-to-be-done].
- Mobile-first, low-time users who prefer a one-time purchase to a subscription [assumption: inferred from transactional pricing and no-subscription plan].
- Users willing to pay $5 to $25 for convenience, credibility, and delivery tracking [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

Excluded customers: law-firm clients, people filing legal claims, formal regulatory submitters, and organizations needing lobbying software [evidence: [MASTER_PLAN.md](MASTER_PLAN.md), [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

## Market Sizing

No external market research was available in workspace-only mode. This sizing is therefore a bottom-up operating envelope, not TAM.

| Scenario | Monthly paid campaigns | Blended price | Monthly revenue | Annualized revenue | Label |
|---|---:|---:|---:|---:|---|
| Manual beta | 100 campaigns/month [assumption: small founder-led test volume] | $15/campaign [assumption: midpoint of repo pricing tiers] | $1,500/month [assumption: 100 x $15] | $18,000/year [assumption: $1,500 x 12] | Validation |
| Local niche | 1,000 campaigns/month [assumption: one repeatable issue/geo wedge] | $15/campaign [assumption: midpoint of repo pricing tiers] | $15,000/month [assumption: 1,000 x $15] | $180,000/year [assumption: $15,000 x 12] | Lifestyle business |
| Multi-state wedge | 10,000 campaigns/month [assumption: strong organic loop plus durable deliverability] | $15/campaign [assumption: midpoint of repo pricing tiers] | $150,000/month [assumption: 10,000 x $15] | $1,800,000/year [assumption: $150,000 x 12] | Venture watchlist |

The build should not cite any of these as market proof. The right first proof is paid campaign volume, not a national civic-tech TAM claim [assumption: EIR judgment].

## Revenue Model

Active model: one-time paid letter packages at $5 for one official, $15 for three officials, and $25 for all matched officials [evidence: [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md)].

Deferred models: priority complex review and API access for organizations appear in the master plan, but both are future-facing and should stay outside the near-term pitch until the individual workflow works [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].

Financial sanity check for the manual beta:

| Driver | Value |
|---|---:|
| Paid campaigns | 100/month [assumption: small beta target] |
| Blended price | $15/campaign [assumption: midpoint of $5/$15/$25 repo tiers] |
| Gross revenue | $1,500/month [assumption: 100 x $15] |
| Variable cost | $2/campaign [assumption: AI, email, payment, and misc. buffer] |
| Total variable cost | $200/month [assumption: 100 x $2] |
| Fixed burn | $132.50/month [evidence: [.planning/PROJECT.md](.planning/PROJECT.md) states max burn estimate] |
| Contribution after variable and fixed cost | $1,167.50/month [assumption: $1,500 - $200 - $132.50] |
| Operating margin | 77.8% [assumption: $1,167.50 / $1,500] |

This table reconciles by construction and should be replaced with live Stripe, Anthropic, Postmark, and infrastructure data as soon as the first beta cohort runs.

## Go-To-Market

Near-term GTM should be deliberately small because the riskiest unknowns are deliverability, trust, and conversion.

- Start with a closed beta on one civic issue category and one to three geographies [assumption: focused validation design].
- Target a paid conversion gate of at least 3% from preview to payment because the planning docs already name that threshold [evidence: [.planning/PROJECT.md](.planning/PROJECT.md)].
- Use SEO only after opt-in publication, privacy language, and content moderation are working; the master plan's SEO flywheel is plausible but unvalidated [evidence: [MASTER_PLAN.md](MASTER_PLAN.md)].
- Do not run paid acquisition until unit economics are based on live costs, not estimates [assumption: EIR operating discipline].

## Competition

The repository names Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice as relevant comparisons [evidence: [.planning/PROJECT.md](.planning/PROJECT.md), [MASTER_PLAN.md](MASTER_PLAN.md)].

Working competitive map:

- Resistbot: closest constituent-letter behavior; CivicState's claimed wedge is researched citation-backed drafting [assumption: repository claim not externally verified].
- Change.org: mass petition hosting; CivicState's wedge is direct letter delivery and per-official targeting [assumption: repository claim not externally verified].
- LegalZoom: document preparation brand; CivicState's wedge is civic-specific and lower-cost transactional workflow [assumption: repository claim not externally verified].
- Quorum and VoterVoice: organizational advocacy platforms; CivicState's wedge is individual self-serve pricing [assumption: repository claim not externally verified].
- Manual direct outreach: free substitute; CivicState must beat it on convenience, credibility, and confidence [assumption: EIR competitive analysis].

## Risks And Anti-Plan

The kill case is straightforward: CivicState may be a polished workflow for a problem that too few people will pay for. Government offices may treat AI-generated constituent letters as low-signal, email deliverability may be poor, and the product may attract sensitive political, legal, defamatory, or threatening content that costs more to moderate than the $5 to $25 ticket can support [assumption: EIR anti-plan].

Specific risks:

- Demand risk: users may want free civic expression, not paid letter delivery [assumption: no paid conversion evidence in repo].
- Trust risk: users may distrust AI legal/regulatory citation work even with disclaimers [assumption: no user research in repo].
- Deliverability risk: .gov spam filters and official opt-outs can break the core promise [evidence: [scripts/setup-dns.md](scripts/setup-dns.md), [.planning/PROJECT.md](.planning/PROJECT.md)].
- Data risk: political opinions and issue descriptions are sensitive, and mishandling them is reputationally severe [evidence: [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma), [apps/web/app/privacy/page.tsx](apps/web/app/privacy/page.tsx)].
- Legal/compliance risk: the product must stay out of legal advice, lobbying representation, claim filing, and harassment facilitation [evidence: [apps/web/app/terms/page.tsx](apps/web/app/terms/page.tsx)].

Anti-plan: do not pitch this as a scaled advocacy network, AI lobbying company, or autonomous legal engine. Pitch it only as a paid constituent communication workflow until real customers, delivery data, and reply outcomes prove more [assumption: EIR recommendation plus registry watchlist note].

## Assumption Ledger

| Assumption | Why It Matters | Validation Test | Current Status |
|---|---|---|---|
| People will pay $5 to $25 for one-off civic letters [evidence: repo pricing] | Revenue depends on payment intent | Closed beta preview-to-pay tracking | Unvalidated [assumption: no Stripe metrics found] |
| Preview-to-payment conversion can reach 3% [evidence: project threshold] | Minimum demand gate | Instrument funnel from `/submit` preview to Stripe checkout | Unvalidated [assumption: no analytics found] |
| Email delivery to government domains can reach 85% inbox placement [evidence: project threshold] | Core promise requires delivery | Seed-list and live-domain deliverability test | Unvalidated [assumption: no Postmark evidence found] |
| Local official coverage can reach 60% [evidence: project threshold] | Local issues likely drive demand | Cicero versus BallotReady spike | Open [evidence: Cicero stub] |
| Gross margin can remain above 40% [evidence: repo requirement] | Pricing floor and viability | Compare live Stripe, AI, Postmark, and infra cost per campaign | Unvalidated [assumption: no live ledger metrics found] |

## Surprise Spikes

- The dispatch calls the project `brooks-history`, but repository files consistently describe `CivicState` [evidence: worker dispatch, [.planning/PROJECT.md](.planning/PROJECT.md), [package.json](package.json)].
- `.planning/existing-state.md` says zero application code exists, while the current tree contains web, API, worker, shared Prisma, and compliance code [evidence: [.planning/existing-state.md](.planning/existing-state.md), [apps](apps), [packages](packages)].
- `.planning/ROADMAP.md` marks all four phases complete on 2026-04-25 [evidence: [.planning/ROADMAP.md](.planning/ROADMAP.md)], while `.planning/STATE.md` says only Phase 1 is complete and Phase 2 is next [evidence: [.planning/STATE.md](.planning/STATE.md)].
- The registry warns this may be a personal/research asset, so the business plan must stay conditional [evidence: worker dispatch registry note].

## Evidence And Freshness

Workspace evidence reviewed on 2026-06-22 [evidence: worker dispatch current_date]:

- [.planning/PROJECT.md](.planning/PROJECT.md) -- core value, requirements, constraints, business claims.
- [MASTER_PLAN.md](MASTER_PLAN.md) -- product architecture, pricing philosophy, competition, unit economics.
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) -- implementation requirements and deferred scope.
- [.planning/ROADMAP.md](.planning/ROADMAP.md) -- phase narrative and completion claims.
- [.planning/STATE.md](.planning/STATE.md) -- conflicting current-state signal.
- [apps/api/src/index.ts](apps/api/src/index.ts), [apps/worker/src/index.ts](apps/worker/src/index.ts), [apps/web/app/page.tsx](apps/web/app/page.tsx), [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) -- current code shape.

Freshness warning: external market, competitor, legal, and pricing claims were not network-verified because the worker was instructed to run workspace-only [evidence: worker brief]. Treat every external claim as an assumption until operator-approved research refresh.
