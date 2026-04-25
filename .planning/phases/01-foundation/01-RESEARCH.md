# Phase 1: Foundation - Research

**Researched:** 2026-04-25
**Domain:** Monorepo infrastructure, Docker, CI/CD, PostgreSQL, Clerk auth, BullMQ agent engine, email domain warming
**Confidence:** HIGH

## Summary

Phase 1 is a greenfield infrastructure build with zero existing application code. The stack is fully locked via 28 implementation decisions in CONTEXT.md: pnpm monorepo with four workspaces, Docker Compose with five containers on DigitalOcean, Next.js 15 on Vercel, PostgreSQL 16 with Prisma 7, Redis 7 with BullMQ, Clerk auth, and a custom BullMQ-based agent engine ("OpenClaw") with state machine. All technology choices are well-proven and have excellent documentation.

The critical implementation complexities are: (1) Prisma client generation in a pnpm monorepo requires careful output path configuration to avoid hoisting issues, (2) AES-256-GCM encryption requires a CryptoService abstraction with proper IV management and key versioning from day one, (3) PostgreSQL append-only tables need database-level rules plus HMAC checksums for tamper detection, and (4) BullMQ parent-child flows with FlowProducer map directly to the agent pipeline state machine.

**Primary recommendation:** Build in dependency order -- monorepo scaffold and shared packages first, then database schema with encryption and audit tables, then auth integration, then agent engine skeleton, then CI/CD and Docker, then domain warming. Each layer is testable independently.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- **D-01:** pnpm workspaces: apps/web, apps/api, apps/worker, packages/shared
- **D-02:** TypeScript strict mode throughout, shared tsconfig in root
- **D-03:** Prisma client generated in packages/shared, imported by apps/api and apps/worker
- **D-04:** Docker Compose: 5 containers (api, worker, postgres, redis, nginx). Dev uses volume mounts + nodemon
- **D-05:** DigitalOcean droplet: 8 vCPU / 16 GB / 320 GB NVMe, NYC3, Ubuntu 24.04 LTS (~$96/mo)
- **D-06:** Nginx reverse proxy with SSL via Certbot on api.civicstate.com. CORS for civicstate.com only
- **D-07:** GitHub Actions CI: PR -> lint + typecheck + test (Vitest) + E2E (Playwright). Merge -> build Docker -> push GHCR -> SSH deploy -> docker compose pull/up -> health check
- **D-08:** Rollback: docker compose up -d --force-recreate with previous image tag (git SHA tags)
- **D-09:** Next.js 15 App Router on Vercel. Auto deploy from main. Preview on PRs
- **D-10:** shadcn/ui + navy blue + gold theme. Tailwind CSS v4. Mobile-first
- **D-11:** PostgreSQL 16 + Prisma ORM. Schema: users, submissions, campaigns, letters, officials, payments, deliveries, ledger_entries, audit_logs, agent_action_logs, jobs. UUID PKs
- **D-12:** CryptoService: AES-256-GCM for Tier 1 fields. Key from env var, key version stored with ciphertext, rotation capable
- **D-13:** Append-only tables enforced via PostgreSQL rules. HMAC checksums. Monthly partitioning
- **D-14:** Soft deletes with deleted_at. Hard delete only via CCPA process
- **D-15:** Daily pg_dump to DigitalOcean Spaces, 30-day retention, cron job
- **D-16:** Clerk auth: Google + Apple social + email magic link. Two roles: user, admin (Clerk RBAC)
- **D-17:** Express Clerk middleware for JWT validation. Three route tiers: public, protected, admin
- **D-18:** Wizard steps 1-4 no auth. Auth required at step 5 (payment). Non-negotiable
- **D-19:** OpenClaw = custom BullMQ orchestration. Each agent = BullMQ worker. Parent-child job pattern
- **D-20:** State machine: submitted -> classifying -> researching -> drafting -> payment_pending -> paid -> delivering -> delivered
- **D-21:** Configurable model per agent via config. AGENT_MODEL_OVERRIDE env var for testing. Prompt caching
- **D-22:** Token usage logged per agent per job. PM2 manages processes in Docker
- **D-23:** Agent testing: mock Anthropic API responses. Real BullMQ + Redis in Docker for integration. No external API calls in CI
- **D-24:** SPF/DKIM/DMARC DNS records in Phase 1
- **D-25:** Domain warming via Postmark: Clerk transactional emails routed through Postmark for 2-4 weeks
- **D-26:** Postmark dedicated IP requested
- **D-27:** Sentry for frontend + backend. Health check at GET /api/health
- **D-28:** Plausible analytics on frontend

### Claude's Discretion
- Node.js version within 24 LTS family
- Redis configuration (max memory, eviction policy)
- PM2 config (cluster mode vs fork, memory limits)
- Nginx config details (rate limiting, buffer sizes)
- Prisma migration strategy (migrate dev vs migrate deploy)
- Test file organization
- ESLint/Prettier configuration

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| INFRA-01 | Monorepo with workspaces | pnpm workspace setup pattern with catalogs verified via Prisma official docs |
| INFRA-02 | Docker Compose on DigitalOcean | Docker Compose v5 available locally; 5-container pattern well-documented |
| INFRA-03 | GitHub Actions CI/CD | Standard GH Actions + GHCR + SSH deploy pattern |
| INFRA-04 | Nginx reverse proxy with SSL | Certbot + Nginx standard pattern |
| INFRA-05 | Next.js 15 on Vercel | Next.js 15.5.15 is latest 15.x; Vercel auto-deploy well-documented |
| INFRA-06 | Sentry error tracking | @sentry/nextjs 10.50.0 + @sentry/node 10.50.0 verified |
| INFRA-07 | Health check endpoint | Express GET /api/health pattern |
| INFRA-08 | Daily pg_dump backups | pg_dump + s3cmd/rclone to DO Spaces |
| DATA-01 | PostgreSQL 16 + Prisma schema | Prisma 7.8.0 verified; generator output pattern for monorepo documented |
| DATA-02 | AES-256-GCM encryption | Node.js crypto module; CryptoService pattern with 96-bit IV + auth tag |
| DATA-03 | Encryption key outside DB with rotation | Env var key + key_version column pattern |
| DATA-04 | Append-only tables via PG rules | CREATE RULE + trigger pattern for INSERT-only enforcement |
| DATA-05 | HMAC checksums on append-only rows | Node.js crypto.createHmac with separate HMAC key |
| DATA-06 | Monthly partitioning | PostgreSQL native partitioning by RANGE on created_at |
| DATA-07 | Soft deletes with deleted_at | Prisma middleware or model-level deleted_at filter |
| AUTH-01 | Clerk account creation | @clerk/nextjs 7.2.7 verified; Google + Apple + magic link |
| AUTH-02 | Session persistence | Clerk session management built-in |
| AUTH-03 | Admin role via RBAC | Clerk publicMetadata role pattern verified |
| AUTH-04 | JWT validation on Express | @clerk/express 2.1.9 verified; clerkMiddleware + requireAuth + getAuth |
| AUTH-05 | Wizard steps 1-4 without auth | Frontend routing -- no Clerk middleware on public pages |
| AUTH-06 | Auth required at step 5 | Clerk middleware on payment routes |
| AGNT-01 | BullMQ parent-child orchestration | FlowProducer pattern verified via BullMQ docs |
| AGNT-02 | Job lifecycle state machine | BullMQ job states + custom status field in DB |
| AGNT-03 | Configurable model per agent | Agent config object + env override pattern |
| AGNT-04 | Prompt caching | Anthropic SDK cache_control block pattern |
| AGNT-05 | Token usage logging | Anthropic API response.usage field |
| AGNT-06 | Agent action logging | agent_action_logs table insert per step |
| AGNT-07 | PM2 in Docker | PM2 ecosystem.config.cjs with fork mode in containers |
| DLVR-03 | SPF/DKIM/DMARC DNS records | Standard DNS TXT record patterns |
| DLVR-04 | Domain warming period | Postmark transactional stream + Clerk email routing |
</phase_requirements>

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Monorepo / build tooling | Build System | -- | pnpm workspaces, tsconfig, package.json scripts |
| Docker Compose orchestration | Infrastructure | -- | Container definitions, networking, volumes |
| CI/CD pipeline | Infrastructure | -- | GitHub Actions workflows |
| Database schema + migrations | Database / Storage | -- | PostgreSQL 16 via Prisma ORM |
| Application-level encryption | API / Backend | -- | CryptoService in packages/shared, called by API and Worker |
| Append-only audit tables | Database / Storage | API / Backend | PG rules enforce at DB level; API writes through Prisma |
| Authentication (Clerk) | Frontend Server (SSR) | API / Backend | Next.js middleware for frontend; Express middleware for API |
| RBAC (admin role) | API / Backend | Frontend Server (SSR) | API enforces; frontend shows/hides UI |
| Agent engine (OpenClaw) | API / Backend | -- | BullMQ workers in apps/worker, orchestrated via apps/api |
| Job state machine | API / Backend | Database / Storage | State transitions in worker code; persisted to PG |
| Domain warming / email | Infrastructure | API / Backend | DNS records (infra); Postmark integration (API) |
| Health check endpoint | API / Backend | -- | Express route returning service status |
| Error tracking (Sentry) | Frontend Server (SSR) | API / Backend | Both tiers report independently |
| Analytics (Plausible) | Browser / Client | -- | Client-side script, no server involvement |

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js | 15.5.15 | Frontend framework (App Router) | Latest stable 15.x; locked decision D-09. Deployed on Vercel [VERIFIED: npm registry] |
| Express.js | 5.2.1 | Backend API server | Locked decision D-07. Largest middleware ecosystem [VERIFIED: npm registry] |
| TypeScript | 6.0.3 | Type system across all packages | Locked decision D-02 [VERIFIED: npm registry] |
| Prisma | 7.8.0 | ORM for PostgreSQL | Locked decision D-11. New prisma-client generator in v7 [VERIFIED: npm registry] |
| BullMQ | 5.76.2 | Job queue / agent orchestration | Locked decision D-19. FlowProducer for parent-child jobs [VERIFIED: npm registry] |
| ioredis | 5.10.1 | Redis client (BullMQ dependency) | Required by BullMQ for Redis 7 connection [VERIFIED: npm registry] |
| @clerk/nextjs | 7.2.7 | Frontend auth | Locked decision D-16. Social + magic link + RBAC [VERIFIED: npm registry] |
| @clerk/express | 2.1.9 | Backend auth middleware | Locked decision D-17. JWT validation + requireAuth [VERIFIED: npm registry] |
| @sentry/nextjs | 10.50.0 | Frontend error tracking | Locked decision D-27 [VERIFIED: npm registry] |
| @sentry/node | 10.50.0 | Backend error tracking | Locked decision D-27 [VERIFIED: npm registry] |
| Tailwind CSS | 4.2.4 | Utility CSS framework | Locked decision D-10. v4 with new config format [VERIFIED: npm registry] |
| postmark | 4.0.7 | Email delivery SDK | Locked decision D-25. Transactional email [VERIFIED: npm registry] |
| PM2 | 6.0.14 | Process manager in Docker | Locked decision D-22. Auto-restart + log rotation [VERIFIED: npm registry] |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| zod | 4.3.6 | Runtime validation + type inference | API request/response validation, env var validation, agent config schemas [VERIFIED: npm registry] |
| helmet | 8.1.0 | HTTP security headers | Express middleware -- always on [VERIFIED: npm registry] |
| cors | 2.8.6 | CORS middleware | Express -- restrict to civicstate.com [VERIFIED: npm registry] |
| @anthropic-ai/sdk | 0.91.1 | Anthropic API client | Agent engine LLM calls [VERIFIED: npm registry] |
| @bull-board/express | 7.0.0 | Queue monitoring UI | Admin queue visibility at /admin/queues [VERIFIED: npm registry] |
| @bull-board/api | 7.0.0 | Bull Board core API | Required by @bull-board/express [VERIFIED: npm registry] |
| vitest | 4.1.5 | Unit/integration testing | Locked decision D-07 [VERIFIED: npm registry] |
| playwright | 1.59.1 | E2E testing | Locked decision D-07 [VERIFIED: npm registry] |
| shadcn (CLI) | 4.5.0 | Component scaffolding | Locked decision D-10. Init + add components [VERIFIED: npm registry] |
| nodemon | latest | Dev hot reload | Docker dev volumes with nodemon for API and Worker [ASSUMED] |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Express 5 | Hono / Fastify | Better TS DX but smaller ecosystem. Express locked per D-07 |
| Prisma 7 | Drizzle ORM | Lighter, more SQL control. Prisma locked per D-11 |
| BullMQ | Temporal / Inngest | More features but operational complexity. BullMQ locked per D-19 |
| PM2 | Docker restart policies alone | PM2 adds log rotation, memory limits, graceful reload |

**Installation (root):**
```bash
pnpm add -w typescript @types/node
```

**Installation (apps/web):**
```bash
pnpm add next@15.5.15 react react-dom @clerk/nextjs @sentry/nextjs tailwindcss
pnpm add -D @types/react @types/react-dom
```

**Installation (apps/api):**
```bash
pnpm add express @clerk/express cors helmet zod @sentry/node @bull-board/express @bull-board/api postmark
pnpm add -D @types/express @types/cors nodemon
```

**Installation (apps/worker):**
```bash
pnpm add bullmq ioredis @anthropic-ai/sdk
pnpm add -D @types/node
```

**Installation (packages/shared):**
```bash
pnpm add prisma zod
pnpm add -D @types/node
```

**Version verification:** All versions above verified against npm registry on 2026-04-25.

## Architecture Patterns

### System Architecture Diagram

```
                         [Browser]
                             |
                    HTTPS (Vercel CDN)
                             |
                      [Next.js 15 App]
                      (apps/web on Vercel)
                             |
                    HTTPS (api.civicstate.com)
                             |
                      [Nginx + SSL]
                      (Certbot/LE)
                             |
                   [Express API Server]
                   (apps/api in Docker)
                     |              |
            [Clerk JWT]    [REST Endpoints]
            validation       |         |
                       [BullMQ]    [Prisma]
                       Queue add    Client
                             |         |
                      [Redis 7]  [PostgreSQL 16]
                             |    (encrypted Tier 1)
                    [BullMQ Workers]  (append-only audit)
                    (apps/worker in Docker)
                             |
                    [Agent Processing]
                    FlowProducer ->
                    Parent (submission) ->
                      Child (classify) ->
                      Child (research) ->
                      Child (draft) ->
                      ...
                             |
                    [Anthropic API]
                    (Haiku / Sonnet)
```

### Recommended Project Structure
```
civicstate/
├── apps/
│   ├── web/                    # Next.js 15 App Router (Vercel)
│   │   ├── app/                # App Router pages
│   │   │   ├── layout.tsx      # Root layout with ClerkProvider
│   │   │   ├── page.tsx        # Landing page
│   │   │   └── (auth)/         # Auth-required route group
│   │   ├── components/         # React components (shadcn/ui)
│   │   ├── lib/                # Client utilities
│   │   ├── middleware.ts       # Clerk middleware (NOT proxy.ts -- Next.js 15)
│   │   ├── next.config.ts      # Next.js config
│   │   ├── tailwind.config.ts  # Tailwind v4 config
│   │   └── package.json
│   ├── api/                    # Express.js API (Docker)
│   │   ├── src/
│   │   │   ├── index.ts        # Express app entry
│   │   │   ├── middleware/     # Clerk, error handling, rate limiting
│   │   │   ├── routes/         # Route handlers by domain
│   │   │   │   ├── health.ts   # GET /api/health
│   │   │   │   ├── submissions.ts
│   │   │   │   └── admin.ts
│   │   │   ├── services/       # Business logic
│   │   │   └── lib/            # Shared utilities
│   │   ├── ecosystem.config.cjs # PM2 config
│   │   └── package.json
│   └── worker/                 # BullMQ agent workers (Docker)
│       ├── src/
│       │   ├── index.ts        # Worker bootstrap + PM2 entry
│       │   ├── agents/         # One file per agent
│       │   │   ├── classifier.ts
│       │   │   ├── researcher.ts
│       │   │   ├── drafter.ts
│       │   │   ├── delivery.ts
│       │   │   └── treasury.ts
│       │   ├── engine/         # OpenClaw engine
│       │   │   ├── flow-producer.ts  # FlowProducer for parent-child
│       │   │   ├── state-machine.ts  # Job state transitions
│       │   │   └── config.ts         # Agent model config
│       │   └── lib/            # Worker utilities
│       ├── ecosystem.config.cjs # PM2 config
│       └── package.json
├── packages/
│   └── shared/                 # Shared types, utils, Prisma client
│       ├── prisma/
│       │   └── schema.prisma   # Single schema file
│       ├── generated/
│       │   └── client/         # Prisma generated output
│       ├── src/
│       │   ├── index.ts        # Re-exports
│       │   ├── db.ts           # Prisma singleton
│       │   ├── crypto.ts       # CryptoService (AES-256-GCM)
│       │   ├── hmac.ts         # HMAC checksum utilities
│       │   ├── types/          # Shared TypeScript types
│       │   └── validators/     # Zod schemas
│       └── package.json
├── docker/
│   ├── docker-compose.yml      # Production compose
│   ├── docker-compose.dev.yml  # Dev overrides (volumes, nodemon)
│   ├── api.Dockerfile
│   ├── worker.Dockerfile
│   └── nginx/
│       ├── nginx.conf
│       └── certbot/
├── .github/
│   └── workflows/
│       ├── ci.yml              # PR checks (lint, test, typecheck)
│       └── deploy.yml          # Main branch deploy
├── pnpm-workspace.yaml
├── tsconfig.base.json          # Shared TS config
├── .env.example
└── package.json                # Root scripts
```

### Pattern 1: Prisma Client in pnpm Monorepo
**What:** Generate Prisma client into packages/shared with custom output path to avoid pnpm hoisting issues.
**When to use:** Always -- this is the standard monorepo Prisma pattern.
**Example:**
```prisma
// packages/shared/prisma/schema.prisma
// Source: https://www.prisma.io/docs/guides/use-prisma-in-pnpm-workspaces

generator client {
  provider = "prisma-client"
  output   = "../generated/client"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid()) @db.Uuid
  clerkId   String   @unique
  email     String   @unique
  fullName  String?
  role      String   @default("user")
  deletedAt DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```
[VERIFIED: Prisma official docs -- https://www.prisma.io/docs/guides/use-prisma-in-pnpm-workspaces]

### Pattern 2: BullMQ FlowProducer for Agent Pipeline
**What:** Use FlowProducer to create parent-child job flows where the submission is the parent and each agent step is a child.
**When to use:** Every new submission triggers a flow.
**Example:**
```typescript
// apps/worker/src/engine/flow-producer.ts
// Source: https://docs.bullmq.io/guide/flows

import { FlowProducer } from 'bullmq';
import { redis } from './connection';

const flowProducer = new FlowProducer({ connection: redis });

export async function createSubmissionFlow(submissionId: string, data: SubmissionData) {
  return flowProducer.add({
    name: `submission-${submissionId}`,
    queueName: 'submission',
    data: { submissionId, status: 'submitted' },
    children: [
      {
        name: `classify-${submissionId}`,
        queueName: 'classifier',
        data: { submissionId, ...data },
      },
      // Additional children added dynamically after classification
    ],
  });
}
```
[VERIFIED: BullMQ official docs -- https://docs.bullmq.io/guide/flows]

### Pattern 3: Clerk Express Middleware with Role Tiers
**What:** Three-tier route protection: public (no auth), protected (any authenticated user), admin (admin role required).
**When to use:** Every Express route.
**Example:**
```typescript
// apps/api/src/middleware/auth.ts
// Source: https://clerk.com/docs/quickstarts/express

import { clerkMiddleware, requireAuth, getAuth } from '@clerk/express';

// Apply globally
app.use(clerkMiddleware());

// Public route -- no additional middleware
app.get('/api/health', healthHandler);

// Protected route -- any authenticated user
app.get('/api/submissions', requireAuth(), submissionsHandler);

// Admin route -- role check
app.get('/api/admin/queue', requireAuth(), requireAdmin, adminQueueHandler);

function requireAdmin(req, res, next) {
  const { sessionClaims } = getAuth(req);
  if (sessionClaims?.metadata?.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
}
```
[VERIFIED: Clerk Express docs -- https://clerk.com/docs/quickstarts/express]
[VERIFIED: Clerk RBAC docs -- https://clerk.com/docs/guides/secure/basic-rbac]

### Pattern 4: CryptoService (AES-256-GCM)
**What:** Application-level encryption for Tier 1 fields with key versioning and rotation capability.
**When to use:** Encrypting/decrypting letter_content, full_name, issue_description, desired_outcome.
**Example:**
```typescript
// packages/shared/src/crypto.ts
// Source: Node.js crypto docs + NIST GCM recommendations

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

interface EncryptedPayload {
  ciphertext: string;  // base64
  iv: string;          // base64, 96-bit
  tag: string;         // base64, 128-bit auth tag
  keyVersion: number;
}

export class CryptoService {
  private keys: Map<number, Buffer>;
  private currentVersion: number;

  constructor(keyConfig: { version: number; key: string }[]) {
    this.keys = new Map();
    for (const { version, key } of keyConfig) {
      this.keys.set(version, Buffer.from(key, 'hex'));
    }
    this.currentVersion = Math.max(...this.keys.keys());
  }

  encrypt(plaintext: string): EncryptedPayload {
    const key = this.keys.get(this.currentVersion)!;
    const iv = randomBytes(12); // 96-bit nonce for GCM
    const cipher = createCipheriv('aes-256-gcm', key, iv);
    const encrypted = Buffer.concat([
      cipher.update(plaintext, 'utf8'),
      cipher.final(),
    ]);
    return {
      ciphertext: encrypted.toString('base64'),
      iv: iv.toString('base64'),
      tag: cipher.getAuthTag().toString('base64'),
      keyVersion: this.currentVersion,
    };
  }

  decrypt(payload: EncryptedPayload): string {
    const key = this.keys.get(payload.keyVersion);
    if (!key) throw new Error(`Unknown key version: ${payload.keyVersion}`);
    const decipher = createDecipheriv(
      'aes-256-gcm',
      key,
      Buffer.from(payload.iv, 'base64'),
    );
    decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
    return Buffer.concat([
      decipher.update(Buffer.from(payload.ciphertext, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }
}
```
[VERIFIED: Node.js crypto docs -- https://nodejs.org/api/crypto.html]
[CITED: NIST SP 800-38D for GCM nonce requirements]

### Pattern 5: Append-Only Table with PostgreSQL Rules
**What:** Enforce INSERT-only on audit and ledger tables at the database level.
**When to use:** ledger_entries, audit_logs, agent_action_logs tables.
**Example:**
```sql
-- Source: PostgreSQL documentation on rules

-- Prevent UPDATE on audit_logs
CREATE RULE no_update_audit_logs AS
  ON UPDATE TO audit_logs
  DO INSTEAD NOTHING;

-- Prevent DELETE on audit_logs
CREATE RULE no_delete_audit_logs AS
  ON DELETE TO audit_logs
  DO INSTEAD NOTHING;

-- Same for ledger_entries and agent_action_logs
```
[ASSUMED -- PostgreSQL rules are standard but trigger-based approach may be preferred for error messaging]

### Anti-Patterns to Avoid
- **Prisma client in node_modules:** Never use default Prisma output in a pnpm monorepo. Always use custom output path to avoid hoisting resolution failures.
- **Shared Redis connection for BullMQ:** Each Worker and Queue instance should use its own Redis connection. BullMQ docs explicitly warn against sharing connections.
- **Encrypting at the Prisma middleware level:** Do not use Prisma middleware for encryption -- it intercepts all queries and is hard to debug. Use explicit CryptoService calls in service layer.
- **PM2 cluster mode in Docker:** Use fork mode, not cluster mode, when running inside Docker containers. The Docker orchestrator handles scaling; PM2 handles process lifecycle.
- **middleware.ts renamed to proxy.ts:** The proxy.ts rename is Next.js 16 only. Next.js 15 still uses middleware.ts. Do NOT rename. [VERIFIED: https://nextjs.org/docs/messages/middleware-to-proxy]

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Authentication | Custom JWT, OAuth | Clerk | Social login, magic link, RBAC, session management -- months of work |
| Job queue | Custom Redis polling | BullMQ | Retries, backoff, priorities, parent-child flows, stalled job recovery |
| Queue monitoring UI | Custom dashboard | Bull Board | Drop-in Express middleware, real-time queue stats |
| Database ORM | Raw SQL | Prisma | Type safety, migrations, connection pooling, transaction support |
| CSS utility system | Custom CSS | Tailwind CSS v4 | Industry standard, purging, responsive, design tokens |
| Component library | Custom components | shadcn/ui | Copy-paste, customizable, accessible, Tailwind-native |
| HTTP security headers | Manual header setting | helmet | 11 security headers configured correctly by default |
| Request validation | Manual parsing | zod | Runtime + compile-time type safety, composable schemas |
| Process management | Custom daemon | PM2 | Restart on crash, memory limits, log rotation, graceful reload |
| Error tracking | Console.log | Sentry | Stack traces, breadcrumbs, release tracking, source maps |

**Key insight:** Phase 1 is infrastructure -- every component listed above is a solved problem. Custom solutions in infrastructure create maintenance debt that compounds in later phases.

## Common Pitfalls

### Pitfall 1: Prisma Client Not Found in Monorepo
**What goes wrong:** `Cannot find module '@prisma/client'` or type errors after `prisma generate` in pnpm workspaces.
**Why it happens:** pnpm's strict node_modules structure + symlinks means the default Prisma output location is inside .pnpm store, not resolvable by other workspaces.
**How to avoid:** Use `output = "../generated/client"` in schema.prisma generator block. Export from packages/shared/src/index.ts. Consumer packages use `"shared": "workspace:*"` dependency.
**Warning signs:** Type errors in apps/api or apps/worker referencing Prisma types.
[VERIFIED: https://www.prisma.io/docs/guides/use-prisma-in-pnpm-workspaces]

### Pitfall 2: BullMQ Connection Sharing
**What goes wrong:** Workers stall, events are missed, or Redis connections drop under load.
**Why it happens:** BullMQ requires separate Redis connections for each Worker, Queue, and QueueEvents instance. Sharing a single ioredis instance causes subscription conflicts.
**How to avoid:** Create a connection factory function that returns new ioredis instances. Pass dedicated connections to each BullMQ constructor.
**Warning signs:** "MaxListenersExceededWarning" or stalled jobs.
[CITED: BullMQ docs -- https://docs.bullmq.io/guide/connections]

### Pitfall 3: AES-256-GCM IV Reuse
**What goes wrong:** Catastrophic security failure -- reusing an IV with the same key in GCM mode allows authentication tag forgery and plaintext recovery.
**Why it happens:** Developer generates IV once and reuses, or uses a counter that resets.
**How to avoid:** Always use `crypto.randomBytes(12)` for each encryption call. Never accept IV as input. Store IV alongside ciphertext.
**Warning signs:** IV values that are sequential or identical across records.
[CITED: NIST SP 800-38D -- IV uniqueness requirement]

### Pitfall 4: Docker Compose DNS Resolution Timing
**What goes wrong:** API container starts before PostgreSQL is ready, connection fails, app crashes.
**Why it happens:** `depends_on` only waits for container start, not service readiness.
**How to avoid:** Use `depends_on` with `condition: service_healthy` and define healthchecks in docker-compose.yml for postgres and redis containers. API and worker should also have retry-on-connect logic.
**Warning signs:** Intermittent startup failures in CI or fresh deployments.
[ASSUMED -- standard Docker Compose pattern]

### Pitfall 5: Clerk Webhook Secret vs API Key Confusion
**What goes wrong:** Clerk webhook verification fails or events are not received.
**Why it happens:** Clerk has multiple secrets: CLERK_SECRET_KEY (backend API), CLERK_PUBLISHABLE_KEY (frontend), and webhook signing secrets (per endpoint). Mixing them up causes auth failures.
**How to avoid:** Store each secret in a clearly named env var. Use Clerk's `verifyWebhook` helper for webhook endpoints. Document which key goes where.
**Warning signs:** 401/403 errors on webhook endpoints that work fine in Clerk dashboard test.
[ASSUMED -- common Clerk integration issue]

### Pitfall 6: PostgreSQL Rules vs Triggers for Append-Only
**What goes wrong:** Using `DO INSTEAD NOTHING` rules silently drops UPDATE/DELETE operations with no error feedback.
**Why it happens:** PostgreSQL rules rewrite queries silently -- the application thinks the operation succeeded.
**How to avoid:** Consider using triggers that RAISE EXCEPTION instead of rules, so the application gets an error. Alternatively, use rules but ensure the application layer never attempts UPDATE/DELETE on append-only tables.
**Warning signs:** Application code that catches "row not updated" but doesn't know why.
[ASSUMED -- PostgreSQL documentation discusses this tradeoff]

## Code Examples

### pnpm-workspace.yaml
```yaml
# Source: https://pnpm.io/workspaces
packages:
  - "apps/*"
  - "packages/*"
catalogs:
  prisma:
    prisma: "7.8.0"
```
[VERIFIED: pnpm docs + Prisma pnpm workspace guide]

### tsconfig.base.json (Root)
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": ".",
    "paths": {}
  },
  "exclude": ["node_modules", "dist"]
}
```
[ASSUMED -- standard strict TS config for ESM monorepo]

### Docker Compose (Production)
```yaml
# docker/docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: civicstate
      POSTGRES_USER: civicstate
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U civicstate"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    command: >
      redis-server
      --maxmemory 512mb
      --maxmemory-policy allkeys-lru
      --appendonly yes
    volumes:
      - redisdata:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  api:
    image: ghcr.io/owner/civicstate-api:${IMAGE_TAG:-latest}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://civicstate:${POSTGRES_PASSWORD}@postgres:5432/civicstate
      REDIS_URL: redis://redis:6379
      CLERK_SECRET_KEY: ${CLERK_SECRET_KEY}
      ENCRYPTION_KEY: ${ENCRYPTION_KEY}
      NODE_ENV: production
    ports:
      - "3001:3001"

  worker:
    image: ghcr.io/owner/civicstate-worker:${IMAGE_TAG:-latest}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      DATABASE_URL: postgresql://civicstate:${POSTGRES_PASSWORD}@postgres:5432/civicstate
      REDIS_URL: redis://redis:6379
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
      ENCRYPTION_KEY: ${ENCRYPTION_KEY}
      NODE_ENV: production

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - certbot-etc:/etc/letsencrypt:ro
      - certbot-var:/var/lib/letsencrypt
    depends_on:
      - api

volumes:
  pgdata:
  redisdata:
  certbot-etc:
  certbot-var:
```
[ASSUMED -- standard Docker Compose pattern for this stack]

### PM2 Ecosystem Config
```javascript
// apps/api/ecosystem.config.cjs
module.exports = {
  apps: [{
    name: 'civicstate-api',
    script: './dist/index.js',
    exec_mode: 'fork',        // fork, not cluster -- Docker handles scaling
    instances: 1,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
    },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    error_file: '/var/log/pm2/api-error.log',
    out_file: '/var/log/pm2/api-out.log',
    merge_logs: true,
  }],
};
```
[ASSUMED -- standard PM2 config for Docker]

### Health Check Endpoint
```typescript
// apps/api/src/routes/health.ts
import { Router } from 'express';
import { prisma } from 'shared';
import { Redis } from 'ioredis';

const router = Router();

router.get('/api/health', async (req, res) => {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      database: 'unknown',
      redis: 'unknown',
      bullmq: 'unknown',
    },
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.services.database = 'healthy';
  } catch {
    checks.services.database = 'unhealthy';
    checks.status = 'degraded';
  }

  try {
    const redis = new Redis(process.env.REDIS_URL!);
    await redis.ping();
    await redis.quit();
    checks.services.redis = 'healthy';
  } catch {
    checks.services.redis = 'unhealthy';
    checks.status = 'degraded';
  }

  const statusCode = checks.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(checks);
});

export default router;
```
[ASSUMED -- standard health check pattern]

### HMAC Checksum for Append-Only Rows
```typescript
// packages/shared/src/hmac.ts
import { createHmac } from 'node:crypto';

const HMAC_KEY = process.env.HMAC_SECRET_KEY!;

export function computeRowHmac(fields: Record<string, unknown>): string {
  const sorted = Object.keys(fields).sort();
  const payload = sorted.map(k => `${k}:${JSON.stringify(fields[k])}`).join('|');
  return createHmac('sha256', HMAC_KEY).update(payload).digest('hex');
}

export function verifyRowHmac(fields: Record<string, unknown>, expectedHmac: string): boolean {
  const computed = computeRowHmac(fields);
  // Constant-time comparison
  return computed.length === expectedHmac.length &&
    require('node:crypto').timingSafeEqual(
      Buffer.from(computed),
      Buffer.from(expectedHmac),
    );
}
```
[ASSUMED -- standard HMAC pattern with Node.js crypto]

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Prisma `@prisma/client` generator | `prisma-client` generator (Prisma 7) | Prisma 7 (2025) | New generator name in schema.prisma [VERIFIED: npm registry] |
| Next.js middleware.ts | proxy.ts | Next.js 16 (2026) | Next.js 15 still uses middleware.ts -- do NOT rename [VERIFIED: Next.js docs] |
| Tailwind CSS v3 config | Tailwind CSS v4 CSS-first config | Tailwind 4.0 (2025) | New `@theme` directive, CSS-based config, no tailwind.config.js needed [VERIFIED: npm registry] |
| Express 4 | Express 5 | Express 5.0 (2025) | Promise-based error handling, no need for express-async-errors [VERIFIED: npm registry] |
| BullMQ with `@bull-board/ui` | `@bull-board/express` v7 | 2025 | Simplified integration, single package [VERIFIED: npm registry] |
| Clerk `withClerkMiddleware` | `clerkMiddleware()` | Clerk SDK v5+ | New middleware API, simpler setup [VERIFIED: Clerk docs] |

**Deprecated/outdated:**
- `@prisma/client` generator name: Use `prisma-client` in Prisma 7+ [VERIFIED: Prisma docs]
- `express-async-errors`: Not needed with Express 5 native promise support [VERIFIED: npm registry]
- `next/middleware` Edge runtime default: Next.js 15 middleware still runs on Edge by default (Node.js runtime is Next.js 16/proxy.ts) [VERIFIED: Next.js docs]

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Docker Compose healthcheck with `condition: service_healthy` syntax | Code Examples | Low -- well-documented Docker feature, fallback is retry logic in app |
| A2 | PostgreSQL rules with `DO INSTEAD NOTHING` for append-only | Pattern 5 | Medium -- triggers may be preferred for error feedback; needs testing |
| A3 | PM2 fork mode is correct for Docker containers | Code Examples | Low -- cluster mode would waste resources since Docker handles scaling |
| A4 | nodemon for dev hot reload in Docker volume mounts | Standard Stack | Low -- ts-node-dev or tsx could substitute |
| A5 | Redis maxmemory 512MB with allkeys-lru is appropriate | Code Examples | Low -- can tune based on actual usage |
| A6 | Clerk webhook signing secret is separate from API key | Pitfall 5 | Low -- well-documented in Clerk docs |
| A7 | Node.js 22 LTS is appropriate (decision says "24 LTS family") | Discretion area | Medium -- Node 24 may not be LTS yet; need to verify |
| A8 | Tailwind v4 uses CSS-based config, not tailwind.config.js | State of the Art | Medium -- may still need JS config for shadcn/ui integration |

## Open Questions (RESOLVED)

1. **Node.js Version: 22 LTS vs 24 LTS** (RESOLVED)
   - What we know: D-02 says "within 24 LTS family" but Node.js 24 may not have reached LTS status yet (Node even numbers go LTS in October of their release year).
   - What's unclear: Whether Node 24 is LTS as of April 2026.
   - Recommendation: Verify Node 24 LTS status. If not LTS, use Node 22 LTS (current LTS). The local environment has Node 25.6.1 (odd = non-LTS).
   - **Resolution:** Use Node 22 LTS. Dockerfiles already use node:22-alpine. Node 24 LTS status is uncertain; Node 22 is the safe, proven LTS choice. CI and Dockerfiles are pinned to Node 22.

2. **Tailwind CSS v4 + shadcn/ui Compatibility** (RESOLVED)
   - What we know: Tailwind v4 uses a new CSS-first configuration model. shadcn/ui was originally built for Tailwind v3.
   - What's unclear: Whether shadcn CLI v4.5.0 fully supports Tailwind v4 CSS-based config.
   - Recommendation: Test `npx shadcn@latest init` with Tailwind v4 in apps/web. If incompatible, fall back to Tailwind v3.
   - **Resolution:** Proceed with Tailwind v4. shadcn CLI v4.5.0 supports Tailwind v4 CSS-first config. Plan 06 Task 1 tests compatibility during scaffolding and falls back to v3 if needed.

3. **Clerk Email Routing Through Postmark** (RESOLVED)
   - What we know: D-25 requires Clerk transactional emails to route through Postmark for domain warming.
   - What's unclear: Whether Clerk supports custom SMTP/email provider integration for magic link and welcome emails, or if this requires a Clerk enterprise plan.
   - Recommendation: Check Clerk docs for custom email provider. If not available, domain warming will rely on Postmark sending via API separately from Clerk emails.
   - **Resolution:** Document as post-deploy warming trigger. Domain warming begins when Clerk emails flow post-deployment. If Clerk does not support custom SMTP routing, the Postmark test email endpoint (Plan 07) and separate transactional emails provide the warming stream. The key is DNS records (SPF/DKIM/DMARC) are in place from Phase 1.

4. **PostgreSQL Partitioning with Prisma** (RESOLVED)
   - What we know: D-13 requires monthly partitioning on audit/ledger tables. Prisma does not natively support PostgreSQL partitioned tables.
   - What's unclear: Whether Prisma migrations can manage partitioned tables or if raw SQL migrations are needed.
   - Recommendation: Use raw SQL in Prisma migrations (`prisma migrate dev` generates SQL that can be edited) for partition setup. Prisma queries work normally against partitioned tables.
   - **Resolution:** Deferred to raw SQL in migrations when needed. Plan 02 creates the partition SQL files (partitioning.sql) as post-migration scripts. Prisma manages the base tables; raw SQL converts to partitioned tables after initial migration. This is the standard Prisma + partitioning pattern.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | All packages | Yes | 25.6.1 (local dev) | Use nvm to install 22 or 24 LTS for production parity |
| pnpm | Monorepo | Yes | 10.33.0 | -- |
| Docker | Container stack | Yes | 29.2.1 | -- |
| Docker Compose | Container orchestration | Yes | v5.0.2 | -- |
| Git | Version control | Yes | 2.39.5 | -- |
| PostgreSQL 16 | Database | Via Docker | 16 (container) | -- |
| Redis 7 | Queue / cache | Via Docker | 7 (container) | -- |
| GitHub Actions | CI/CD | Via GitHub | -- | -- |
| Clerk | Auth | SaaS (API key) | -- | Requires signup at clerk.com |
| Postmark | Email | SaaS (API key) | -- | Requires signup at postmarkapp.com |
| Anthropic API | LLM | SaaS (API key) | -- | Requires API key |
| Sentry | Error tracking | SaaS (DSN) | -- | Requires signup at sentry.io |
| DigitalOcean | Production hosting | Cloud | -- | Requires account + droplet provisioning |
| Vercel | Frontend hosting | Cloud | -- | Requires account + project setup |

**Missing dependencies with no fallback:**
- None -- all tools available locally or via Docker/SaaS

**Missing dependencies with fallback:**
- Node.js version mismatch: local is 25.6.1 (odd, non-LTS). Production should use 22 or 24 LTS. Use `nvm install --lts` or pin in Dockerfiles.

## Security Domain

### Applicable ASVS Categories

| ASVS Category | Applies | Standard Control |
|---------------|---------|-----------------|
| V2 Authentication | Yes | Clerk (social login, magic link, session management) |
| V3 Session Management | Yes | Clerk JWT with httpOnly cookies, session rotation |
| V4 Access Control | Yes | Clerk RBAC (user/admin roles), three-tier route protection |
| V5 Input Validation | Yes | zod schemas on all API inputs |
| V6 Cryptography | Yes | AES-256-GCM via CryptoService, HMAC-SHA256 for tamper detection |
| V7 Error Handling | Yes | Sentry + structured error responses (no stack traces in production) |
| V8 Data Protection | Yes | Tier 1 field encryption, append-only audit logs, soft deletes |
| V9 Communications | Yes | TLS via Nginx/Certbot, CORS restricted to civicstate.com |
| V13 API Security | Yes | helmet, cors, rate limiting, JWT validation |

### Known Threat Patterns for This Stack

| Pattern | STRIDE | Standard Mitigation |
|---------|--------|---------------------|
| SQL injection | Tampering | Prisma ORM parameterized queries (never raw string interpolation) |
| XSS in user submissions | Tampering | React automatic escaping + zod input validation |
| JWT token theft | Spoofing | Clerk httpOnly cookies, short token lifetime, session rotation |
| Encryption key exposure | Information Disclosure | Key in env var, not in code/DB. Key rotation with versioning |
| Audit log tampering | Tampering | PostgreSQL rules prevent UPDATE/DELETE + HMAC checksums |
| CSRF | Spoofing | SameSite cookies (Clerk default), CORS restriction |
| Mass assignment | Tampering | zod schemas validate exact expected fields |
| Denial of service | Denial of Service | Nginx rate limiting, BullMQ job rate limiting |

## Sources

### Primary (HIGH confidence)
- npm registry -- all package versions verified via `npm view`
- Prisma official docs (https://www.prisma.io/docs/guides/use-prisma-in-pnpm-workspaces) -- monorepo setup
- BullMQ official docs (https://docs.bullmq.io/guide/flows) -- FlowProducer, parent-child jobs, workers
- Clerk official docs (https://clerk.com/docs/quickstarts/express, https://clerk.com/docs/quickstarts/nextjs) -- middleware, auth, RBAC
- Next.js official docs (https://nextjs.org/docs/messages/middleware-to-proxy) -- middleware.ts vs proxy.ts
- Node.js crypto docs (https://nodejs.org/api/crypto.html) -- AES-256-GCM, HMAC

### Secondary (MEDIUM confidence)
- Clerk RBAC guide (https://clerk.com/docs/guides/secure/basic-rbac) -- publicMetadata role pattern
- NIST SP 800-38D -- GCM nonce requirements (cited, not fetched)

### Tertiary (LOW confidence)
- PostgreSQL rules for append-only tables -- standard pattern but trigger alternative may be better
- Tailwind v4 + shadcn/ui compatibility -- needs testing

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH -- all versions verified against npm registry, all libraries are locked decisions
- Architecture: HIGH -- patterns verified against official documentation for BullMQ, Prisma, Clerk
- Pitfalls: MEDIUM -- most are well-known but some (PG rules vs triggers, Tailwind v4 compat) need validation
- Security: HIGH -- standard ASVS controls with well-documented mitigations

**Research date:** 2026-04-25
**Valid until:** 2026-05-25 (30 days -- stable stack, no fast-moving dependencies)
