/**
 * Chat Rate Limiting Utility (Phase 1)
 * Purpose: Safe rate limiting per-IP on the chat endpoint using Upstash Redis.
 * Rate limit: 20 messages per minute.
 */

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const isRedisConfigured = !!(
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_URL.startsWith('http') &&
  process.env.UPSTASH_REDIS_REST_TOKEN
);

export let chatRatelimit: Ratelimit | null = null;

if (isRedisConfigured) {
  try {
    chatRatelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(20, "1 m"),
      analytics: true,
      prefix: "@upstash/ratelimit/chat",
    });
  } catch (e) {
    console.error("Failed to initialize Upstash Ratelimit for chat:", e);
  }
}
