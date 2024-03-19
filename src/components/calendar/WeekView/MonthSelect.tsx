import { differenceInCalendarMonths, eachMonthOfInterval } from "date-fns";
import { memo } from "react";
import { Select } from "@/components/uikit";
import type { Locale } from "@/navigation";
import { Box } from "~/styled-system/jsx";

export const MonthSelect = memo(function MonthSelect({
  locale,
  monthNumber,
  changeMonth,
  initialDate,
  endDate,
}: {
  locale: Locale;
  monthNumber: number;
  changeMonth: (monthCount: number) => void;
  initialDate: Date;
  endDate: Date;
}) {
  // using of `{ year: 'numeric' }` for full year is omitted
  // since there is a literal for some locale (e.g. `ru-*` locale)
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
  const optionChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    changeMonth(Number(e.target.value));
  };

  return (
    <Box
      maxWidth="200px"
      marginBlockEnd="44px"
      css={{
        "& select": {
          textTransform: "capitalize",
        },
      }}
    >
      <Select
        value={monthNumber}
        placeholder="Choose month"
        onChange={optionChanged}
      >
        {eachMonthOfInterval({
          start: initialDate,
          end: endDate,
        }).map((interimDate) => (
          <option
            key={interimDate.toISOString()}
            value={differenceInCalendarMonths(interimDate, initialDate)}
          >
            {`${monthFormatter.format(interimDate)} ${interimDate.getFullYear()}`}
          </option>
        ))}
      </Select>
    </Box>
  );
});
