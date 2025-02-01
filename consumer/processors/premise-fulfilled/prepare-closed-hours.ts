import type { PremiseOpenHours } from "@prisma/client";
import { groupBy } from "../../../src/lib/shared/utils/array";
import { DAYS_OF_WEEK_ORDERED } from "../../../src/lib/shared/utils/datetime";

export const fullDayHoursList = Array.from({ length: 25 }, (_, i) => i);

/**
 * @description Creates a group of hours when a hall is closed in the form `{ "1": [1,2,3,4,5,12,24] }`
 */
export function prepareClosedHours({
  openHours,
}: {
  openHours: Array<Pick<PremiseOpenHours, "day" | "openTime" | "closeTime">>;
}) {
  // grouping in form `{ "1": [{}, {}, ...] }` in order to get rid of ES nested fields
  const groupedOpenHours = groupBy(openHours, ({ day }) =>
    String(DAYS_OF_WEEK_ORDERED.indexOf(day) + 1),
  );

  return Object.keys(groupedOpenHours).reduce<Record<string, number[]>>(
    (group, dayNumber) => {
      const closedHours = new Set(fullDayHoursList);
      const records = groupedOpenHours[dayNumber];

      if (!records) return group;

      records.forEach((record) => {
        const openHour = record.openTime.getUTCHours();
        const lastClosedHour =
          record.closeTime.getUTCDate() > 1 // since 1970-01-01T24:00:00.000Z -> 1970-01-02T00:00:00.000Z
            ? 25
            : record.closeTime.getUTCHours();

        Array.from(
          { length: lastClosedHour - openHour },
          (_, i) => i + openHour,
        ).forEach((hour) => closedHours.delete(hour));
      });

      group[dayNumber] = closedHours.size > 0 ? Array.from(closedHours) : [-1];
      // [-1] stands for index to be looked up in case of 24/7 working hours
      return group;
    },
    {},
  );
}
