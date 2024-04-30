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
