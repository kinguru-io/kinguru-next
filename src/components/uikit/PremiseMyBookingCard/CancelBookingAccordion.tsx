import {
  Box,
  Flex,
} from "~/styled-system/jsx";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Booking } from "@/lib/utils/premise-booking";
import { Button } from "../Button";
// import { Accordion } from "../Accordion";

const CancelBookingAccordion = ({
  booking,
  cancelBooking,
  today,
}: {
  booking: Booking;
  cancelBooking: (bookingId: string) => void;
  today: string;
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const index = booking.cancelOptions.findIndex(
      (option) => option.date === today,
    );
    setActiveIndex(index);
  }, [booking, today]);

  return (
    <Accordion defaultIndex={[activeIndex]} allowToggle>
      {booking.cancelOptions.map((option, index) => (
        <AccordionItem key={option.date}>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {format(new Date(option.date), "dd.MM.yyyy")}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex justifyContent="space-between" alignItems="center">
              <Box>{option.description}</Box>
              <Button
                colorScheme="red"
                onClick={() => cancelBooking(booking.id)}
              >
                Cancel Booking
              </Butto>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordio>
  );
};

export default CancelBookingAccordion;
