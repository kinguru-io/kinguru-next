import { eachMonthOfInterval } from "date-fns";
import { useId } from "react";
import { Select } from "@/components/uikit";
import type { Locale } from "@/navigation";
import { Box } from "~/styled-system/jsx";

export function MonthSelect({
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
  const id = useId();

  // using of `{ year: 'numeric' }` for full year is omitted
  // since there is a literal for some locale (e.g. `ru-*` locale)
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
  const optionChanged = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    changeMonth(Number(target.value.replace(id, "")));
  };

  return (
    <Box
      css={{
        mdDown: { flexGrow: "1" },
        "& select": { textTransform: "capitalize", bgColor: "primary" },
        "& svg": { color: "inherit" },
      }}
    >
      <Select value={monthNumber + id} onChange={optionChanged}>
        {eachMonthOfInterval({
          start: initialDate,
          end: endDate,
        }).map((interimDate, idx) => (
          <option key={interimDate.toISOString()} value={idx + id}>
            {`${monthFormatter.format(interimDate)} ${interimDate.getFullYear()}`}
          </option>
        ))}
      </Select>
    </Box>
  );
}
