import {useRouter} from 'next/router'
import {useMemo} from 'react'

export function useNextRouting(config: any, basePathUrl: any) {
  const router = useRouter()
  const {asPath} = router

  function getSearchParamsFromUrl(url: any) {
    return url.match(/\?(.+)/)?.[1] || ''
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const routingOptions = {
    // read and write only the query string to search UI
    // as we are leveraging existing stateToUrl and urlToState functions
    // which are based on the query string
    readUrl: () => getSearchParamsFromUrl(asPath),
    writeUrl: (url: any, {replaceUrl}: {replaceUrl: any}) => {
      const method = router[replaceUrl ? 'replace' : 'push']
      const params = Object.fromEntries(new URLSearchParams(url).entries())
      void method({query: {...router.query, ...params}}, undefined, {
        shallow: true
      })
    },
    routeChangeHandler: (callback: any) => {
      function handler(fullUrl: any) {
        if (fullUrl.includes(basePathUrl)) {
          callback(getSearchParamsFromUrl(fullUrl))
        }
      }
      router.events.on('routeChangeComplete', handler)
      return () => {
        router.events.off('routeChangeComplete', handler)
      }
    }
  }

  return useMemo(
    () => ({
      ...config,
      routingOptions
    }),
    [config, routingOptions]
  )
}
