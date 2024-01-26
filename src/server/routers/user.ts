import { publicProcedure, t } from "../trpc";
import { calculateCompleteness } from "@/utils/profileCompleteness.ts";

export const userRouter = t.router({
  whoAmI: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user?.id) {
      return null;
    }
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  profileCompleteness: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session?.user?.id) {
      return null;
    }
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });

    if (!user) return 0;

    return calculateCompleteness(user);
  }),
});
