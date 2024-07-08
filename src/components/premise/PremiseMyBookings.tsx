import { TicketIntentStatus } from "@prisma/client";
import { format } from "date-fns";

import { LiaCalendar } from "react-icons/lia";
import CancelBookingBtn from "./myBookings/CancelBookingBtn";
import Tabs from "./Tabs";
import { withError } from "./withError";
import BookingCard from "../uikit/PremiseMyBookingCard/BookingCard";
import BookingsSection from "../uikit/PremiseMyBookingCard/BookingsSection";
import { getSession } from "@/auth";
import { Modal, Tag } from "@/components/uikit";
import { fetchImageSrc } from "@/lib/utils/fetch-image-src";
import { bookingsGroupedByDateAndPremiseAndPayment } from "@/lib/utils/groupBy-bookings";
import { Booking } from "@/lib/utils/premise-booking";
import { HStack } from "~/styled-system/jsx";
import { useTranslations } from "next-intl";

export async function PremiseMyBookings({
  bookingsViaWebsite,
  bookingsBlockedByAdmin,
}: {
  bookingsViaWebsite: Booking[];
  bookingsBlockedByAdmin: Booking[];
}) {
  const t = useTranslations("profile.my_bookings");
  const session = await getSession();

  const statusColorPallets: Record<TicketIntentStatus, string> = {
    failed: "danger",
    succeed: "success",
    progress: "primary",
  };

  const labels = {
    date: {
      format: ({ date }: { date: Date }) => (
        <HStack gap="3px">
          <LiaCalendar size="1.125em" />
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

  const groupedBookings = Object.entries(
    bookingsGroupedByDateAndPremiseAndPayment(bookingsViaWebsite),
  );

  const imageSrcs: Record<string, string> = {};
  for (const booking of [...bookingsViaWebsite, ...bookingsBlockedByAdmin]) {
    imageSrcs[booking.premiseId] = await fetchImageSrc(booking.premiseId);
  }

  const MyBookings = () =>
    groupedBookings.map(([date, premises]) => (
      <BookingsSection
        key={date}
        date={date}
        premises={premises}
        imageSrcs={imageSrcs}
        labels={labels}
      />
    ));

  const OrganizationBookings = () =>
    bookingsBlockedByAdmin.map((booking: Booking) => (
      <div key={booking.id}>
        <BookingCard
          booking={booking}
          imageSrc={imageSrcs[booking.premiseId]}
          labels={labels}
        />
        <Modal>
          <CancelBookingBtn
            bookingStartTime={booking.startTime}
            bookingCancelTerm={booking.premise.bookingCancelTerm}
            premiseSlotIds={[booking.id]}
            paymentIntentId={booking.paymentIntentId}
            premiseAmount={0}
            discountAmount={booking.discountAmount}
            isActive={true}
          />
        </Modal>
      </div>
    ));

  const WithErrorMyBookings = withError(MyBookings);
  const WithErrorOrganizationBookings = withError(OrganizationBookings);

  const tabs = [
    {
      label: t("tab_booked_via_website"),
      content: <WithErrorMyBookings>{bookingsViaWebsite}</WithErrorMyBookings>,
    },
    {
      label: t("tab_blocked_by_admin"),
      content: (
        <WithErrorOrganizationBookings>
          {bookingsBlockedByAdmin}
        </WithErrorOrganizationBookings>
      ),
    },
  ];

  const renderBookings = () => {
    if (session?.user?.role === "organization") {
      return <Tabs tabs={tabs} />;
    }
    return <WithErrorMyBookings>{bookingsViaWebsite}</WithErrorMyBookings>;
  };

  return renderBookings();
}
