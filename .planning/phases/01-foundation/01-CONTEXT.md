# Phase 1: Foundation - Context

**Gathered:** 2026-04-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers the complete development infrastructure: monorepo with workspaces, Docker Compose stack, CI/CD pipeline, PostgreSQL database with encryption and audit tables, Clerk authentication, BullMQ-based agent engine with state machine, and email domain warming via Postmark. After this phase, a developer can clone the repo, spin up the full stack, authenticate users, and process test jobs through the agent pipeline.

This phase does NOT include any user-facing submission flows, AI research, letter drafting, payment, or delivery — those are Phase 2-3.

</domain>

<decisions>
## Implementation Decisions

### Monorepo Structure
- **D-01:** Use pnpm workspaces (pnpm-lock.yaml already exists in repo). Monorepo structure: `apps/web` (Next.js 15), `apps/api` (Express.js), `apps/worker` (BullMQ agent workers), `packages/shared` (types, utils, Prisma client, CryptoService).
- **D-02:** TypeScript throughout all packages. Strict mode enabled. Shared tsconfig in root.
- **D-03:** Prisma client generated in `packages/shared` and imported by `apps/api` and `apps/worker`.

### Docker & Infrastructure
- **D-04:** Docker Compose with 5 containers: `api` (Express + PM2), `worker` (BullMQ agents + PM2), `postgres` (PostgreSQL 16), `redis` (Redis 7), `nginx` (reverse proxy + Certbot SSL). Development uses volume mounts + nodemon for hot reload on API and Worker containers.
- **D-05:** DigitalOcean droplet: 8 vCPU / 16 GB RAM / 320 GB NVMe, NYC3, Ubuntu 24.04 LTS (~$96/mo). Single droplet for all backend containers.
- **D-06:** Nginx reverse proxy: SSL via Certbot/Let's Encrypt on api.civicstate.com. CORS configured to allow only civicstate.com (Vercel frontend).

### CI/CD Pipeline
- **D-07:** GitHub Actions workflow: PR → lint + type-check + unit tests (Vitest) + E2E tests (Playwright). Merge to main → build Docker images → push to GitHub Container Registry → SSH deploy to droplet → `docker compose pull && docker compose up -d` → health check.
- **D-08:** Rollback strategy: `docker compose up -d --force-recreate` with previous image tag. Image tags use git SHA.

### Frontend Deployment
- **D-09:** Next.js 15 (App Router) on Vercel. Automatic deployments from main branch. Preview deployments on PRs. Environment variables: API_URL, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
- **D-10:** shadcn/ui component library with navy blue + gold theme. Tailwind CSS v4. Mobile-first responsive design.

### Database
- **D-11:** PostgreSQL 16 with Prisma ORM. Schema includes: users, submissions, campaigns, letters, officials, payments, deliveries, ledger_entries, audit_logs, agent_action_logs, jobs. All UUID primary keys.
- **D-12:** CryptoService in `packages/shared`: AES-256-GCM encryption for Tier 1 fields (letter_content, full_name, issue_description, desired_outcome). Key from environment variable, key version stored with ciphertext, rotation capability from day one.
- **D-13:** Append-only tables (ledger_entries, audit_logs, agent_action_logs) enforced via PostgreSQL rules (no UPDATE/DELETE). HMAC checksums on each row. Monthly partitioning on audit/ledger tables.
- **D-14:** Soft deletes with deleted_at. Hard deletion only via explicit CCPA process.
- **D-15:** Daily pg_dump backups to DigitalOcean Spaces, 30-day retention. Backup script as a cron job on the droplet.

### Authentication
- **D-16:** Clerk for all auth. Social login (Google, Apple) + email magic link. Two roles: `user` and `admin` (Clerk RBAC). Admin accounts manually provisioned.
- **D-17:** Express API uses Clerk middleware for JWT validation. Three route tiers: public (no auth), protected (user JWT required), admin (admin role required).
- **D-18:** Frontend wizard steps 1-4 accessible without auth. Auth required at step 5 (payment). Auth-at-payment is a core UX decision — do not require auth earlier.

### Agent Engine (OpenClaw)
- **D-19:** OpenClaw is a custom-built agent orchestration layer on BullMQ. Each agent is a BullMQ worker processing jobs from a named queue. Parent-child job pattern: submission = parent job, each agent step = child job.
- **D-20:** State machine for job lifecycle: submitted → classifying → researching → drafting → payment_pending → paid → delivering → delivered. State transitions logged to agent_action_logs.
- **D-21:** Configurable model per agent via config (not hardcoded). Environment variable override `AGENT_MODEL_OVERRIDE` forces all agents to one model for testing. Prompt caching for shared system prompts.
- **D-22:** Token usage logged per agent per job to agent_action_logs for cost tracking. PM2 manages Node.js processes within Docker containers (auto-restart, memory limits, log rotation).
- **D-23:** Agent testing strategy: mock Anthropic API responses with test fixtures for unit tests. Real BullMQ + Redis in Docker for integration tests. No external API calls in CI.

### Domain Warming (Early Start)
- **D-24:** SPF/DKIM/DMARC DNS records configured on civicstate.com in Phase 1, before any user emails are sent. This is a prerequisite for Phase 3 delivery.
- **D-25:** Domain warming via Postmark: Clerk transactional emails (welcome, verification, magic link) routed through Postmark for 2-4 weeks before first letter delivery. This builds domain reputation with a low-volume legitimate email stream.
- **D-26:** Postmark dedicated IP requested (if available on selected tier). Sender score monitoring from day one.

### Monitoring
- **D-27:** Sentry for error tracking on both frontend (Next.js) and backend (Express + Worker). Health check endpoint at GET /api/health returning service status (DB, Redis, BullMQ).
- **D-28:** Plausible analytics on frontend (privacy-first, no cookie banner needed).

### Claude's Discretion
- Specific Node.js version within 24 LTS family
- Redis configuration details (max memory, eviction policy)
- PM2 configuration specifics (cluster mode vs fork, memory limits)
- Nginx configuration details (rate limiting, buffer sizes)
- Exact Prisma migration strategy (migrate dev vs migrate deploy)
- Test file organization within the monorepo
- ESLint/Prettier configuration specifics

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Full project context, constraints, and 17 key decisions
- `.planning/REQUIREMENTS.md` — 92 v1 requirements with phase traceability
- `.planning/ROADMAP.md` — 4-phase roadmap with success criteria

### Pre-Research (Three-Model Consensus)
- `.planning/research/SYNTHESIS.md` — Consensus findings from Opus/Gemini/Codex research, recommended stack, regulatory blockers, risk register
- `.planning/research/MARKET-VALIDATION.md` — Unit economics, competitive landscape, validation gates
- `.planning/INTAKE-BRIEF.md` — Structured business requirements from Master Build Plan v2.1

### Consensus Decisions (read these for locked architectural choices)
- `.planning/consensus/tech-stack/DECISION.md` — Confirmed tech stack with all technologies
- `.planning/consensus/monolith-vs-microservices/DECISION.md` — Modular monolith decision
- `.planning/consensus/database-strategy/DECISION.md` — Three-tier encryption, append-only tables, schema design
- `.planning/consensus/auth-model/DECISION.md` — Clerk auth, auth-at-payment flow, anonymity model
- `.planning/consensus/api-design/DECISION.md` — REST API endpoints and conventions
- `.planning/consensus/hosting-deployment/DECISION.md` — Split deployment (Vercel + DigitalOcean)
- `.planning/consensus/encryption-approach/DECISION.md` — AES-256-GCM, CryptoService architecture
- `.planning/consensus/openclaw-scope/DECISION.md` — 5 agents, BullMQ architecture, state machine
- `.planning/consensus/model-routing/DECISION.md` — Tiered Haiku/Sonnet routing per agent
- `.planning/consensus/email-deliverability-strategy/DECISION.md` — SPF/DKIM/DMARC, domain warming, monitoring
- `.planning/consensus/nextjs-version/DECISION.md` — Next.js 15 (not 14 or 16)
- `.planning/consensus/backend-framework/DECISION.md` — Express.js confirmed

### Stakeholder Profiles
- `.planning/stakeholders/INTEGRATION-MATRIX.md` — Cross-stakeholder data flows and phase ordering guidance
- `.planning/stakeholders/citizen.md` — Primary user profile and workflows
- `.planning/stakeholders/platform-operator.md` — Admin profile and workflows

### Existing Codebase
- `.planning/existing-state.md` — Greenfield audit: zero application code, only Ultra Start Template tooling

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — greenfield project. Zero application code exists.
- Ultra Start Template (orchestrator/, quality/, autoux/) provides build system tooling but no application components.

### Established Patterns
- pnpm-lock.yaml exists — pnpm is the package manager
- GitHub Actions CI exists for template layer (ci.yml) — extend for application CI/CD
- .openclaw/openclaw.json exists — agent engine configuration placeholder

### Integration Points
- `src/` directory is empty placeholder — all application code starts from scratch
- `public/` directory is empty placeholder
- Existing CI workflows need extension for application build/test/deploy

</code_context>

<specifics>
## Specific Ideas

- Navy blue + gold theme for shadcn/ui — specified in intake brief, non-negotiable
- The existing Ultra Start Template (orchestrator/) must be preserved — it's the build system, not application code
- Domain warming must begin as early as possible in Phase 1 to provide 2-4 weeks lead time before Phase 3 delivery
- Clerk magic link emails should route through Postmark to contribute to domain warming

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-04-25*
