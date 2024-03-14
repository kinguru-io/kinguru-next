import { lightFormat } from "date-fns";
import { priceFormatter } from "@/lib/utils";
import { css, cx } from "~/styled-system/css";
import { divider } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export const timeSlotCondition = {
  min: "success",
  regular: "secondary",
  max: "danger",
} as const;

type Condition = keyof typeof timeSlotCondition;

type TimeSlotProps = {
  price: number;
  time: Date;
  onClick: () => void;
  condition?: Condition;
  selected?: boolean;
};

export function TimeSlot({
  price,
  time,
  onClick,
  condition = "regular",
  selected = false,
}: TimeSlotProps) {
  const colorPalette = timeSlotCondition[condition];
  const className = cx(
    button({ variant: "solid" }),
    // variant reset styles
    css({
      colorPalette,
      flexDirection: "column",
      gap: "3px",
      borderRadius: "6px",
      padding: "4px",
      color: "neutral.1",
      bgColor: "neutral.5",
      fontWeight: "normal",
      _hoverEnabled: {
        bgColor: "primary.disabled",
      },
      _activeEnabled: {
        bgColor: "primary.active",
      },
      _selected: {
        bgColor: "primary.active",
      },
    }),
  );

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      aria-selected={selected}
    >
      <time
        className={css({ textStyle: "body.1" })}
        dateTime={time.toISOString()}
      >
        {lightFormat(time, "H:mm")}
      </time>
      <span
        className={divider({ orientation: "horizontal", minWidth: "40px" })}
      />
      <span
        className={css({
          colorPalette,
          textStyle: "body.3",
          borderRadius: "3px",
          paddingInline: "2px",
          bgColor:
            colorPalette === "secondary" ? "transparent" : "colorPalette",
          color: colorPalette === "secondary" ? "neutral.1" : "neutral.5",
        })}
      >
        {priceFormatter.format(price)}
      </span>
    </button>
  );
}

export function getTimeSlotCondition({
  price,
  minPrice,
  maxPrice,
}: {
  price: number;
  minPrice: number;
  maxPrice: number;
}): Condition {
  if (price === maxPrice) return "max";
  if (price === minPrice) return "min";
  return "regular";
}
