import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/server/prisma.ts";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;
const stripe = new Stripe(webhookSecret, {
  apiVersion: "2023-10-16",
  typescript: true,
});

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = headers().get("stripe-signature");
  if (!sig) {
    return NextResponse.json(
      {
        error: "Invalid signature",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceed = event.data.object;
        const { eventId, userId } = await prisma.ticketIntent.update({
          where: {
            id: paymentIntentSucceed.id,
          },
          data: {
            status: "succeed",
          },
        });

        await prisma.purchaseNotification.create({
          data: {
            userId,
            status: "succeed",
          },
        });

        await prisma.usersOnEvent.create({
          data: {
            eventId,
            userId,
          },
        });
        break;
      case "payment_intent.payment_failed":
        const paymentIntentFailed = event.data.object;
        const { userId: ticketIntentUserId } = await prisma.ticketIntent.update(
          {
            where: {
              id: paymentIntentFailed.id,
            },
            data: {
              status: "failed",
            },
          },
        );

        await prisma.purchaseNotification.create({
          data: {
            userId: ticketIntentUserId,
            status: "failed",
          },
        });
        break;
    }
  } catch (err) {
    return NextResponse.json(
      {
        error: `Webhook Error: ${JSON.stringify(err)}`,
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ ok: true });
}
