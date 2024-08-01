export type StripeMetadataExtended = {
  source: "event-join" | "premise-slots-booking";
  user_name?: string;
  user_email?: string;
  user_paid_locale?: string;
  premise_name?: string;
};
