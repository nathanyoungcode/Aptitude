import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { getSessionUser } from '@/lib/auth'
import { callWebhook, handleApiError } from '@/lib/errors'
import { chatRateLimit } from '@/lib/ratelimit'

const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message cannot exceed 1000 characters')
    .trim(),
  conversationId: z.string().uuid('Invalid conversation ID format').optional(),
  context: z
    .object({
      page: z.string().url('Invalid page URL').optional(),
      userAgent: z.string().max(500, 'User agent too long').optional(),
    })
    .optional(),
})

export async function POST(request: NextRequest) {
  try {
    // Check authentication first
    const user = await getSessionUser(request)

    // Rate limit check
    const { success, remaining, reset } = await chatRateLimit.limit(user.id)

    if (!success) {
      return NextResponse.json(
        { error: 'Too many messages. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      )
    }

    const body = await request.json()
    const { message, conversationId, context } = chatMessageSchema.parse(body)

    // Call your AI service or n8n webhook
    // const webhookResponse = await callWebhook(
    //   process.env.N8N_WEBHOOK_URL + '/chat',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${process.env.API_SECRET}`,
    //     },
    //     body: JSON.stringify({
    //       message,
    //       conversationId,
    //       context,
    //       userId: user.id,
    //     }),
    //   },
    //   'Chat service',
    //   30000, // 30s timeout
    //   true    // Retry on 502/504
    // )

    // Mock response for now
    const responses = [
      'I understand your question. Let me help you with that.',
      "That's a great point. Here's what I recommend...",
      'Based on your request, I can suggest a few approaches.',
      'Let me break this down for you step by step.',
      "I'd be happy to help clarify that for you.",
    ]

    const mockResponse = {
      id: `msg_${Date.now()}`,
      message: responses[Math.floor(Math.random() * responses.length)],
      conversationId: conversationId || `conv_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json(mockResponse)
  } catch (error) {
    return handleApiError(error)
  }
}
