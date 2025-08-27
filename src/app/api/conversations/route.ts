import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { getSessionUser } from '@/lib/auth'
import { handleApiError } from '@/lib/errors'
// import { simpleRateLimit } from '@/lib/ratelimit' // Temporarily disabled

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    // Check authentication first
    const user = await getSessionUser(request)
    
    // Rate limit check (temporarily disabled for testing)
    // const { success, remaining, reset } = await simpleRateLimit.limit(user.id)
    // if (!success) {
    //   return NextResponse.json(
    //     { error: 'Too many requests. Please try again later.' },
    //     { status: 429, headers: { 'X-RateLimit-Remaining': remaining.toString(), 'X-RateLimit-Reset': new Date(reset).toISOString() } }
    //   )
    // }

    // Get user's conversations with latest message
    const conversations = await prisma.conversation.findMany({
      where: { userId: user.id },
      include: {
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        },
        _count: {
          select: { messages: true }
        }
      },
      orderBy: { updatedAt: 'desc' },
      take: 50 // Limit to 50 most recent conversations
    })

    const formattedConversations = conversations.map(conv => ({
      id: conv.id,
      title: conv.title,
      messageCount: conv._count.messages,
      lastMessage: conv.messages[0] ? {
        content: conv.messages[0].content.substring(0, 100),
        timestamp: conv.messages[0].createdAt.toISOString(),
        role: conv.messages[0].role
      } : null,
      createdAt: conv.createdAt.toISOString(),
      updatedAt: conv.updatedAt.toISOString()
    }))

    return NextResponse.json({
      conversations: formattedConversations,
      total: conversations.length
    })
  } catch (error) {
    return handleApiError(error)
  }
}