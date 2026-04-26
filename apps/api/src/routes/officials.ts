/**
 * Officials API endpoint.
 *
 * GET /api/officials?zipCode=12345
 * Returns matched government officials for a given ZIP code.
 * Rate limited to 100 requests per 15 minutes per IP.
 */

import { Router, type IRouter } from 'express';
import { z } from 'zod';
import rateLimit from 'express-rate-limit';
import { lookupOfficials, cacheAndFilterOfficials } from '../lib/officials/lookup.js';

const router: IRouter = Router();

/** Rate limiter: 100 requests per 15-minute window per IP */
const officialsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many requests — try again later' },
});

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
