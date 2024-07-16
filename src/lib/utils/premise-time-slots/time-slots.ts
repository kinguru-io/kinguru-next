import type { PremiseOpenHours, PremiseSlot } from "@prisma/client";
import { eachHourOfInterval, subHours } from "date-fns";

export function eachHourStampOfInterval(
  start: number,
  end: number,
  step?: number,
) {
  const hourStep = step || 100;

  return Array.from(
    { length: (end - start) / hourStep + 1 },
    (_, i) => start + i * (step || hourStep),
  );
}

export function generateTimeSlots({
  day,
  openTime,
  closeTime,
  price,
}: PremiseOpenHours) {
  return {
    day,
    timeSlots: eachHourStampOfInterval(openTime, closeTime - 100).map(
      (time) => ({
        time,
        price,
      }),
    ),
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
