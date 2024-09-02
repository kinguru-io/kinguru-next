export type StripeMetadataExtended = {
  source: "event-join" | "premise-slots-booking";
  user_name?: string;
  user_email?: string;
  user_paid_locale?: string;
  user_comment?: string;
  premise_name?: string;
  user_donation?: number | string;
};
