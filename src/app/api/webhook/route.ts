import { TicketIntentStatus, type User } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import type { StripeMetadataExtended } from "@/lib/shared";
import prisma from "@/server/prisma.ts";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;
const stripe = new Stripe(webhookSecret, {
  apiVersion: "2023-10-16",
  typescript: true,
});

async function eventJoinSucceededCb(id: string) {
  const { eventId, userId } = await prisma.ticketIntent.update({
    where: { id },
    data: { status: TicketIntentStatus.succeed },
  });

  await prisma.usersOnEvent.create({
    data: {
      eventId,
      userId,
    },
  });

  return userId;
}

async function eventJoinFailedCb(id: string) {
  const { userId } = await prisma.ticketIntent.update({
    where: { id },
    data: { status: TicketIntentStatus.failed },
  });

  return userId;
}

async function premiseSlotsBookingSucceededCb(paymentIntentId: string) {
  await prisma.premiseSlot.updateMany({
    where: { paymentIntentId },
    data: { status: TicketIntentStatus.succeed },
  });

  const premiseSlot = await prisma.premiseSlot.findFirst({
    where: { paymentIntentId },
    select: { userId: true },
  });

  return premiseSlot ? premiseSlot.userId : null;
}

async function premiseSlotsBookingFailedCb(paymentIntentId: string) {
  await prisma.premiseSlot.updateMany({
    where: { paymentIntentId },
    data: { status: TicketIntentStatus.failed },
  });

  const premiseSlot = await prisma.premiseSlot.findFirst({
    where: { paymentIntentId },
    select: { userId: true },
  });

  return premiseSlot ? premiseSlot.userId : null;
}

type CallbackMap = Record<
  StripeMetadataExtended["source"],
  (paymentIntentId: string) => Promise<User["id"] | null>
>;

const paymentSucceededCb: CallbackMap = {
  "event-join": eventJoinSucceededCb,
  "premise-slots-booking": premiseSlotsBookingSucceededCb,
};

const paymentFailedCb: CallbackMap = {
  "event-join": eventJoinFailedCb,
  "premise-slots-booking": premiseSlotsBookingFailedCb,
};

async function pushNotification(
  userId: User["id"],
  status: TicketIntentStatus,
) {
  await prisma.purchaseNotification.create({
    data: {
      userId,
      status,
    },
  });
}

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
      case "payment_intent.succeeded": {
        const paymentIntentSucceed = event.data.object;
        const { source } = event.data.object.metadata as StripeMetadataExtended;
        const callback = paymentSucceededCb[source];

        const userId = await callback(paymentIntentSucceed.id);

        if (userId) {
          await pushNotification(userId, TicketIntentStatus.succeed);
        }

        break;
      }
      case "payment_intent.payment_failed": {
        const paymentIntentFailed = event.data.object;
        const { source } = event.data.object.metadata as StripeMetadataExtended;
        const callback = paymentFailedCb[source];

        const userId = await callback(paymentIntentFailed.id);

        if (userId) {
          await pushNotification(userId, TicketIntentStatus.failed);
        }

        break;
      }
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
