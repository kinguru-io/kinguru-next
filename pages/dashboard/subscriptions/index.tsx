import { Flex } from "@chakra-ui/react";
import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { ProfileView, Sidebar } from "@/components/dashboard";
import { FooterSection } from "@/components/footer";
import { Navbar } from "@/components/navbar";
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
      <Navbar />
      <main>
        <ProfileView />
        <Flex
          w={"full"}
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

export async function getServerSideProps(
  ctx: GetStaticPropsContext & { req: NextApiRequest; res: NextApiResponse },
) {
  const helpers = await ssgInit(ctx);
  const { auth } = await redirect(ctx.req, ctx.res);
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
    ...auth(),
  };
}
