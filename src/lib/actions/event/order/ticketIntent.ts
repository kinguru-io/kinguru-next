"use server";

import { getSession } from "@/auth";
import { getStripe, type StripeMetadataExtended } from "@/lib/shared/stripe";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

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

  const stripe = getStripe();

  const { id, client_secret: clientSecret } =
    await stripe.paymentIntents.create({
      amount: Math.round(event.price * 100),
      currency: "PLN",
      customer: session.user?.stripeCustomerId || undefined,

      automatic_payment_methods: { enabled: true },
      metadata: {
        source: "event-join",
      } as StripeMetadataExtended,
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
