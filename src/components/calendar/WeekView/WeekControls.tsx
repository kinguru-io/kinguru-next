import { useTranslations } from "next-intl";
import { memo } from "react";
import { useOriginDate } from "./use-origin-date";
import { ArrowIcon, Button } from "@/components/uikit";
import { GridItem, type GridItemProps } from "~/styled-system/jsx";

const gridButtonsStyles: GridItemProps = {
  paddingBlockStart: "3px", // appends transparent space for buttons area to be in the visual center
  css: { "& .arrowIcon": { fontSize: "40px", lineHeight: "0" } },
};

export const WeekControls = memo(function WeekControls({
  canGoNext,
  canGoPrev,
  nextWeek,
  prevWeek,
}: Pick<
  ReturnType<typeof useOriginDate>,
  "canGoNext" | "canGoPrev" | "nextWeek" | "prevWeek"
>) {
  const t = useTranslations("calendar");

  return (
    <>
      <GridItem gridArea="prev-week" {...gridButtonsStyles}>
        <Button
          type="button"
          variant="ghost"
          size="iconOnly"
          icon={<ArrowIcon direction="left" />}
          onClick={prevWeek}
          disabled={canGoPrev}
        >
          {t("prev_week_btn_label")}
        </Button>
      </GridItem>
      <GridItem gridArea="next-week" {...gridButtonsStyles}>
        <Button
          type="button"
          variant="ghost"
          size="iconOnly"
          icon={<ArrowIcon direction="right" />}
          onClick={nextWeek}
          disabled={canGoNext}
        >
          {t("next_week_btn_label")}
        </Button>
      </GridItem>
    </>
  );
});
