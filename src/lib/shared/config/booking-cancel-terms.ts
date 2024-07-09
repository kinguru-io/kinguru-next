export type BookingCancelTerm = Exclude<
  keyof IntlMessages["booking_cancel_terms"],
  `${string}_desc`
>;

export const bookingCancelTerms: Array<BookingCancelTerm> = [
  "very_flexible",
  "flexible",
  "default_30",
  "default_90",
];

export const REFUND_TYPES = {
  FULL_REFUND: "FULL_REFUND",
  PARTIAL_REFUND: "PARTIAL_REFUND",
  NO_REFUND: "NO_REFUND",
} as const;

export type RefundType = (typeof REFUND_TYPES)[keyof typeof REFUND_TYPES];
