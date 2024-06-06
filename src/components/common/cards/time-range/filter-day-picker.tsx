import { isPast, isToday } from "date-fns";
import { useLocale } from "next-intl";
import { DayPicker } from "react-day-picker";
import { useDropdown } from "@/components/uikit";
import { localeMap } from "@/lib/shared/config/date-fns-locale-map";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { token } from "~/styled-system/tokens";

import "react-day-picker/dist/style.css";

const dayPickerStyles = {
  "--rdp-accent-color": token.var("colors.primary"),
  "--rdp-selected-color": token.var("colors.neutral.0"),
  "--rdp-background-color": token.var("colors.primary.disabled"),
} as React.CSSProperties;

export function FilterDayPicker({
  date,
  callback,
}: {
  date: Date;
  callback: (day: Date) => unknown;
}) {
  const locale = useLocale() as Locale;
  const { setHidden } = useDropdown();

  const dayClicked = (day: Date) => {
    callback(day);
    setHidden(true);
  };

  return (
    <DayPicker
      classNames={{
        caption_label: css({
          textTransform: "capitalize",
          textStyle: "heading.extra.1",
        }),
      }}
      style={dayPickerStyles}
      weekStartsOn={1} // Monday first
      selected={date}
      onDayClick={(day) => dayClicked(day)}
      disabled={(day) => isPast(day) && !isToday(day)}
      fromMonth={new Date()}
      locale={localeMap[locale]}
    />
  );
}
