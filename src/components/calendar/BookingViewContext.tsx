"use client";

import type { $Enums } from "@prisma/client";
import { isEqual, isWithinInterval, parseISO } from "date-fns";
import { createContext, useCallback, useContext, useState } from "react";
import type { TimeSlotInfo } from "@/components/uikit";

export type TimeSlotInfoExtended = TimeSlotInfo & {
  day: $Enums.DayOfTheWeek;
  startTime?: Date;
  endTime?: Date;
};

const BookingViewContext = createContext<{
  selectedSlots: TimeSlotInfoExtended[];
  toggleSlot: (timeSlotInfo: TimeSlotInfoExtended) => void;
  resetSlots: () => void;
}>({
  selectedSlots: [],
  toggleSlot: () => {},
  resetSlots: () => {},
});

export function useBookingView() {
  const context = useContext(BookingViewContext);
  return context;
}

const isSlotExists = (
  slots: TimeSlotInfoExtended[],
  targetSlot: TimeSlotInfoExtended,
) => slots.some(({ time }) => isEqual(time, targetSlot.time));

const isSlotRangeExists = (
  slots: TimeSlotInfoExtended[],
  startTime?: Date,
  endTime?: Date,
) => {
  if (!startTime || !endTime) return false;
  const start = parseISO(startTime.toISOString());
  const end = parseISO(endTime.toISOString());
  return slots.some(({ time }) => isWithinInterval(time, { start, end }));
};

const filterSlots = (
  slots: TimeSlotInfoExtended[],
  predicate: (time: Date) => boolean,
) => slots.filter(({ time }) => !predicate(time));

export function BookingViewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedSlots, setSlots] = useState<TimeSlotInfoExtended[]>([]);

  const toggleSlot = useCallback((timeSlotInfo: TimeSlotInfoExtended) => {
    setSlots((prevSlotsState) => {
      if (isSlotExists(prevSlotsState, timeSlotInfo)) {
        return filterSlots(prevSlotsState, (time) =>
          isEqual(time, timeSlotInfo.time),
        );
      }

      if (
        isSlotRangeExists(
          prevSlotsState,
          timeSlotInfo.startTime,
          timeSlotInfo.endTime,
        )
      ) {
        return filterSlots(prevSlotsState, (time) =>
          isWithinInterval(time, {
            start: parseISO(timeSlotInfo.startTime!.toISOString()),
            end: parseISO(timeSlotInfo.endTime!.toISOString()),
          }),
        );
      }

      return [...prevSlotsState, timeSlotInfo];
    });
  }, []);

  const resetSlots = useCallback(() => {
    setSlots([]);
  }, []);

  return (
    <BookingViewContext.Provider
      value={{ selectedSlots, toggleSlot, resetSlots }}
    >
      {children}
    </BookingViewContext.Provider>
  );
}
