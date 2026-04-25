---
phase: 01-foundation
plan: 04
subsystem: clerk-authentication
tags: [auth, clerk, jwt, rbac, middleware, express, nextjs]
dependency_graph:
  requires: [pnpm-workspaces, workspace-web, workspace-api, prisma-schema]
  provides: [clerk-frontend-auth, clerk-backend-auth, three-tier-routes, health-endpoint, sign-in-page, sign-up-page]
  affects: [all-protected-routes, payment-flow, admin-dashboard]
tech_stack:
  added: []
  patterns: [clerk-middleware-nextjs, clerk-express-middleware, three-tier-route-protection, singleton-redis-healthcheck]
key_files:
  created:
    - apps/web/middleware.ts
    - apps/web/app/sign-in/[[...sign-in]]/page.tsx
    - apps/web/app/sign-up/[[...sign-up]]/page.tsx
    - apps/api/src/middleware/auth.ts
    - apps/api/src/routes/health.ts
  modified:
    - apps/web/app/layout.tsx
    - apps/api/src/index.ts
decisions:
  - "Express type annotation required for clerkAuth (RequestHandler) and router (IRouter) for TypeScript 6 cross-workspace portability"
metrics:
  duration: "6 minutes"
  completed: "2026-04-25"
  tasks_completed: 2
  tasks_total: 2
  files_created: 5
  files_modified: 2
---

# Phase 01 Plan 04: Clerk Authentication Summary

**One-liner:** Clerk auth on Next.js (ClerkProvider + route-matching middleware) and Express (three-tier public/protected/admin middleware with JWT validation), plus /api/health with DB+Redis status.

## What Was Built

Integrated Clerk authentication across both frontend and backend:

- **Next.js ClerkProvider:** Root layout wraps children in `<ClerkProvider>` for session management across all pages
- **Next.js middleware:** `clerkMiddleware` with `createRouteMatcher` protecting only `/dashboard`, `/submit/payment`, and `/admin` routes. Wizard steps 1-4 remain public (per D-18, AUTH-05). Auth required at payment (AUTH-06).
- **Sign-in/sign-up pages:** Clerk's `<SignIn>` and `<SignUp>` components at catch-all routes `/sign-in/[[...sign-in]]` and `/sign-up/[[...sign-up]]`
- **Express auth middleware:** Three tiers -- `clerkAuth` (global JWT parsing), `requireAuth` (any authenticated user), `requireAdmin` (checks `sessionClaims.metadata.role === 'admin'`, returns 403 if not)
- **Health check endpoint:** GET `/api/health` returns status, timestamp, version, and service health for database (Prisma) and Redis (singleton connection). Returns 200 when healthy, 503 when degraded.
- **Production error handler:** Returns generic "Internal Server Error" in production, detailed message in development (T-01-14)
- **CORS with credentials:** `credentials: true` with restricted origin (D-06)

## Task Commits

| Task | Name | Commit | Key Files |
|------|------|--------|-----------|
| 1 | Configure Clerk on Next.js frontend | 44f824b | layout.tsx, middleware.ts, sign-in page, sign-up page |
| 2 | Express auth middleware + health check | 0a3da15 | middleware/auth.ts, routes/health.ts, index.ts |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] TypeScript 6 cross-workspace type portability for clerkAuth and router**
- **Found during:** Task 2 typecheck
- **Issue:** `const clerkAuth = clerkMiddleware()` and `const router = Router()` inferred types referencing `ParamsDictionary`, `ParsedQs`, and `Router` from deep `@types/express-serve-static-core` paths that TypeScript 6 cannot resolve across workspace boundaries (TS2883)
- **Fix:** Added explicit type annotations: `clerkAuth: RequestHandler` and `router: IRouter`
- **Files modified:** apps/api/src/middleware/auth.ts, apps/api/src/routes/health.ts
- **Commit:** 0a3da15

## Verification Results

- `pnpm --filter web typecheck` passes (ClerkProvider, middleware, sign-in/sign-up all clean)
- `pnpm --filter api typecheck` passes (auth middleware, health route, index all clean)
- layout.tsx contains `<ClerkProvider>` wrapping children
- middleware.ts uses `clerkMiddleware` (not deprecated `withClerkMiddleware`)
- middleware.ts protects `/dashboard`, `/submit/payment`, `/admin` only
- Landing page `/` is NOT in protected routes
- auth.ts exports `clerkAuth`, `requireAuth`, `requireAdmin`, `getOptionalUserId`
- requireAdmin checks `sessionClaims.metadata.role` and returns 401/403
- health.ts responds to GET /api/health with status, timestamp, services
- Health check uses singleton Redis (getHealthRedis pattern)
- Error handler checks `NODE_ENV === 'production'` before exposing details
- CORS configured with `credentials: true`

## Known Stubs

None -- all files are fully implemented. Clerk requires environment variables (CLERK_SECRET_KEY, NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) to function at runtime, but all wiring is complete.

## Self-Check: PASSED

All 7 files verified present. Both task commits (44f824b, 0a3da15) verified in git log.
