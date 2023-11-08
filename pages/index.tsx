import Head from "next/head";
import { GetStaticPropsContext } from "next/types";
import { WhatAreYouGetting } from "@/components/home/getting";
import { Navbar } from "@/components/navbar";
import { ssgInit } from "@/server/ssg-init.ts";
import { useLocale } from "@/utils/use-locale.ts";
import { FooterSection } from "components/footer";
import {
  BestSpeakersSection,
  CompanyStatisticsSection,
  Events,
  HeroContent,
  InviteSection,
  HowItWorks,
} from "components/home";

export default function Home() {
  const { t } = useLocale();
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
        <meta property="og:image" content="https://kinguru.io/img/brand.png" />
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

export async function getServerSideProps(ctx: GetStaticPropsContext) {
  const helpers = await ssgInit(ctx);
  await helpers.event.upcoming.prefetch();
  await helpers.event.recent.prefetch();
  await helpers.speaker.bestSpeakers.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
