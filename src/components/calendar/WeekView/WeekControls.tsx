import { useTranslations } from "next-intl";
import { memo } from "react";
import { useOriginDate } from "./use-origin-date";
import { Icon } from "@/components/common";
import { Button, type ButtonProps } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { GridItem } from "~/styled-system/jsx";

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

  const commonProps: ButtonProps = {
    type: "button",
    rounded: false,
    colorPalette: "secondary",
  };

  return (
    <>
      <GridItem gridArea="prev-week">
        <Button
          icon={<Icon name="action/arrow" />}
          onClick={prevWeek}
          disabled={canGoPrev}
          aria-label={t("prev_week_btn_label")}
          {...commonProps}
        />
      </GridItem>
      <GridItem gridArea="next-week">
        <Button
          type="button"
          icon={
            <Icon name="action/arrow" className={css({ rotate: "180deg" })} />
          }
          onClick={nextWeek}
          disabled={canGoNext}
          aria-label={t("next_week_btn_label")}
          {...commonProps}
        />
      </GridItem>
    </>
  );
});
