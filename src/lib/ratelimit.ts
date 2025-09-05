import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Check if Redis is properly configured
const isRedisConfigured = process.env.UPSTASH_REDIS_REST_URL && 
                          process.env.UPSTASH_REDIS_REST_TOKEN && 
                          process.env.UPSTASH_REDIS_REST_URL.startsWith('https://') &&
                          !process.env.UPSTASH_REDIS_REST_URL.includes('your-redis')

// Create Redis instance only if properly configured
const redis = isRedisConfigured ? Redis.fromEnv() : null

// Rate limiters for different endpoints
export const globalRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(100, '1 h'), // 100 requests per hour
  analytics: true,
}) : null

export const chatRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '5 m'), // 30 messages per 5 minutes
  analytics: true,
}) : null

export const analyticsRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1 h'), // 60 requests per hour
  analytics: true,
}) : null

export const userUpdateRateLimit = redis ? new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 updates per minute
  analytics: true,
}) : null

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
  if (globalRateLimit) {
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
