import type { Metadata } from "next";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { getTranslations } from "next-intl/server";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/notifications/hot-toast-toaster";
import { NotoSans } from "@/fontLoader.ts";
import { css } from "~/styled-system/css";
import { Grid } from "~/styled-system/jsx";

import "../globals.css";

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
        ru: "/ru",
      },
    },
    title,
    description,
    openGraph: {
      title,
      description,
      images: "/img/logotypes/footer-logotype-512x512.png",
    },
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
      <NextIntlClientProvider locale={locale} messages={messages}>
        <body className={css({ fontFamily: "noto" })}>
          <Grid
            css={{
              gridTemplateRows: "auto 1fr 0",
              gap: "0",
              minHeight: "100vh",
              sm: { gridTemplateRows: "auto 1fr" },
            }}
          >
            <Header />
            <main>{children}</main>
            <Footer />
          </Grid>
          <Toaster />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
