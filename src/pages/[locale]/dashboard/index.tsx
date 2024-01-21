import { Flex } from "@chakra-ui/react";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { ProfileView, Sidebar } from "@/components/dashboard";
import { MainInfo } from "@/components/dashboard/main";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";
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
      <Navbar />
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
      <FooterSection />
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
