import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

import { getSessionUser } from '@/lib/auth'
import { handleApiError } from '@/lib/errors'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication first
    const user = await getSessionUser(request)
    
    const { id: conversationId } = await params

    // Get conversation with messages
    const conversation = await prisma.conversation.findFirst({
      where: { 
        id: conversationId,
        userId: user.id
      },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    const formattedMessages = conversation.messages.map(msg => ({
      id: msg.id,
      content: msg.content,
      role: msg.role,
      timestamp: msg.createdAt.toISOString(),
      metadata: msg.metadata ? JSON.parse(msg.metadata as string) : null
    }))

    return NextResponse.json({
      id: conversation.id,
      title: conversation.title,
      messages: formattedMessages,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString()
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication first
    const user = await getSessionUser(request)
    
    const { id: conversationId } = await params

    // Delete conversation (messages will be deleted due to cascade)
    const deletedConversation = await prisma.conversation.deleteMany({
      where: { 
        id: conversationId,
        userId: user.id
      }
    })

    if (deletedConversation.count === 0) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}