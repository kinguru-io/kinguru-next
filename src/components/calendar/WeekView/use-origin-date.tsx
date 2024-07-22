import {
  addDays,
  addMonths,
  differenceInCalendarMonths,
  isBefore,
  startOfMonth,
} from "date-fns";
import { useCallback, useState } from "react";

/**
 * Controls the date origin according to the initial state value for a week view layouts:
 * - ability to add one week (no ability to go further than the date calculated from `maxMonthCount`)
 * - ability to substitute one week (no ability to see previous week)
 * - ability to change a month by adding relative number to a current month
 */
export function useOriginDate({
  initialDate,
  maxMonthCount = 12,
}: {
  initialDate: Date;
  maxMonthCount?: number;
}) {
  const [originDate, setOriginDate] = useState(initialDate);

  const prevWeek = useCallback(() => {
    setOriginDate((prevOrigin) => addDays(prevOrigin, -7));
  }, []);

  const nextWeek = useCallback(() => {
    setOriginDate((prevOrigin) => addDays(prevOrigin, 7));
  }, []);

  const changeMonth = useCallback((monthCount: number) => {
    const nextOriginDate = startOfMonth(addMonths(initialDate, monthCount));

    setOriginDate(
      isBefore(nextOriginDate, initialDate) ? initialDate : nextOriginDate,
    );
  }, []);

  return {
    originDate,
    prevWeek,
    nextWeek,
    changeMonth,
    canGoPrev: isBefore(addDays(originDate, -7), initialDate),
    canGoNext:
      differenceInCalendarMonths(addDays(originDate, 7), initialDate) >
      maxMonthCount,
    currentMonthNumber: differenceInCalendarMonths(originDate, initialDate),
    lastAllowedDate: addMonths(initialDate, maxMonthCount),
  };
}
