'use client'

import { useEffect, useState } from 'react'
import { MoreVertical, Paperclip, Send } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  content: string
  role: 'USER' | 'ASSISTANT' | 'SYSTEM'
  timestamp: string
}

interface Conversation {
  id: string
  title: string | null
  messages: Message[]
  createdAt: string
  updatedAt: string
}

interface ConversationListItem {
  id: string
  title: string | null
  messageCount: number
  lastMessage: {
    content: string
    timestamp: string
    role: string
  } | null
  createdAt: string
  updatedAt: string
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<ConversationListItem[]>([])
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load conversations on mount
  useEffect(() => {
    loadConversations()
  }, [])

  const loadConversations = async () => {
    try {
      const response = await fetch('/api/conversations')
      if (response.ok) {
        const data = await response.json()
        setConversations(data.conversations)
      }
    } catch (error) {
      console.error('Failed to load conversations:', error)
    }
  }

  const loadConversation = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/conversations/${conversationId}`)
      if (response.ok) {
        const conversation = await response.json()
        setCurrentConversation(conversation)
      }
    } catch (error) {
      console.error('Failed to load conversation:', error)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)
    setError(null) // Clear any previous errors
    const messageText = newMessage
    setNewMessage('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          conversationId: currentConversation?.id,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // If this is a new conversation, load it
        if (!currentConversation || currentConversation.id !== data.conversationId) {
          await loadConversation(data.conversationId)
          await loadConversations() // Refresh conversation list
        } else {
          // Update current conversation with new messages
          setCurrentConversation(prev => prev ? {
            ...prev,
            messages: [
              ...prev.messages,
              {
                id: data.userMessage.id,
                content: data.userMessage.message,
                role: 'USER' as const,
                timestamp: data.userMessage.timestamp,
              },
              {
                id: data.assistantMessage.id,
                content: data.assistantMessage.message,
                role: 'ASSISTANT' as const,
                timestamp: data.assistantMessage.timestamp,
              }
            ]
          } : null)
        }
      } else {
        setError('Failed to send message. Please try again.')
        setNewMessage(messageText) // Restore the message
      }
    } catch (error) {
      setError('Network error. Please check your connection.')
      setNewMessage(messageText) // Restore the message
    } finally {
      setIsLoading(false)
    }
  }

  const startNewConversation = () => {
    setCurrentConversation(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
          <p className="text-muted-foreground">
            Get help from our AI assistant
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={startNewConversation}>
            New Chat
          </Button>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Chat Area */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">AI Assistant</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    Online
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Usually responds in a few seconds
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-4 space-y-4">
              {!currentConversation ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Select a conversation or start a new one</p>
                </div>
              ) : (
                currentConversation.messages.map((message) => {
                  const isBot = message.role === 'ASSISTANT'
                  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${
                          isBot ? 'flex-row' : 'flex-row-reverse'
                        }`}
                      >
                        <Avatar className="h-6 w-6 mt-1">
                          <AvatarFallback className="text-xs">
                            {isBot ? 'AI' : 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`mx-2 p-3 rounded-lg ${
                            isBot
                              ? 'bg-muted'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              isBot ? 'text-muted-foreground' : 'opacity-70'
                            }`}
                          >
                            {timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex flex-row max-w-[80%]">
                    <Avatar className="h-6 w-6 mt-1">
                      <AvatarFallback className="text-xs">AI</AvatarFallback>
                    </Avatar>
                    <div className="mx-2 p-3 rounded-lg bg-muted">
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="p-4 border-t border-b bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isLoading}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
