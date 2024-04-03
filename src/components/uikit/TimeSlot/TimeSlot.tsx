import { formatInTimeZone } from "date-fns-tz";
import { priceFormatter } from "@/lib/utils";
import { css, cx } from "~/styled-system/css";
import { divider } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

export const timeSlotCondition = {
  regular: "secondary",
  min: "success",
  max: "danger",
} as const;

type Condition = keyof typeof timeSlotCondition;

export type TimeSlotInfo = {
  price: number;
  time: Date;
};

type TimeSlotProps = TimeSlotInfo & {
  timeZone?: string;
  onClick: () => void;
  condition?: Condition;
  selected?: boolean;
};

export function TimeSlot({
  price,
  time,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
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
      color: "neutral.0",
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
        {formatInTimeZone(time, timeZone, "H:mm")}
      </time>
      <span
        className={divider({ orientation: "horizontal", minWidth: "40px" })}
      />
      <span
        className={css({
          textStyle: "body.3",
          borderRadius: "3px",
          paddingInline: "2px",
          "&[data-colored=true]": {
            colorPalette,
            bgColor: "colorPalette",
            color: "neutral.5",
          },
        })}
        data-colored={colorPalette !== "secondary"}
      >
        {priceFormatter.format(price)}
      </span>
    </button>
  );
}

export type AggregatedPrices = {
  minPrice?: number;
  maxPrice?: number;
};

export function getTimeSlotCondition(
  price: number,
  { minPrice = price, maxPrice = price }: AggregatedPrices,
): Condition {
  if (minPrice === maxPrice) return "regular";
  if (price === maxPrice) return "max";
  if (price === minPrice) return "min";
  return "regular";
}
