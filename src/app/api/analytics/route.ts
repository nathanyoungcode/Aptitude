import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getSessionUser } from '@/lib/auth'
import { handleApiError } from '@/lib/errors'
import { analyticsRateLimit } from '@/lib/ratelimit'

const analyticsQuerySchema = z.object({
  timeframe: z.enum(['24h', '7d', '30d', '90d']).optional().default('7d'),
  metrics: z.array(z.string().min(1, 'Metric name cannot be empty')).optional(),
})

export async function GET(request: NextRequest) {
  try {
    // Check authentication first
    const user = await getSessionUser(request)

    // Rate limit check (skip if Redis not configured)
    let success = true, remaining = 100, reset = Date.now() + 3600000
    
    if (analyticsRateLimit) {
      const result = await analyticsRateLimit.limit(user.id)
      success = result.success
      remaining = result.remaining
      reset = result.reset
    }

    if (!success) {
      return NextResponse.json(
        { error: 'Too many analytics requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      )
    }

    const { searchParams } = new URL(request.url)
    const query = analyticsQuerySchema.parse({
      timeframe: searchParams.get('timeframe') || '7d',
      metrics: searchParams.get('metrics')?.split(','),
    })

    // Call your analytics service or n8n webhook
    // const webhookResponse = await callWebhook(
    //   process.env.N8N_WEBHOOK_URL + '/analytics',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${process.env.API_SECRET}`,
    //       'X-User-ID': user.id,
    //     },
    //     body: JSON.stringify(query),
    //   },
    //   'Analytics service',
    //   30000, // 30s timeout
    //   true    // Retry on 502/504
    // )

    // Mock data for now
    const mockData = {
      users: { current: 2341, change: 12 },
      revenue: { current: 45231, change: 8 },
      sessions: { current: 1423, change: -3 },
      conversion: { current: 3.2, change: 0.5 },
      timeframe: query.timeframe,
    }

    return NextResponse.json(mockData)
  } catch (error) {
    return handleApiError(error)
  }
}
