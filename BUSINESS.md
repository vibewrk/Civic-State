# CivicState — Business Plan

**Project id:** brooks-history [evidence: dispatch wrapper, 2026-06-23]  
**Repo-reality name:** CivicState [evidence: [`package.json`](package.json), 2026-06-23]  
**As-of date:** 2026-06-23 [evidence: dispatch wrapper, 2026-06-23]  
**Verdict:** Watchlist, not near-term investible until operator confirms whether this research asset should be pitched as a business [evidence: dispatch registry note, 2026-06-23].

## Thesis

CivicState should be treated as a regulated-adjacent civic communication tool, not a generic AI writing app: if an individual US resident can turn a specific civic concern into verified, professional, official-directed correspondence for $5, $15, or $25 [evidence: [`tests/payment.test.ts`](tests/payment.test.ts), 2026-06-23], then a small paid wedge may exist around civic letter completion, but only if official data coverage, email deliverability, and user willingness to pay are proven before scaling [assumption: EIR judgment from repo review; no network access].

## Problem & Customer

The repo's product definition is clear: CivicState turns civic concerns into researched, citation-backed letters delivered to government officials [evidence: [`.planning/PROJECT.md`](.planning/PROJECT.md), 2026-06-23]. The customer is a US resident with a concrete issue such as roads, zoning, school policy, or enforcement failure who would contact government if jurisdiction lookup, citation research, drafting, and delivery were handled for them [evidence: [`.planning/GENESIS.md`](.planning/GENESIS.md), 2026-06-23].

The current ICP is narrower than the old broad civic-tech pitch:

| Segment | Pain | Current alternative | Why CivicState might win |
|---|---|---|---|
| Individual constituent | Does not know the correct official, law, or format [evidence: [`.planning/PROJECT.md`](.planning/PROJECT.md), 2026-06-23] | Manual search, email, phone, or no action [assumption: EIR synthesis; no network access] | Guided issue form, official lookup, citation verification, and delivery status [evidence: [`apps/web/components/wizard`](apps/web/components/wizard), 2026-06-23] |
| Repeat local issue advocate | Needs repeatable, respectful correspondence across issues [assumption: EIR synthesis; no network access] | Personal templates, ChatGPT, city forms [assumption: model knowledge; no network access] | Reusable official directory and verified research loop [evidence: [`apps/api/src/lib/officials/lookup.ts`](apps/api/src/lib/officials/lookup.ts), 2026-06-23] |
| Future organization buyer | Needs higher-volume civic workflows [assumption: roadmap extrapolation; no network access] | Quorum, FiscalNote/VoterVoice, Action Network, NationBuilder [assumption: model knowledge; no network access] | Not in launch scope; only credible after consumer pipeline proves usage [evidence: [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md), 2026-06-23] |

## Market

No external market research was available in workspace-only mode, so this market is a bottom-up planning construct, not evidence. The only repo-backed economic facts are the launch prices of $5, $15, and $25 [evidence: [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts), 2026-06-23], the planned individual-user positioning [evidence: [`.planning/PROJECT.md`](.planning/PROJECT.md), 2026-06-23], and the built civic-letter workflow [evidence: [`apps/web/app/submit/page.tsx`](apps/web/app/submit/page.tsx), 2026-06-23].

| Market layer | Bottom-up method | Annual value |
|---|---|---|
| TAM | 1,000,000 paid civic-letter jobs per year multiplied by $15 blended order value [assumption: illustrative planning ceiling from EIR model; no network access] | $15,000,000 per year [assumption: 1,000,000 x $15; no network access] |
| SAM | 100,000 reachable self-serve US civic-letter jobs per year through SEO and direct sharing [assumption: 10% of planning TAM; no network access] | $1,500,000 per year [assumption: 100,000 x $15; no network access] |
| SOM | 4,800 paid submissions per year after launch if the product reaches 400 paid submissions per month [assumption: [`.planning/existing-state.md`](.planning/existing-state.md) month-twelve scale used as planning anchor, 2026-06-23] | $72,000 per year [assumption: 4,800 x $15; no network access] |

The realistic initial objective is not TAM capture. It is proof that strangers will pay at least $5 [evidence: [`tests/payment.test.ts`](tests/payment.test.ts), 2026-06-23] for a delivered, non-hallucinated, respectful civic letter and that government inboxes accept the messages without triggering a spam or opt-out spiral.

## Product & Moat

What is real today:

| Asset | Repo evidence | Current meaning |
|---|---|---|
| Monorepo app | Next.js web app, Express API, worker, shared Prisma package [evidence: [`package.json`](package.json), 2026-06-23] | More than a concept; code exists across web, API, worker, and shared packages |
| Data model | Users, submissions, campaigns, letters, officials, payments, deliveries, ledger entries, audit logs, agent logs, jobs [evidence: [`packages/shared/prisma/schema.prisma`](packages/shared/prisma/schema.prisma), 2026-06-23] | Core workflow has a database shape |
| Official lookup | Congress.gov client, OpenStates client, Cicero local stub [evidence: [`apps/api/src/lib/officials`](apps/api/src/lib/officials), 2026-06-23] | Federal/state lookup is designed; local coverage remains a major gap |
| AI pipeline | Classifier, researcher, drafter, delivery, treasury, reconciliation workers [evidence: [`apps/worker/src/index.ts`](apps/worker/src/index.ts), 2026-06-23] | Agent workflow exists, but production data and uptime are unproven |
| Compliance posture | Terms, privacy, CCPA endpoints, moderation tests, audit logging [evidence: [`.planning/phases/04-dashboard-compliance/04-03-SUMMARY.md`](.planning/phases/04-dashboard-compliance/04-03-SUMMARY.md), 2026-06-23] | Compliance has been implemented at MVP depth, not legally validated |

The moat is weak until volume exists. The plausible compounding assets are verified official contact quality, bounce/response history, verified citation reuse, and opt-in campaign pages [evidence: [`.planning/GENESIS.md`](.planning/GENESIS.md), 2026-06-23]. None of those are defensible at zero production users [evidence: [`.planning/existing-state.md`](.planning/existing-state.md), 2026-06-23].

## Platform Posture

CivicState should be positioned as a client of shared wrk.vc/wrk.dog operating rails, not as a platform that must build every horizontal capability itself [assumption: dispatch context references wrk.vc dossier rendering; no network access]. If WrkPlug Phase 0 is signed, shared identity, billing, governance, and dossier distribution could reduce infrastructure duplication and CAC [assumption: WrkPlug Phase 0 not yet signed]. The current repo still contains its own Clerk, Stripe, Postmark, Anthropic, Redis, BullMQ, Prisma, and Next.js integrations [evidence: [`apps/api/package.json`](apps/api/package.json), 2026-06-23], so any shared-rails claim must remain operator-gated.

## Business Model

Launch revenue is transactional:

| Tier | Price | Delivery promise | Evidence |
|---|---:|---|---|
| Single | $5 [evidence: [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts), 2026-06-23] | 1 official [evidence: [`tests/payment.test.ts`](tests/payment.test.ts), 2026-06-23] | Implemented in API tests and route constants |
| Three-pack | $15 [evidence: [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts), 2026-06-23] | 3 officials [evidence: [`tests/payment.test.ts`](tests/payment.test.ts), 2026-06-23] | Implemented in API tests and route constants |
| Full-spread | $25 [evidence: [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts), 2026-06-23] | All matched officials [evidence: [`tests/payment.test.ts`](tests/payment.test.ts), 2026-06-23] | Implemented in API tests and route constants |

The repo requires a 40% net margin floor after fees [evidence: [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md), 2026-06-23]. Unit tests assume direct job costs of $0.20, $0.40, and $0.60 per tier and margins above 90% before fixed labor [evidence: [`tests/payment.test.ts`](tests/payment.test.ts), 2026-06-23]. Those figures are test fixtures, not market proof.

Future revenue streams should stay out of the launch pitch until validated: organization API, subscriptions, certified mail, reply intelligence, and coalition tools are roadmap options, not current business lines [evidence: [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md), 2026-06-23].

## Competition

Named competitors and substitutes:

| Competitor or substitute | Positioning | CivicState response |
|---|---|---|
| Resistbot | Free/low-friction constituent messaging by chat [assumption: model knowledge; no network access] | CivicState must win on legal/citation research and delivery tracking, not raw convenience |
| Quorum and FiscalNote/VoterVoice | Enterprise advocacy/lobbying workflows [assumption: model knowledge; no network access] | CivicState is individual-first and <$25 per job [evidence: [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts), 2026-06-23] |
| Action Network and NationBuilder | Campaign organizing and list operations [assumption: model knowledge; no network access] | CivicState avoids community/list management at launch [evidence: [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md), 2026-06-23] |
| ChatGPT plus manual email | Generic drafting substitute [assumption: model knowledge; no network access] | CivicState bundles official routing, citation verification, moderation, payment, and delivery logs [evidence: [`apps/api/src`](apps/api/src), 2026-06-23] |
| Government contact forms | Free direct channel [assumption: EIR synthesis; no network access] | CivicState must prove time saved and better framing, or the paid model fails |

## Go-To-Market

The prior plan's SEO flywheel is directionally reasonable but too optimistic without public pages and demonstrated search demand [evidence: [`.planning/GENESIS.md`](.planning/GENESIS.md), 2026-06-23]. First GTM should be narrower:

| Motion | First test | Success threshold |
|---|---|---|
| Concierge beta | Operator recruits 25 issue-specific users from local civic communities [assumption: EIR launch plan; no network access] | 5 paid deliveries at $5 or higher [assumption: EIR launch plan; no network access] |
| SEO wedge | Publish opt-in campaign summaries only after legal review [assumption: EIR risk constraint; no network access] | 100 qualified visits from search in 60 days [assumption: EIR launch plan; no network access] |
| Local issue templates | Build issue-specific flows for roads, zoning, schools, and public safety [assumption: EIR synthesis; no network access] | 20% preview-to-payment conversion in beta [assumption: EIR target; no network access] |
| Trust wedge | Show citation verification, AI disclosure, opt-out handling, and delivery status [evidence: [`apps/worker/src/agents/researcher.ts`](apps/worker/src/agents/researcher.ts), 2026-06-23] | Bounce rate below 10% by recipient domain [evidence: [`apps/worker/src/agents/delivery.ts`](apps/worker/src/agents/delivery.ts), 2026-06-23] |

First 100 customers should come from manual outreach and issue-specific landing tests, not paid ads [assumption: EIR launch plan; no network access].

## Financial Model

Model assumptions:

| Driver | Base assumption |
|---|---|
| Mix | 40% single, 40% three-pack, 20% full-spread [assumption: EIR model; no network access] |
| Blended order value | $13.00 per paid submission [assumption: $5 x 40% + $15 x 40% + $25 x 20%; no network access] |
| Direct job cost | $0.60 per paid submission [assumption: conservative use of highest test fixture from [`tests/payment.test.ts`](tests/payment.test.ts), 2026-06-23] |
| Processor cost | 5% of revenue [assumption: rounded planning load for card fees/refunds; no network access] |
| Hosting baseline | $96 per month for backend droplet [evidence: [`.planning/PROJECT.md`](.planning/PROJECT.md), 2026-06-23] |
| Reserve | $1,500 Mercury reserve [evidence: [`.planning/PROJECT.md`](.planning/PROJECT.md), 2026-06-23] |

| Period | Paid submissions | Revenue build | Revenue | Direct AI/vendor cost | Processor cost | Fixed ops and tooling | Human review/operator cost | Operating contribution |
|---|---:|---|---:|---:|---:|---:|---:|---:|
| First operating year | 1,200 [assumption: EIR launch case; no network access] | 1,200 x $13 [assumption: model formula; no network access] | $15,600 [assumption: 1,200 x $13; no network access] | $720 [assumption: 1,200 x $0.60; no network access] | $780 [assumption: 5% x $15,600; no network access] | $3,600 [assumption: hosting plus tools; no network access] | $6,000 [assumption: part-time review load; no network access] | $4,500 [assumption: revenue minus listed costs; no network access] |
| Second operating year | 4,800 [assumption: [`.planning/existing-state.md`](.planning/existing-state.md) month-twelve campaign scale; no network access] | 4,800 x $13 [assumption: model formula; no network access] | $62,400 [assumption: 4,800 x $13; no network access] | $2,880 [assumption: 4,800 x $0.60; no network access] | $3,120 [assumption: 5% x $62,400; no network access] | $7,200 [assumption: scaled ops; no network access] | $18,000 [assumption: heavier review load; no network access] | $31,200 [assumption: revenue minus listed costs; no network access] |
| Third operating year | 14,400 [assumption: 3x second operating year; no network access] | 14,400 x $13 [assumption: model formula; no network access] | $187,200 [assumption: 14,400 x $13; no network access] | $8,640 [assumption: 14,400 x $0.60; no network access] | $9,360 [assumption: 5% x $187,200; no network access] | $18,000 [assumption: scaled ops; no network access] | $54,000 [assumption: review staffing; no network access] | $97,200 [assumption: revenue minus listed costs; no network access] |

Sensitivity tests:

| Test | Outcome |
|---|---|
| Conversion weakens by 50% [assumption: downside stress] | First operating year revenue falls to $7,800 and contribution likely turns negative after fixed review cost [assumption: model math; no network access] |
| Direct job cost doubles to $1.20 [assumption: vendor stress] | First operating year direct cost rises to $1,440, still less damaging than weak demand [assumption: model math; no network access] |
| Human review triples to $18,000 [assumption: moderation stress] | First operating year contribution becomes -$7,500, proving moderation load can kill the model [assumption: model math; no network access] |

## Risks & Anti-Plan

The skeptical partner case is strong:

| Hole | Mitigation | Residual risk |
|---|---|---|
| This may not be a business; registry says personal/research asset and not near-term investible [evidence: dispatch registry note, 2026-06-23] | Operator must rule whether to pitch as a business before wrk.vc promotion | High: the correct outcome may be "archive as research" |
| Government inbox deliverability can collapse the whole value proposition [assumption: EIR risk synthesis; no network access] | Domain warming, bounce monitoring, opt-out suppression, Postmark delivery events [evidence: [`apps/worker/src/agents/delivery.ts`](apps/worker/src/agents/delivery.ts), 2026-06-23] | High: official domains may treat paid civic email as spam |
| Legal-adjacent AI letters create regulatory, reputational, and defamation exposure [assumption: EIR risk synthesis; no network access] | Content moderation, citation verification, not-legal-advice terms, audit logging [evidence: [`apps/api/src/lib/moderation.ts`](apps/api/src/lib/moderation.ts), 2026-06-23] | High: one bad letter could reset trust |
| Local official coverage is not solved; Cicero is currently a stub [evidence: [`apps/api/src/lib/officials/cicero.ts`](apps/api/src/lib/officials/cicero.ts), 2026-06-23] | Run provider evaluation before launch | Medium-high: local issues are likely the most common use case |
| Free substitutes may be good enough [assumption: EIR risk synthesis; no network access] | Prove conversion on delivered outcomes, not drafting novelty | High: users may preview and manually copy without paying |

Anti-plan: do not launch paid public traffic until a human operator has watched at least 25 end-to-end beta submissions [assumption: EIR control threshold; no network access], verified that every citation is real [evidence: [`apps/worker/src/lib/legal/citation-verifier.ts`](apps/worker/src/lib/legal/citation-verifier.ts), 2026-06-23], and confirmed that official contacts are current enough for delivery.

## Assumption Ledger

| Claim | Basis | Evidence or assumption | Test |
|---|---|---|---|
| People will pay $5-$25 for civic letter completion | Existing pricing implementation | Price points are evidence; demand is assumption [evidence: [`apps/api/src/routes/payments.ts`](apps/api/src/routes/payments.ts), 2026-06-23] | Concierge beta with paid checkout |
| $13 blended order value is realistic | EIR price-mix model | [assumption: no sales data] | Compare actual tier mix after first 50 paid orders [assumption: EIR test size] |
| Email delivery is acceptable for launch | Product roadmap excludes certified mail | [evidence: [`.planning/REQUIREMENTS.md`](.planning/REQUIREMENTS.md), 2026-06-23] | Track delivered/bounced/complaint outcomes by domain |
| Official lookup can cover enough jurisdictions | Federal and state clients exist; local is stubbed | Mixed evidence and assumption [evidence: [`apps/api/src/lib/officials`](apps/api/src/lib/officials), 2026-06-23] | Run ZIP coverage audit across 100 ZIP codes [assumption: EIR test size] |
| Citation verification reduces AI risk | Verification code and tests exist | [evidence: [`tests/citation-verifier.test.ts`](tests/citation-verifier.test.ts), 2026-06-23] | Red-team hallucinated citations before launch |
| SEO can become a channel | Prior genesis hypothesis | [assumption: no traffic evidence] | Publish opt-in pages and measure search impressions in 60 days [assumption: EIR test window] |
| One operator can handle review | Prior plan assumption | [assumption: no queue data] | Track minutes per flagged case across 25 beta submissions [assumption: EIR test size] |

## Self-Valuation

Score: 38 out of 100 [assumption: EIR scoring judgment; no network access]. The product has more real implementation than the registry note implied, but the investibility case is still watchlist because demand, deliverability, official data quality, and legal-risk operations are unvalidated.

Valuation bands under the wrk.vc $5,000,000 per-business program assumption [assumption: dispatch program context; no network access]:

| Case | One-year band | Rationale |
|---|---:|---|
| Bear | $0-$100,000 [assumption: EIR valuation method; no network access] | Research asset, no paid proof, or operator chooses not to pitch |
| Base | $250,000-$750,000 [assumption: EIR valuation method; no network access] | Working MVP with paid beta and manageable compliance operations |
| Bull | $1,500,000-$3,000,000 [assumption: EIR valuation method; no network access] | Repeatable acquisition, reliable delivery, and credible official/citation data asset |

Comparables used as positioning references only: Resistbot, Quorum/FiscalNote, Action Network, and ChatGPT-as-substitute [assumption: model knowledge; no network access]. What moves valuation: paid conversion, low complaint rates, verified official coverage, and evidence that users pay instead of copying previews.

## Milestones

| Date | Milestone | Pass/fail test |
|---|---|---|
| 2026-07-15 [assumption: EIR schedule; no network access] | Operator ruling on business vs research asset | Explicit decision recorded in DECISIONS.md |
| 2026-08-01 [assumption: EIR schedule; no network access] | Local official provider spike complete | Cicero, BallotReady, or no-local-launch decision documented |
| 2026-08-15 [assumption: EIR schedule; no network access] | Closed beta starts | First 10 human-reviewed submissions run end-to-end [assumption: EIR beta threshold] |
| 2026-09-15 [assumption: EIR schedule; no network access] | Paid beta review | At least 5 paid deliveries, bounce rate below 10%, and no unresolved safety incident [assumption: EIR launch threshold except 10% repo threshold] |
| 2026-10-01 [assumption: EIR schedule; no network access] | wrk.vc promotion decision | Move from watchlist to pitch, or archive as research |

## Surprise Spikes

The dispatch project id is brooks-history, but the repo content, package metadata, planning files, and application code are CivicState [evidence: [`package.json`](package.json), 2026-06-23]. This is not a cosmetic mismatch; it affects investor-facing identity and registry integrity.

The prior `.planning/existing-state.md` says zero application code exists [evidence: [`.planning/existing-state.md`](.planning/existing-state.md), 2026-06-23], but the current repo has substantial web, API, worker, Prisma, tests, and compliance code [evidence: [`apps`](apps), 2026-06-23]. The soul should treat the old audit as stale and the codebase as the fresher source.

The registry note says personal/research asset and not near-term investible [evidence: dispatch registry note, 2026-06-23]. The business plan therefore stays watchlist and operator-gated rather than pretending this is already venture-ready.
