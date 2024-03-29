import { t } from "../trpc";
import { eventRouter } from "@/server/routers/event";
import { notificationRouter } from "@/server/routers/notification.ts";
import { paymentRouter } from "@/server/routers/payment.ts";
import { placesRouter } from "@/server/routers/places.ts";
import { speakerRouter } from "@/server/routers/speaker";
import { statisticsRouter } from "@/server/routers/statistics.ts";
import { userRouter } from "@/server/routers/user";

export const appRouter = t.router({
  event: eventRouter,
  notification: notificationRouter,
  payment: paymentRouter,
  places: placesRouter,
  speaker: speakerRouter,
  statistics: statisticsRouter,
  user: userRouter,
});
