import { publicProcedure, t } from "../trpc";
import { eventRouter } from "@/server/routers/event";
import { userRouter } from "@/server/routers/user";

export const appRouter = t.router({
  event: eventRouter,
  user: userRouter,
  i18n: publicProcedure.query(({ ctx }) => ({
    i18n: ctx.i18n,
    locale: ctx.locale,
  })),
});
