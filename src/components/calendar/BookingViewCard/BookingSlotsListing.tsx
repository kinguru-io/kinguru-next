"use client";

import { useTranslations } from "next-intl";
import { LiaCalendar } from "react-icons/lia";
import {
  type TimeSlotInfoExtended,
  useBookingView,
} from "../BookingViewContext";
import { TimeSlotCard } from "../TimeSlotCard";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import type { Group } from "@/lib/utils/array";
import { Grid, HStack } from "~/styled-system/jsx";

export function BookingSlotsListing({
  groupedSlots,
}: {
  groupedSlots: Group<string, TimeSlotInfoExtended>;
}) {
  const t = useTranslations("booking_view");
  const { toggleSlot } = useBookingView();
  const timeZone = useSearchBoxTimeZone();

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
