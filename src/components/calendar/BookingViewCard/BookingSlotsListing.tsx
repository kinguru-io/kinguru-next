"use client";

import { addHours } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { LiaCalendar } from "react-icons/lia";
import {
  type TimeSlotInfoExtended,
  useBookingView,
} from "../BookingViewContext";
import { TagClosable } from "@/components/common";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import { priceFormatter } from "@/lib/utils";
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
              slots.map((timeSlotInfo) => {
                const start = formatInTimeZone(
                  timeSlotInfo.time,
                  timeZone,
                  "H:mm",
                );
                const end = formatInTimeZone(
                  addHours(timeSlotInfo.time, 1),
                  timeZone,
                  "H:mm",
                );

                return (
                  <TagClosable
                    key={"booking-view" + timeSlotInfo.time.toISOString()}
                    content={`${start} - ${end}`}
                    helper={priceFormatter.format(timeSlotInfo.price)}
                    onClick={() => toggleSlot(timeSlotInfo)}
                    buttonLabel={t("remove_timeslot_btn")}
                  />
                );
              })}
          </Grid>
        );
      })}
    </Grid>
  );
}
