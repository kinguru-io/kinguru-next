import { useTranslations } from "next-intl";
import { PremiseImageSelector } from "../premise-image-selector";
import { SubSection } from "@/components/common/cards/sub-section";
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  maxFileSizeMB,
} from "@/lib/actions/file-upload";
import { css } from "~/styled-system/css";

export function Resources() {
  const t = useTranslations("profile.premises.add");

  return (
    <SubSection>
      <h2 className="title">{t("fields.photo")}</h2>
      <p className="helper">{t("fields.photo_tip")}</p>
      <PremiseImageSelector />
      <ul
        className={css({
          fontSize: "px15",
          color: "secondary",
          display: "flex",
          flexDirection: "column",
          gap: "1",
        })}
      >
        <li>{t("fields.photo_gallery_tip_1")}</li>
        <li>{t("fields.photo_gallery_tip_2", { size: maxFileSizeMB })}</li>
        <li>
          {t("fields.photo_gallery_tip_3", {
            extensions: ACCEPTED_IMAGE_MIME_TYPES.map((ext) =>
              ext.replace("image/", ""),
            ).join(", "),
          })}
        </li>
      </ul>
    </SubSection>
  );
}
