import { useTranslations } from "next-intl";
import { DiscountsSelector } from "../DiscountsSelector";
import { OpenHoursSelector } from "../OpenHoursSelector";
import { MapboxSearchBoxResponseProvider } from "@/components/common/maps/MapboxResponseProvider";
import { TabInnerSection } from "@/components/profile/profile-premise";
import { css } from "~/styled-system/css";

export default function OpenHoursAndPrices({ mapboxId }: { mapboxId: string }) {
  const t = useTranslations("profile.premises.add");

  return (
    <>
      <TabInnerSection>
        <h3>{t("fields.open_hours")}</h3>
        <p
          className={css({
            whiteSpace: "pre-line",
            "& > b": { fontSize: "18px" },
          })}
        >
          {t.rich("fields.open_hours_example", {
            bold: (chunks) => <b>{chunks}</b>,
          })}
        </p>
      </TabInnerSection>
      <MapboxSearchBoxResponseProvider mapboxId={mapboxId}>
        <OpenHoursSelector key="OpenHoursSelector" />
      </MapboxSearchBoxResponseProvider>
      <DiscountsSelector />
    </>
  );
}
