import { VStack } from "@chakra-ui/react";
import Head from "next/head";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/headerOld";
import { NewPlaceStepper } from "@/components/places/create";
import { ssgInit } from "@/server/ssg-init.ts";
import { redirect } from "@/utils/redirect.ts";

export default function PlaceCreate() {
  const t = useTranslations();
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
        <meta
          property="og:image"
          content="https://eventify.today/img/brand.png"
        />
      </Head>
      <VStack h={"100vh"} justifyContent={"space-between"}>
        <Header />
        <NewPlaceStepper />
        <Footer />
      </VStack>
    </>
  );
}

export async function getServerSideProps({
  params,
  req,
  res,
}: GetStaticPropsContext & { req: NextApiRequest; res: NextApiResponse }) {
  const helpers = await ssgInit();
  const { auth, profileCompleteness } = await redirect(req, res);
  return {
    props: {
      messages: (await import(`~/public/locales/${params?.locale}/common.json`))
        .default,
      trpcState: helpers.dehydrate(),
    },
    ...auth(),
    ...(await profileCompleteness()),
  };
}
