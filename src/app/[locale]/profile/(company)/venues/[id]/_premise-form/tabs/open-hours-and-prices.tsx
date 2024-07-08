import { useTranslations, type RichTranslationValues } from "next-intl";
import { DiscountsSelector } from "../discounts-selector";
import { OpenHoursSelector } from "../open-hours-selector";
import { SubSection } from "@/components/common/cards/sub-section";
import { MapboxSearchBoxResponseProvider } from "@/components/common/maps/MapboxResponseProvider";
import { css } from "~/styled-system/css";

const richTagMap: RichTranslationValues = {
  bold: (chunks) => <b>{chunks}</b>,
};

export function OpenHoursAndPrices({ mapboxId }: { mapboxId: string }) {
  const t = useTranslations("profile.premises.add");

  return (
    <>
      <SubSection>
        <h2 className="title">{t("fields.open_hours")}</h2>
        <p
          className={css({
            whiteSpace: "pre-line",
            fontSize: "px15",
          })}
        >
          {t.rich("fields.open_hours_example", richTagMap)}
        </p>
      </SubSection>
      <div>
        <MapboxSearchBoxResponseProvider mapboxId={mapboxId}>
          <OpenHoursSelector />
        </MapboxSearchBoxResponseProvider>
      </div>
      <DiscountsSelector />
    </>
  );
}
