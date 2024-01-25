import { Button, ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { Noto_Sans } from "next/font/google";
import { NextRouter, withRouter } from "next/router";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { theme } from "@/components/theme";
import * as gtag from "@/utils/gtag.ts";
import { trpc } from "@/utils/trpc";
import "@/components/styles.css";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
    <main className={notoSans.className}>
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
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen />
        </SessionProvider>
      </NextIntlClientProvider>
    </main>
  );
}

export default trpc.withTRPC(withRouter(MainApp));
