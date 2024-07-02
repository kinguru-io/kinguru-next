import { formatInTimeZone } from "date-fns-tz";
import { priceFormatter } from "@/lib/utils";
import { css } from "~/styled-system/css";

export const timeSlotCondition = {
  regular: "secondary",
  min: "success",
  max: "danger",
} as const;

type Condition = keyof typeof timeSlotCondition;

export type TimeSlotInfo = {
  price: number;
  time: Date;
  discountAmount: number;
};

type TimeSlotProps = TimeSlotInfo & {
  timeZone?: string;
  onClick: () => void;
  disabled?: boolean;
  condition?: Condition;
  selected?: boolean;
};

const timeSlotClassName = css({
  display: "flex",
  flexDirection: "column",
  gap: "1",
  fontSize: "px15",
  fontWeight: "bold",
  lineHeight: "1",
  padding: "2",
  borderRadius: "sm",
  borderWidth: "1px",
  borderColor: "tertiary",
  bgColor: "light",
  _disabled: {
    bgColor: "secondary.lighter",
    opacity: "0.4",
  },
  _selected: {
    borderColor: "primary.lighter",
    bgColor: "primary.lighter",
  },
});

export function TimeSlot({
  price,
  time,
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  discountAmount,
  onClick,
  condition = "regular",
  selected = false,
  disabled,
}: TimeSlotProps) {
  const colorPalette = timeSlotCondition[condition];

  return (
    <button
      type="button"
      className={timeSlotClassName}
      onClick={onClick}
      aria-selected={selected}
      disabled={disabled}
    >
      <time dateTime={time.toISOString()}>
        {formatInTimeZone(time, timeZone, "HH:mm")}{" "}
        {discountAmount && "with discount"}
      </time>
      <span
        className={css({
          fontWeight: "normal",
          fontSize: "sm",
          colorPalette,
          "&[data-colored=true]": {
            color: "colorPalette",
          },
        })}
        data-colored={!disabled && colorPalette !== "secondary"}
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
