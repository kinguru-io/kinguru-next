import Head from "next/head";
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
      <BestSpeakersSection />
      <CompanyStatisticsSection />
      <FooterSection />
    </>
  );
}

export async function getServerSideProps() {
  const helpers = await ssgInit({});
  await helpers.speaker.bestSpeakers.prefetch();
  await helpers.event.upcoming.prefetch();
  await helpers.event.recent.prefetch();
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
