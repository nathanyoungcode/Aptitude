import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { getSessionUser } from '@/lib/auth'
import { userUpdateRateLimit, simpleRateLimit } from '@/lib/ratelimit'
import { handleApiError, callWebhook } from '@/lib/errors'

const updateUserSchema = z.object({
  name: z.string()
    .min(1, 'Name cannot be empty')
    .max(100, 'Name cannot exceed 100 characters')
    .trim()
    .optional(),
  email: z.string()
    .email('Invalid email format')
    .toLowerCase()
    .optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system'], {
      errorMap: () => ({ message: 'Theme must be light, dark, or system' })
    }).optional(),
    notifications: z.boolean().optional(),
    language: z.string()
      .min(2, 'Language code must be at least 2 characters')
      .max(10, 'Language code cannot exceed 10 characters')
      .optional(),
  }).optional(),
})

export async function GET(request: NextRequest) {
  try {
    // Check authentication first
    const user = await getSessionUser(request)
    
    // Call your user service or n8n webhook
    // const webhookResponse = await callWebhook(
    //   process.env.N8N_WEBHOOK_URL + '/user',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Authorization': `Bearer ${process.env.API_SECRET}`,
    //       'X-User-ID': user.id,
    //     },
    //   },
    //   'User service',
    //   30000, // 30s timeout
    //   true    // Retry on 502/504
    // )

    // Mock user data
    const mockUser = {
      id: 'user_123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: '/avatar.jpg',
      preferences: {
        theme: 'light',
        notifications: true,
        language: 'en',
      },
      usage: {
        credits: 450,
        limit: 1000,
        plan: 'pro',
      },
    }

    return NextResponse.json(mockUser)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // Check authentication first
    const user = await getSessionUser(request)
    
    // Rate limit check for updates
    const { success, remaining, reset } = await userUpdateRateLimit.limit(user.id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many profile updates. Please try again later.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          }
        }
      )
    }
    
    const body = await request.json()
    const updates = updateUserSchema.parse(body)
    
    // Call your user service or n8n webhook
    // const webhookResponse = await callWebhook(
    //   process.env.N8N_WEBHOOK_URL + '/user/update',
    //   {
    //     method: 'PATCH',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${process.env.API_SECRET}`,
    //       'X-User-ID': user.id,
    //     },
    //     body: JSON.stringify(updates),
    //   },
    //   'User update service',
    //   30000, // 30s timeout
    //   true    // Retry on 502/504
    // )

    // Mock updated user
    const updatedUser = {
      id: 'user_123',
      name: updates.name || 'John Doe',
      email: updates.email || 'john@example.com',
      preferences: {
        theme: updates.preferences?.theme || 'light',
        notifications: updates.preferences?.notifications ?? true,
        language: updates.preferences?.language || 'en',
      },
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json(updatedUser)
  } catch (error) {
    return handleApiError(error)
  }
}