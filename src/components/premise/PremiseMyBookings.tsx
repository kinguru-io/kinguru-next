import { useTranslations } from "next-intl";
import Tabs from "./Tabs";
import { withError } from "./withError";
import BookingCard from "../uikit/PremiseMyBookingCard/BookingCard";
import BookingsSection from "../uikit/PremiseMyBookingCard/BookingsSection";
import { getSession } from "@/auth";
import { fetchImageSrc } from "@/lib/utils/fetch-image-src";
import { bookingsGroupedByDateAndPremiseAndPayment } from "@/lib/utils/groupBy-bookings";
import { Booking, ORGANIZATION_ROLE } from "@/lib/utils/premise-booking";

export async function PremiseMyBookings({
  bookingsViaWebsite,
  bookingsBlockedByAdmin,
}: {
  bookingsViaWebsite: Booking[];
  bookingsBlockedByAdmin: Booking[];
}) {
  const t = useTranslations("profile.my_bookings");
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

  const OrganizationBookings = () =>
    bookingsBlockedByAdmin.map((booking: Booking) => (
      <div key={booking.id}>
        <BookingCard
          booking={booking}
          imageSrc={imageSrcs[booking.premiseId]}
        />
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
    if (session?.user?.role === ORGANIZATION_ROLE) {
      return <Tabs tabs={tabs} />;
    }
    return <WithErrorMyBookings>{bookingsViaWebsite}</WithErrorMyBookings>;
  };

  return renderBookings();
}
