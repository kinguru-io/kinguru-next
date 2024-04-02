"use client";

import type { $Enums } from "@prisma/client";
import { isEqual } from "date-fns";
import { createContext, useCallback, useContext, useState } from "react";
import type { TimeSlotInfo } from "@/components/uikit";

export type TimeSlotInfoExtended = TimeSlotInfo & { day: $Enums.DayOfTheWeek };

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

export function BookingViewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedSlots, setSlots] = useState<TimeSlotInfoExtended[]>([]);

  const toggleSlot = useCallback((timeSlotInfo: TimeSlotInfoExtended) => {
    setSlots((prevSlotsState) => {
      const filteredPrevSlotsState = prevSlotsState.filter(
        ({ time }) => !isEqual(time, timeSlotInfo.time),
      );

      if (filteredPrevSlotsState.length === prevSlotsState.length) {
        return prevSlotsState.concat(timeSlotInfo);
      }

      return filteredPrevSlotsState;
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
