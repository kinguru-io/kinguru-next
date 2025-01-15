import { getTranslations } from "next-intl/server";
import Tabs from "./Tabs";
import { withError } from "./withError";
import BookingCard from "../uikit/PremiseMyBookingCard/BookingCard";
import BookingsSection from "../uikit/PremiseMyBookingCard/BookingsSection";
import { getSession } from "@/auth";
import { fetchImageSrc } from "@/lib/utils/fetch-image-src";
import { bookingsGroupedByDateAndPremiseAndPayment } from "@/lib/utils/groupBy-bookings";
import type { Booking } from "@/lib/utils/premise-booking";

export async function PremiseMyBookings({
  bookingsViaWebsite,
  bookingsBlockedByAdmin,
  bookingsCanceled,
}: {
  bookingsViaWebsite: Booking[];
  bookingsBlockedByAdmin: Booking[];
  bookingsCanceled: Booking[];
}) {
  const t = await getTranslations("profile.my_bookings");
  const session = await getSession();

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
      />
    ));

  const MyCanceledBookings = () =>
    Object.entries(
      bookingsGroupedByDateAndPremiseAndPayment(bookingsCanceled),
    ).map(([date, premises]) => (
      <BookingsSection
        key={date}
        date={date}
        premises={premises}
        imageSrcs={imageSrcs}
      />
    ));

  const OrganizationBookings = () =>
    bookingsBlockedByAdmin.map((booking) => (
      <div key={booking.id}>
        <BookingCard
          booking={booking}
          imageSrc={imageSrcs[booking.premiseId]}
          isCompany={session?.user?.role === "organization"}
        />
      </div>
    ));

  const WithErrorMyBookings = withError(MyBookings);
  const WithErrorOrganizationBookings = withError(OrganizationBookings);
  const WithErrorMyCanceledBookings = withError(MyCanceledBookings);

  const tabsUserBooking = [
    {
      label: t("tab_booked_active"),
      content: <WithErrorMyBookings>{bookingsViaWebsite}</WithErrorMyBookings>,
    },
    {
      label: t("tab_booked_canceled"),
      content: (
        <WithErrorMyCanceledBookings>
          {bookingsCanceled}
        </WithErrorMyCanceledBookings>
      ),
    },
  ];

  const tabsOrgBooking = [
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
    {
      label: t("tab_booked_canceled"),
      content: (
        <WithErrorMyCanceledBookings>
          {bookingsCanceled}
        </WithErrorMyCanceledBookings>
      ),
    },
  ];

  return (
    <Tabs
      tabs={
        session?.user?.role === "organization"
          ? tabsOrgBooking
          : tabsUserBooking
      }
    />
  );
}
