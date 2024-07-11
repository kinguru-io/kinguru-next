import { useTranslations } from "next-intl";
import { timeSlotCondition } from "@/components/uikit";
import { HStack } from "~/styled-system/jsx";
import { circle, stack } from "~/styled-system/patterns";

export function PriceDescription() {
  const t = useTranslations("price");

  return (
    <dl
      className={stack({
        gap: "2",
        fontSize: "px13",
        mdDown: { order: "-1" },
      })}
    >
      {Object.entries(timeSlotCondition).map(([condition, colorPalette]) => {
        return (
          <HStack key={condition} gap="2">
            <dt>
              <span
                className={circle({
                  size: "2",
                  colorPalette,
                  backgroundColor: "colorPalette",
                })}
              />
            </dt>
            <dd>{t(condition as keyof typeof timeSlotCondition)}</dd>
          </HStack>
        );
      })}
    </dl>
  );
}
