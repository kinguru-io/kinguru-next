"use client";

import { $Enums } from "@prisma/client";
import { isPast, lightFormat, set } from "date-fns";
import { GrNext } from "react-icons/gr";
import { MonthSelect } from "./MonthSelect";
import { useOriginDate } from "./use-origin-date";
import { Button, TimeSlot, TimeSlotInfo } from "@/components/uikit";
import { getWeekViewData } from "@/lib/utils/datetime";
import { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { Box, Grid, GridItem, VStack } from "~/styled-system/jsx";

export function WeekView({
  locale,
  todayDate,
  timeSlotsGroup,
}: {
  locale: Locale;
  todayDate: Date;
  timeSlotsGroup: Record<
    $Enums.DayOfTheWeek,
    Array<{ day: $Enums.DayOfTheWeek; timeSlots: TimeSlotInfo[] }>
  >;
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
  const daysOfTheWeek = Object.values($Enums.DayOfTheWeek);

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
            return (
              <VStack gap="15px">
                <Box
                  alignSelf="stretch"
                  key={weekdayInfo.weekdayShort}
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

                {timeSlotsGroup[daysOfTheWeek[idx]].map(({ timeSlots }) => {
                  return timeSlots.flatMap(({ price, time }) => {
                    const slotTime = set(weekdayInfo.day, {
                      hours: time.getHours(),
                      minutes: time.getMinutes(),
                      seconds: time.getSeconds(),
                      milliseconds: time.getMilliseconds(),
                    });

                    if (isPast(slotTime)) return null;

                    return (
                      <TimeSlot
                        key={slotTime.toISOString()}
                        price={price}
                        time={slotTime}
                        onClick={() => {
                          console.log(slotTime);
                        }}
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
