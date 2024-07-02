import { TicketIntentStatus } from "@prisma/client";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { LiaCalendar } from "react-icons/lia";
import BookingsSection from "../uikit/PremiseMyBookingCard/BookingsSection";
import { Tag } from "@/components/uikit";
import { fetchImageSrc } from "@/lib/utils/fetch-image-src";
import { bookingsGroupedByDateAndPremiseAndPayment } from "@/lib/utils/groupBy-bookings";
import { Booking } from "@/lib/utils/premise-booking";
import { HStack } from "~/styled-system/jsx";

export async function PremiseMyBookings({
  userBookings,
}: {
  userBookings: Booking[];
}) {
  const t = await getTranslations("user.my_bookings");
  const tBookCancelTerms = await getTranslations("booking_cancel_terms");

  const statusColorPallets: Record<TicketIntentStatus, string> = {
    failed: "danger",
    succeed: "success",
    progress: "primary",
  };

  const labels = {
    date: {
      format: ({ date }: { date: Date }) => (
        <HStack gap="3px">
          <LiaCalendar size="1.125em" />{" "}
          <time dateTime={format(date, "dd.MM.yyyy")}>
            {format(date, "dd.MM.yyyy")}
          </time>
        </HStack>
      ),
    },
    time: {
      format: ({ startTime, endTime }: { startTime: Date; endTime: Date }) =>
        `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`,
    },
    status: {
      format: ({ status }: { status: TicketIntentStatus }) => (
        <Tag variant="solid" colorPalette={statusColorPallets[status]}>
          {status}
        </Tag>
      ),
    },
  };

  const groupedBookings =
    bookingsGroupedByDateAndPremiseAndPayment(userBookings);

  const imageSrcs: Record<string, string> = {};
  for (const booking of userBookings) {
    imageSrcs[booking.premiseId] = await fetchImageSrc(booking.premiseId);
  }

  return (
    <>
      {!userBookings.length && <section>{t("no_bookings")}</section>}
      {Object.entries(groupedBookings).map(([date, premises]) => (
        <BookingsSection
          key={date}
          date={date}
          premises={premises}
          imageSrcs={imageSrcs}
          labels={labels}
          t={tBookCancelTerms}
        />
      ))}
    </>
  );
}
