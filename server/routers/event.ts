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
          initiator: true,
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
          initiator: true,
        },
        take: input.limit,
      });
    }),
  all: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input: { cursor, limit } }) => {
      const items = await ctx.prisma.event.findMany({
        skip: cursor ? 1 : 0,
        take: limit,
        cursor: cursor
          ? {
              id: cursor,
            }
          : undefined,
      });

      return {
        items,
        nextCursor: items.length > 0 ? items[items.length - 1].id : undefined,
      };
    }),
});
