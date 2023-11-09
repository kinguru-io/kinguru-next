import Head from "next/head";
import { GetStaticPropsContext } from "next/types";
import { HowItWorks } from "@/components/home";
import { Navbar } from "@/components/navbar";
import { OurOffers } from "@/components/pricing/ourOffers";
import { PlanComponent } from "@/components/pricing/plans";
import { ssgInit } from "@/server/ssg-init.ts";
import { useLocale } from "@/utils/use-locale.ts";
import { FooterSection } from "components/footer";

export default function Home() {
  const { t } = useLocale();
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
        <meta property="og:image" content="https://kinguru.io/img/brand.png" />
      </Head>
      <Navbar />
      <OurOffers />
      <PlanComponent />
      <HowItWorks />
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
