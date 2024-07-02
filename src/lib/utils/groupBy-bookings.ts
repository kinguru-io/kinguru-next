import { format } from "date-fns";
import { Booking } from "@/lib/utils/premise-booking";

export const groupByBookings = (
  array: Booking[],
  keyGetter: (item: Booking) => string,
): { [key: string]: Booking[] } => {
  const map: { [key: string]: Booking[] } = {};
  array.forEach((item) => {
    const key = keyGetter(item);
    if (!map[key]) {
      map[key] = [];
    }
    map[key].push(item);
  });
  return map;
};

export const bookingsGroupedByDateAndPremiseAndPayment = (
  bookings: Booking[],
) => {
  const groupedByDate = groupByBookings(bookings, (booking) =>
    format(booking.date, "dd.MM.yyyy"),
  );

  const result: {
    [key: string]: {
      [key: string]: Booking[];
    };
  } = {};

  for (const date in groupedByDate) {
    result[date] = groupByBookings(
      groupedByDate[date],
      (booking) => `${booking.premiseId}_${booking.paymentIntentId}`,
    );
  }

  return result;
};
