import { useTranslations } from "next-intl";
import { BookingCancelTermsRadioGroup } from "../booking-cancel-terms-radio-group";
import { SubSection } from "@/components/common/cards/sub-section";

export function BookingCancelTerm() {
  const t = useTranslations("profile.premises.add");

  return (
    <SubSection>
      <h2 className="title">{t("fields.booking_cancel_terms")}</h2>
      <p className="helper">{t("fields.booking_cancel_terms_tip")}</p>
      <BookingCancelTermsRadioGroup />
    </SubSection>
  );
}
