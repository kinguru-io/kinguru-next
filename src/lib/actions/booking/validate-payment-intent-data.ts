import { PremiseDiscount, type Premise } from "@prisma/client";
import { startOfDay } from "date-fns";
import type { TimeSlotInfoExtended } from "@/components/calendar";
import { groupBy } from "@/lib/shared/utils/array";
import {
  prepareBookedSlots,
  generateTimeSlots,
} from "@/lib/utils/premise-time-slots";

type ValidationResultPass = {
  isValid: true;
  editedSlots: TimeSlotInfoExtended[];
  discounts: PremiseDiscount[];
  premiseMeta: Pick<Premise, "name" | "withConfirmation">;
};

type ValidationResultFailed = {
  isValid: false;
  editedSlots: TimeSlotInfoExtended[];
  discounts: PremiseDiscount[];
};

export async function validatePaymentIntentData({
  premiseId,
  slots,
}: {
  premiseId: string;
  slots: TimeSlotInfoExtended[];
}): Promise<ValidationResultPass | ValidationResultFailed> {
  if (!premiseId || !slots || slots.length === 0) {
    return { isValid: false, editedSlots: [], discounts: [] };
  }

  const premise = await prisma.premise.findUnique({
    where: { id: premiseId },
    include: {
      slots: {
        where: {
          date: { gte: startOfDay(new Date()).toISOString() },
          status: { not: "canceled" },
        },
      },
      discounts: {
        orderBy: {
          duration: "asc",
        },
      },
      openHours: true,
    },
  });

  if (!premise) return { isValid: false, editedSlots: [], discounts: [] };

  if ((premise.minimalSlotsToBook || 0) > slots.length) {
    return { isValid: false, editedSlots: [], discounts: [] };
  }

  const bookedSlots = prepareBookedSlots(premise.slots);
  const timeSlotsGroup = groupBy(
    premise.openHours.map((record) => generateTimeSlots(record)),
    ({ day }) => day,
  );

  const result = slots.reduce(
    (aggregations, slot) => {
      if (!aggregations.isValid) return aggregations;
      // the slot is booked already or is under payment process
      if (bookedSlots.has(slot.time.toISOString())) {
        return { isValid: false, editedSlots: [] };
      }

      const dayTimeInfo = timeSlotsGroup[slot.day];

      // a premise doesn't have open hours for that weekday
      if (!dayTimeInfo) return { isValid: false, editedSlots: [] };

      const slotFound = dayTimeInfo
        .flatMap(({ timeSlots }) => timeSlots)
        .find(({ time }) => {
          return (
            time.getUTCHours() === slot.time.getUTCHours() &&
            time.getUTCMinutes() === slot.time.getUTCMinutes()
          );
        });

      // a premise have such working hours for a given weekday but the doesn't have the slot
      if (!slotFound) return { isValid: false, editedSlots: [] };

      // edited slots are basically same slots as given ones but with the price from the server
      const editedSlot: TimeSlotInfoExtended = {
        ...slot,
        price: slotFound.price,
      };

      aggregations.editedSlots.push(editedSlot);

      return aggregations;
    },
    { isValid: true, editedSlots: [] as TimeSlotInfoExtended[] },
  );

  return {
    ...result,
    discounts: premise.discounts,
    premiseMeta: {
      name: premise.name,
      withConfirmation: premise.withConfirmation,
    },
  };
}
