import { isBefore } from "date-fns";
import { toZonedTime } from "date-fns-tz";

/**
 * @summary Is the `dateA` before the `dateB` within the same time zone?
 */
export function isBeforeZoned(dateA: Date, dateB: Date, timeZone: string) {
  return isBefore(toZonedTime(dateA, timeZone), toZonedTime(dateB, timeZone));
}
