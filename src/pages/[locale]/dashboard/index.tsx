import { Flex } from "@chakra-ui/react";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { ProfileView, Sidebar } from "@/components/dashboard";
import { MainInfo } from "@/components/dashboard/main";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/headerOld";
import { ssgInit } from "@/server/ssg-init.ts";
import { redirect } from "@/utils/redirect.ts";

export default function Dashboard() {
  return (
    <Flex
      maxW={"full"}
      minH={"100vh"}
      flexDir={"column"}
      justifyContent={"space-between"}
    >
      <Header />
      <main>
        <ProfileView />
        <Flex
          w={"full"}
          flexDir={["column", "column", "column", "row", "row", "row"]}
        >
          <Sidebar />
          <MainInfo />
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
