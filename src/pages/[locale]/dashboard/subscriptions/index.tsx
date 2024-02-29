import { Flex } from "@chakra-ui/react";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { Sidebar } from "@/components/dashboard";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/headerOld";
import { PlanComponent } from "@/components/pricing/plans";
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
      <Header />
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
      <Footer />
    </Flex>
  );
}

export async function getServerSideProps({
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
