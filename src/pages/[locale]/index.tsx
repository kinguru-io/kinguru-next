import Head from "next/head";
import { GetStaticPropsContext } from "next/types";
import { useTranslations } from "next-intl";
import { FooterSection } from "@/components/footer";
import {
  BestSpeakersSection,
  CompanyStatisticsSection,
  Events,
  HeroContent,
  InviteSection,
  HowItWorks,
} from "@/components/home";
import { WhatAreYouGetting } from "@/components/home/getting";
import { Navbar } from "@/components/navbar";
import { staticPaths } from "@/navigation.ts";
import { ssgInit } from "@/server/ssg-init.ts";

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t("metadata.home.title")}</title>
        <meta name="description" content={t("metadata.home.description")} />
        <meta property="og:title" content={t("metadata.home.title")} />
        <meta
          property="og:description"
          content={t("metadata.home.description")}
        />
        <meta
          property="og:image"
          content="https://eventify.today/img/brand.png"
        />
      </Head>
      <Navbar />
      <HeroContent />
      <Events />
      <InviteSection />
      <HowItWorks />
      <WhatAreYouGetting />
      <BestSpeakersSection />
      <CompanyStatisticsSection />
      <FooterSection />
    </>
  );
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const helpers = await ssgInit();
  await helpers.event.upcoming.prefetch();
  await helpers.event.recent.prefetch();
  await helpers.speaker.bestSpeakers.prefetch();
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
