import express, { type Express } from "express";
import cors from "cors";
import helmet from "helmet";
import * as Sentry from "@sentry/node";
import { initSentry } from "./lib/sentry.js";
import { clerkAuth } from "./middleware/auth.js";
import healthRouter from "./routes/health.js";
import submissionsRouter from "./routes/submissions.js";
import officialsRouter from "./routes/officials.js";

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
app.use(express.json());

// Clerk middleware — applies to all routes (per D-17)
app.use(clerkAuth);

// Public routes (no auth required)
app.use(healthRouter);
app.use(submissionsRouter);
app.use(officialsRouter);

// Example protected route (placeholder for future routes)
// app.get('/api/submissions', requireAuth(), submissionsHandler);

// Example admin route (placeholder)
// app.get('/api/admin/queue', requireAuth(), requireAdmin, adminQueueHandler);

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
