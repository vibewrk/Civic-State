import { Redis } from 'ioredis';

// CRITICAL: Each BullMQ Worker, Queue, and QueueEvents MUST have its own Redis connection.
// Sharing connections causes subscription conflicts and stalled jobs.
// See: https://docs.bullmq.io/guide/connections

export function createRedisConnection(): Redis {
  return new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null, // Required by BullMQ
    enableReadyCheck: false,
  });
}
