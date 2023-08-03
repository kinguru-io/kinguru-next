import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { z } from "zod";
import { Context } from "@/server/context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const appRouter = t.router({
  aggregateUser: t.procedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.prisma.user.aggregate({
        where: {
          name: input.name,
        },
        _count: true,
      });
    }),
});

export type AppRouter = typeof appRouter;
