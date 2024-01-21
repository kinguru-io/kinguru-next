import moment from "moment";
import { publicProcedure, t } from "../trpc";

export const notificationRouter = t.router({
  all: publicProcedure.query(async ({ ctx }) => {
    const purchaseNotifications = ctx.prisma.purchaseNotification.findMany({
      where: {
        userId: ctx.session!.user!.id,
      },
    });

    const moderationNotifications = ctx.prisma.moderationNotification.findMany({
      where: {
        userId: ctx.session!.user!.id,
      },
    });

    return Promise.all([purchaseNotifications, moderationNotifications]).then(
      (notifications) =>
        notifications.flat(2).sort((a, b) => {
          if (moment(a.updatedAt).isBefore(moment(b.updatedAt))) return 1;
          if (moment(a.updatedAt).isAfter(moment(b.updatedAt))) return -1;
          return 0;
        }),
    );
  }),
});
