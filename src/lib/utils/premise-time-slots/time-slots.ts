import type {
  PremiseOpenHours,
  PremisePricing,
  PremiseSlot,
} from "@prisma/client";
import { eachHourOfInterval, isWithinInterval, subHours } from "date-fns";

export function generateTimeSlots({
  day,
  openTime,
  closeTime,
  pricing,
}: PremiseOpenHours & { pricing: PremisePricing[] }) {
  const rawTimeSlots = eachHourOfInterval({
    start: openTime,
    end: subHours(closeTime, 1), // do not count the last hour as an interval
  });

  const timeSlots = rawTimeSlots.map((time) => ({
    time,
    price: chooseTimeSlotPrice(time, pricing),
  }));

  return {
    day,
    timeSlots,
  };
}

export function chooseTimeSlotPrice(time: Date, priceList: PremisePricing[]) {
  const { priceForHour } =
    priceList.find(({ startTime: pricingStartTime, endTime: pricingEndTime }) =>
      isWithinInterval(time, {
        start: pricingStartTime,
        end: pricingEndTime,
      }),
    ) || {};

  return priceForHour || 0;
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
