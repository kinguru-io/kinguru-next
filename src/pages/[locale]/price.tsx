import Head from "next/head";
import { GetStaticPropsContext } from "next/types";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/headerOld";
import { HowItWorks } from "@/components/home";
import { OurOffers } from "@/components/pricing/ourOffers";
import { PlanComponent } from "@/components/pricing/plans";
import { staticPaths } from "@/navigation.ts";
import { ssgInit } from "@/server/ssg-init.ts";

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t("metadata.price.title")}</title>
        <meta name="description" content={t("metadata.price.description")} />
        <meta property="og:title" content={t("metadata.price.title")} />
        <meta
          property="og:description"
          content={t("metadata.price.description")}
        />
        <meta
          property="og:image"
          content="https://eventify.today/img/brand.png"
        />
      </Head>
      <Header />
      <OurOffers />
      <PlanComponent />
      <HowItWorks />
      <Footer />
    </>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const helpers = await ssgInit();
  return {
    props: {
      messages: (await import(`~/public/locales/${params?.locale}/common.json`))
        .default,
      trpcState: helpers.dehydrate(),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: staticPaths,
    fallback: false,
  };
}
