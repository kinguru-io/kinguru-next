"use server";

import { type PremiseSlot, TicketIntentStatus } from "@prisma/client";
import { addHours, startOfDay } from "date-fns";
import Stripe from "stripe";
import { getSession } from "@/auth";
import type { TimeSlotInfoExtended } from "@/components/calendar";
import type { StripeMetadataExtended } from "@/lib/shared/stripe";
import { groupBy } from "@/lib/utils/array";
import {
  prepareBookedSlots,
  generateTimeSlots,
} from "@/lib/utils/premise-time-slots";
import { redirect } from "@/navigation";

type BookTimeSlotsActionData = {
  premiseId: string;
  slots: TimeSlotInfoExtended[];
  paymentIntentId?: PremiseSlot["paymentIntentId"];
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function createPremiseSlotsIntent({
  premiseId,
  slots,
}: BookTimeSlotsActionData) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return redirect("/auth/signin");

  const { totalPrice, isValid } = await validatePaymentIntentData({
    premiseId,
    slots,
  });

  if (!isValid) return;

  const { id: paymentIntentId, client_secret: clientSecret } =
    await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "PLN",
      customer: session?.user?.stripeCustomerId || undefined,
      automatic_payment_methods: { enabled: true },
      metadata: { source: "premise-slots-booking" } as StripeMetadataExtended,
    });

  if (!clientSecret) {
    // TODO error
    return;
  }

  await prisma.premiseSlot.createMany({
    data: slots.map(({ time }) => ({
      userId,
      premiseId,
      paymentIntentId,
      date: time,
      startTime: time,
      endTime: addHours(time, 1),
      status: TicketIntentStatus.progress,
    })),
  });

  return { clientSecret, paymentIntentId };
}

export async function cancelPreliminaryBooking({
  paymentIntentId,
}: Pick<PremiseSlot, "paymentIntentId">) {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return redirect("/auth/signin");
  if (!paymentIntentId) return;

  const { count } = await prisma.premiseSlot.deleteMany({
    where: { paymentIntentId },
  });

  return count;
}

async function validatePaymentIntentData({
  premiseId,
  slots,
}: BookTimeSlotsActionData) {
  if (!premiseId || slots.length === 0) {
    return { totalPrice: 0, isValid: false };
  }

  const premise = await prisma.premise.findUnique({
    where: { id: premiseId },
    include: {
      slots: {
        where: {
          date: { gte: startOfDay(new Date()).toISOString() },
        },
      },
      openHours: {
        include: {
          pricing: true,
        },
      },
    },
  });

  if (!premise) return { totalPrice: 0, isValid: false };

  const bookedSlots = prepareBookedSlots(premise.slots);
  const timeSlotsGroup = groupBy(
    premise.openHours.map((record) => generateTimeSlots(record)),
    ({ day }) => day,
  );

  const result = slots.reduce(
    (aggregations, slot) => {
      if (!aggregations.isValid) return aggregations;
      // the slot is booked already or is under payment process
      if (bookedSlots.has(slot.time.toISOString())) {
        return { totalPrice: 0, isValid: false };
      }

      const dayTimeInfo = timeSlotsGroup[slot.day];

      // a premise doesn't have open hours for that weekday
      if (!dayTimeInfo) return { totalPrice: 0, isValid: false };

      const slotFound = dayTimeInfo
        .flatMap(({ timeSlots }) => timeSlots)
        .find(({ time }) => {
          return (
            time.getHours() === slot.time.getHours() &&
            time.getMinutes() === slot.time.getMinutes()
          );
        });

      // a premise have such working hours for a given weekday but the doesn't have the slot
      if (!slotFound) return { totalPrice: 0, isValid: false };

      aggregations.totalPrice += slotFound.price;

      return aggregations;
    },
    { totalPrice: 0, isValid: true },
  );

  return result;
}

export type CreatePremiseSlotsIntent = typeof createPremiseSlotsIntent;
export type CancelPreliminaryBooking = typeof cancelPreliminaryBooking;
