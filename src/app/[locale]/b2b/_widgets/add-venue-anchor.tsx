import { useTranslations } from "next-intl";
import { button } from "~/styled-system/recipes";

export function AddVenueAnchor({ id }: { id: string }) {
  const t = useTranslations("navbar");

  return (
    <a
      href={`#${id}`}
      className={button({ colorPalette: "primary", centered: true })}
    >
      {t("add_venue")}
    </a>
  );
}
