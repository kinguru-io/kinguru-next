import { z } from "zod";
import { publicProcedure, t } from "../trpc";

export const statisticsRouter = t.router({
  lastEvents: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1),
        })
        .default({
          limit: 5,
        }),
    )
    .query(({ ctx, input: { limit } }) => {
      return ctx.prisma.event.findMany({
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          topic: true,
          poster: true,
        },
      });
    }),
  lastSpeakers: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1),
        })
        .default({
          limit: 5,
        }),
    )
    .query(({ ctx, input: { limit } }) => {
      return ctx.prisma.speaker.findMany({
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      });
    }),
  lastEstablishments: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1),
        })
        .default({
          limit: 5,
        }),
    )
    .query(({ ctx, input: { limit } }) => {
      return ctx.prisma.place.findMany({
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          resources: {
            take: 1,
            orderBy: {
              createdAt: "asc",
            },
            select: {
              url: true,
            },
          },
        },
      });
    }),
});
