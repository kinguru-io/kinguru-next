"use client";

import {
  addDays,
  addMonths,
  differenceInCalendarMonths,
  differenceInDays,
  eachMonthOfInterval,
  isPast,
  isToday,
  lightFormat,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { memo, useCallback, useState } from "react";
import { GrNext } from "react-icons/gr";
import { Button, Select } from "@/components/uikit";
import { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Box, Grid, GridItem } from "~/styled-system/jsx";

export function WeekView({
  locale,
  todayDate,
}: {
  locale: Locale;
  todayDate: Date;
}) {
  const [originDate, setOriginDate] = useState(todayDate);

  const changeWeek = (direction: "prev" | "next") => {
    return () =>
      setOriginDate((prevOrigin) => {
        const multiplier = direction === "prev" ? -1 : 1;

        return addDays(prevOrigin, 7 * multiplier);
      });
  };

  const changeMonth = useCallback((monthCount: number) => {
    const nextOriginDate = startOfMonth(addMonths(todayDate, monthCount));

    setOriginDate(isPast(nextOriginDate) ? todayDate : nextOriginDate);
  }, []);

  const weekViewData = getWeekViewData({ locale, originDate });

  return (
    <Box>
      <MonthSelect
        locale={locale}
        month={differenceInCalendarMonths(originDate, todayDate)}
        changeMonth={changeMonth}
        todayDate={todayDate}
      />
      <Grid
        gridTemplateColumns="auto 1fr auto"
        // TODO adjust layout to use common Grid parent for all the controls
        gridTemplateAreas="'prev-week . next-week'"
      >
        <GridItem gridArea="prev-week">
          <Button
            type="button"
            variant="ghost"
            onClick={changeWeek("prev")}
            disabled={isPast(originDate)}
          >
            <GrNext size={30} className={css({ rotate: "180deg" })} />
          </Button>
        </GridItem>

        <GridItem gridArea="next-week">
          <Button
            type="button"
            variant="ghost"
            onClick={changeWeek("next")}
            disabled={
              differenceInCalendarMonths(addDays(originDate, 7), todayDate) > 12
            }
          >
            <GrNext size={30} />
          </Button>
        </GridItem>

        <Grid gridTemplateColumns="7" gap="10px">
          {weekViewData.map((weekdayInfo) => {
            return (
              <Box
                key={weekdayInfo.weekdayShort}
                borderBlockEnd="4px solid token(colors.primary.disabled)"
                paddingBlockEnd="3px"
                aria-selected={weekdayInfo.isToday}
                css={{
                  textAlign: "center",
                  _selected: {
                    borderColor: "primary",
                  },
                }}
              >
                <time
                  className={css({
                    textStyle: "body.1",
                    textTransform: "capitalize",
                    whiteSpace: "pre",
                  })}
                  dateTime={lightFormat(weekdayInfo.day, "yyyy-MM-dd")}
                  suppressHydrationWarning
                >
                  {weekdayInfo.weekdayShort}
                  {"\n"}
                  {lightFormat(weekdayInfo.day, "d")}
                </time>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

const MonthSelect = memo(function MonthSelect({
  locale,
  month,
  changeMonth,
  todayDate,
}: {
  locale: Locale;
  month: number;
  changeMonth: (monthCount: number) => void;
  todayDate: Date;
}) {
  // * using of `{ year: 'numeric' }` for full year is omitted
  // * since there is a literal for some locale (e.g. `ru-*` locale)
  const monthFormatter = new Intl.DateTimeFormat(locale, { month: "long" });
  const selectChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <Select value={month} placeholder="Choose month" onChange={selectChanged}>
        {eachMonthOfInterval({
          start: todayDate,
          end: addMonths(todayDate, 12),
        }).map((interimDate) => (
          <option
            key={interimDate.toISOString()}
            value={differenceInCalendarMonths(interimDate, todayDate)}
          >
            {`${monthFormatter.format(interimDate)} ${interimDate.getFullYear()}`}
          </option>
        ))}
      </Select>
    </Box>
  );
});

// TODO move all the code below to utils?
const UNIX_START_MONDAY_DATE = 5;

type Options = {
  locale?: Locale;
  originDate?: Date;
};

function getWeekViewData({ locale = "en", originDate = new Date() }: Options) {
  const unixStartTime = new Date(0);

  const weekdayOffest = differenceInDays(
    originDate,
    startOfWeek(originDate, { weekStartsOn: 1 }),
  );

  const weekdayFormatter = new Intl.DateTimeFormat(locale, {
    weekday: "short",
  });

  return Array.from({ length: 7 }, (_, idx) => {
    unixStartTime.setDate(UNIX_START_MONDAY_DATE + idx);
    const day = addDays(originDate, idx - weekdayOffest);

    return {
      isToday: isToday(day),
      weekdayShort: weekdayFormatter.format(unixStartTime),
      day,
    };
  });
}
