import * as trpc from "@trpc/server";
import SuperJSON from "superjson";
import type { Context } from "./context";

export const t = trpc.initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const publicProcedure = t.procedure;
