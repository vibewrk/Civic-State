# Plan 02-01 Summary: Content Moderation Pipeline

**Status:** Complete
**Date:** 2026-04-25

## What Was Built

Three-tier content moderation pipeline that screens submissions before they enter the AI letter-writing flow.

### Tier 1 — Keyword Blocklist (Instant)
Regex-based detection for explicit threats of violence, bomb threats, gun violence, physical harm, and self-harm. Matches return `block` with 100% confidence immediately, bypassing the LLM tier.

### Tier 2 — LLM Classification (Claude Haiku 4.5)
Nuanced content analysis via `claude-haiku-4-5-20250401`. System prompt enforces non-partisan moderation -- political viewpoints, policy positions, and criticism of officials are always allowed. Confidence thresholds: block >95%, flag >80%, otherwise pass.

### Tier 3 — Human Review (Flagged Queue)
Submissions that receive a `flag` tier are created with `status: 'flagged'` and are not enqueued for processing. They await admin review.

### Fail-Safe
If the Anthropic API call fails, the pipeline falls back to `flag` (human review) rather than silently passing potentially harmful content.

## Files Modified

| File | Change |
|------|--------|
| `packages/shared/src/types/index.ts` | Added `ModerationTier`, `ModerationReason` types; added `submission.blocked` and `submission.moderated` to `AuditAction` |
| `packages/shared/src/validators/index.ts` | Added `moderationTierSchema` and `moderationReasonSchema` Zod schemas |
| `apps/api/package.json` | Added `@anthropic-ai/sdk` dependency |
| `apps/api/src/lib/moderation.ts` | **NEW** — Full moderation service with blocklist + LLM classification |
| `apps/api/src/routes/submissions.ts` | Wired moderation into POST /api/submissions; added Clerk auth (optional); added HMAC-signed audit logging |

## Route Behavior Changes

| Moderation Tier | HTTP Status | Submission Created? | Job Enqueued? | Audit Logged? |
|----------------|-------------|---------------------|---------------|---------------|
| `block` | 403 | No | No | Yes |
| `flag` | 201 | Yes (status: flagged) | No | Yes |
| `pass` | 201 | Yes (status: submitted) | Yes | Yes |

## Decisions Made

1. **Non-partisan moderation** — System prompt explicitly forbids political viewpoint moderation. Examples of always-allowed content are provided in the prompt.
2. **Optional Clerk auth** — Uses `getAuth()` from `@clerk/express` when available; falls back to test user for development. This replaces the hard-coded `TEST_USER_ID` pattern while maintaining backward compatibility.
3. **HMAC audit trail** — All moderation decisions (block, flag, pass) are logged to `audit_logs` with HMAC checksums via `computeRowHmac` from `shared/hmac`.
4. **Direct Anthropic SDK** — Used `@anthropic-ai/sdk` directly rather than the Vercel AI SDK, since this is an Express API deployed on DigitalOcean (not Vercel Functions).
5. **Fail-safe to flag** — API failures default to flagging for human review rather than blocking or passing.
