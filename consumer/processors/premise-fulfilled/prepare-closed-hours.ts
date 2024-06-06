import type { PremiseOpenHours } from "@prisma/client";
import { millisecondsInHour } from "date-fns/constants";
import { getTimezoneOffset } from "date-fns-tz";
import { groupBy } from "../../../src/lib/shared/utils/array";
import { DAYS_OF_WEEK_ORDERED } from "../../../src/lib/shared/utils/datetime";

const fullDayHoursList = Array.from({ length: 25 }, (_, i) => i);

/**
 * @description Creates a grouped list of open hours in the form `{ "1": [1,2,3,4,5,12,24] }` e.g. when a hall is closed
 */
export function prepareClosedHours({
  openHours,
  timeZone,
}: {
  openHours: PremiseOpenHours[];
  timeZone: string;
}) {
  const _hoursOffset = getTimezoneOffset(timeZone) / millisecondsInHour;
  const mappedOpenHours = openHours.map(({ day, openTime, closeTime }) => ({
    day,
    // TODO adding offset is a temporary solution
    // Should be reworked once slots booking logic is reviewed to fit raw numbers instead of converting to specific time zone
    open: openTime.getUTCHours() + _hoursOffset,
    close: closeTime.getUTCHours() + _hoursOffset,
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
