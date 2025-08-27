// API client helpers for type-safe requests

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `/api${endpoint}`
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new ApiError(
      response.status,
      error.error || 'Request failed',
      error.details
    )
  }

  return response.json()
}

// Analytics API
export const analyticsApi = {
  getStats: (timeframe?: string) =>
    apiRequest(`/analytics?timeframe=${timeframe || '7d'}`),
}

// Chat API
export const chatApi = {
  sendMessage: (data: { message: string; conversationId?: string }) =>
    apiRequest('/chat', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
}

// User API
export const userApi = {
  getProfile: () => apiRequest('/user'),
  updateProfile: (data: any) =>
    apiRequest('/user', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
}