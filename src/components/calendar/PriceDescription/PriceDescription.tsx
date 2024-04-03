import { useTranslations } from "next-intl";
import { timeSlotCondition } from "@/components/uikit";
import { css } from "~/styled-system/css";
import { Circle, HStack } from "~/styled-system/jsx";

export function PriceDescription() {
  const t = useTranslations("price");

  return (
    <dl
      className={css({
        textStyle: "body.3",
        display: "grid",
        gridAutoFlow: "row",
        gap: "3px",
      })}
    >
      {Object.entries(timeSlotCondition).map(([condition, colorPalette]) => {
        return (
          <HStack key={condition} gap="7px">
            <dt>
              <Circle
                width="9px"
                height="9px"
                colorPalette={colorPalette}
                backgroundColor="colorPalette"
              />
            </dt>
            <dd>{t(condition as keyof typeof timeSlotCondition)}</dd>
          </HStack>
        );
      })}
    </dl>
  );
}
