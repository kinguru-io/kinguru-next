import type { PremiseOpenHours, PremiseSlot } from "@prisma/client";
import { eachHourOfInterval, subHours } from "date-fns";

export function generateTimeSlots({
  day,
  openTime,
  closeTime,
  price,
}: PremiseOpenHours) {
  const rawTimeSlots = eachHourOfInterval({
    start: openTime,
    end: subHours(closeTime, 1), // do not count the last hour as an interval
  });

  return {
    day,
    timeSlots: rawTimeSlots.map((time) => ({
      time,
      price,
    })),
  };
}

export function prepareBookedSlots(slots: PremiseSlot[]) {
  const bookedTimeSlots = slots
    .flatMap((slot) =>
      eachHourOfInterval({
        start: slot.startTime,
        end: subHours(slot.endTime, 1), // do not count the last hour as an interval
      }),
    )
    .map((slot) => slot.toISOString());

  return new Set(bookedTimeSlots);
}
