'use client'

import { useState } from 'react'
import { Send, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export default function ChatPage() {
  const [prompt, setPrompt] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConversation, setShowConversation] = useState(false)

  const handleSubmitPrompt = async () => {
    if (!prompt.trim() || isLoading) return

    setIsLoading(true)
    setError(null)
    const userMessage = prompt
    setPrompt('')

    // Add user message and show conversation
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      role: 'user',
      timestamp: new Date()
    }

    setMessages([newUserMessage])
    setShowConversation(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        
        // Add assistant response
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.message || 'Response from your n8n workflow',
          role: 'assistant',
          timestamp: new Date()
        }

        setMessages(prev => [...prev, assistantMessage])
      } else {
        setError('Failed to send message. Please try again.')
        setPrompt(userMessage)
      }
    } catch {
      setError('Network error. Please check your connection.')
      setPrompt(userMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const startNewPrompt = () => {
    setMessages([])
    setShowConversation(false)
    setPrompt('')
    setError(null)
  }

  return (
    <div className="space-y-6">
      {!showConversation ? (
        /* Chat Introduction */
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
              <p className="text-muted-foreground">
                Ask your n8n workflow anything. Get instant responses.
              </p>
            </div>
          </div>

          {/* Chat Input Card */}
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>What would you like your workflow to do?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <textarea
                  placeholder="Type your question or request here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmitPrompt()
                    }
                  }}
                  className="w-full min-h-[120px] p-4 text-base rounded-lg border border-input bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all"
                  disabled={isLoading}
                />
                
                <Button
                  onClick={handleSubmitPrompt}
                  disabled={!prompt.trim() || isLoading}
                  className="absolute bottom-3 right-3"
                  size="sm"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Conversation View */
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Conversation</h1>
              <p className="text-muted-foreground">
                Your n8n workflow response
              </p>
            </div>
            <Button onClick={startNewPrompt} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Messages */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-12'
                          : 'bg-muted text-muted-foreground mr-12'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className="text-xs mt-2 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] bg-muted rounded-lg px-4 py-3 mr-12">
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
