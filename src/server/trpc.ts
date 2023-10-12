import {experimental_createServerActionHandler} from '@trpc/next/app-dir/server'
import * as trpc from '@trpc/server'
import {headers} from 'next/headers'
import superjson from 'superjson'
import {permissions} from 'server/shield'
import {auth} from '../auth'
import type {Context} from './context'
import prisma from './prisma'

export const t = trpc.initTRPC.context<Context>().create({
  transformer: superjson
})

export const createAction = experimental_createServerActionHandler(t, {
  async createContext() {
    const session = await auth()

    return {
      prisma,
      session,
      headers: {
        // Pass the cookie header to the API
        cookies: headers().get('cookie') ?? ''
      }
    }
  }
})

export const permissionsMiddleware = t.middleware(permissions)
export const publicProcedure = t.procedure.use(permissionsMiddleware)
