import {loggerLink} from '@trpc/client'
import {experimental_nextHttpLink} from '@trpc/next/app-dir/links/nextHttp'
import {experimental_createTRPCNextAppDirServer} from '@trpc/next/app-dir/server'
import {cookies} from 'next/headers'
import superjson from 'superjson'
import {appRouter} from 'server/routers/_app'
import {getUrl} from './shared'

export const trpcServer = experimental_createTRPCNextAppDirServer<
  typeof appRouter
>({
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
              cookie: cookies().toString(),
              'x-trpc-source': 'rsc-http'
            }
          }
        })
      ]
    }
  }
})
