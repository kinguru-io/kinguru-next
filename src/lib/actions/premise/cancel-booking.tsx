"use server";

import { TicketIntentStatus } from "@prisma/client";
import { differenceInHours, differenceInDays } from "date-fns";
import { getTranslations } from "next-intl/server";
import Stripe from "stripe";
import { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import { isUserOrganization } from "@/lib/utils/premise-booking";

export interface CancelBookingActionProps {
  bookingStartTime: Date;
  bookingCancelTerm: BookingCancelTerm;
  premiseSlotIds: string[];
  premiseAmount: number;
  paymentIntentId: string;
  discountAmount: number;
  isActive: boolean;
  type?: "tag";
  bookingStatus?: TicketIntentStatus;
}

type ProcessRefundProps = Omit<
  CancelBookingActionProps,
  "premiseSlotIds" | "isActive"
> & {
  cancellationDate: Date;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

function calculateAmountPaid(
  premiseAmount: number,
  discountAmount: number,
): number {
  const discount = discountAmount / 100;
  const amountPaid = (premiseAmount / 100) * (1 - discount);
  return Math.round(amountPaid);
}

async function processRefund({
  bookingStartTime,
  bookingCancelTerm,
  paymentIntentId,
  premiseAmount,
  cancellationDate,
  discountAmount,
}: ProcessRefundProps) {
  const amountPaid = calculateAmountPaid(premiseAmount, discountAmount);

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

const cancelPremiseSlots = async (
  paymentIntentId: string,
  discountAmount: number,
  bookingDate: Date,
  premiseSlotIds: string[],
) => {
  const { start, end } = getDayRange(bookingDate);

  if (discountAmount > 0) {
    await prisma.premiseSlot.updateMany({
      where: {
        paymentIntentId,
        discountAmount,
        date: {
          gte: start,
          lte: end,
        },
      },
      data: {
        status: TicketIntentStatus.canceled,
      },
    });
  } else {
    await cancelCompaniesPremiseSlots(premiseSlotIds);
  }
};

const cancelCompaniesPremiseSlots = async (premiseSlotIds: string[]) => {
  await prisma.premiseSlot.updateMany({
    where: {
      id: {
        in: premiseSlotIds,
      },
    },
    data: {
      status: TicketIntentStatus.canceled,
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
  const t = await getTranslations("profile.my_bookings");

  const isUserOrg = await isUserOrganization();

  if (isUserOrg && !paymentIntentId) {
    try {
      // ONLY for premise owners, No paymentIntentId means no payment was made
      await deleteCompaniesPremiseSlots(premiseSlotIds);

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

    if (isUserOrg) {
      await deletePremiseSlots(
        paymentIntentId,
        discountAmount,
        bookingStartTime,
        premiseSlotIds,
      );
    } else {
      await cancelPremiseSlots(
        paymentIntentId,
        discountAmount,
        bookingStartTime,
        premiseSlotIds,
      );
    }

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
