"use client";

import type { $Enums } from "@prisma/client";
import { isBefore, isEqual, isSameDay } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
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
  Loader,
} from "@/components/uikit";
import { DEFAULT_TAX } from "@/lib/shared/constants";
import { priceFormatter } from "@/lib/utils";
import type { Group } from "@/lib/utils/array";
import { getWeekViewData, DAYS_OF_WEEK_ORDERED } from "@/lib/utils/datetime";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Box, Flex, HStack, Stack, VStack } from "~/styled-system/jsx";

type WeekViewProps = {
  locale: Locale;
  nowDate: Date;
  isTaxedPrice?: boolean;
  timeSlotsGroup: Group<
    $Enums.DayOfTheWeek,
    { day: $Enums.DayOfTheWeek; timeSlots: TimeSlotInfo[] }
  >;
  bookedSlots: Set<string>;
  aggregatedPrices: AggregatedPrices;
  headingSlot?: React.ReactNode;
  subheadingSlot?: React.ReactNode;
};

export function WeekView({
  locale,
  nowDate,
  timeSlotsGroup,
  bookedSlots,
  aggregatedPrices,
  headingSlot,
  subheadingSlot,
  isTaxedPrice,
}: WeekViewProps) {
  const t = useTranslations("booking_view");
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
  } = useOriginDate({ initialDate: nowDate });
  const { selectedSlots, toggleSlot, priceMode } = useBookingView();
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
  }, []);

  const weekViewData = getWeekViewData({ locale, originDate });

  // since all time slots represent local hall time, it is okay to get current user time in a hall timezone
  // converting to UTC only for comparing
  // ! this isn't real time because time slots are treated as common strings, not as `Date`
  const localPremiseTime = formatInTimeZone(
    nowDate,
    timeZone || "UTC",
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  );

  const renderPrice = (value: number) => {
    const price = isTaxedPrice
      ? priceFormatter.format(value)
      : priceFormatter.format(value * DEFAULT_TAX);

    if (priceMode === "donation") {
      return t("donation_slot_price_label", { price });
    }

    return price;
  };

  return (
    <Stack gap="6" position="relative" maxWidth="92vw">
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
      {subheadingSlot}
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
                aria-selected={isSameDay(localPremiseTime, weekdayInfo.day)}
                _selected={{ borderBlockEndColor: "primary" }}
              >
                <time
                  className={css({
                    textTransform: "capitalize",
                    whiteSpace: "pre",
                  })}
                  dateTime={formatInTimeZone(
                    weekdayInfo.day,
                    "UTC",
                    "yyyy-MM-dd",
                  )}
                  suppressHydrationWarning
                >
                  {weekdayInfo.weekdayShort}
                  {"\n"}
                  {formatInTimeZone(weekdayInfo.day, "UTC", "d")}
                </time>
              </Box>
              {weekDayTimeSlots.map(({ day, timeSlots }) => {
                return timeSlots.flatMap(({ price, time }) => {
                  const slotTime = new Date(weekdayInfo.day);
                  slotTime.setUTCHours(
                    time.getUTCHours(),
                    time.getUTCMinutes(),
                    0,
                    0,
                  );
                  const slotISOString = slotTime.toISOString();
                  const isDisabled =
                    isBefore(slotTime, localPremiseTime) ||
                    bookedSlots.has(slotISOString);

                  const isSlotSelected = selectedSlots.some(
                    ({ time: selectedTime }) => isEqual(selectedTime, slotTime),
                  );

                  return (
                    <TimeSlot
                      key={slotISOString}
                      price={price}
                      renderPrice={renderPrice}
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
      {!timeZone && (
        <Loader
          className={css({
            position: "absolute",
            inset: "0",
            bgColor: "light/80",
          })}
        />
      )}
    </Stack>
  );
}
