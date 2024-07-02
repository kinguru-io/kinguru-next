import { Booking } from "@/lib/utils/premise-booking";
import { Flex } from "~/styled-system/jsx";

const BookingLabels = ({
  booking,
  labels,
}: {
  booking: Booking;
  labels: { [key: string]: { format: (booking: Booking) => JSX.Element } };
}) => (
  <Flex marginLeft="auto" alignItems="center" flexWrap="wrap" gap="7">
    {Object.entries(labels).map(([label, formatFunc]) => (
      <Flex flexDirection="column" justifyContent="space-between" key={label}>
        {formatFunc.format(booking)}
      </Flex>
    ))}
  </Flex>
);

export default BookingLabels;
