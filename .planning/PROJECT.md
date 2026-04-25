# CivicState

## What This Is

CivicState is a web platform that turns any civic concern into a researched, citation-backed, professionally-drafted letter delivered to the correct government officials — in minutes, for $5-$25. It serves ordinary US residents who want their government to act on a policy issue, enforcement failure, or legislative demand, but don't know the law, the right officials, or formal letter-writing conventions.

## Core Value

**AI-powered regulation research with verified legal citations, automatic official targeting from ZIP code, and one-click transactional delivery — the full pipeline from civic frustration to official action, accessible to any individual for $5-$25.**

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Guided issue submission wizard (free text + desired outcome + ZIP)
- [ ] Official lookup via hybrid API (congress.gov + OpenStates + Cicero/BallotReady)
- [ ] AI-powered regulation research with verified citations (eCFR + curated state cache + CourtListener)
- [ ] Professional letter drafting with cited regulations (Sonnet 4.6)
- [ ] Letter preview with official targets and regulatory citations
- [ ] Hardcoded pricing tiers ($5 single / $15 three-pack / $25 full-spread)
- [ ] One-time Stripe Checkout payment
- [ ] Email delivery via Postmark with SPF/DKIM/DMARC
- [ ] Per-official delivery status tracking
- [ ] User dashboard with campaign list and statuses (Clerk auth)
- [ ] Content moderation (auto-block threats + human review queue)
- [ ] Mandatory citation verification pipeline before delivery
- [ ] Treasury basics (append-only ledger, daily reconciliation, balance alerts)
- [ ] Admin queue for flagged submissions
- [ ] CAN-SPAM compliance (opt-out mechanism, physical address, accurate headers)
- [ ] Privacy policy, Terms of Service, AI disclosure in all letters
- [ ] Application-level encryption (AES-256-GCM) for Tier 1 data
- [ ] Append-only audit log with tamper detection (HMAC checksums)
- [ ] Official opt-out enforcement (platform-wide suppression)
- [ ] 5 OpenClaw agents: Classifier, Researcher, Drafter, Delivery, Treasury

### Out of Scope

- Third-party API for organizations — Phase 4+ (requires stable citizen pipeline first)
- Kubernetes deployment — Phase 3+ (single droplet sufficient for 5,000 submissions/month)
- Framing Reviewer agent — Phase 2 (operator reviews flagged content manually in v1)
- Publisher agent / public campaign pages — Phase 2 (not core to MVP value loop)
- Dynamic Pricer agent — Phase 2 (hardcoded tiers sufficient for launch)
- AI reply summarization — Phase 2 (raw reply text displayed in v1)
- State statute real-time lookup — Phase 2 (curated cache for v1, paid legal API later)
- Certified mail / fax delivery — Phase 2 (email-only at launch)
- Discovery Search — Phase 2 (no content to search at launch)
- Multi-language support — no demand signal
- Mobile native apps — web responsive is sufficient
- Offline/progressive web app — always-on assumed
- Legal filings or regulatory submissions — liability risk, explicitly excluded
- Automated follow-up letters — out of launch scope

## Context

**Market Position:** No existing platform combines AI regulation research + citation-backed letter drafting + transactional per-letter pricing for individual citizens. Resistbot is closest but lacks the research/citation layer. Enterprise platforms (Quorum, VoterVoice) serve organizations at $10k+/year, not individuals.

**Market Verdict:** CONDITIONAL GO (72% confidence). Unit economics are exceptionally strong (91% gross margin, $132.50/mo max burn, break-even at 11 submissions). Three validation gates must clear during Phase 1 beta: willingness to pay (>=3% conversion), email deliverability (>=85% inbox placement on .gov), and official data coverage (>=95% federal/state, >=60% local).

**Critical Blocker — Google Civic API Dead:** The Representatives endpoint shut down April 2025. Replacement: congress.gov (federal, free) + OpenStates v3 (state, free) + Cicero or BallotReady (local, paid ~$100-500/mo). A 1-week evaluation spike is needed.

**Justia Has No API:** State statute research uses a curated cache for Phase 1, not Justia scraping.

**OpenClaw Is Custom-Built:** No external framework — it's CivicState's name for its BullMQ-based agent orchestration engine. 5 agents for Phase 1, 8 total by Phase 3.

**Email Deliverability Is The Hardest Problem:** Government servers run aggressive spam filters. SPF/DKIM/DMARC from day one, dedicated Postmark IP, 2-4 week domain warming before first user email, per-domain bounce monitoring.

**AI Transparency Increases Trust:** Research shows disclosing AI involvement in legislative correspondence increases constituent trust. CivicState includes AI disclosure in every letter (also required by California AI transparency law effective Jan 2026).

**Stakeholders:**
1. **Citizens** (primary) — non-technical mobile-first users submitting civic issues
2. **Platform Operator** (1-2 people) — exception-based workflow, <30 min/day routine
3. **Government Officials** (passive) — letter recipients, not platform users
4. **API Consumers** (future, Phase 4+) — HOAs, nonprofits, civic organizations

## Constraints

- **Hosting**: DigitalOcean droplet (8 vCPU / 16 GB / 320 GB NVMe, NYC3, ~$96/mo) for backend; Vercel for Next.js frontend — specified by user, non-negotiable
- **Stack**: Express.js + PostgreSQL 16 + Redis 7 + BullMQ + Prisma + Docker Compose — specified by user
- **Frontend**: Next.js 15 (App Router) + shadcn/ui + Tailwind CSS, navy blue + gold theme — specified by user (upgraded from 14 per research consensus)
- **Auth**: Clerk (social login + email magic link). Auth required at payment, not before preview.
- **Payments**: Stripe Checkout. 40% net margin floor after fees enforced at pricing level.
- **Financial**: $1,500 Mercury reserve pre-funded. Chargeback rate must stay <0.5%.
- **Regulatory**: CAN-SPAM full compliance (commercial classification), CCPA/GDPR, AI disclosure, "not legal advice" disclaimer, citation verification mandatory, content moderation mandatory
- **Operational**: No 24/7 staffing. System runs autonomously; operator handles exceptions within 24 hours.
- **Timeline**: 8-week Phase 1 target
- **Monorepo**: npm/pnpm workspaces — apps/web, apps/api, apps/worker, packages/shared
- **AI Models**: Tiered routing — Haiku 4.5 for Classifier/Delivery/Treasury, Sonnet 4.6 for Researcher/Drafter (~$0.20/submission)
- **API Design**: REST with Express.js. No GraphQL, no tRPC. ~15 endpoints.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Modular monolith (not microservices) | Single droplet, 50-5k submissions/mo. BullMQ provides async decoupling. Workspace boundaries enforce module separation. | — Pending |
| Next.js 15 (not 14 or 16) | 14 is two versions behind; 16 may have ecosystem compat issues. 15 has stable App Router + improved caching. | — Pending |
| Express.js (not Hono/Fastify) | Largest middleware ecosystem (Clerk, Stripe, Bull Board). Specified by user. DX differences minimal at this scale. | — Pending |
| 5 agents, not 8 | 8 agents consume 50-70% of 8-week budget. Pricer/Publisher/Framing Reviewer replaceable with simpler alternatives. | — Pending |
| Hybrid officials API (congress.gov + OpenStates + Cicero) | Google Civic API dead since April 2025. Free APIs cover federal/state; paid provider needed for local. | — Pending |
| Curated state statute cache (not Justia scraping) | Justia has no API. Curated cache is reliable and verifiable. Phase 2 evaluates paid legal providers. | — Pending |
| App-level AES-256-GCM encryption for Tier 1 | Political opinion data is among most sensitive PII. Key stored outside DB. Encrypted fields not SQL-searchable (acceptable). | — Pending |
| CAN-SPAM commercial classification | Cost of compliance is trivial; cost of non-compliance is existential ($51k/violation). | — Pending |
| Auth at payment, not before preview | Shows value (letter previews) before friction (account creation). Increases conversion. | — Pending |
| No guest checkout | Delivery tracking, response handling, CCPA deletion all require authenticated user identity. | — Pending |
| Job-level treasury pre-auth (not per-API-call) | Per-call auth adds unacceptable latency. Job budget ceiling + 150% overage check provides safety. | — Pending |
| REST API (not GraphQL/tRPC) | Simple CRUD + job status polling. Cross-host setup (Vercel <> DO) makes tRPC less natural. | — Pending |
| Tiered AI model routing | Haiku for simple tasks, Sonnet for research/drafting. 55% cost savings. Configurable per agent. | — Pending |
| Treat all emails as commercial (CAN-SPAM) | Debatable status, but full compliance cost is negligible vs $51k/violation risk. | — Pending |
| Three-tier data retention | Tier 1: until user deletes (72h SLA). Financial/audit: 7 years. Agent logs: 24 months. | — Pending |
| Reply capture without AI summarization (Phase 1) | Reply formats vary wildly. Raw text display still provides value. AI parsing deferred to Phase 2. | — Pending |
| Three-tier content moderation | Auto-block threats, flag defamation/misconduct for human review, pass everything else. Non-partisan. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-25 after initialization*
