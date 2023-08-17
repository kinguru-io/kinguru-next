import { ChakraProvider } from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation, SSRConfig } from "next-i18next";
import { ComponentProps } from "react";
import { theme } from "@/components/theme";
import { trpc } from "@/utils/trpc";

const I18nextAdapter = appWithTranslation<
  AppProps<SSRConfig> & { children: React.ReactNode }
>(({ children }) => <>{children}</>);

const I18nProvider = (props: AppProps) => {
  const _i18n = trpc.i18n.useQuery(undefined, {
    trpc: { context: { skipBatch: true } },
  });

  const locale = _i18n.data?.locale;
  const i18n = _i18n.data?.i18n;

  const passedProps = {
    ...props,
    pageProps: {
      ...props.pageProps,
      ...i18n,
    },
    router: locale ? { locale } : props.router,
  } as unknown as ComponentProps<typeof I18nextAdapter>;
  return <I18nextAdapter {...passedProps} />;
};

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <I18nProvider {...pageProps}>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen />
      </SessionProvider>
    </I18nProvider>
  );
}

export default trpc.withTRPC(App);
