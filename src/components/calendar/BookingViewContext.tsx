"use client";

import { isEqual } from "date-fns";
import { createContext, useCallback, useContext, useState } from "react";
import type { TimeSlotInfo } from "@/components//uikit";

const BookingViewContext = createContext<{
  selectedSlots: TimeSlotInfo[];
  toggleSlot: (timeSlotInfo: TimeSlotInfo) => void;
}>({
  selectedSlots: [],
  toggleSlot: () => {},
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
  const [selectedSlots, setSlots] = useState<TimeSlotInfo[]>([]);

  const toggleSlot = useCallback((timeSlotInfo: TimeSlotInfo) => {
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

  return (
    <BookingViewContext.Provider value={{ selectedSlots, toggleSlot }}>
      {children}
    </BookingViewContext.Provider>
  );
}
