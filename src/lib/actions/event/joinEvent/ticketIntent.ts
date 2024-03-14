"use server";

import Stripe from "stripe";
import { getSession } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function getTicketIntent(eventId: string) {
  const session = await getSession();

  if (!session || !session.user?.id) {
    throw new Error("BAD_REQUEST");
  }

  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
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
    });

  if (!clientSecret) {
    throw new Error("INTERNAL_SERVER_ERROR");
  }

  await prisma.ticketIntent.create({
    data: {
      id,
      eventId,
      userId: session.user?.id,
      status: "progress",
    },
  });

  return { clientSecret, id };
}
