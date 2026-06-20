# CivicState Business Plan

Review date: 2026-06-20 [evidence: assistant runtime]. Worker envelope date: 2026-06-19 [evidence: dispatch context]. Source plan date: 2026-04-25 [evidence: `.planning/PROJECT.md`]. Status: provisional watchlist, not investment-ready [evidence: registry note in dispatch].

## Thesis Current

CivicState is a transactional civic-advocacy tool: a US resident describes a civic issue, enters a ZIP code, reviews AI-researched letters with citations, pays once, and the platform sends individualized constituent emails to matched officials. The repo contains real implementation scaffolding for that loop: a Next.js submission flow, Express APIs, Prisma data model, moderation, officials lookup, Stripe Checkout, Postmark delivery, BullMQ workers, and audit/ledger primitives [evidence: `apps/web/app/submit/page.tsx`, `apps/api/src/routes/submissions.ts`, `apps/api/src/routes/payments.ts`, `apps/worker/src/agents/delivery.ts`, `packages/shared/prisma/schema.prisma`].

The investible claim is narrower than the old plan: prove a small paid workflow first, not an autonomous civic network. The business is only worth pitching if it validates that individuals will pay for researched constituent communication and that officials' inboxes accept and respond to the letters. Until then, this remains a personal/research asset with a promising build, not a venture-scale company [evidence: registry note in dispatch].

## Customer Definition

Primary customer: a US resident with a specific local, state, or federal civic request who lacks the time, legal vocabulary, or official-routing knowledge to send a professional letter manually [evidence: `.planning/PROJECT.md`].

Initial beachhead: people with concrete government-service issues, zoning/enforcement complaints, school-policy concerns, public-safety concerns, or local infrastructure problems where the desired outcome can be framed as a constituent request rather than legal advice [evidence: `.planning/GENESIS.md`].

Excluded users: businesses acting in a commercial lobbying capacity, legal claimants, people seeking filings or demand letters, harassment campaigns, bulk senders, and anyone asking the platform to assert unverifiable misconduct as fact [evidence: `MASTER_PLAN.md` rules of engagement].

## Problem And Value Proposition

The user job is not "write me a letter." It is "figure out who can act, what authority matters, and send a message that sounds credible enough to be read." CivicState collapses official lookup, legal/source research, citation verification, drafting, payment, delivery, and status tracking into one guided flow [evidence: `.planning/PROJECT.md`; `apps/api/src/routes/officials.ts`; `apps/worker/src/agents/researcher.ts`].

The value proposition is credible only if the platform stays non-legal, non-partisan, and outcome-focused. Every letter must disclose AI involvement, avoid legal advice, cite only verified sources, and route failures to an operator review queue [evidence: `.planning/REQUIREMENTS.md`; `apps/worker/src/agents/researcher.ts`; `apps/api/src/routes/admin.ts`].

## Product Reality

Built or evidenced in repo:

- Frontend homepage and submission wizard exist [evidence: `apps/web/app/page.tsx`; `apps/web/app/submit/page.tsx`].
- Submission API validates issue text, desired outcome, ZIP code, anonymity, moderation, job creation, and queue enqueueing [evidence: `apps/api/src/routes/submissions.ts`].
- Officials API has ZIP lookup, rate limiting, caching, and opt-out filtering hooks [evidence: `apps/api/src/routes/officials.ts`].
- Researcher worker searches eCFR, CourtListener, state cache, calls an LLM, verifies citations, strips unverified citations, and flags all-failed citation jobs [evidence: `apps/worker/src/agents/researcher.ts`].
- Payments use fixed Stripe tiers: `$5`, `$15`, and `$25` [evidence: `apps/api/src/routes/payments.ts`].
- Delivery uses Postmark, individual messages, reply routing, bounce-rate checks, opt-out suppression, and delivery records [evidence: `apps/worker/src/agents/delivery.ts`].
- Data model includes users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, and jobs [evidence: `packages/shared/prisma/schema.prisma`].

Not yet evidenced:

- No repo evidence of real paying users, conversion rate, response rate, or repeat usage.
- No repo evidence of production deployment health for `civicstate.com` or `api.civicstate.com`.
- No repo evidence that local official coverage is high enough for launch.
- No repo evidence of inbox placement against government domains.
- No repo evidence that legal review has blessed the CAN-SPAM, AI disclosure, lobbying, and "not legal advice" posture.

## Revenue Model

Launch pricing is intentionally simple: single official for `$5` [evidence: `apps/api/src/routes/payments.ts`], three officials for `$15` [evidence: `apps/api/src/routes/payments.ts`], and full spread for `$25` [evidence: `apps/api/src/routes/payments.ts`]. This matches the repo implementation and avoids the older dynamic-pricer ambition until costs and conversion are measured [evidence: `.planning/REQUIREMENTS.md`].

Revenue is transactional, not subscription. Upside paths stay deferred: organization API access, certified mail, fax, public campaign pages, and response summarization [evidence: `.planning/REQUIREMENTS.md`; `.planning/GENESIS.md`].

Pricing hypothesis: blended average revenue per paid submission is `$15` [assumption: equal mix of the implemented tiers because workspace has no sales data]. Gross payment fee at low ticket is modeled as `$0.74` on a `$15` order [assumption: common card-processing structure; not independently researched in workspace-only mode]. AI, lookup, email, and infrastructure variable cost per paid order is modeled at `$0.90` [assumption: planning docs cite sub-dollar token economics, but no production usage ledger exists]. Modeled contribution is `$13.36` per blended order [assumption: `$15 - $0.74 - $0.90`].

## Market Sizing

Workspace-only market sizing cannot use external population or civic-engagement statistics as evidence. The sober model is bottom-up from reachable demand, not top-down TAM.

| Layer | Method | Annual volume | Revenue |
| --- | --- | ---: | ---: |
| Validation wedge | `1,000` landing visits/month [assumption: small pilot] x `3%` paid conversion [assumption: planning target] x `$15` ARPU [assumption: tier blend] x `12` months [assumption: annualized model] | `360` paid submissions [assumption: small SEO/referral pilot] | `$5,400` [assumption: `360 x $15`] |
| Solo-operator serviceable market | `10,000` visits/month [assumption: niche SEO traction] x `3%` conversion [assumption: planning target] x `$15` ARPU [assumption: tier blend] x `12` months [assumption: annualized model] | `3,600` paid submissions [assumption: niche SEO traction] | `$54,000` [assumption: `3,600 x $15`] |
| Small team stretch | `50,000` visits/month [assumption: broader content footprint] x `2%` conversion [assumption: lower-converting broader traffic] x `$15` ARPU [assumption: tier blend] x `12` months [assumption: annualized model] | `12,000` paid submissions [assumption: broader content footprint but lower conversion] | `$180,000` [assumption: `12,000 x $15`] |
| Venture threshold | `$10,000,000` revenue goal [assumption: stress-test threshold] / `$15` ARPU [assumption: tier blend] | `666,667` paid submissions/year [assumption: venture-scale threshold chosen for stress test] | `$10,000,005` [assumption: rounded order count x ARPU] |

This sizing says the current asset can be a useful cash-flow or research product before it is a venture business. A venture thesis requires either much higher ARPU, institutional channels, public campaign SEO that compounds dramatically, or an organization product that is not in launch scope [assumption: derived from the modeled order math].

## Financial Model

| Scenario | Paid submissions/month | Blended ARPU | Monthly revenue | Variable cost/order | Monthly variable cost | Contribution before fixed costs |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Proof | `30` [assumption: beta target] | `$15` [assumption: implemented tier mix] | `$450` [assumption: `30 x $15`] | `$1.64` [assumption: fees plus AI/email/lookup] | `$49.20` [assumption: `30 x $1.64`] | `$400.80` [assumption: revenue minus variable cost] |
| Solo viable | `300` [assumption: niche SEO working] | `$15` [assumption] | `$4,500` [assumption: `300 x $15`] | `$1.64` [assumption] | `$492` [assumption: `300 x $1.64`] | `$4,008` [assumption] |
| Small team | `3,000` [assumption: strong repeatable acquisition] | `$15` [assumption] | `$45,000` [assumption: `3,000 x $15`] | `$1.64` [assumption] | `$4,920` [assumption] | `$40,080` [assumption] |

Fixed-cost baseline: DigitalOcean droplet at about `$96`/month [evidence: `MASTER_PLAN.md`], managed database later at `$50`/month [evidence: `MASTER_PLAN.md`], object storage later at `$25`/month [evidence: `MASTER_PLAN.md`], load balancer later at `$12`/month [evidence: `MASTER_PLAN.md`], and Mercury reserve target of `$1,500` [evidence: `MASTER_PLAN.md`; `.planning/PROJECT.md`].

Margin checkpoint: the old plan claimed `88%` to `92%` package margins [evidence: `MASTER_PLAN.md`], while the modeled blended contribution here is `89.1%` before fixed costs [assumption: `$13.36 / $15`]. That is internally consistent, but it is not validated by production ledgers.

Break-even against the `$96` infrastructure baseline is about `8` blended orders/month [assumption: `$96 / $13.36`, rounded up]. Break-even against a fuller `$183` infra stack is about `14` orders/month [assumption: `($96 + $50 + $25 + $12) / $13.36`, rounded up].

## Go To Market

Initial motion: manually recruit high-intent users through founder networks, local issue communities, and civic forums, then measure paid conversion and delivery outcomes before investing in SEO [assumption: no acquisition data in repo].

Second motion: publish opt-in read-only campaign pages only after privacy, moderation, and official-response handling are proven. The old plan treats SEO as core infrastructure [evidence: `MASTER_PLAN.md`; `.planning/GENESIS.md`], but the repo does not yet evidence public campaign publishing.

Minimum validation gates:

- Willingness to pay: at least `3%` of previewing users pay [assumption: `.planning/PROJECT.md` target, not validated].
- Deliverability: at least `85%` government-domain inbox placement [assumption: `.planning/PROJECT.md` target, not validated].
- Official coverage: at least `95%` federal/state and `60%` local coverage [assumption: `.planning/PROJECT.md` target, not validated].
- Chargebacks: below `0.5%` [evidence: `.planning/PROJECT.md` constraint, not validated].
- Review load: operator queue stays under `30` minutes/day [evidence: `.planning/PROJECT.md` constraint, not validated].

## Competition

Named alternatives:

- Resistbot: low-friction constituent messaging; CivicState differentiates on research-backed citations and richer routing [assumption: competitor characterization inherited from `MASTER_PLAN.md`; not independently researched].
- Change.org: petition and signature aggregation; CivicState differentiates by sending individualized letters to officials [assumption: competitor characterization inherited from `MASTER_PLAN.md`; not independently researched].
- Quorum and VoterVoice: organization-facing advocacy platforms; CivicState targets individual transactional use [assumption: competitor category from `.planning/PROJECT.md`; not independently researched].
- LegalZoom: document workflow brand; CivicState must avoid legal-service positioning while borrowing user expectations for guided formality [assumption: competitor characterization inherited from `MASTER_PLAN.md`; not independently researched].
- Manual constituent outreach: free, trusted, and hard to beat if a user already knows whom to contact [evidence: `MASTER_PLAN.md`].

The most dangerous competitor is not another startup. It is "do nothing" or "send a free email myself." The product must make the paid output obviously better before payment.

## Risks And Anti-Plan

The kill case: users do not pay because civic frustration has low purchase intent, officials ignore AI-assisted emails, government spam filters throttle delivery, local official data is patchy, and the platform inherits legal/reputational risk without owning a high-value transaction. At `$15` ARPU [assumption: implemented tier mix], even excellent software can become a support-heavy microbusiness rather than a fundable company.

Hard risks:

- Demand risk: no evidence of paid conversion or repeat use [evidence: no revenue artifacts found in repo].
- Deliverability risk: government domains may treat repeated AI-assisted letters as bulk or low-quality mail [assumption: deliverability sensitivity inferred from existing plan; not independently researched].
- Legal/compliance risk: letters can drift into legal advice, lobbying representation, defamation, harassment, or campaign activity [evidence: `MASTER_PLAN.md` escalation rules].
- Data risk: political opinions and civic complaints are sensitive personal data; encryption and deletion must work in production, not just schema [evidence: `.planning/REQUIREMENTS.md`; `packages/shared/prisma/schema.prisma`].
- Official-data risk: federal and state coverage may be tractable, but local official lookup is unresolved in planning [evidence: `.planning/STATE.md` blocker].
- Business-model risk: transactional low-ticket revenue may not cover support, legal review, and compliance overhead [assumption: derived from financial model].

Anti-plan: do not add subscriptions, community features, public pages, API access, certified mail, fax, or autonomous follow-up until a paid email-only campaign has been delivered end-to-end with user satisfaction, no deliverability incident, and operator-reviewed compliance [evidence: `.planning/GENESIS.md` exclusions].

## Assumption Ledger

| Assumption | Why it matters | Validation test | Owner |
| --- | --- | --- | --- |
| Users will pay `$5` to `$25` for constituent letters [evidence: implemented prices; demand unvalidated] | Core revenue | Run beta with preview-to-pay funnel | Operator |
| `3%` preview-to-pay conversion is achievable [assumption: planning target] | Acquisition economics | Track visits, previews, payments | Operator |
| Government email deliverability can exceed `85%` [assumption: planning target] | Product utility | Seed tests across target domains before launch | Operator |
| Local official coverage can reach `60%` [assumption: planning target] | User trust | Compare lookup results against manual baseline | Operator |
| One operator can handle exceptions in under `30` minutes/day [evidence: `.planning/PROJECT.md` constraint] | Scalability | Time review queue during beta | Operator |
| Blended variable cost can stay near `$1.64`/order [assumption: modeled, not ledger-backed] | Contribution margin | Reconcile Stripe, Anthropic, lookup, Postmark costs | Operator |

## Evidence Sources

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence]
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) [evidence]
- [.planning/GENESIS.md](.planning/GENESIS.md) [evidence]
- [.planning/STATE.md](.planning/STATE.md) [evidence]
- [apps/api/src/routes/submissions.ts](apps/api/src/routes/submissions.ts) [evidence]
- [apps/api/src/routes/payments.ts](apps/api/src/routes/payments.ts) [evidence]
- [apps/api/src/routes/officials.ts](apps/api/src/routes/officials.ts) [evidence]
- [apps/worker/src/agents/researcher.ts](apps/worker/src/agents/researcher.ts) [evidence]
- [apps/worker/src/agents/delivery.ts](apps/worker/src/agents/delivery.ts) [evidence]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence]

## Surprise Spikes

- Repo identity is mixed: dispatch says `brooks-history` / `brookss-history`, while all repo evidence describes CivicState [evidence: dispatch context; `package.json`; `.planning/PROJECT.md`]. This needs operator confirmation before wrk.vc presentation.
- The registry says personal/research asset and not near-term investible, while the repo contains a full civic-tech startup plan [evidence: dispatch registry note; `MASTER_PLAN.md`].
- `.planning/ROADMAP.md` marks all phases complete on 2026-04-25 [evidence: `.planning/ROADMAP.md`], but `.planning/STATE.md` says only Phase Foundation is complete and many requirements remain unchecked [evidence: `.planning/STATE.md`; `.planning/REQUIREMENTS.md`]. The business plan treats code evidence as authoritative.
- The old plan refers to dynamic pricing and more agents, while implementation uses fixed pricing tiers and a narrower workflow [evidence: `MASTER_PLAN.md`; `apps/api/src/routes/payments.ts`].

## Decision Gate

Recommendation: provisional continue, not invest. The next gate is not another strategy memo; it is a validation sprint that proves paid conversion, deliverability, official coverage, and compliance workflow with real users. Operator merge of this soul can adopt the plan, but it should not upgrade the project to investible until evidence exists [evidence: dispatch registry note].
