import { useTranslations } from "next-intl";
import { PremiseImageSelector } from "../premise-image-selector";
import { SubSection } from "@/components/common/cards/sub-section";

export function Resources() {
  const t = useTranslations("profile.premises.add");

  return (
    <SubSection>
      <h2 className="title">{t("fields.photo")}</h2>
      <p className="helper">{t("fields.photo_tip")}</p>
      <PremiseImageSelector />
    </SubSection>
  );
}
