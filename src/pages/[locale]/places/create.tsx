import { VStack } from "@chakra-ui/react";
import Head from "next/head";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { useTranslations } from "next-intl";
import { FooterSection } from "@/components/footerOld";
import { Navbar } from "@/components/navbar";
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
