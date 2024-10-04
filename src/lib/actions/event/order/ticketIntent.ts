"use server";

import Stripe from "stripe";
import { getSession } from "@/auth";
import type { StripeMetadataExtended } from "@/lib/shared/stripe";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-09-30.acacia",
});

export async function getTicketIntentAction(eventId: string) {
  const session = await getSession();
  const userId = session?.user?.id;
  if (!userId) {
    return redirect(`/auth/signin`);
  }

  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event || !event.price) {
    throw new Error("BAD_REQUEST");
  }

  const { id, client_secret: clientSecret } =
    await stripe.paymentIntents.create({
      amount: Math.round(event.price * 100),
      currency: "PLN",
      customer: session.user?.stripeCustomerId || undefined,
      automatic_payment_methods: { enabled: true },
      metadata: { source: "event-join" } as StripeMetadataExtended,
    });

  if (!clientSecret) {
    throw new Error("INTERNAL_SERVER_ERROR");
  }

  await prisma.ticketIntent.create({
    data: {
      id,
      eventId,
      userId,
      status: "progress",
    },
  });

  return { clientSecret, id };
}

export type GetTicketIntentAction = typeof getTicketIntentAction;
