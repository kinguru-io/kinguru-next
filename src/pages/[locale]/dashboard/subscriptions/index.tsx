import { Flex } from "@chakra-ui/react";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { Sidebar } from "@/components/dashboard";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PlanComponent } from "@/components/pricing/plans";
import { staticPaths } from "@/navigation.ts";
import { ssgInit } from "@/server/ssg-init.ts";
import { redirect } from "@/utils/redirect.ts";

export default function Subscriptions() {
  return (
    <Flex
      maxW={"full"}
      minH={"100vh"}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <Navbar />
      <main>
        <Flex
          w={"full"}
          pt={20}
          flexDir={["column", "column", "column", "row", "row", "row"]}
        >
          <Sidebar />
          <PlanComponent />
        </Flex>
      </main>
      <FooterSection />
    </Flex>
  );
}

export async function getStaticProps({
  params,
  req,
  res,
}: GetStaticPropsContext & { req: NextApiRequest; res: NextApiResponse }) {
  const helpers = await ssgInit();
  const { auth } = await redirect(req, res);
  return {
    props: {
      messages: (await import(`~/public/locales/${params?.locale}/common.json`))
        .default,
      trpcState: helpers.dehydrate(),
    },
    ...auth(),
  };
}

export async function getStaticPaths() {
  return {
    paths: staticPaths,
    fallback: false,
  };
}
