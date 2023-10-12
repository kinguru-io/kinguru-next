import {UserRole} from '@prisma/client'
import {type DefaultSession, DefaultUser, type NextAuthOptions} from 'next-auth'
import {getServerSession} from 'next-auth/next'
import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'
import {PrismaAdapter} from './server/adapters/auth-prisma'
import prisma from './server/prisma'

declare module 'next-auth' {
  interface User extends DefaultUser {
    role?: UserRole
  }
  interface Session extends DefaultSession {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {}
}

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    })
  ],
  callbacks: {
    session({session, user}) {
      if (session?.user) {
        session.user.role = user.role
        session.user.id = user.id
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma)
} satisfies NextAuthOptions

export function auth() {
  return getServerSession(options)
}
