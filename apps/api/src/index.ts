import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import * as Sentry from "@sentry/node";
import { initSentry } from "./lib/sentry.js";
import { clerkAuth, requireAdmin } from "./middleware/auth.js";
import { requireAuth } from "@clerk/express";
import healthRouter from "./routes/health.js";
import submissionsRouter from "./routes/submissions.js";
import officialsRouter from "./routes/officials.js";
import webhooksRouter from "./routes/webhooks.js";
import paymentsRouter from "./routes/payments.js";
import campaignsRouter from "./routes/campaigns.js";
import adminRouter from "./routes/admin.js";
import complianceRouter from "./routes/compliance.js";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";
import { Queue } from "bullmq";
import Redis from "ioredis";

// Initialize Sentry before any other middleware
initSentry();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);

// Stripe webhook must be registered BEFORE express.json() — it needs raw body
// for signature verification. The route uses its own express.raw() parser.
app.use(webhooksRouter);

app.use(express.json());

// Clerk middleware — applies to all routes (per D-17)
app.use(clerkAuth);

// Public routes (no auth required)
app.use(healthRouter);
app.use(submissionsRouter);
app.use(officialsRouter);
app.use(paymentsRouter);
app.use(campaignsRouter);

// Compliance routes (require user auth — CCPA endpoints)
app.use(complianceRouter);

// Admin routes (require admin role)
app.use(adminRouter);

// ── Bull Board — queue monitoring UI at /api/admin/queues ─────────────
const bullBoardRedis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const queueNames = ["classifier", "researcher", "drafter", "delivery", "treasury", "reconciliation"];
const bullQueues = queueNames.map(
  (name) => new BullMQAdapter(new Queue(name, { connection: bullBoardRedis }))
);

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath("/api/admin/queues");

createBullBoard({
  queues: bullQueues,
  serverAdapter,
});

// Protect Bull Board behind admin auth
app.use("/api/admin/queues", requireAuth(), requireAdmin, serverAdapter.getRouter());

// Sentry error handler must be after all routes
Sentry.setupExpressErrorHandler(app);

// Error handler — no stack traces in production (T-01-14)
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    void _next;
    console.error("Unhandled error:", err);
    res.status(500).json({
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
  }
);

app.listen(PORT, () => {
  console.log(`CivicState API running on port ${PORT}`);
});

export default app;
