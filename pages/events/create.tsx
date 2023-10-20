import Head from "next/head";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { NewEventStepper } from "@/components/events/create";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ssgInit } from "@/server/ssg-init.ts";
import { redirect } from "@/utils/redirect.ts";
import { useLocale } from "@/utils/use-locale.ts";

export default function EventCreate() {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>{t("metadata.events.create.title")}</title>
        <meta
          name="description"
          content={t("metadata.events.create.description")}
        />
        <meta property="og:title" content={t("metadata.events.create.title")} />
        <meta
          property="og:description"
          content={t("metadata.events.create.description")}
        />
        <meta property="og:image" content="https://kinguru.io/img/brand.png" />
      </Head>
      <Navbar />
      <NewEventStepper />
      <FooterSection />
    </>
  );
}

export async function getServerSideProps(
  ctx: GetStaticPropsContext & { req: NextApiRequest; res: NextApiResponse },
) {
  const helpers = await ssgInit(ctx);
  await helpers.places.all.prefetch();
  const { auth, speaker } = await redirect(ctx.req, ctx.res);
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    ...auth(),
    ...(await speaker()),
  };
}
