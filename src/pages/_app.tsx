import { Button, ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { NextRouter, withRouter } from "next/router";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { theme } from "@/components/theme";
import { NotoSans } from "@/fontLoader.ts";
import * as gtag from "@/utils/gtag.ts";
import { trpc } from "@/utils/trpc";
import { css } from "~/styled-system/css";

import "@/components/styles.css";
import "@/app/globals.css";

const handleDeclineCookie = () => {
  Cookies.remove("_ga");
  Cookies.remove("_gat");
  Cookies.remove("_gid");
};

type Props = AppProps & {
  router: NextRouter;
};

function MainApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: Props) {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-noto-sans: ${NotoSans.style.fontFamily};
          }
        `}
      </style>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script
        id={"google-analytics"}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
    
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <NextIntlClientProvider
        locale={(router.query?.locale as string) ?? "en"}
        messages={pageProps.messages}
        timeZone="Europe/Vienna"
      >
        <SessionProvider session={pageProps.session}>
          <ChakraProvider theme={theme} resetCSS={false}>
            <main className={css({ fontFamily: "noto" })}>
              <Component {...pageProps} />
              <CookieConsent
                disableButtonStyles={true}
                ButtonComponent={Button}
                buttonWrapperClasses={"flex"}
                customButtonProps={{
                  variant: "primary",
                  color: "black",
                  mr: 3,
                }}
                customDeclineButtonProps={{
                  variant: "secondary",
                  color: "black",
                  mr: 3,
                }}
                enableDeclineButton
                onDecline={handleDeclineCookie}
              >
                This website uses cookies to enhance the user experience.
              </CookieConsent>
            </main>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen />
        </SessionProvider>
      </NextIntlClientProvider>
    </>
  );
}

export default trpc.withTRPC(withRouter(MainApp));
