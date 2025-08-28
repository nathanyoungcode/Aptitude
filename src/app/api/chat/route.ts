import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

import { getSessionUser } from '@/lib/auth'
import { callWebhook, handleApiError } from '@/lib/errors'
// import { chatRateLimit } from '@/lib/ratelimit' // Temporarily disabled

const prisma = new PrismaClient()

const chatMessageSchema = z.object({
  message: z
    .string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message cannot exceed 1000 characters')
    .trim(),
  conversationId: z.string().min(1, 'Conversation ID cannot be empty').optional(),
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

    // Rate limit check (temporarily disabled for testing)
    // const { success, remaining, reset } = await chatRateLimit.limit(user.id)
    // if (!success) {
    //   return NextResponse.json(
    //     { error: 'Too many messages. Please try again later.' },
    //     { status: 429, headers: { 'X-RateLimit-Remaining': remaining.toString(), 'X-RateLimit-Reset': new Date(reset).toISOString() } }
    //   )
    // }

    const body = await request.json()
    const { message, conversationId, context } = chatMessageSchema.parse(body)

    // Find or create conversation
    let conversation
    if (conversationId) {
      conversation = await prisma.conversation.findFirst({
        where: { id: conversationId, userId: user.id }
      })
    }
    
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          userId: user.id,
          title: message.substring(0, 50) + (message.length > 50 ? '...' : '')
        }
      })
    }

    // Save user message
    const userMessage = await prisma.message.create({
      data: {
        content: message,
        role: 'USER',
        conversationId: conversation.id,
        userId: user.id,
        metadata: context ? JSON.stringify(context) : undefined
      }
    })

    // Call your n8n webhook
    const webhookResponse = await callWebhook(
      process.env.N8N_WEBHOOK_URL + '/chat',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.N8N_API_SECRET}`,
          'X-User-ID': user.id,
        },
        body: JSON.stringify({
          message,
          conversationId: conversation.id,
          context,
          userId: user.id,
          userEmail: user.email,
        }),
      },
      'n8n Chat service',
      30000, // 30s timeout
      true    // Retry on 502/504
    )

    // Save assistant response
    const assistantMessage = await prisma.message.create({
      data: {
        content: webhookResponse.message || 'Sorry, I could not process your request.',
        role: 'ASSISTANT',
        conversationId: conversation.id,
        userId: user.id,
        metadata: webhookResponse.metadata ? JSON.stringify(webhookResponse.metadata) : undefined
      }
    })

    // Return the response
    const response = {
      userMessage: {
        id: userMessage.id,
        message: userMessage.content,
        role: userMessage.role,
        timestamp: userMessage.createdAt.toISOString(),
      },
      assistantMessage: {
        id: assistantMessage.id,
        message: assistantMessage.content,
        role: assistantMessage.role,
        timestamp: assistantMessage.createdAt.toISOString(),
      },
      conversationId: conversation.id,
      ...webhookResponse, // Include any additional data from n8n
    }

    return NextResponse.json(response)
  } catch (error) {
    return handleApiError(error)
  }
}
