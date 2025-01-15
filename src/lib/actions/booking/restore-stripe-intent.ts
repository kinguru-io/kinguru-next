"use server";

import { getStripe } from "@/lib/shared/stripe";

export async function restoreStripeIntent(id: string) {
  const stripe = getStripe();

  const intent = await stripe.paymentIntents.retrieve(id).catch(() => null);

  return intent
    ? { clientSecret: intent.client_secret || "", amount: intent.amount }
    : null;
}
