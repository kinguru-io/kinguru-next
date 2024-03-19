"use client";

import type { $Enums } from "@prisma/client";
import { isPast, lightFormat, set } from "date-fns";
import { GrNext } from "react-icons/gr";
import { MonthSelect } from "./MonthSelect";
import { useOriginDate } from "./use-origin-date";
import { Button, TimeSlot, type TimeSlotInfo } from "@/components/uikit";
import { getWeekViewData, DAYS_OF_WEEK_ORDERED } from "@/lib/utils/datetime";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Box, Grid, GridItem, VStack } from "~/styled-system/jsx";

export function WeekView({
  locale,
  todayDate,
  timeSlotsGroup,
  bookedSlots,
}: {
  locale: Locale;
  todayDate: Date;
  timeSlotsGroup: Record<
    $Enums.DayOfTheWeek,
    Array<{ day: $Enums.DayOfTheWeek; timeSlots: TimeSlotInfo[] }>
  >;
  bookedSlots: Set<string>;
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
  } = useOriginDate({ initialDate: todayDate });

  const weekViewData = getWeekViewData({ locale, originDate });

  return (
    <Box>
      <MonthSelect
        locale={locale}
        monthNumber={currentMonthNumber}
        changeMonth={changeMonth}
        initialDate={todayDate}
        endDate={lastAllowedDate}
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
            onClick={prevWeek}
            disabled={canGoPrev}
          >
            <GrNext size={30} className={css({ rotate: "180deg" })} />
          </Button>
        </GridItem>

        <GridItem gridArea="next-week">
          <Button
            type="button"
            variant="ghost"
            onClick={nextWeek}
            disabled={canGoNext}
          >
            <GrNext size={30} />
          </Button>
        </GridItem>

        <Grid gridTemplateColumns="7" gap="10px">
          {weekViewData.map((weekdayInfo, idx) => {
            const dayOfWeekGroupKey = DAYS_OF_WEEK_ORDERED[idx];

            return (
              <VStack gap="15px" key={weekdayInfo.weekdayShort}>
                <Box
                  alignSelf="stretch"
                  borderBlockEnd="4px solid token(colors.primary.disabled)"
                  paddingBlockEnd="3px"
                  marginBlockEnd="5px"
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

                {timeSlotsGroup[dayOfWeekGroupKey].map(({ timeSlots }) => {
                  return timeSlots.flatMap(({ price, time }) => {
                    const slotTime = set(weekdayInfo.day, {
                      hours: time.getHours(),
                      minutes: time.getMinutes(),
                      seconds: 0,
                      milliseconds: 0,
                    });

                    if (isPast(slotTime)) return null;

                    const slotISOString = slotTime.toISOString();

                    return (
                      <TimeSlot
                        key={slotISOString}
                        price={price}
                        time={slotTime}
                        onClick={() => {
                          console.log(slotISOString);
                        }}
                        condition={
                          // ! DEBUG-only condition
                          bookedSlots.has(slotISOString) ? "max" : "regular"
                        }
                      />
                    );
                  });
                })}
              </VStack>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
}
