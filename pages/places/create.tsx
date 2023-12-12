import { VStack } from "@chakra-ui/react";
import Head from "next/head";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { NewPlaceStepper } from "@/components/places/create";
import { ssgInit } from "@/server/ssg-init.ts";
import { redirect } from "@/utils/redirect.ts";
import { useLocale } from "@/utils/use-locale.ts";

export default function PlaceCreate() {
  const { t } = useLocale();
  return (
    <>
      <Head>
        <title>{t("metadata.places.create.title")}</title>
        <meta
          name="description"
          content={t("metadata.places.create.description")}
        />
        <meta property="og:title" content={t("metadata.places.create.title")} />
        <meta
          property="og:description"
          content={t("metadata.places.create.description")}
        />
        <meta property="og:image" content="https://kinguru.io/img/brand.png" />
      </Head>
      <VStack h={"100vh"} justifyContent={"space-between"}>
        <Navbar />
        <NewPlaceStepper />
        <FooterSection />
      </VStack>
    </>
  );
}

export async function getServerSideProps(
  ctx: GetStaticPropsContext & { req: NextApiRequest; res: NextApiResponse },
) {
  const helpers = await ssgInit(ctx);
  const { auth, speaker } = await redirect(ctx.req, ctx.res);
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    ...auth(),
    ...(await speaker()),
  };
}
