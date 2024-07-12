"use server";

import {
  type PremiseSlot,
  TicketIntentStatus,
  PremiseDiscount,
} from "@prisma/client";
import { addHours, compareAsc, startOfDay } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import Stripe from "stripe";
import { getSession } from "@/auth";
import type { TimeSlotInfoExtended } from "@/components/calendar";
import type { StripeMetadataExtended } from "@/lib/shared/stripe";
import type { ActionResponse } from "@/lib/utils";
import { groupBy } from "@/lib/utils/array";
import { groupAndMergeTimeslots } from "@/lib/utils/premise-booking";
import {
  prepareBookedSlots,
  generateTimeSlots,
} from "@/lib/utils/premise-time-slots";
import {
  getSlotDiscount,
  prepareDiscountRangeMap,
  processOrderTotalDiscounts,
} from "@/lib/utils/price";
import { redirect } from "@/navigation";

type BookTimeSlotsActionData = {
  premiseId: string;
  premiseOrgId: string;
  slots: TimeSlotInfoExtended[];
  paymentIntentId?: PremiseSlot["paymentIntentId"];
  timeZone: string;
  discountsMap: Record<number, number | undefined>;
};

type BlockTimeSlotsActionData = Omit<
  BookTimeSlotsActionData,
  "timeZone" | "discountMap"
>;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function blockPremiseSlotsIntent({
  premiseId,
  slots,
  premiseOrgId,
}: BlockTimeSlotsActionData): ActionResponse<
  { message: string },
  "booking_view"
> {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return redirect("/auth/signin");

  const { isValid, editedSlots } = await validatePaymentIntentData({
    premiseId,
    slots,
  });

  if (!isValid || editedSlots.length === 0) {
    return {
      status: "error",
      messageIntlKey: "action_invalid_data",
      response: null,
    };
  }

  await prisma.premiseSlot.createMany({
    data: slots.map(({ time }) => ({
      userId,
      premiseId,
      organizationId: premiseOrgId,
      paymentIntentId: "",
      amount: 0,
      date: time,
      startTime: time,
      endTime: addHours(time, 1),
      status: TicketIntentStatus.progress,
      type: "blocked_by_admin",
    })),
  });

  return {
    status: "success",
    response: {
      message: "action_slots_blocked",
    },
  };
}

export async function createPremiseSlotsIntent({
  premiseId,
  premiseOrgId,
  slots,
  timeZone,
  discountsMap,
}: BookTimeSlotsActionData): ActionResponse<
  {
    clientSecret: string;
    paymentIntentId: string;
  },
  "booking_view"
> {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return redirect("/auth/signin");

  const { isValid, editedSlots, discounts } = await validatePaymentIntentData({
    premiseId,
    slots,
  });

  if (!isValid || editedSlots.length === 0) {
    return {
      status: "error",
      messageIntlKey: "action_invalid_data",
      response: null,
    };
  }

  const groupedSlots = groupBy(
    Array.from(editedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.time, slotB.time),
    ),
    ({ time }) => formatInTimeZone(time, timeZone, "dd.MM.yyyy"),
  );
  const { totalPrice } = processOrderTotalDiscounts(
    groupedSlots,
    prepareDiscountRangeMap(discounts),
  );

  const { id: paymentIntentId, client_secret: clientSecret } =
    await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100),
      currency: "PLN",
      customer: session?.user?.stripeCustomerId || undefined,
      automatic_payment_methods: { enabled: true },
      metadata: {
        source: "premise-slots-booking",
        user_name: session?.user?.name,
        user_email: session?.user?.email,
      } as StripeMetadataExtended,
    });

  if (!clientSecret) {
    return {
      status: "error",
      messageIntlKey: "action_invalid_data",
      response: null,
    };
  }

  const newSlots = slots.map(({ time, price }) => ({
    premiseId,
    price,
    date: time,
    startTime: time,
    endTime: addHours(time, 1),
    discountAmount: getSlotDiscount(slots, time, discountsMap),
  }));

  await prisma.premiseSlot.createMany({
    data: groupAndMergeTimeslots(newSlots).map(
      ({ startTime, endTime, price, discountAmount }) => ({
        userId,
        premiseId,
        paymentIntentId,
        discountAmount,
        organizationId: premiseOrgId,
        date: startTime,
        amount: Math.round(price * 100),
        startTime: startTime,
        endTime: endTime,
        status: TicketIntentStatus.progress,
      }),
    ),
  });

  return {
    status: "success",
    response: {
      clientSecret,
      paymentIntentId,
    },
  };
}

export async function cancelPremiseSlotsIntent({
  paymentIntentId,
}: Pick<PremiseSlot, "paymentIntentId">): ActionResponse<null, "booking_view"> {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return redirect("/auth/signin");
  if (!paymentIntentId) {
    return {
      status: "error",
      messageIntlKey: "action_invalid_data",
      response: null,
    };
  }

  const { count } = await prisma.premiseSlot.deleteMany({
    where: { paymentIntentId, userId },
  });

  return {
    status: "error",
    messageIntlKey:
      count > 0 ? "action_payment_cancelled" : "action_invalid_data",
    response: null,
  };
}

async function validatePaymentIntentData({
  premiseId,
  slots,
}: Partial<BookTimeSlotsActionData>): Promise<{
  isValid: boolean;
  editedSlots: TimeSlotInfoExtended[];
  discounts: PremiseDiscount[];
}> {
  if (!premiseId || !slots || slots.length === 0) {
    return { isValid: false, editedSlots: [], discounts: [] };
  }

  const premise = await prisma.premise.findUnique({
    where: { id: premiseId },
    include: {
      slots: {
        where: {
          date: { gte: startOfDay(new Date()).toISOString() },
          status: { not: "canceled" },
        },
      },
      discounts: {
        orderBy: {
          duration: "asc",
        },
      },
      openHours: true,
    },
  });

  if (!premise) return { isValid: false, editedSlots: [], discounts: [] };

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
        return { isValid: false, editedSlots: [] };
      }

      const dayTimeInfo = timeSlotsGroup[slot.day];

      // a premise doesn't have open hours for that weekday
      if (!dayTimeInfo) return { isValid: false, editedSlots: [] };

      const slotFound = dayTimeInfo
        .flatMap(({ timeSlots }) => timeSlots)
        .find(({ time }) => {
          return (
            time.getHours() === slot.time.getHours() &&
            time.getMinutes() === slot.time.getMinutes()
          );
        });

      // a premise have such working hours for a given weekday but the doesn't have the slot
      if (!slotFound) return { isValid: false, editedSlots: [] };

      // edited slots are basically same slots as given ones but with the price from the server
      const editedSlot: TimeSlotInfoExtended = {
        ...slot,
        price: slotFound.price,
      };

      aggregations.editedSlots.push(editedSlot);

      return aggregations;
    },
    { isValid: true, editedSlots: [] as TimeSlotInfoExtended[] },
  );

  return { ...result, discounts: premise.discounts };
}

export type BlockPremiseSlotsIntent = typeof blockPremiseSlotsIntent;
export type CreatePremiseSlotsIntent = typeof createPremiseSlotsIntent;
export type CancelPremiseSlotsIntent = typeof cancelPremiseSlotsIntent;
