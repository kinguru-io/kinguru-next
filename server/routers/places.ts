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
  createPlace: publicProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(({ ctx, input: { name } }) => {
      return ctx.prisma.place.create({
        data: {
          name,
          ownerId: ctx.session!.user!.id,
          location: "123",
          coordsLat: 0,
          coordsLng: 0,
        },
      });
    }),
});
