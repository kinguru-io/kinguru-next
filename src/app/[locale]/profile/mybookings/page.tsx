import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { SubSection } from "@/components/common/cards/sub-section";
import { PremiseMyBookings } from "@/components/premise/PremiseMyBookings";
import {
  getBookingsViaWebsite,
  getBookingsByRole,
} from "@/lib/actions/booking";
import { Booking, isUserOrganization } from "@/lib/utils/premise-booking";

export default async function MyBookingsPage() {
  const t = await getTranslations("profile.my_bookings");
  const session = await getSession();
  const userId = session?.user?.id!;
  const isUserOrg = await isUserOrganization();

  let bookingsViaWebsite: Booking[] = [];
  let bookingsBlockedByAdmin: any[] = [];

  if (isUserOrg) {
    // @ts-ignore
    bookingsViaWebsite = await getBookingsViaWebsite(userId);
    bookingsBlockedByAdmin = await getBookingsByRole(
      userId,
      "blocked_by_admin",
    );
  } else {
    // @ts-ignore
    bookingsViaWebsite = await getBookingsByRole(userId);
  }

  return (
    <SubSection>
      <h2 className="title">{t("heading")}</h2>
      <PremiseMyBookings
        bookingsViaWebsite={bookingsViaWebsite}
        bookingsBlockedByAdmin={bookingsBlockedByAdmin}
      />
    </SubSection>
  );
}
