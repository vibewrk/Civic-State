# Phase 1: Foundation - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-04-25
**Phase:** 01-foundation
**Mode:** --auto (all decisions auto-resolved from pre-research consensus)
**Areas discussed:** Monorepo Tooling, Docker Dev Workflow, Agent Testing, Domain Warming

---

## Monorepo Tooling

| Option | Description | Selected |
|--------|-------------|----------|
| pnpm | pnpm-lock.yaml already exists, fast, strict node_modules | ✓ |
| npm | Default Node.js package manager, simpler | |

**User's choice:** [auto] pnpm (pnpm-lock.yaml already exists in repo)
**Notes:** Consensus decisions specified "npm/pnpm workspaces" — auto-resolved to pnpm based on existing lock file evidence.

---

## Docker Dev Workflow

| Option | Description | Selected |
|--------|-------------|----------|
| Volume mounts + nodemon | Hot reload for API/Worker via volume mounts and nodemon, Next.js built-in for web | ✓ |
| Rebuild on change | Rebuild Docker images on code changes | |
| External dev, Docker for services only | Run Node.js locally, only PostgreSQL/Redis in Docker | |

**User's choice:** [auto] Volume mounts + nodemon (recommended default for development productivity)
**Notes:** Production uses built images; development uses volume mounts for fast iteration.

---

## Agent Testing Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Mock Anthropic + real BullMQ | Mock API responses with fixtures for unit tests, real BullMQ/Redis in Docker for integration | ✓ |
| Full mocks | Mock everything including BullMQ | |
| Contract tests | Record and replay real API responses | |

**User's choice:** [auto] Mock Anthropic + real BullMQ (recommended — tests job orchestration without API costs)
**Notes:** CI must not make external API calls. Real BullMQ/Redis in Docker compose for integration tests ensures job flow correctness.

---

## Domain Warming Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Clerk emails via Postmark | Route transactional auth emails through Postmark to build domain reputation | ✓ |
| Dedicated warming campaign | Send targeted warming emails to test addresses | |
| Wait for Phase 3 | Start warming when delivery phase begins | |

**User's choice:** [auto] Clerk emails via Postmark (recommended — organic, low-risk warming with real transactional emails)
**Notes:** Consensus decision on email deliverability strategy specifies 2-4 weeks warming before first user letter. Using Clerk auth emails as the warming stream is the most organic approach.

---

## Claude's Discretion

- Node.js version specifics within 24 LTS
- Redis configuration details
- PM2 configuration (cluster vs fork, memory limits)
- Nginx configuration (rate limiting, buffers)
- Prisma migration strategy details
- Test organization within monorepo
- ESLint/Prettier configuration

## Deferred Ideas

None — all discussion stayed within Phase 1 scope.
