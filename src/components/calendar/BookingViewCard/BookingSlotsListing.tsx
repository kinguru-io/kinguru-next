import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { useBookingView } from "../BookingViewContext";
import { TagClosable } from "@/components/common";
import { Icon } from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import type { Group } from "@/lib/utils/array";
import type { MergedTimeSlots } from "@/lib/utils/premise-booking";
import { HStack, Stack } from "~/styled-system/jsx";

export function BookingSlotsListing({
  groupedSlots,
}: {
  groupedSlots: Group<string, MergedTimeSlots>;
}) {
  const t = useTranslations("booking_view");
  const { toggleSlot } = useBookingView();

  return (
    <Stack
      css={{ gap: "4", marginBlock: "4", maxHeight: "md", overflow: "auto" }}
    >
      {Object.entries(groupedSlots).map(([date, slots]) => {
        return (
          <Stack key={date} gap="3">
            <HStack
              css={{
                gap: "1",
                fontSize: "px13",
                "& > svg": { fontSize: "xl" },
              }}
            >
              <Icon name="common/calendar" />{" "}
              <time dateTime={date}>{date}</time>
            </HStack>
            <Stack gap="2">
              {slots &&
                slots.map((timeSlotInfo) => {
                  const start = formatInTimeZone(
                    timeSlotInfo.startTime,
                    "UTC",
                    "H:mm",
                  );
                  const end = formatInTimeZone(
                    timeSlotInfo.endTime,
                    "UTC",
                    "H:mm",
                  );

                  return (
                    <TagClosable
                      key={
                        "booking-view" + timeSlotInfo.startTime.toISOString()
                      }
                      content={`${start} - ${end}`}
                      helper={priceFormatter.format(timeSlotInfo.price)}
                      onClick={() => {
                        // @ts-ignore
                        toggleSlot(timeSlotInfo);
                      }}
                      buttonLabel={t("remove_timeslot_btn")}
                    />
                  );
                })}
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
}
