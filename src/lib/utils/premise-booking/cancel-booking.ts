import { subDays } from "date-fns";
import { useTranslations } from "next-intl";
import {
  BookingCancelTerm,
  REFUND_TYPES,
  RefundType,
} from "@/lib/shared/config/booking-cancel-terms";

export const getActiveCancelTerm = (
  bookingCancelTerm: BookingCancelTerm,
  daysUntilEvent: number,
  hoursUntilEvent: number,
): RefundType => {
  switch (bookingCancelTerm) {
    case "very_flexible":
      return hoursUntilEvent >= 24
        ? REFUND_TYPES.FULL_REFUND
        : REFUND_TYPES.NO_REFUND;
    case "flexible":
      if (daysUntilEvent >= 7) return REFUND_TYPES.FULL_REFUND;
      if (daysUntilEvent >= 1 && hoursUntilEvent >= 24)
        return REFUND_TYPES.PARTIAL_REFUND;
      return REFUND_TYPES.NO_REFUND;
    case "default_30":
      if (daysUntilEvent >= 30) return REFUND_TYPES.FULL_REFUND;
      if (daysUntilEvent >= 7) return REFUND_TYPES.PARTIAL_REFUND;
      return REFUND_TYPES.NO_REFUND;
    case "default_90":
      if (daysUntilEvent >= 90) return REFUND_TYPES.FULL_REFUND;
      if (daysUntilEvent >= 14) return REFUND_TYPES.PARTIAL_REFUND;
      return REFUND_TYPES.NO_REFUND;
    default:
      throw new Error("Invalid cancellation policy");
  }
};

const cancellationOffsets: Record<
  BookingCancelTerm,
  Record<Exclude<RefundType, "FREE_SLOT">, number>
> = {
  very_flexible: {
    [REFUND_TYPES.FULL_REFUND]: 1,
    [REFUND_TYPES.PARTIAL_REFUND]: 0,
    [REFUND_TYPES.NO_REFUND]: 1,
  },
  flexible: {
    [REFUND_TYPES.FULL_REFUND]: 7,
    [REFUND_TYPES.PARTIAL_REFUND]: 1,
    [REFUND_TYPES.NO_REFUND]: 1,
  },
  default_30: {
    [REFUND_TYPES.FULL_REFUND]: 30,
    [REFUND_TYPES.PARTIAL_REFUND]: 7,
    [REFUND_TYPES.NO_REFUND]: 7,
  },
  default_90: {
    [REFUND_TYPES.FULL_REFUND]: 90,
    [REFUND_TYPES.PARTIAL_REFUND]: 14,
    [REFUND_TYPES.NO_REFUND]: 14,
  },
};

export const getCancellationDate = (
  bookingCancelTerm: BookingCancelTerm,
  refundType: RefundType,
  startTimeDate: Date,
) => {
  const t = useTranslations("profile.my_bookings");

  if (refundType === "FREE_SLOT") {
    return null;
  }

  const offset = cancellationOffsets[bookingCancelTerm][refundType];
  const cancellationDate = subDays(startTimeDate, offset);
  const dateLabel =
    refundType === REFUND_TYPES.NO_REFUND ? t("after") : t("before");

  return { cancellationDate, dateLabel };
};
