"use server";

import { differenceInHours, differenceInDays } from "date-fns";
import { p } from "msw/lib/core/GraphQLHandler-COiPfZ8k";
import { getTranslations } from "next-intl/server";
import Stripe from "stripe";
import { getSession } from "@/auth";
import { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";

export interface CancelBookingActionProps {
  bookingStartTime: Date;
  bookingCancelTerm: BookingCancelTerm;
  premiseSlotIds: string[];
  premiseAmount: number;
  paymentIntentId: string;
  discountAmount: number;
  isActive: boolean;
}

type ProcessRefundProps = Omit<CancelBookingActionProps, "premiseSlotIds"> & {
  cancellationDate: Date;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
});

function subtractPercentage(amount: number, percentage: number): number {
  const deduction = (amount * percentage) / 100;
  return amount - deduction;
}

async function processRefund({
  bookingStartTime,
  bookingCancelTerm,
  paymentIntentId,
  premiseAmount,
  cancellationDate,
  discountAmount,
}: ProcessRefundProps) {
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const amountPaid = premiseAmount / 100; // Convert from cents to dollars

  const hoursUntilEvent = differenceInHours(bookingStartTime, cancellationDate);
  const daysUntilEvent = differenceInDays(bookingStartTime, cancellationDate);

  const refundAmount = calculateRefundAmount({
    amountPaid,
    hoursUntilEvent,
    daysUntilEvent,
    bookingCancelTerm,
  });

  if (refundAmount > 0) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: Math.round(refundAmount * 100), // Convert to cents
      });
      console.log("Refund successful:", refund);
    } catch (error) {
      console.error("Error processing refund:", error);
    }
  } else {
    console.log("No refund applicable based on cancellation policy");
  }
}

function calculateRefundAmount({
  amountPaid,
  hoursUntilEvent,
  daysUntilEvent,
  bookingCancelTerm,
}: {
  amountPaid: number;
  hoursUntilEvent: number;
  daysUntilEvent: number;
  bookingCancelTerm: BookingCancelTerm;
}): number {
  switch (bookingCancelTerm) {
    case "very_flexible":
      return hoursUntilEvent >= 24 ? amountPaid : 0;
    case "flexible":
      if (daysUntilEvent >= 7) return amountPaid;
      if (daysUntilEvent >= 1 && hoursUntilEvent >= 24) return amountPaid / 2;
      return 0;
    case "default_30":
      if (daysUntilEvent >= 30) return amountPaid;
      if (daysUntilEvent >= 7) return amountPaid / 2;
      return 0;
    case "default_90":
      if (daysUntilEvent >= 90) return amountPaid;
      if (daysUntilEvent >= 14) return amountPaid / 2;
      return 0;
    default:
      throw new Error("Invalid cancellation policy");
  }
}

function getDayRange(date: Date) {
  const start = new Date(date);
  start.setUTCHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setUTCHours(23, 59, 59, 999);

  return { start, end };
}

const deletePremiseSlots = async (
  paymentIntentId: string,
  discountAmount: number,
  bookingDate: Date,
  premiseSlotIds: string[],
) => {
  const { start, end } = getDayRange(bookingDate);

  if (discountAmount > 0) {
    await prisma.premiseSlot.deleteMany({
      where: {
        paymentIntentId,
        discountAmount,
        date: {
          gte: start,
          lte: end,
        },
      },
    });
  } else {
    await deleteCompaniesPremiseSlots(premiseSlotIds);
  }
};

const deleteCompaniesPremiseSlots = async (premiseSlotIds: string[]) => {
  await prisma.premiseSlot.deleteMany({
    where: {
      id: {
        in: premiseSlotIds,
      },
    },
  });
};

export async function cancelBookingAction({
  bookingStartTime,
  bookingCancelTerm,
  premiseSlotIds,
  premiseAmount,
  paymentIntentId,
  discountAmount,
}: CancelBookingActionProps) {
  const session = await getSession();
  const t = await getTranslations("user.my_bookings");

  if (!session?.user?.email) {
    return {
      status: "error",
      message: "Not authorized",
    };
  }

  const organization = session.user.organizations?.[0];

  if (session.user.role !== "organization" || !organization) {
    return {
      status: "error",
      message: "Not an organization",
    };
  }

  if (!paymentIntentId) {
    // ONLY for premise owners, No paymentIntentId means no payment was made
    await deleteCompaniesPremiseSlots(premiseSlotIds);

    return {
      status: "success",
      message: t("booking_canceled_successfully"),
    };
  }

  const cancellationDate = new Date();

  try {
    await processRefund({
      bookingStartTime,
      bookingCancelTerm,
      paymentIntentId,
      premiseAmount,
      cancellationDate,
      discountAmount,
    });

    await deletePremiseSlots(
      paymentIntentId,
      discountAmount,
      bookingStartTime,
      premiseSlotIds,
    );

    return {
      status: "success",
      message: t("booking_canceled_successfully"),
    };
  } catch (error) {
    console.error("Error in cancelBookingAction:", error);
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export type CancelBookingAction = typeof cancelBookingAction;
