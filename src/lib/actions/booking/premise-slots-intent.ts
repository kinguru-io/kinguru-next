"use server";

import {
  type PremiseSlot,
  TicketIntentStatus,
  BookingType,
} from "@prisma/client";
import { addHours, compareAsc } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { getLocale, getTranslations } from "next-intl/server";
import type Stripe from "stripe";
import { v4 as uuid } from "uuid";
import { sendBookingEmail } from "./email";
import { validatePaymentIntentData } from "./validate-payment-intent-data";
import { getSession } from "@/auth";
import type { TimeSlotInfoExtended } from "@/components/calendar";
import { getStripe, type StripeMetadataExtended } from "@/lib/shared/stripe";
import type { ActionResponse } from "@/lib/utils";
import { groupBy } from "@/lib/utils/array";
import { groupAndMergeTimeslots } from "@/lib/utils/premise-booking";

import {
  getSlotDiscount,
  prepareDiscountRangeMap,
  processOrderTotalDiscounts,
} from "@/lib/utils/price";
import { redirect } from "@/navigation";
import type { BookingEmailProps } from "~/emails";

type BookTimeSlotsActionData = {
  premiseId: string;
  premiseOrgId: string;
  slots: TimeSlotInfoExtended[];
  paymentIntentId?: PremiseSlot["paymentIntentId"];
  comment: string;
  donationAmount?: string;
  discountsMap: Record<number, number | undefined>;
};

type BlockTimeSlotsActionData = Omit<
  BookTimeSlotsActionData,
  "timeZone" | "discountMap" | "comment" | "donationAmount"
>;

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
  discountsMap,
  comment,
  donationAmount,
}: BookTimeSlotsActionData): ActionResponse<
  {
    clientSecret: string | null;
    paymentIntentId: string;
    amountToBeCharged: number;
  },
  "booking_view"
> {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) return redirect("/auth/signin");
  if (!session.user?.confirmed) return redirect("/verify");

  const validationResult = await validatePaymentIntentData({
    premiseId,
    slots,
  });

  if (!validationResult.isValid || validationResult.editedSlots.length === 0) {
    return {
      status: "error",
      messageIntlKey: "action_invalid_data",
      response: null,
    };
  }

  const { discounts, editedSlots, premiseMeta } = validationResult;
  const locale = await getLocale();
  const groupedSlots = groupBy(
    Array.from(editedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.time, slotB.time),
    ),
    ({ time }) => formatInTimeZone(time, "UTC", "dd.MM.yyyy"),
  );
  const { totalPrice } = processOrderTotalDiscounts(
    groupedSlots,
    prepareDiscountRangeMap(discounts),
  );

  const getPaymentIntent = ({
    donation,
    stripe,
  }: {
    donation: number;
    stripe: Stripe;
  }) => {
    const amount = Math.round((totalPrice + donation) * 100);

    const metadata: StripeMetadataExtended = {
      source: "premise-slots-booking",
      user_name: session?.user?.name || "not_provided",
      user_email: session?.user?.email || "not_provided",
      user_paid_locale: locale,
      user_comment: comment,
      premise_name: premiseMeta.name,
    };

    if (donation > 0) {
      metadata.user_donation = donation;
    }

    return stripe.paymentIntents.create({
      amount,
      currency: "PLN",
      customer: session?.user?.stripeCustomerId || undefined,
      automatic_payment_methods: { enabled: true },
      metadata,
    });
  };

  // skip stripe payment if total price is 0
  const donation = Math.abs(parseFloat(donationAmount || "0"));
  const paymentIntentData =
    totalPrice > 0
      ? await getPaymentIntent({ donation, stripe: getStripe() })
      : { id: `free-${uuid()}`, client_secret: null, amount: 0 };

  const {
    id: paymentIntentId,
    client_secret: clientSecret,
    amount,
  } = paymentIntentData;

  if (!clientSecret && totalPrice > 0) {
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

  const mergedSlotsUpdateInput = groupAndMergeTimeslots(newSlots).map(
    ({ startTime, endTime, price, discountAmount }) => ({
      type: premiseMeta.withConfirmation
        ? BookingType.needs_confirmation
        : BookingType.via_website,
      userId,
      premiseId,
      paymentIntentId,
      discountAmount,
      organizationId: premiseOrgId,
      date: startTime,
      amount: Math.round(price * 100),
      startTime: startTime,
      endTime: endTime,
      status:
        totalPrice > 0 || premiseMeta.withConfirmation
          ? TicketIntentStatus.progress
          : TicketIntentStatus.succeed,
      comment,
    }),
  );

  const requests = [];
  requests.push(
    prisma.premiseSlot.createMany({ data: mergedSlotsUpdateInput }),
  );

  // send mails right after booking of free slots
  // or if the booking should be reviewed
  if (totalPrice === 0 || premiseMeta.withConfirmation) {
    const mailInfo: BookingEmailProps = {
      name: premiseMeta.name,
      locale,
      slotInfo: mergedSlotsUpdateInput,
      comment,
      donation,
      withConfirmation: !!premiseMeta.withConfirmation,
      t: await getTranslations("emails"),
    };

    requests.push(
      sendBookingEmail({
        email: session?.user?.email || "",
        ...mailInfo,
      }),
    );

    const companyUser = await prisma.organization.findUnique({
      where: { id: premiseOrgId },
      include: { owner: { select: { email: true } } },
    });

    if (companyUser) {
      requests.push(
        sendBookingEmail({
          email: companyUser.owner.email,
          isCompany: true,
          ...mailInfo,
        }),
      );
    }
  }

  await Promise.all(requests);

  return {
    status: "success",
    response: {
      clientSecret: premiseMeta.withConfirmation
        ? "not_approved"
        : clientSecret,
      paymentIntentId,
      amountToBeCharged: amount / 100,
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

export type BlockPremiseSlotsIntent = typeof blockPremiseSlotsIntent;
export type CreatePremiseSlotsIntent = typeof createPremiseSlotsIntent;
export type CancelPremiseSlotsIntent = typeof cancelPremiseSlotsIntent;
