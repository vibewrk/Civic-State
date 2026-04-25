import { Router, type IRouter } from "express";
import Redis from "ioredis";

const router: IRouter = Router();

// Singleton Redis connection for health checks — avoids creating ephemeral
// connections per request which would leak file descriptors under load.
let healthRedis: Redis | null = null;
function getHealthRedis(): Redis {
  if (!healthRedis) {
    healthRedis = new Redis(process.env.REDIS_URL || "redis://localhost:6379", {
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
      lazyConnect: true,
    });
  }
  return healthRedis;
}

router.get("/api/health", async (_req, res) => {
  const checks = {
    status: "ok" as "ok" | "degraded",
    timestamp: new Date().toISOString(),
    version: process.env.IMAGE_TAG || "dev",
    services: {
      database: "unknown" as string,
      redis: "unknown" as string,
    },
  };

  // Database check — uses Prisma from shared package
  try {
    const { prisma } = await import("shared");
    await prisma.$queryRaw`SELECT 1`;
    checks.services.database = "healthy";
  } catch {
    checks.services.database = "unhealthy";
    checks.status = "degraded";
  }

  // Redis check — uses singleton connection (not ephemeral per-request)
  try {
    const redis = getHealthRedis();
    if (redis.status === "wait") await redis.connect();
    await redis.ping();
    checks.services.redis = "healthy";
  } catch {
    checks.services.redis = "unhealthy";
    checks.status = "degraded";
  }

  const statusCode = checks.status === "ok" ? 200 : 503;
  res.status(statusCode).json(checks);
});

export default router;
