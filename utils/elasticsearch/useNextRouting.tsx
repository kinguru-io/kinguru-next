import { useRouter } from "next/router";
import { useMemo } from "react";

export const useNextRouting = (config: any, basePathUrl: any) => {
  const router = useRouter();
  const { asPath } = router;

  const getSearchParamsFromUrl = (url: any) => {
    return url.match(/\?(.+)/)?.[1] || "";
  };

  const routingOptions = {
    // read and write only the query string to search UI
    // as we are leveraging existing stateToUrl and urlToState functions
    // which are based on the query string
    readUrl: () => {
      return getSearchParamsFromUrl(asPath);
    },
    writeUrl: (url: any, { replaceUrl }: { replaceUrl: any }) => {
      const method = router[replaceUrl ? "replace" : "push"];
      const params = Object.fromEntries(new URLSearchParams(url).entries());
      void method({ query: { ...router.query, ...params } }, undefined, {
        shallow: true,
      });
    },
    routeChangeHandler: (callback: any) => {
      const handler = (fullUrl: any) => {
        if (fullUrl.includes(basePathUrl)) {
          callback(getSearchParamsFromUrl(fullUrl));
        }
      };
      router.events.on("routeChangeComplete", handler);
      return () => {
        router.events.off("routeChangeComplete", handler);
      };
    },
  };

  return useMemo(() => {
    return {
      ...config,
      routingOptions,
    };
  }, [router.isReady]);
};
