import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const prisma = new PrismaClient()

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.includes('/auth/signin') && url.includes('callbackUrl')) {
        const urlObj = new URL(url)
        const callbackUrl = urlObj.searchParams.get('callbackUrl')
        if (callbackUrl) {
          return decodeURIComponent(callbackUrl)
        }
      }

      if (url.startsWith('/')) return `${baseUrl}${url}`
      if (new URL(url).origin === baseUrl) return url
      return baseUrl + '/chat'
    },
    session: async ({ session, user }) => {
      if (session?.user && user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database',
  },
})

export { handler as GET, handler as POST }
