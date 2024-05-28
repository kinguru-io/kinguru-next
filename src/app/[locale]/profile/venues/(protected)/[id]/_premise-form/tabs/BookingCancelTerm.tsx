import { useTranslations } from "next-intl";
import React from "react";
import { BookingCancelTermsRadioGroup } from "../BookingCancelTermsRadioGroup";
import { TabInnerSection } from "@/components/profile/profile-premise";

export default function BookingCancelTerm() {
  const t = useTranslations("profile.premises.add");

  return (
    <TabInnerSection>
      <h3>{t("fields.booking_cancel_terms")}</h3>
      <p className="subheading">{t("fields.booking_cancel_terms_tip")}</p>
      <BookingCancelTermsRadioGroup />
    </TabInnerSection>
  );
}
