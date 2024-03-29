import { addDays, differenceInDays, startOfWeek } from "date-fns";
import type { Locale } from "@/navigation";

type Options = {
  locale?: Locale;
  originDate?: Date;
};

export function getWeekViewData({
  locale = "en",
  originDate = new Date(),
}: Options) {
  const unixStartTime = new Date(0);

  const weekdayOffset = differenceInDays(
    originDate,
    startOfWeek(originDate, { weekStartsOn: 1 }),
  );

  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });

  return Array.from({ length: 7 }, (_, idx) => {
    // using `5` to get the range [`Monday`, `Tuesday`, ..., `Sunday`]
    unixStartTime.setDate(5 + idx);

    return {
      day: addDays(originDate, idx - weekdayOffset),
      weekdayShort: weekdayFormatter.format(unixStartTime),
    };
  });
}
