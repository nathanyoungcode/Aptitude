import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Create Redis instance
const redis = Redis.fromEnv({
  // Uses UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN from env
})

// Rate limiters for different endpoints
export const globalRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'), // 100 requests per hour
  analytics: true,
})

export const chatRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '5 m'), // 30 messages per 5 minutes
  analytics: true,
})

export const analyticsRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1 h'), // 60 requests per hour
  analytics: true,
})

export const userUpdateRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 updates per minute
  analytics: true,
})

// Fallback in-memory rate limiting for development
class InMemoryRateLimit {
  private requests = new Map<string, number[]>()

  async limit(identifier: string, windowMs: number, maxRequests: number) {
    const now = Date.now()
    const windowStart = now - windowMs

    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, [])
    }

    const userRequests = this.requests.get(identifier)!

    // Clean old requests
    const validRequests = userRequests.filter((time) => time > windowStart)

    if (validRequests.length >= maxRequests) {
      return { success: false, reset: windowStart + windowMs }
    }

    validRequests.push(now)
    this.requests.set(identifier, validRequests)

    return {
      success: true,
      remaining: maxRequests - validRequests.length,
      reset: windowStart + windowMs,
    }
  }
}

const memoryLimit = new InMemoryRateLimit()

// Fallback rate limiter for development
export async function simpleRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60 * 60 * 1000 // 1 hour
) {
  // Use Upstash if configured, otherwise fallback to memory
  if (process.env.UPSTASH_REDIS_REST_URL) {
    const result = await globalRateLimit.limit(identifier)
    return {
      success: result.success,
      remaining: result.remaining,
      reset: result.reset,
    }
  } else {
    return await memoryLimit.limit(identifier, windowMs, maxRequests)
  }
}
