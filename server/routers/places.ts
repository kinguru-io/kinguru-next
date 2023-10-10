import { z } from "zod";
import { publicProcedure, t } from "../trpc";

export const placesRouter = t.router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.place.findMany({
      include: {
        resources: true,
      },
    });
  }),
  get: publicProcedure
    .input(
      z.object({
        placeId: z.string(),
      }),
    )
    .query(({ ctx, input: { placeId } }) => {
      return ctx.prisma.place.findUnique({
        where: {
          id: placeId,
        },
        include: {
          resources: true,
        },
      });
    }),
});
