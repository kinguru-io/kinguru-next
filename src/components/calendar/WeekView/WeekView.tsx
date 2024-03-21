"use client";

import type { $Enums } from "@prisma/client";
import { isPast, lightFormat, set } from "date-fns";
import { MonthSelect } from "./MonthSelect";
import { useOriginDate } from "./use-origin-date";
import { WeekControls } from "./WeekContols";
import {
  type TimeSlotInfo,
  TimeSlot,
  type AggregatedPrices,
  getTimeSlotCondition,
} from "@/components/uikit";
import { getWeekViewData, DAYS_OF_WEEK_ORDERED } from "@/lib/utils/datetime";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Box, Flex, Grid, VStack } from "~/styled-system/jsx";

export function WeekView({
  locale,
  nowDate,
  timeSlotsGroup,
  bookedSlots,
  aggregatedPrices,
}: {
  locale: Locale;
  nowDate: Date;
  timeSlotsGroup: Record<
    $Enums.DayOfTheWeek,
    Array<{ day: $Enums.DayOfTheWeek; timeSlots: TimeSlotInfo[] }>
  >;
  bookedSlots: Set<string>;
  aggregatedPrices: AggregatedPrices;
}) {
  const {
    originDate,
    changeMonth,
    nextWeek,
    prevWeek,
    canGoPrev,
    canGoNext,
    currentMonthNumber,
    lastAllowedDate,
  } = useOriginDate({ initialDate: nowDate });

  const weekViewData = getWeekViewData({ locale, originDate });

  return (
    <Grid
      gap="0"
      gridTemplateColumns="auto 1fr auto"
      gridTemplateAreas="'. month-select .' 'prev-week week-view next-week'"
    >
      <MonthSelect
        locale={locale}
        monthNumber={currentMonthNumber}
        changeMonth={changeMonth}
        initialDate={nowDate}
        endDate={lastAllowedDate}
      />
      <WeekControls
        nextWeek={nextWeek}
        prevWeek={prevWeek}
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
      />
      <Flex
        gridArea="week-view"
        gap="10px"
        overflowX="auto"
        scrollSnapType="x mandatory"
      >
        {weekViewData.map((weekdayInfo, idx) => {
          const dayOfWeekGroupKey = DAYS_OF_WEEK_ORDERED[idx];

          return (
            <VStack
              key={weekdayInfo.weekdayShort}
              gap="15px"
              scrollSnapAlign="start"
              minWidth="57px"
              flexBasis="full"
            >
              <Box
                alignSelf="stretch"
                borderBlockEnd="4px solid token(colors.primary.disabled)"
                paddingBlockEnd="3px"
                marginBlockEnd="5px"
                aria-selected={weekdayInfo.isToday}
                css={{
                  textAlign: "center",
                  _selected: {
                    borderBlockEndColor: "primary",
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

              {timeSlotsGroup[dayOfWeekGroupKey].map(({ timeSlots }) => {
                return timeSlots.flatMap(({ price, time }) => {
                  const slotTime = set(weekdayInfo.day, {
                    hours: time.getHours(),
                    minutes: time.getMinutes(),
                    seconds: 0,
                    milliseconds: 0,
                  });
                  const slotISOString = slotTime.toISOString();

                  if (isPast(slotTime) || bookedSlots.has(slotISOString)) {
                    return null;
                  }

                  return (
                    <TimeSlot
                      key={slotISOString}
                      price={price}
                      time={slotTime}
                      onClick={() => {
                        console.log(slotISOString);
                      }}
                      condition={getTimeSlotCondition(price, aggregatedPrices)}
                    />
                  );
                });
              })}
            </VStack>
          );
        })}
      </Flex>
    </Grid>
  );
}
