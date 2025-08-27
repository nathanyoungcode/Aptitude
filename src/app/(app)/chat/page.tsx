'use client'

import { useState } from 'react'
import { MoreVertical, Paperclip, Send } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

const mockMessages = [
  {
    id: 1,
    sender: 'Assistant',
    message: 'Hello! How can I help you today?',
    timestamp: '10:30 AM',
    isBot: true,
  },
  {
    id: 2,
    sender: 'You',
    message: 'I need help setting up my dashboard',
    timestamp: '10:31 AM',
    isBot: false,
  },
  {
    id: 3,
    sender: 'Assistant',
    message:
      "I'd be happy to help you set up your dashboard. What specific features are you looking to configure?",
    timestamp: '10:31 AM',
    isBot: true,
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      sender: 'You',
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      isBot: false,
    }

    setMessages([...messages, userMessage])
    setNewMessage('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        sender: 'Assistant',
        message: 'Thanks for your message! This is a simulated response.',
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        isBot: true,
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
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
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {/* Sidebar */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm font-medium">Current Chat</p>
              <p className="text-xs text-muted-foreground">Dashboard setup</p>
            </div>
            <div className="p-2 rounded-lg hover:bg-muted cursor-pointer">
              <p className="text-sm">Previous Chat</p>
              <p className="text-xs text-muted-foreground">API integration</p>
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-3">
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
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      message.isBot ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <Avatar className="h-6 w-6 mt-1">
                      <AvatarFallback className="text-xs">
                        {message.isBot ? 'AI' : 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`mx-2 p-3 rounded-lg ${
                        message.isBot
                          ? 'bg-muted'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isBot ? 'text-muted-foreground' : 'opacity-70'
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

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
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
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
