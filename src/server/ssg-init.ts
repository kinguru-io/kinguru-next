import { createServerSideHelpers } from "@trpc/react-query/server";
import SuperJSON from "superjson";
import { createInnerTRPCContext } from "./context";
import { appRouter } from "./routers/_app";

export async function ssgInit() {
  return createServerSideHelpers<typeof appRouter>({
    router: appRouter,
    ctx: await createInnerTRPCContext({
      session: null,
    }),
    transformer: SuperJSON,
  });
}
