import type { PremiseDiscount } from "@prisma/client";
import { TimeSlotInfoExtended } from "@/components/calendar";
import type { TimeSlotInfo } from "@/components/uikit";
import type { Group } from "@/lib/utils/array";

/**
 * `discounts` array should be sorted in `ascending` order!
 * @returns `Record<duration, discountPercentage>` with filled gaps between duration values
 */
export function prepareDiscountRangeMap(discounts: PremiseDiscount[]) {
  return discounts.reduce(
    (discountsMap, discount, idx, discountArray) => {
      if (idx === 0) {
        discountsMap[discount.duration] = discount.discountPercentage;
        return discountsMap;
      }

      const prevDiscount = discountArray[idx - 1];
      const gapRangeLength = discount.duration - prevDiscount.duration;

      Object.assign(
        discountsMap,
        // ignore when the gap range equals 1
        ...Array.from({ length: gapRangeLength - 1 }, (_, gapIdx) => ({
          [prevDiscount.duration + gapIdx + 1]: prevDiscount.discountPercentage,
        })),
        { [discount.duration]: discount.discountPercentage },
      );

      return discountsMap;
    },
    {} as Record<
      PremiseDiscount["duration"],
      PremiseDiscount["discountPercentage"] | undefined
    >,
  );
}

export function getSlotDiscount(
  slots: TimeSlotInfoExtended[],
  slotTime: TimeSlotInfoExtended["time"],
  discountsMap: Record<number, number | undefined>,
) {
  if (!slotTime) {
    return 0;
  }

  const slotsAmount = slots.filter(
    (slot) => slot.time && slot.time.getDate() === slotTime.getDate(),
  ).length;

  const maxDiscountDuration = Math.max(
    ...Object.keys(discountsMap).map((duration) => Number(duration)),
    0,
  );

  const groupDuration = Math.min(slotsAmount, maxDiscountDuration);
  const discountPercentage = discountsMap[groupDuration] || 0;

  return discountPercentage;
}

export function processOrderTotalDiscounts<T extends TimeSlotInfo>(
  groupedSlots: Group<PropertyKey, T>,
  discountsMap: Record<number, number | undefined>,
) {
  const maxDiscountDuration = Math.max(
    ...Object.keys(discountsMap).map((duration) => Number(duration)),
    0,
  );

  return Object.values(groupedSlots).reduce(
    (acc, groupArray) => {
      if (!groupArray) return acc;

      const groupFullPrice = groupArray.reduce(
        (groupPrice, slot) => groupPrice + slot.price,
        0,
      );

      acc.fullPrice += groupFullPrice;

      // ignoring when there are no discounts
      if (maxDiscountDuration === 0) {
        acc.totalPrice += groupFullPrice;
        return acc;
      }

      const groupDuration = Math.min(groupArray.length, maxDiscountDuration);
      const discountPercentage = discountsMap[groupDuration];

      // ignoring when there no such duration records
      if (!discountPercentage) {
        acc.totalPrice += groupFullPrice;
        return acc;
      }

      const discountAmount = groupFullPrice * (discountPercentage / 100);
      const discountedPrice = groupFullPrice - discountAmount;
      acc.totalPrice += discountedPrice;

      const newDiscountMetaAmount =
        (acc.discountsMeta[discountPercentage] || 0) + discountAmount;
      acc.discountsMeta[discountPercentage] = newDiscountMetaAmount;

      return acc;
    },
    {
      fullPrice: 0,
      totalPrice: 0,
      discountsMeta: {} as Record<number, number | undefined>,
    },
  );
}

export type PriceInfo = ReturnType<typeof processOrderTotalDiscounts>;
