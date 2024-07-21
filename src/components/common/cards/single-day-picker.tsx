import { useLocale } from "next-intl";
import { DayPicker, type PropsBase } from "react-day-picker";
import { useDropdown } from "@/components/uikit";
import { localeMap } from "@/lib/shared/config/date-fns-locale-map";
import type { Locale } from "@/navigation";
import { token } from "~/styled-system/tokens";

import "react-day-picker/style.css";

const dayPickerStyles = {
  "--rdp-accent-color": token.var("colors.primary"),
  "--rdp-accent-background-color": token.var("colors.primary"),
  "--rdp-weekday-text-transform": "capitalize",
} as React.CSSProperties;

export function SingleDayPicker({
  date,
  callback,
  disabled,
  captionLayout,
}: {
  date: Date;
  callback: (day: Date) => unknown;
  disabled?: PropsBase["disabled"];
  captionLayout?: PropsBase["captionLayout"];
}) {
  const locale = useLocale() as Locale;
  const { setHidden } = useDropdown();

  const dayClicked = (day: Date) => {
    callback(day);
    setHidden(true);
  };

  return (
    <DayPicker
      mode="single"
      style={dayPickerStyles}
      weekStartsOn={1} // Monday first
      selected={date}
      onDayClick={dayClicked}
      locale={localeMap[locale]}
      disabled={disabled}
      captionLayout={captionLayout}
    />
  );
}
