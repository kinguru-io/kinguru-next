"use client";

import type { $Enums } from "@prisma/client";
import { isEqual, isSameDay, set } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import { MonthSelect } from "./MonthSelect";
import { useOriginDate } from "./use-origin-date";
import { WeekControls } from "./WeekControls";
import { useBookingView } from "../BookingViewContext";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import {
  type TimeSlotInfo,
  TimeSlot,
  type AggregatedPrices,
  getTimeSlotCondition,
} from "@/components/uikit";
import type { Group } from "@/lib/utils/array";
import {
  getWeekViewData,
  DAYS_OF_WEEK_ORDERED,
  isBeforeZoned,
} from "@/lib/utils/datetime";
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
  timeSlotsGroup: Group<
    $Enums.DayOfTheWeek,
    { day: $Enums.DayOfTheWeek; timeSlots: TimeSlotInfo[] }
  >;
  bookedSlots: Set<string>;
  aggregatedPrices: AggregatedPrices;
}) {
  const timeZone = useSearchBoxTimeZone();
  const {
    originDate,
    changeMonth,
    nextWeek,
    prevWeek,
    canGoPrev,
    canGoNext,
    currentMonthNumber,
    lastAllowedDate,
  } = useOriginDate({ initialDate: nowDate, timeZone });
  const { selectedSlots, toggleSlot } = useBookingView();

  const weekViewData = getWeekViewData({ locale, originDate });

  return (
    <Grid
      gap="0"
      gridTemplateColumns="auto 1fr auto"
      gridTemplateAreas="'. month-select .' 'prev-week week-view next-week'"
      gridAutoRows="min-content"
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
          const weekDayTimeSlots = timeSlotsGroup[dayOfWeekGroupKey] || [];
          const isToday = isSameDay(
            utcToZonedTime(nowDate, timeZone),
            utcToZonedTime(weekdayInfo.day, timeZone),
          );

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
                textAlign="center"
                borderBlockEnd="4px solid token(colors.primary.disabled)"
                paddingBlockEnd="3px"
                marginBlockEnd="5px"
                aria-selected={isToday}
                _selected={{
                  borderBlockEndColor: "primary",
                }}
              >
                <time
                  className={css({
                    textStyle: "body.1",
                    textTransform: "capitalize",
                    whiteSpace: "pre",
                  })}
                  dateTime={formatInTimeZone(
                    weekdayInfo.day,
                    timeZone,
                    "yyyy-MM-dd",
                  )}
                  suppressHydrationWarning
                >
                  {weekdayInfo.weekdayShort}
                  {"\n"}
                  {formatInTimeZone(weekdayInfo.day, timeZone, "d")}
                </time>
              </Box>

              {weekDayTimeSlots.map(({ day, timeSlots }) => {
                return timeSlots.flatMap(({ price, time }) => {
                  const slotTime = set(weekdayInfo.day, {
                    hours: time.getHours(),
                    minutes: time.getMinutes(),
                    seconds: 0,
                    milliseconds: 0,
                  });
                  const slotISOString = slotTime.toISOString();

                  if (
                    isBeforeZoned(slotTime, nowDate, timeZone) ||
                    bookedSlots.has(slotISOString)
                  ) {
                    return null;
                  }

                  const isSlotSelected = selectedSlots.some(
                    ({ time: selectedTime }) => isEqual(selectedTime, slotTime),
                  );

                  return (
                    <TimeSlot
                      key={slotISOString}
                      price={price}
                      time={slotTime}
                      timeZone={timeZone}
                      onClick={() => toggleSlot({ day, time: slotTime, price })}
                      condition={getTimeSlotCondition(price, aggregatedPrices)}
                      selected={isSlotSelected}
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
