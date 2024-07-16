"use client";

import type { $Enums } from "@prisma/client";
import { format, isBefore, isEqual, isSameDay, set } from "date-fns";
import { useEffect, useRef } from "react";
import { MonthSelect } from "./MonthSelect";
import { useOriginDate } from "./use-origin-date";
import { WeekControls } from "./WeekControls";
import { useBookingView } from "../BookingViewContext";
import {
  TimeSlot,
  type AggregatedPrices,
  getTimeSlotCondition,
} from "@/components/uikit";
import type { Group } from "@/lib/utils/array";
import { getWeekViewData, DAYS_OF_WEEK_ORDERED } from "@/lib/utils/datetime";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Box, Flex, HStack, Stack, VStack } from "~/styled-system/jsx";

export function WeekView({
  locale,
  nowDate,
  timeSlotsGroup,
  bookedSlots,
  aggregatedPrices,
  headingSlot,
}: {
  locale: Locale;
  nowDate: Date;
  timeSlotsGroup: Group<
    $Enums.DayOfTheWeek,
    {
      day: $Enums.DayOfTheWeek;
      timeSlots: Array<{ price: number; time: number }>;
    }
  >;
  bookedSlots: Set<string>;
  aggregatedPrices: AggregatedPrices;
  headingSlot?: React.ReactNode;
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
  const { selectedSlots, toggleSlot } = useBookingView();
  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    const todayColumn = calendarRef.current.querySelector(
      "div[aria-selected=true]",
    ) satisfies HTMLDivElement | null;

    if (!todayColumn) return;

    calendarRef.current.scrollTo({
      left: todayColumn.offsetLeft,
      behavior: "instant",
    });
  }, [calendarRef]);

  const weekViewData = getWeekViewData({ locale, originDate });

  return (
    <Stack gap="6" overflow="hidden">
      <HStack gap="6" flexWrap="wrap">
        {headingSlot}
        <HStack gap="1" justifyContent="space-between" flexGrow="1">
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
        </HStack>
      </HStack>
      <Flex
        ref={calendarRef}
        css={{
          gap: "3",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
        }}
      >
        {weekViewData.map((weekdayInfo, idx) => {
          const dayOfWeekGroupKey = DAYS_OF_WEEK_ORDERED[idx];
          const weekDayTimeSlots = timeSlotsGroup[dayOfWeekGroupKey] || [];

          return (
            <VStack
              key={weekdayInfo.weekdayShort}
              css={{
                gap: "2",
                scrollSnapAlign: "end",
                flexShrink: "0",
                flexGrow: "1",
                flexBasis: "4.625rem",
              }}
            >
              <Box
                textAlign="center"
                alignSelf="stretch"
                borderBlockEnd="{sizes.1} solid {colors.secondary.lighter}"
                paddingBlockEnd="1"
                marginBlockEnd="2"
                aria-selected={isSameDay(nowDate, weekdayInfo.day)}
                _selected={{ borderBlockEndColor: "primary" }}
              >
                <time
                  className={css({
                    textTransform: "capitalize",
                    whiteSpace: "pre",
                  })}
                  dateTime={format(weekdayInfo.day, "yyyy-MM-dd")}
                  suppressHydrationWarning
                >
                  {weekdayInfo.weekdayShort}
                  {"\n"}
                  {format(weekdayInfo.day, "d")}
                </time>
              </Box>
              {weekDayTimeSlots.map(({ day, timeSlots }) => {
                return timeSlots.flatMap(({ price, time }) => {
                  const slotTime = set(weekdayInfo.day, {
                    hours: time / 100,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0,
                  });
                  const slotISOString = slotTime.toISOString();
                  const isDisabled =
                    isBefore(slotTime, nowDate) ||
                    bookedSlots.has(slotISOString);

                  const isSlotSelected = selectedSlots.some(
                    ({ time: selectedTime }) => isEqual(selectedTime, slotTime),
                  );

                  return (
                    <TimeSlot
                      key={slotISOString}
                      price={price}
                      time={slotTime}
                      onClick={() =>
                        toggleSlot({
                          day,
                          time: slotTime,
                          price,
                        })
                      }
                      condition={getTimeSlotCondition(price, aggregatedPrices)}
                      selected={isSlotSelected}
                      disabled={isDisabled}
                    />
                  );
                });
              })}
            </VStack>
          );
        })}
      </Flex>
    </Stack>
  );
}
