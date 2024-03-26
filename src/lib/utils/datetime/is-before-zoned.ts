import { isBefore } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

/**
 * @summary Is the `dateA` before the `dateB` within the same time zone?
 */
export function isBeforeZoned(dateA: Date, dateB: Date, timeZone: string) {
  return isBefore(
    utcToZonedTime(dateA, timeZone),
    utcToZonedTime(dateB, timeZone),
  );
}
