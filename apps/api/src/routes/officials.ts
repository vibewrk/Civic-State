/**
 * Officials API endpoint.
 *
 * GET /api/officials?zipCode=12345
 * Returns matched government officials for a given ZIP code.
 * Rate limited to 100 requests per 15 minutes per IP.
 */

import { Router, type IRouter, type RequestHandler } from 'express';
import { z } from 'zod';
import { lookupOfficials, cacheAndFilterOfficials } from '../lib/officials/lookup.js';

const router: IRouter = Router();

const OFFICIALS_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const OFFICIALS_RATE_LIMIT_MAX_REQUESTS = 100;
const officialsRateLimitBuckets = new Map<string, { count: number; resetsAt: number }>();
let officialsRateLimitLastCleanup = 0;

function pruneExpiredRateLimitBuckets(now: number): void {
  if (now - officialsRateLimitLastCleanup < 60_000) {
    return;
  }

  officialsRateLimitLastCleanup = now;
  for (const [key, bucket] of officialsRateLimitBuckets) {
    if (bucket.resetsAt <= now) {
      officialsRateLimitBuckets.delete(key);
    }
  }
}

/** Rate limiter: 100 requests per 15-minute window per IP */
const officialsLimiter: RequestHandler = (req, res, next) => {
  const now = Date.now();
  pruneExpiredRateLimitBuckets(now);

  const key = req.ip ?? req.socket.remoteAddress ?? 'unknown';
  const bucket = officialsRateLimitBuckets.get(key);

  if (!bucket || bucket.resetsAt <= now) {
    officialsRateLimitBuckets.set(key, {
      count: 1,
      resetsAt: now + OFFICIALS_RATE_LIMIT_WINDOW_MS,
    });
    next();
    return;
  }

  if (bucket.count >= OFFICIALS_RATE_LIMIT_MAX_REQUESTS) {
    res.status(429).json({ error: 'Too many requests — try again later' });
    return;
  }

  bucket.count += 1;
  next();
};

/** Validate ZIP code query parameter */
const zipCodeSchema = z.object({
  zipCode: z.string().regex(/^\d{5}$/, 'zipCode must be a 5-digit US ZIP code'),
});

router.get('/api/officials', officialsLimiter, async (req, res) => {
  try {
    const { zipCode } = zipCodeSchema.parse(req.query);

    // Look up officials across all sources in parallel
    const result = await lookupOfficials(zipCode);

    // Cache to database and filter opted-out officials
    const filtered = await cacheAndFilterOfficials(result.officials);

    res.json({
      zipCode,
      officials: filtered,
      coverage: result.coverage,
      confidence: result.confidenceLabel,
      count: filtered.length,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.issues });
    }
    throw err;
  }
});

export default router;
