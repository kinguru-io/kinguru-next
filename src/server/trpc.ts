import * as trpc from "@trpc/server";
import SuperJSON from "superjson";
import type { Context } from "./context";
import { permissions } from "@/server/shield";

export const t = trpc.initTRPC.context<Context>().create({
  transformer: SuperJSON,
});

export const permissionsMiddleware = t.middleware(permissions);
export const publicProcedure = t.procedure.use(permissionsMiddleware);
