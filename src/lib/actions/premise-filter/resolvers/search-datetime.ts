import { getDay, getHours } from "date-fns";

/**
 * @description The query means: "query all slot documents with the `succeed` or `progress` status intersecting with the given time range"
 */
export function premiseSlotResolver(ranges: string[]) {
  return {
    has_child: {
      type: "premise_slot",
      query: {
        bool: {
          must: [
            {
              bool: {
                should: [
                  { range: { startTime: { gt: ranges[0], lt: ranges[1] } } },
                  { range: { endTime: { gt: ranges[0], lt: ranges[1] } } },
                ],
              },
            },
            {
              terms: {
                status: ["succeed", "progress"],
              },
            },
          ],
        },
      },
    },
  };
}

/**
 * @description Simply looks if user's time range intersects with closed hours
 */
export function closedHoursResolver(ranges: string[]) {
  const fromHour = getHours(ranges[0]);
  const toHour = getHours(ranges[1]);
  const dayNumber = getDay(ranges[0]);

  // since `0` is Sunday (elastic docs has numbers 1-7)
  const docNumber = dayNumber === 0 ? 7 : dayNumber;

  const hoursRange = Array.from(
    { length: toHour - fromHour },
    (_, i) => i + fromHour,
  );

  return { terms: { [`closedHours.${docNumber}`]: hoursRange } };
}
