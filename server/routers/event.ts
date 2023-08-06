import { z } from "zod";
import { publicProcedure, t } from "../trpc";

export const eventRouter = t.router({
  upcoming: publicProcedure
    .input(
      z
        .object({
          limit: z.number().gt(0),
        })
        .default({ limit: 3 }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findMany({
        where: {
          starts: {
            gt: new Date(),
          },
          status: "active",
        },
        orderBy: {
          starts: "asc",
        },
        include: {
          place: true,
        },
        take: input.limit,
      });
    }),
  recent: publicProcedure
    .input(
      z
        .object({
          limit: z.number().gt(0),
        })
        .default({ limit: 3 }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findMany({
        where: {
          starts: {
            lt: new Date(),
          },
          status: "active",
        },
        orderBy: {
          starts: "desc",
        },
        include: {
          place: true,
        },
        take: input.limit,
      });
    }),
});
