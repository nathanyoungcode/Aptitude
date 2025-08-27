import { NextResponse } from 'next/server'
import { z } from 'zod'

export class WebhookError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'WebhookError'
  }
}

export function handleApiError(error: unknown): NextResponse {
  // Authentication errors
  if (error instanceof AuthError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    )
  }

  // Zod validation errors
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: 'Invalid request data',
        details: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          received: err.received,
        })),
      },
      { status: 400 }
    )
  }

  // Webhook/external service errors
  if (error instanceof WebhookError) {
    return NextResponse.json(
      { error: error.message, details: error.details },
      { status: error.status }
    )
  }

  // Network/fetch errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return NextResponse.json(
      { error: 'External service unavailable' },
      { status: 503 }
    )
  }

  // Generic server errors
  console.error('Unhandled API error:', error)
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}

export async function callWebhook(
  url: string,
  options: RequestInit,
  context: string = 'webhook',
  timeoutMs: number = 30000,
  retryOnGatewayError: boolean = true
): Promise<any> {
  const makeRequest = async (isRetry: boolean = false): Promise<any> => {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      })
      
      clearTimeout(timeoutId)
      
      // Check for gateway errors that should be retried
      if (!response.ok) {
        const shouldRetry = retryOnGatewayError && 
                          !isRetry && 
                          (response.status === 502 || response.status === 504)
        
        if (shouldRetry) {
          console.warn(`${context} returned ${response.status}, retrying...`)
          // Wait 1 second before retry
          await new Promise(resolve => setTimeout(resolve, 1000))
          return makeRequest(true)
        }
        
        let errorDetails
        try {
          errorDetails = await response.json()
        } catch {
          errorDetails = { message: response.statusText }
        }
        
        throw new WebhookError(
          response.status,
          `${context} failed: ${errorDetails.message || response.statusText}`,
          errorDetails
        )
      }
      
      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof WebhookError) {
        throw error
      }
      
      // Handle abort/timeout
      if (error instanceof Error && error.name === 'AbortError') {
        throw new WebhookError(
          408,
          `${context} request timed out after ${timeoutMs}ms`,
          { timeout: true }
        )
      }
      
      // Network or parsing errors
      throw new WebhookError(
        503,
        `${context} service unavailable`,
        { originalError: error instanceof Error ? error.message : 'Unknown error' }
      )
    }
  }
  
  return makeRequest()
}

// Import AuthError here to avoid circular dependency
export class AuthError extends Error {
  constructor(message: string, public status: number = 401) {
    super(message)
    this.name = 'AuthError'
  }
}