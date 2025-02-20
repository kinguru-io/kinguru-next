import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";

import {
  GoogleAnalytics,
  AnalyticsConsent,
  YandexAnalytics,
  MetaPixel,
} from "@/components/analytics";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/notifications/hot-toast-toaster";
import { NotoSans } from "@/fontLoader.ts";
import { keywordsEN, keywordsPL } from "@/lib/metadata/constants";
import { css } from "~/styled-system/css";
import { Grid } from "~/styled-system/jsx";

import "../globals.css";
import { GatewayHandling } from "@/components/error-handling/gateway";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.home");
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL("https://eventify.today"),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        pl: "/pl",
      },
    },
    title,
    description,
    openGraph: {
      title,
      description,
      images: "/img/logotypes/footer-logotype-512x512.png",
    },
    keywords: [...keywordsPL, ...keywordsEN],
  };
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const messages = useMessages();

  return (
    <html lang={locale} className={`${NotoSans.variable}`}>
      <GoogleAnalytics />
      <GatewayHandling />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={css({ fontFamily: "noto" })}>
          <Grid
            css={{
              gridTemplateRows: "auto 1fr 0",
              gap: "0",
              minHeight: "var(--100dvh)",
              sm: {
                gridTemplateRows: "auto 1fr",
                "&:has([data-hide-footer])": { gridTemplateRows: "auto 1fr 0" },
              },
            }}
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </Grid>
          <Toaster />
          <YandexAnalytics />
          <MetaPixel />
          <AnalyticsConsent />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
