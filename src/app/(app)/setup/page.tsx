'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Copy, ExternalLink, Webhook, Zap, MessageSquare, Database } from 'lucide-react'

export default function SetupPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const curlExample = `curl -X POST https://your-n8n-webhook.com/webhook \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello from Aptitude",
    "user_id": "user_123",
    "timestamp": "2024-01-01T12:00:00Z"
  }'`

  const responseExample = `{
  "success": true,
  "response": "Hello! I processed your request and found 3 items in your database.",
  "data": {
    "processed": true,
    "count": 3
  }
}`

  const useCases = [
    {
      icon: Database,
      title: "Database Queries",
      description: "Chat with your database through natural language queries",
      example: "\"Show me all users created this week\""
    },
    {
      icon: Zap,
      title: "Automation Triggers",
      description: "Trigger complex workflows with simple chat commands",
      example: "\"Deploy the latest version to staging\""
    },
    {
      icon: MessageSquare,
      title: "API Integrations",
      description: "Connect multiple services and get unified responses",
      example: "\"Create a new ticket in Jira and notify Slack\""
    },
    {
      icon: Webhook,
      title: "Custom Workflows",
      description: "Build any custom logic and interact through chat",
      example: "\"Generate a report for last month's sales\""
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Setup & Use Cases</h1>
          <p className="text-muted-foreground">
            Get started with Aptitude and explore what's possible
          </p>
        </div>
        <Button variant="outline" asChild>
          <a href="https://docs.n8n.io/webhooks/" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            n8n Webhook Docs
          </a>
        </Button>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <p className="font-medium">Create n8n Workflow</p>
                <p className="text-sm text-muted-foreground">Add a webhook trigger</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <p className="font-medium">Configure Webhook</p>
                <p className="text-sm text-muted-foreground">Copy the webhook URL</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <p className="font-medium">Start Chatting</p>
                <p className="text-sm text-muted-foreground">Connect and chat away</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Use Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon
              return (
                <div key={index} className="p-4 rounded-lg border bg-card/50">
                  <div className="flex items-start space-x-3">
                    <Icon className="h-5 w-5 text-primary mt-1" />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{useCase.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{useCase.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {useCase.example}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Technical Setup */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Webhook Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook className="h-5 w-5" />
              Webhook Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Expected Request Format</h4>
              <div className="relative">
                <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                  <code>{curlExample}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(curlExample)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Required Fields</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <code className="bg-muted px-1 rounded">message</code> - The chat message content</li>
                <li>• <code className="bg-muted px-1 rounded">user_id</code> - Optional user identifier</li>
                <li>• <code className="bg-muted px-1 rounded">timestamp</code> - Optional timestamp</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Response Format */}
        <Card>
          <CardHeader>
            <CardTitle>Response Format</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Expected Response</h4>
              <div className="relative">
                <pre className="bg-muted p-3 rounded-lg text-sm overflow-x-auto">
                  <code>{responseExample}</code>
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(responseExample)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Response Fields</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• <code className="bg-muted px-1 rounded">response</code> - Main message to display in chat</li>
                <li>• <code className="bg-muted px-1 rounded">success</code> - Optional status indicator</li>
                <li>• <code className="bg-muted px-1 rounded">data</code> - Optional additional data</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Pro Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Workflow Design</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Keep responses concise and conversational</li>
                <li>• Handle errors gracefully with helpful messages</li>
                <li>• Use conditional logic for different message types</li>
                <li>• Consider adding typing delays for realism</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Security & Performance</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Validate incoming message content</li>
                <li>• Implement rate limiting if needed</li>
                <li>• Use HTTPS for webhook endpoints</li>
                <li>• Keep webhook responses under 30 seconds</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}