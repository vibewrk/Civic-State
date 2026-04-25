---
phase: 01-foundation
plan: 01
subsystem: monorepo-scaffold
tags: [infrastructure, monorepo, pnpm, typescript]
dependency_graph:
  requires: []
  provides: [pnpm-workspaces, tsconfig-base, workspace-shared, workspace-api, workspace-worker, workspace-web]
  affects: [all-subsequent-plans]
tech_stack:
  added: [pnpm-workspaces, typescript-6, express-5, next-15, react-19, bullmq-5, ioredis-5, clerk-express, clerk-nextjs, sentry-node, sentry-nextjs, helmet, cors, zod-4, anthropic-sdk, bull-board, postmark, tailwindcss-4, vitest-4]
  patterns: [pnpm-monorepo, workspace-cross-deps, typescript-strict-mode, esm-modules]
key_files:
  created:
    - pnpm-workspace.yaml
    - tsconfig.base.json
    - .env.example
    - .npmrc
    - packages/shared/package.json
    - packages/shared/tsconfig.json
    - packages/shared/src/index.ts
    - apps/api/package.json
    - apps/api/tsconfig.json
    - apps/api/src/index.ts
    - apps/worker/package.json
    - apps/worker/tsconfig.json
    - apps/worker/src/index.ts
    - apps/web/package.json
    - apps/web/tsconfig.json
  modified:
    - package.json
    - pnpm-lock.yaml
decisions:
  - "Removed deprecated baseUrl from tsconfig.base.json for TypeScript 6 compatibility"
  - "Added explicit Express type annotation to avoid cross-package type inference portability error"
  - "Approved build scripts for prisma, esbuild, sentry-cli, sharp, clerk, msgpackr-extract via pnpm onlyBuiltDependencies"
metrics:
  duration: "49 minutes"
  completed: "2026-04-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 15
  files_modified: 2
---

# Phase 01 Plan 01: Monorepo Scaffold Summary

**One-liner:** pnpm monorepo with 4 workspaces (web, api, worker, shared), TypeScript 6 strict mode, 615 packages resolved, Express 5 health endpoint.

## What Was Built

Scaffolded the complete pnpm monorepo structure for CivicState with four workspaces and all core dependencies installed:

- **Root config:** pnpm-workspace.yaml defining apps/* and packages/*, tsconfig.base.json with strict TypeScript 6, .env.example with all Phase 1 environment variables, .npmrc with strict hoisting disabled
- **packages/shared:** Entry point stub for Prisma client, crypto, and HMAC utilities (exports configured for Plan 02)
- **apps/api:** Express 5 server with helmet, CORS, health endpoint at GET /api/health, plus Clerk, BullMQ, Sentry, Postmark, and Bull Board dependencies
- **apps/worker:** BullMQ worker bootstrap with Anthropic SDK and ioredis
- **apps/web:** Next.js 15 with React 19, Clerk, Sentry, and Tailwind CSS v4

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Create monorepo root configuration | 501eb20 | pnpm-workspace.yaml, tsconfig.base.json, .env.example, .npmrc, package.json |
| 2 | Create all four workspace packages | aebd2db | apps/*/package.json, apps/*/tsconfig.json, apps/*/src/index.ts, packages/shared/* |
| fix | TypeScript 6 compat + Express type fix | e0a5a05 | tsconfig.base.json, apps/api/src/index.ts |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript 6 deprecated baseUrl option**
- **Found during:** Task 2 verification (typecheck)
- **Issue:** TypeScript 6 treats `baseUrl` in tsconfig as deprecated, failing compilation with TS5101
- **Fix:** Removed `baseUrl` from tsconfig.base.json since it was not needed (no path aliases in base config)
- **Files modified:** tsconfig.base.json
- **Commit:** e0a5a05

**2. [Rule 1 - Bug] Express type inference not portable across packages**
- **Found during:** Task 2 verification (typecheck)
- **Issue:** `const app = express()` inferred a type referencing `express-serve-static-core` that TypeScript could not resolve across workspace boundaries (TS2883)
- **Fix:** Added explicit `Express` type annotation: `const app: Express = express()`
- **Files modified:** apps/api/src/index.ts
- **Commit:** e0a5a05

## Verification Results

- `pnpm install` resolves all 4 workspaces (615 packages, 46.4s)
- `pnpm -r exec` confirms 4 workspaces: civicstate (root), api, worker, shared, web
- `tsc --noEmit` passes for packages/shared, apps/api, apps/worker
- Cross-workspace dependency: api and worker both resolve shared via workspace:*
- .env.example contains all required variables: DATABASE_URL, REDIS_URL, CLERK_SECRET_KEY, ENCRYPTION_KEY, ANTHROPIC_API_KEY, POSTMARK_SERVER_TOKEN, SENTRY_DSN

## Known Stubs

| File | Line | Stub | Reason |
|------|------|------|--------|
| packages/shared/src/index.ts | 2 | `export {}` | Prisma client, crypto, HMAC utilities added in Plan 02 |
| apps/worker/src/index.ts | 1 | Console.log only | BullMQ workers registered in Plan 05 |
| apps/web/ | - | No app/ directory | Next.js scaffolding happens in Plan 06 |

All stubs are intentional and have specific plans that will resolve them.

## Self-Check: PASSED
