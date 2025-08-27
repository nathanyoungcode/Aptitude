import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

export class AuthError extends Error {
  constructor(
    message: string,
    public status: number = 401
  ) {
    super(message)
    this.name = 'AuthError'
  }
}

export interface SessionUser {
  id: string
  email: string
  name?: string
  role?: string
}

export async function getSessionUser(
  request: NextRequest
): Promise<SessionUser> {
  // Get token from Authorization header or cookie
  const authHeader = request.headers.get('authorization')
  const token =
    authHeader?.replace('Bearer ', '') ||
    request.cookies.get('auth-token')?.value

  if (!token) {
    throw new AuthError('No authentication token provided')
  }

  try {
    // Verify JWT token
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    )

    const { payload } = await jwtVerify(token, secret)

    if (!payload.sub || !payload.email) {
      throw new AuthError('Invalid token payload')
    }

    return {
      id: payload.sub as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    }
  } catch (error) {
    if (error instanceof AuthError) {
      throw error
    }
    throw new AuthError('Invalid or expired token')
  }
}

// Alternative: Session-based auth with database lookup
export async function getSessionFromDatabase(
  sessionId: string
): Promise<SessionUser> {
  // Call your session service or database
  // const session = await fetch(process.env.SESSION_API_URL + `/session/${sessionId}`, {
  //   headers: {
  //     'Authorization': `Bearer ${process.env.API_SECRET}`,
  //   },
  // })

  // Mock session lookup
  if (!sessionId || sessionId === 'invalid') {
    throw new AuthError('Invalid session')
  }

  return {
    id: 'user_123',
    email: 'john@example.com',
    name: 'John Doe',
  }
}
