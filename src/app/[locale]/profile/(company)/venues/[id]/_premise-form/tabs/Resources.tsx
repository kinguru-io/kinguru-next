import { useTranslations } from "next-intl";
import { PremiseImageSelector } from "../PremiseImageSelector";
import { TabInnerSection } from "@/components/profile/profile-premise";

export default function Resources() {
  const t = useTranslations("profile.premises.add");

  return (
    <TabInnerSection fullWidthContent>
      <h3>{t("fields.photo")}</h3>
      <p className="subheading">{t("fields.photo_tip")}</p>
      <PremiseImageSelector />
    </TabInnerSection>
  );
}
