'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

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
    } catch (error) {
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
    <div className="min-h-screen relative" style={{backgroundColor: '#18181b'}}>
      {/* Navigation back to home */}
      <div className="absolute top-6 left-6 z-10">
        <button 
          onClick={() => window.location.href = '/'}
          className="text-sm px-4 py-2 rounded-lg transition-colors hover:bg-zinc-800"
          style={{color: '#a1a1aa'}}
        >
          ← Back to Home
        </button>
      </div>

      {!showConversation ? (
        /* Prompt Interface */
        <div className="flex items-center justify-center min-h-screen p-8">
          <div className="w-full max-w-2xl">
            {/* Main Heading */}
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{color: '#fafafa'}}>
                What would you like
                <br />
                <span className="italic font-light">your workflow to do?</span>
              </h1>
              <p className="text-lg leading-relaxed" style={{color: '#a1a1aa'}}>
                Ask your n8n workflow anything. Get instant responses.
              </p>
            </div>

            {/* Prompt Input */}
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
                className="w-full p-6 text-lg rounded-2xl border resize-none focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: '#27272a',
                  borderColor: '#3f3f46',
                  color: '#fafafa',
                  '--tw-ring-color': '#f59e0b'
                }}
                rows={4}
                disabled={isLoading}
              />
              
              <button
                onClick={handleSubmitPrompt}
                disabled={!prompt.trim() || isLoading}
                className="absolute bottom-4 right-4 p-3 rounded-lg hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: '#f59e0b',
                  '--tw-ring-color': '#f59e0b',
                  color: '#000'
                }}
                onMouseEnter={e => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#d97706')}
                onMouseLeave={e => !e.currentTarget.disabled && (e.currentTarget.style.backgroundColor = '#f59e0b')}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 rounded-lg" style={{backgroundColor: '#dc26261a', color: '#dc2626'}}>
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Conversation View */
        <div className="max-w-4xl mx-auto p-6 pt-20">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold" style={{color: '#fafafa'}}>Conversation</h2>
              <p className="text-sm" style={{color: '#a1a1aa'}}>Your n8n workflow response</p>
            </div>
            <button
              onClick={startNewPrompt}
              className="px-4 py-2 text-sm rounded-lg border transition-colors"
              style={{
                borderColor: '#3f3f46',
                color: '#a1a1aa',
                backgroundColor: 'transparent'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#27272a'
                e.currentTarget.style.color = '#fafafa'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#a1a1aa'
              }}
            >
              New Prompt
            </button>
          </div>

          {/* Messages */}
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'text-black'
                    : 'border'
                }`}
                style={{
                  backgroundColor: message.role === 'user' ? '#f59e0b' : '#27272a',
                  borderColor: message.role === 'assistant' ? '#3f3f46' : 'transparent',
                  color: message.role === 'user' ? '#000' : '#fafafa'
                }}>
                  <p className="text-lg leading-relaxed">{message.content}</p>
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
                <div className="max-w-[80%] p-4 rounded-2xl border" style={{backgroundColor: '#27272a', borderColor: '#3f3f46'}}>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm" style={{color: '#a1a1aa'}}>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
