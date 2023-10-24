import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";
import { publicProcedure, t } from "../trpc";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export const paymentRouter = t.router({
  ticketIntent: publicProcedure
    .input(
      z.object({
        eventId: z.string().cuid(),
      }),
    )
    .mutation(async ({ ctx, input: { eventId } }) => {
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (!event || !event.price) {
        throw new TRPCError({ code: "BAD_REQUEST" });
      }

      const { id, client_secret: clientSecret } =
        await stripe.paymentIntents.create({
          amount: Math.round(event.price * 100),
          currency: "PLN",
          customer: ctx.session?.user?.stripeCustomerId || undefined,
          automatic_payment_methods: { enabled: true },
        });

      if (!clientSecret) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      await ctx.prisma.ticketIntent.create({
        data: {
          id,
          eventId,
          userId: ctx.session!.user!.id,
          status: "progress",
        },
      });

      return { clientSecret, id };
    }),
});
