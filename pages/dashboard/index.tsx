import {
  GetStaticPropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next/types";
import { DashboardSidebar } from "@/components/dashboard";
import { FooterSection } from "@/components/footer";
import { ssgInit } from "@/server/ssg-init.ts";
import { redirect } from "@/utils/redirect.ts";

export default function Home() {
  return (
    <>
      <DashboardSidebar />
      <FooterSection />
    </>
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
