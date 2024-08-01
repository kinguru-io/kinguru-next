import { TicketIntentStatus, type User } from "@prisma/client";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { sendBookingEmail } from "@/lib/actions/booking/email";
import type { StripeMetadataExtended } from "@/lib/shared/stripe";
import prisma from "@/server/prisma.ts";
import type { BookingEmailProps } from "~/emails";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY!;
const stripe = new Stripe(webhookSecret, {
  apiVersion: "2024-06-20",
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

async function premiseSlotsBookingSucceededCb(
  paymentIntentId: string,
  meta?: Partial<StripeMetadataExtended>,
) {
  await prisma.premiseSlot.updateMany({
    where: { paymentIntentId },
    data: { status: TicketIntentStatus.succeed },
  });

  const slotInfo = await prisma.premiseSlot.findMany({
    where: { paymentIntentId },
    include: { user: { select: { id: true, email: true } } },
  });

  const firstSlot = slotInfo.at(0);

  if (!firstSlot) return null;

  const companyUser = await prisma.organization.findUnique({
    where: { id: firstSlot.organizationId },
    include: { owner: { select: { email: true } } },
  });
  const locale = meta?.user_paid_locale || "en";
  const name = meta?.premise_name || "";
  const mailInfo = { locale, name, slotInfo } satisfies BookingEmailProps;

  await Promise.all([
    sendBookingEmail({ email: companyUser?.owner.email || "", ...mailInfo }),
    sendBookingEmail({ email: firstSlot.user.email, ...mailInfo }),
  ]);

  return firstSlot.user.id;
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
  (
    paymentIntentId: string,
    meta?: Partial<StripeMetadataExtended>,
  ) => Promise<User["id"] | null>
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
        const { source, user_paid_locale } = event.data.object
          .metadata as StripeMetadataExtended;
        const callback = paymentSucceededCb[source];

        const userId = await callback(paymentIntentSucceed.id, {
          user_paid_locale,
        });

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
