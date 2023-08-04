import { publicProcedure, t } from "../trpc";

export const userRouter = t.router({
  whoAmI: publicProcedure.query(({ ctx }) => {
    if (!ctx.session?.user || !ctx.session?.user.email) {
      return null;
    }
    return ctx.prisma.user.findUnique({
      where: {
        email: ctx.session?.user.email,
      },
    });
  }),
});
