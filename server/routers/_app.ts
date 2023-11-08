import { publicProcedure, t } from "../trpc";
import { eventRouter } from "@/server/routers/event";
import { paymentRouter } from "@/server/routers/payment.ts";
import { placesRouter } from "@/server/routers/places.ts";
import { speakerRouter } from "@/server/routers/speaker";
import { statisticsRouter } from "@/server/routers/statistics.ts";
import { userRouter } from "@/server/routers/user";

export const appRouter = t.router({
  event: eventRouter,
  payment: paymentRouter,
  places: placesRouter,
  speaker: speakerRouter,
  statistics: statisticsRouter,
  user: userRouter,
  i18n: publicProcedure.query(({ ctx }) => ({
    i18n: ctx.i18n,
    locale: ctx.locale,
  })),
});
