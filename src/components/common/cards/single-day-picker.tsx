import { useLocale } from "next-intl";
import { DayPicker, type CaptionLayout, type Matcher } from "react-day-picker";
import { useDropdown } from "@/components/uikit";
import { localeMap } from "@/lib/shared/config/date-fns-locale-map";
import type { Locale } from "@/navigation";
import { token } from "~/styled-system/tokens";

import "react-day-picker/dist/style.css";

const dayPickerStyles = {
  "--rdp-accent-color": token.var("colors.primary"),
  "--rdp-selected-color": token.var("colors.neutral.0"),
  "--rdp-background-color": token.var("colors.primary.disabled"),
} as React.CSSProperties;

export function SingleDayPicker({
  date,
  callback,
  disabled,
  captionLayout,
}: {
  date: Date;
  callback: (day: Date) => unknown;
  disabled?: Matcher | Matcher[];
  captionLayout?: CaptionLayout;
}) {
  const locale = useLocale() as Locale;
  const { setHidden } = useDropdown();

  const dayClicked = (day: Date) => {
    callback(day);
    setHidden(true);
  };

  const currentYear = new Date().getFullYear();

  return (
    <DayPicker
      style={dayPickerStyles}
      weekStartsOn={1} // Monday first
      selected={date}
      onDayClick={dayClicked}
      locale={localeMap[locale]}
      disabled={disabled}
      captionLayout={captionLayout}
      {...(captionLayout && {
        fromYear: currentYear - 100,
        toYear: currentYear,
      })}
    />
  );
}
