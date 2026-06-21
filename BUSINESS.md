# CivicState Business Plan

As of 2026-06-21 [evidence: worker dispatch current_date], this repository is best treated as a watchlist civic-tech research asset, not a near-term investible operating company [evidence: dispatch registry notes, 2026-06-21]. The codebase now contains a real Next.js, Express, Prisma, BullMQ, Stripe, Postmark, and compliance implementation [evidence: package.json; packages/shared/prisma/schema.prisma; apps/web/app/page.tsx; apps/api/src/routes; apps/worker/src], but the business thesis still depends on unvalidated customer demand, live deliverability, legal/compliance review, and payment processor tolerance.

## Thesis

CivicState helps United States residents turn a civic concern into researched, citation-backed letters delivered to government officials. The existing product narrative says the core value is AI regulation research, verified citations, ZIP-based official targeting, and one-click delivery at $5 to $25 per submission [evidence: .planning/PROJECT.md]. The investible version of the thesis is narrower: a paid, email-first constituent communication tool for residents who have a specific issue and enough intent to pay a small one-time fee, but who will not manually research jurisdiction, law, tone, and contact routing.

The project should not be pitched as a venture-scale business until it proves that strangers will pay, that official inboxes accept the mail, and that a single operator can control legal-adjacent and abuse risk. The registry note explicitly flags this as personal/research, watchlist, and not near-term investible BOS pending operator confirmation [evidence: dispatch registry notes, 2026-06-21].

## Product Reality

What is real in the repository as of 2026-06-21 [evidence: worker dispatch current_date]:

| Area | Evidence | Current read |
| --- | --- | --- |
| Web app | apps/web/app/page.tsx and apps/web/app/submit/page.tsx [evidence] | Landing page and submission wizard exist. |
| API | apps/api/src/routes/submissions.ts, officials.ts, payments.ts, webhooks.ts, compliance.ts [evidence] | Core route surface exists. Live credentials and production behavior are not proven. |
| Data model | packages/shared/prisma/schema.prisma [evidence] | Users, submissions, campaigns, letters, officials, payments, deliveries, ledger, audit, agent logs, and jobs are modeled. |
| Agent pipeline | apps/worker/src/agents and apps/worker/src/engine [evidence] | Classifier, researcher, drafter, delivery, treasury, and reconciliation workers exist. |
| Compliance pages | apps/web/app/privacy/page.tsx, apps/web/app/terms/page.tsx, apps/web/app/about/page.tsx [evidence] | Basic privacy, terms, AI disclosure, and CAN-SPAM copy exists; attorney review is not evidenced. |
| Live business proof | No production metrics files found in repo [evidence: repository file scan, 2026-06-21] | Revenue, users, conversion, deliverability, and retention remain unproven. |

The older `.planning/existing-state.md` says zero application code existed [evidence: .planning/existing-state.md], while later phase summaries and the current file tree show application code is present [evidence: .planning/phases/02-ai-pipeline/02-06-SUMMARY.md; .planning/phases/03-payment-delivery/03-04-SUMMARY.md; .planning/phases/04-dashboard-compliance/04-03-SUMMARY.md]. That stale planning artifact is a data-room risk and should be corrected before any investor or operator review.

## Customer Definition

Primary customer: an individual United States resident with a specific local, state, or federal civic issue who wants an official to act and is willing to pay a one-time fee for research, drafting, routing, and delivery [evidence: .planning/PROJECT.md].

High-intent launch segments [assumption: derived from product workflow and civic issue examples in .planning/GENESIS.md]:

| Segment | Trigger | Why they might pay |
| --- | --- | --- |
| Local service complainants | Noise, potholes, zoning, school policy, code enforcement [evidence: .planning/GENESIS.md] | They know the issue but not the right office, legal citation, or format. |
| Time-constrained constituents | Need to contact several officials | A $5 single send, $15 three-pack, or $25 full-spread is cheaper than doing the research manually [evidence: apps/web/app/page.tsx; .planning/PROJECT.md]. |
| Advocacy-curious residents | Want a professional, non-partisan letter | The app supplies tone, citation verification, and official targeting [evidence: .planning/PROJECT.md]. |

Non-customers for launch: businesses, legal claimants, users seeking legal filings, users targeting private individuals, bulk campaigners, and users submitting unverifiable allegations [evidence: MASTER_PLAN.md].

## Market Sizing Method

No network research is available in this worker run, so all external market sizing is an assumption rather than evidence. The only evidence-backed quantities are the repo's pricing, cost, and roadmap assumptions.

Bottom-up launch model [assumption: scenario model using repo pricing and no external traffic data]:

| Layer | Scenario | Honesty label |
| --- | --- | --- |
| Serviceable launch market | 10,000 high-intent annual United States civic-letter buyers | [assumption: deliberately conservative seed audience for validation, not sourced market data] |
| Initial obtainable market | 1,000 paid submissions in the first full operating year | [assumption: validation target, not historical performance] |
| Average order value | $15 per submission | [assumption: midpoint of $5, $15, and $25 repo pricing tiers; evidence for tiers: .planning/PROJECT.md] |
| First-year gross revenue | $15,000 | [assumption: 1,000 paid submissions multiplied by $15 average order value] |
| Break-even sensitivity | 11 submissions per month | [evidence: .planning/PROJECT.md states break-even at 11 submissions] |

This is not a TAM slide. It is a validation-sized market model. The project should graduate from watchlist only after it replaces these assumptions with observed traffic, conversion, paid submissions, refund rate, chargeback rate, deliverability, and official response data.

## Revenue Model

The current revenue model is one-time transactional pricing:

| Package | Price | Revenue logic |
| --- | ---: | --- |
| Single official | $5 | [evidence: .planning/PROJECT.md; apps/web/app/page.tsx] |
| Three-pack | $15 | [evidence: .planning/PROJECT.md; apps/web/components/wizard/letter-preview.tsx summary in .planning/phases/02-ai-pipeline/02-06-SUMMARY.md] |
| Full-spread | $25 | [evidence: .planning/PROJECT.md; apps/web/app/page.tsx] |

Cost and margin assumptions from existing soul/planning:

| Input | Figure | Label |
| --- | ---: | --- |
| AI cost per submission | $0.10 to $0.40 | [evidence: MASTER_PLAN.md] |
| Backend droplet | about $96 per month | [evidence: MASTER_PLAN.md; .planning/PROJECT.md] |
| Postmark card limit | $50 per month | [evidence: MASTER_PLAN.md] |
| Startup reserve | $1,500 | [evidence: MASTER_PLAN.md; .planning/PROJECT.md] |
| Minimum net margin floor | 40% | [evidence: MASTER_PLAN.md; .planning/PROJECT.md] |
| Target chargeback ceiling | below 0.5% | [evidence: MASTER_PLAN.md] |

Reconciled simple model [assumption: simplified finance model, not production accounting]:

| Month scenario | Paid submissions | AOV | Revenue | Variable AI cost | Fixed platform cost | Approximate contribution after these costs |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Validation | 50 [assumption: scenario volume] | $15 [assumption: midpoint AOV] | $750 [assumption: 50 multiplied by $15] | $20 [assumption: 50 multiplied by $0.40 high-end AI cost] | $146 [assumption: $96 droplet plus $50 Postmark card limit; source figures from MASTER_PLAN.md] | $584 [assumption: revenue minus listed costs] |
| Small launch | 250 [assumption: scenario volume] | $15 [assumption: midpoint AOV] | $3,750 [assumption: 250 multiplied by $15] | $100 [assumption: 250 multiplied by $0.40 high-end AI cost] | $146 [assumption: $96 droplet plus $50 Postmark card limit; source figures from MASTER_PLAN.md] | $3,504 [assumption: revenue minus listed costs] |
| Watchlist proof | 1,000 [assumption: scenario volume] | $15 [assumption: midpoint AOV] | $15,000 [assumption: 1,000 multiplied by $15] | $400 [assumption: 1,000 multiplied by $0.40 high-end AI cost] | $146 [assumption: $96 droplet plus $50 Postmark card limit; source figures from MASTER_PLAN.md] | $14,454 [assumption: revenue minus listed costs] |

The table reconciles as paid submissions multiplied by AOV equals revenue; AI cost uses the high end of $0.40 per submission [evidence: MASTER_PLAN.md], and fixed platform cost combines the $96 droplet and $50 Postmark card limit [evidence: MASTER_PLAN.md]. It excludes Stripe fees, labor, legal review, refunds, sales tax, entity costs, support time, and paid acquisition [assumption: omitted because no repo evidence quantifies them].

## Go To Market

The existing plan favors organic search and opt-in public campaign pages [evidence: .planning/GENESIS.md; MASTER_PLAN.md]. That is directionally coherent, but it is slow and unproven. The first go-to-market motion should be validation, not scale.

Recommended launch motion:

| Stage | Motion | Success signal |
| --- | --- | --- |
| Concierge beta | Operator recruits a small group of civic issue submitters manually | At least 30 paid submissions [assumption: minimum sample for early willingness-to-pay read] |
| Deliverability test | Send only after DNS, Postmark, and official-contact checks | At least 85% inbox placement to government domains [evidence: .planning/PROJECT.md validation gate] |
| SEO seed | Publish only opt-in, privacy-safe campaign pages | 90-day search impression trend without paid ads [assumption: SEO cycle expectation, not sourced] |
| Repeatability check | Track refund, chargeback, complaint, and operator minutes | Chargebacks remain below 0.5% [evidence: MASTER_PLAN.md] and routine ops stay below 30 minutes per day [evidence: .planning/PROJECT.md]. |

Paid acquisition, partnerships, subscriptions, API access, certified mail, fax, community voting, and automated follow-up should stay deferred until the email-first paid loop proves itself [evidence: .planning/PROJECT.md; .planning/GENESIS.md].

## Competition

The existing planning names Resistbot, Change.org, LegalZoom, Quorum, and VoterVoice as relevant reference points [evidence: MASTER_PLAN.md; .planning/PROJECT.md]. Without network access, the details below are assumption-tagged.

| Competitor | Position | CivicState difference |
| --- | --- | --- |
| Resistbot | SMS-driven constituent contact [assumption: based on common product category knowledge, not verified in this run] | CivicState claims deeper AI research, citations, and payment-gated delivery [evidence: MASTER_PLAN.md]. |
| Change.org | Petition hosting and signature aggregation [assumption: based on common product category knowledge, not verified in this run] | CivicState focuses on drafted letters sent to officials rather than public petition pages [evidence: MASTER_PLAN.md]. |
| LegalZoom | Legal/document drafting brand [assumption: based on common product category knowledge, not verified in this run] | CivicState must avoid legal advice and stay in constituent communication [evidence: MASTER_PLAN.md; apps/web/app/terms/page.tsx]. |
| Quorum | Enterprise advocacy/government affairs software [assumption: details not verified in this run] | CivicState targets individuals with $5 to $25 one-time transactions [evidence: .planning/PROJECT.md]. |
| VoterVoice | Organization-focused advocacy tooling [assumption: details not verified in this run] | CivicState proposes direct-to-resident self-service, not enterprise campaign management [evidence: .planning/PROJECT.md]. |

Competition risk is not "nobody does this." The real risk is that free constituent-contact tools, manual email, petition platforms, and enterprise advocacy vendors each own part of the workflow, while CivicState must prove users value the combined research-plus-routing bundle enough to pay.

## Risks And Anti-Plan

The skeptical partner case:

CivicState may be a useful personal tool but a bad venture. The user may not pay because emailing officials is already free. Officials may ignore, bounce, suppress, or complain about AI-generated letters. Payment processors may treat political/civic content as risky. Legal review may conclude that citation-backed drafting creates legal-adjacent exposure despite disclaimers. SEO may not compound because opt-in pages are sparse, privacy-constrained, duplicative, or too local to rank. The strongest code evidence does not prove demand, deliverability, or regulatory comfort.

Major risks:

| Risk | Mitigation | Residual risk |
| --- | --- | --- |
| Willingness to pay is weak | Concierge beta, price tests at $5, $15, and $25 [evidence: .planning/PROJECT.md] | Users may prefer free templates or direct email. |
| Deliverability fails | SPF/DKIM/DMARC, Postmark warming, bounce monitoring [evidence: scripts/setup-dns.md; .planning/PROJECT.md] | Government domains may still filter AI-like or bulk-like mail. |
| Legal/compliance exposure | AI disclosure, not-legal-advice terms, moderation, human review [evidence: apps/web/app/terms/page.tsx; MASTER_PLAN.md] | Attorney review is not evidenced in the repo. |
| Official data quality is poor | Hybrid officials lookup, cache, opt-out suppression [evidence: apps/api/src/lib/officials; packages/shared/prisma/schema.prisma] | Local official coverage may be expensive or incomplete. |
| Operator burden grows | Admin queue, thresholds, audit logs [evidence: apps/web/app/admin; apps/api/src/routes/admin.ts] | A single operator may not handle edge cases under volume. |
| Planning freshness is inconsistent | Replace stale root soul and cite current code evidence | Old `.planning/existing-state.md` still contradicts current repo state [evidence]. |

## Assumption Ledger

| Assumption | Why it matters | Validation method | Current status |
| --- | --- | --- | --- |
| Citizens will pay $5 to $25 for civic-letter help | Core revenue depends on it [evidence: .planning/PROJECT.md] | Paid beta conversion and refund tracking | Unvalidated |
| Email delivery is enough for launch | Product defers certified mail and fax [evidence: .planning/GENESIS.md] | Government-domain inbox, bounce, complaint, and response tracking | Unvalidated |
| AI citation verification can be production-safe | Product promise depends on citations [evidence: apps/worker/src/lib/legal/citation-verifier.ts] | Human audit of generated letters before first paid launch | Unvalidated |
| SEO can acquire users without paid ads | Existing GTM depends on opt-in campaign pages [evidence: .planning/GENESIS.md] | 90-day search impression and conversion report [assumption: validation window] | Unvalidated |
| One operator can manage exceptions | Cost structure assumes lean ops [evidence: .planning/PROJECT.md] | Measure minutes per flagged submission and queue age | Unvalidated |
| Payment processors tolerate the category | Stripe is core to fulfillment [evidence: apps/api/src/routes/payments.ts; MASTER_PLAN.md] | Processor account approval and monitored chargebacks below 0.5% [evidence: MASTER_PLAN.md] | Unvalidated |

## Evidence And Freshness

Evidence sources used in this workspace-only upgrade:

- [MASTER_PLAN.md](MASTER_PLAN.md) [evidence: repo file, version states March 2026]
- [.planning/PROJECT.md](.planning/PROJECT.md) [evidence: repo file, last updated 2026-04-25]
- [.planning/ROADMAP.md](.planning/ROADMAP.md) [evidence: repo file, phase progress dated 2026-04-25]
- [.planning/GENESIS.md](.planning/GENESIS.md) [evidence: repo file, generated 2026-04-25]
- [.planning/REQUIREMENTS.md](.planning/REQUIREMENTS.md) [evidence: repo file, defined 2026-04-25]
- [packages/shared/prisma/schema.prisma](packages/shared/prisma/schema.prisma) [evidence: current code]
- [apps/web/app/page.tsx](apps/web/app/page.tsx) [evidence: current code]
- [scripts/setup-dns.md](scripts/setup-dns.md) [evidence: current repo operations doc]

Freshness warning: no external market, legal, pricing, competitor, or API availability claims were verified during this run because the worker is workspace-only with no network [evidence: user brief]. External claims in this plan are therefore marked as assumptions. Planning artifacts dated 2026-04-25 [evidence: .planning/PROJECT.md] and the master plan dated March 2026 [evidence: MASTER_PLAN.md] are stale relative to 2026-06-21 [evidence: worker dispatch current_date] and must be revalidated before investor use.

## Surprise Spikes

- The registry says this is personal/research and not near-term investible BOS, but the old soul framed it as a business with strong unit economics [evidence: dispatch registry notes; .planning/PROJECT.md].
- `.planning/existing-state.md` says no application code exists, but the repo now has a multi-app product implementation [evidence: .planning/existing-state.md; apps; packages/shared].
- `.planning/ROADMAP.md` says all phases are complete on 2026-04-25 [evidence], while `.planning/STATE.md` says only Phase 1 is complete [evidence]. The root roadmap needs a buildable validation-oriented shape.
- The product promise is legal-citation-backed advocacy, but the repository does not evidence attorney review, live citation accuracy audits, live DNS, payment processor approval, or real official-domain deliverability [evidence: repository file scan, 2026-06-21].

## Decision

Status: watchlist. Do not pitch CivicState as venture-ready until it has evidence for paid demand, deliverability, official data coverage, citation accuracy, legal/compliance review, payment processor stability, and operator workload. The next business milestone is not more build; it is a small paid validation loop with explicit stop/go gates.
