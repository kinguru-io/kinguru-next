'use client'

import {loggerLink} from '@trpc/client'
import {
  experimental_createActionHook,
  experimental_createTRPCNextAppDirClient,
  experimental_serverActionLink
} from '@trpc/next/app-dir/client'
import {experimental_nextHttpLink} from '@trpc/next/app-dir/links/nextHttp'
import superjson from 'superjson'
import {appRouter} from 'server/routers/_app'
import {getUrl} from './shared'

export const trpc = experimental_createTRPCNextAppDirClient<typeof appRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: () => true
        }),
        experimental_nextHttpLink({
          batch: true,
          url: getUrl(),
          headers() {
            return {
              'x-trpc-source': 'client'
            }
          }
        })
      ]
    }
  }
})

export const useAction = experimental_createActionHook({
  links: [loggerLink(), experimental_serverActionLink()],
  transformer: superjson
})
