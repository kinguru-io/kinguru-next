import { publicProcedure, t } from "../trpc";

export const speakerRouter = t.router({
  bestSpeakers: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.speaker.findMany({
      take: 3,
      include: {
        user: true,
      },
    });
  }),
});
