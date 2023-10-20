import { publicProcedure, t } from "../trpc";

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
});
