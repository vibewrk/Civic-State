---
phase: 01-foundation
plan: 02
subsystem: database-crypto
tags: [database, prisma, encryption, hmac, security, postgresql]
dependency_graph:
  requires: [pnpm-workspaces, workspace-shared]
  provides: [prisma-schema, crypto-service, hmac-utilities, prisma-singleton, shared-types, shared-validators]
  affects: [apps-api, apps-worker, all-data-access]
tech_stack:
  added: [prisma-7-adapter-pg, pg-driver, dotenv]
  patterns: [prisma-7-driver-adapter, aes-256-gcm-encryption, hmac-sha256-tamper-detection, append-only-triggers, prisma-singleton]
key_files:
  created:
    - packages/shared/prisma/schema.prisma
    - packages/shared/prisma.config.ts
    - packages/shared/prisma/sql/append_only_rules.sql
    - packages/shared/prisma/sql/partitioning.sql
    - packages/shared/src/crypto.ts
    - packages/shared/src/hmac.ts
    - packages/shared/src/db.ts
    - packages/shared/src/types/index.ts
    - packages/shared/src/validators/index.ts
  modified:
    - packages/shared/src/index.ts
    - packages/shared/package.json
    - packages/shared/tsconfig.json
    - pnpm-lock.yaml
    - .gitignore
decisions:
  - "Prisma 7 requires prisma.config.ts for datasource URL (url no longer in schema.prisma)"
  - "Prisma 7 requires @prisma/adapter-pg driver adapter instead of direct URL connection"
  - "Generated Prisma client excluded from git via .gitignore (regenerated on install)"
  - "tsconfig rootDir set to '.' to include generated client types alongside src"
metrics:
  duration: "37 minutes"
  completed: "2026-04-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 9
  files_modified: 5
---

# Phase 01 Plan 02: Database + CryptoService Summary

**One-liner:** Prisma 7 schema with 11 UUID-keyed models, AES-256-GCM CryptoService with key rotation, HMAC-SHA256 tamper detection, append-only PostgreSQL triggers, and monthly partitioning SQL.

## What Was Built

Created the complete database layer and cryptographic utilities for CivicState:

- **Prisma schema** (11 models): User, Submission, Campaign, Letter, Official, Payment, Delivery, LedgerEntry, AuditLog, AgentActionLog, Job -- all with UUID primary keys, proper relations, and indexes on frequently queried fields
- **Append-only enforcement**: PostgreSQL triggers that RAISE EXCEPTION on UPDATE/DELETE for LedgerEntry, AuditLog, and AgentActionLog (not silent rules)
- **Monthly partitioning**: SQL functions for creating monthly partitions on append-only tables
- **CryptoService**: AES-256-GCM encryption with per-call random 96-bit IV, key versioning for rotation, factory function reading from environment variables
- **HMAC utilities**: SHA-256 checksum computation and constant-time verification (timingSafeEqual) for tamper detection on append-only rows
- **Prisma singleton**: Database client using Prisma 7 driver adapter pattern (@prisma/adapter-pg) with development query logging
- **Shared types**: TypeScript types for all domain enums (JobStatus with 9 states, UserRole, PricingTier, etc.)
- **Zod validators**: Runtime validation schemas for ZIP codes, job statuses, pricing tiers, UUIDs, emails

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create Prisma schema with all models, append-only rules, and partitioning | 1a93999 | prisma/schema.prisma, prisma/sql/append_only_rules.sql, prisma/sql/partitioning.sql, prisma.config.ts |
| 2 | Implement CryptoService, HMAC utilities, Prisma singleton, and shared exports | 4e0259c | src/crypto.ts, src/hmac.ts, src/db.ts, src/types/index.ts, src/validators/index.ts, src/index.ts |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Prisma 7 datasource URL configuration change**
- **Found during:** Task 1 (prisma generate)
- **Issue:** Prisma 7 no longer supports `url = env("DATABASE_URL")` in schema.prisma datasource block. Error: "The datasource property `url` is no longer supported in schema files."
- **Fix:** Created `prisma.config.ts` with `defineConfig()` containing the datasource URL. Removed `url` from schema.prisma datasource block. Added `dotenv` dependency for config file.
- **Files modified:** packages/shared/prisma/schema.prisma, packages/shared/prisma.config.ts, packages/shared/package.json
- **Commit:** 1a93999

**2. [Rule 3 - Blocking] Prisma 7 requires driver adapter for PrismaClient**
- **Found during:** Task 2 (typecheck)
- **Issue:** Prisma 7 PrismaClient constructor requires either `adapter` or `accelerateUrl` property. Direct URL connection is no longer supported.
- **Fix:** Installed `@prisma/adapter-pg` and `pg` packages. Updated `db.ts` to use `PrismaPg` driver adapter pattern instead of bare `new PrismaClient()`.
- **Files modified:** packages/shared/src/db.ts, packages/shared/package.json
- **Commit:** 4e0259c

**3. [Rule 3 - Blocking] TypeScript node types not resolved in shared package**
- **Found during:** Task 2 (typecheck)
- **Issue:** `Cannot find name 'Buffer'`, `Cannot find name 'process'` -- @types/node was installed but not referenced in tsconfig types array.
- **Fix:** Added `"types": ["node"]` to packages/shared/tsconfig.json and adjusted `rootDir` to include generated Prisma client types.
- **Files modified:** packages/shared/tsconfig.json
- **Commit:** 4e0259c

## Verification Results

- `npx prisma generate` succeeds, generated client at `packages/shared/generated/client/`
- Schema has 11 models, all with `@id @default(uuid()) @db.Uuid` primary keys
- CryptoService round-trip: encrypt then decrypt returns original plaintext (verified via Node.js script)
- HMAC compute then verify returns true; tampered data returns false (verified via Node.js script)
- Append-only SQL contains RAISE EXCEPTION triggers for all 3 tables
- Partitioning SQL contains monthly partition creation function
- TypeScript typechecks pass for all 3 packages (shared, api, worker)
- LedgerEntry, AuditLog, AgentActionLog have NO updatedAt and NO deletedAt
- All non-append-only models have soft delete (deletedAt) except Official

## Known Stubs

None -- all files are fully implemented with no placeholder data or TODO markers.

## Self-Check: PASSED

All 10 created/modified files verified present. Both task commits (1a93999, 4e0259c) verified in git log.
