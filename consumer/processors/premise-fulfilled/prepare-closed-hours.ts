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
  const mappedOpenHours = openHours.map(({ day, openTime, closeTime }) => ({
    day,
    open: openTime / 100,
    close: closeTime / 100,
  }));

  // grouping in form `{ "1": [{}, {}, ...] }` in order to get rid of ES nested fields
  const groupedOpenHours = groupBy(mappedOpenHours, ({ day }) =>
    String(DAYS_OF_WEEK_ORDERED.indexOf(day) + 1),
  );

  return Object.keys(groupedOpenHours).reduce<Record<string, number[]>>(
    (group, dayNumber) => {
      const closedHours = new Set(fullDayHoursList);
      const records = groupedOpenHours[dayNumber];

      if (!records) return group;

      records.forEach((record) => {
        Array.from(
          { length: record.close - record.open },
          (_, i) => i + record.open,
        ).forEach((hour) => closedHours.delete(hour));
      });

      group[dayNumber] = Array.from(closedHours);
      return group;
    },
    {},
  );
}
