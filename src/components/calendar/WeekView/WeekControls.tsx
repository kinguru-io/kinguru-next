import { useTranslations } from "next-intl";
import { memo } from "react";
import { useOriginDate } from "./use-origin-date";
import { ArrowIcon, Button, type ButtonProps } from "@/components/uikit";
import { Flex } from "~/styled-system/jsx";

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
    <Flex gap="1">
      <Button
        icon={<ArrowIcon />}
        onClick={prevWeek}
        disabled={canGoPrev}
        aria-label={t("prev_week_btn_label")}
        {...commonProps}
      />
      <Button
        type="button"
        icon={<ArrowIcon direction="right" />}
        onClick={nextWeek}
        disabled={canGoNext}
        aria-label={t("next_week_btn_label")}
        {...commonProps}
      />
    </Flex>
  );
});
