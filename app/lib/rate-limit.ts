import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Three states, not a boolean.
 *
 * "limited" means the limiter positively said the caller is over quota.
 * "unavailable" means we could not ask — missing credentials at boot, or an
 * unreachable Redis at request time. Whether that should let the request
 * through or refuse it differs per route, so the decision belongs at the call
 * site next to the thing being protected, not in here.
 */
export type RateLimitVerdict = "ok" | "limited" | "unavailable";

interface RateLimiterOptions {
  /**
   * Redis key namespace. NOT optional: @upstash/ratelimit falls back to a
   * shared default prefix, so two limiters that both omit it key on the same
   * bucket and spend each other's budget.
   */
  prefix: string;
  limit: number;
  window: Duration;
}

/**
 * Builds a rate limiter that degrades instead of exploding.
 *
 * Redis.fromEnv() throws when credentials are absent and this runs at module
 * scope, so an unconfigured environment used to break routes at import time
 * rather than at request time — hence the guard and the try/catch.
 *
 * Missing credentials and a runtime outage deliberately collapse into the same
 * "unavailable" verdict. Distinguishing them would let a dropped env var on
 * Netlify look different from an outage, and the tempting handling — "no
 * credentials configured, so limiting is off" — silently reverts production to
 * unlimited, which is the hole this is meant to close.
 */
export function createRateLimiter(
  opts: RateLimiterOptions
): (identifier: string) => Promise<RateLimitVerdict> {
  const limiter = (() => {
    if (
      !process.env.UPSTASH_REDIS_REST_URL ||
      !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      console.warn(
        `[${opts.prefix}] Upstash credentials missing — rate limiting unavailable.`
      );
      return null;
    }
    try {
      return new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(opts.limit, opts.window),
        analytics: false,
        prefix: opts.prefix,
      });
    } catch (error) {
      console.error(`[${opts.prefix}] could not construct rate limiter:`, error);
      return null;
    }
  })();

  return async (identifier: string) => {
    if (!limiter) return "unavailable";
    try {
      const { success } = await limiter.limit(identifier);
      return success ? "ok" : "limited";
    } catch (error) {
      console.error(`[${opts.prefix}] rate limiter unreachable:`, error);
      return "unavailable";
    }
  };
}
