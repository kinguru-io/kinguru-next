"use client";

import { compareAsc } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { LiaCalendar } from "react-icons/lia";
import { useBookingView } from "../BookingViewContext";
import { TimeSlotCard } from "../TimeSlotCard";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import { groupBy } from "@/lib/utils/array";
import { Grid, HStack } from "~/styled-system/jsx";

export function BookingSlotsListing() {
  const t = useTranslations("booking_view");
  const { selectedSlots, toggleSlot } = useBookingView();
  const timeZone = useSearchBoxTimeZone();

  const groupedSlots = groupBy(
    Array.from(selectedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.time, slotB.time),
    ),
    ({ time }) => formatInTimeZone(time, timeZone, "dd.MM.yyyy"),
  );

  return (
    <Grid
      alignSelf="stretch"
      gridAutoFlow="row"
      marginBlock="30px 40px"
      gap="30px"
    >
      {Object.entries(groupedSlots).map(([date, slots]) => {
        return (
          <Grid key={date} gap="10px" gridAutoFlow="row">
            <HStack gap="3px">
              <LiaCalendar size="1.125em" /> <time dateTime={date}>{date}</time>
            </HStack>
            {slots &&
              slots.map((timeSlotInfo) => (
                <TimeSlotCard
                  key={"booking-view" + timeSlotInfo.time.toISOString()}
                  timeZone={timeZone}
                  onClick={() => toggleSlot(timeSlotInfo)}
                  buttonLabel={t("remove_timeslot_btn")}
                  {...timeSlotInfo}
                />
              ))}
          </Grid>
        );
      })}
    </Grid>
  );
}
