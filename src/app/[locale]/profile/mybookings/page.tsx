import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { SubSection } from "@/components/common/cards/sub-section";
import { PremiseMyBookings } from "@/components/premise/PremiseMyBookings";
import { NoticeScreen } from "@/components/profile";
import {
  getBookingsViaWebsite,
  getBookingsByRole,
  getCanceledBookingsByRole,
} from "@/lib/actions/booking";
import { Booking, isUserOrganization } from "@/lib/utils/premise-booking";

export default async function MyBookingsPage() {
  const t = await getTranslations("profile.my_bookings");
  const session = await getSession();
  const userId = session?.user?.id!;
  const isUserOrg = await isUserOrganization();

  let bookingsViaWebsite: Booking[] = [];
  let bookingsBlockedByAdmin: any[] = [];
  let bookingsCanceled: any[] = [];

  if (isUserOrg && !session?.user?.organizations.at(0)) {
    return (
      <SubSection>
        <h2 className="title">{t("heading")}</h2>
        <NoticeScreen
          noticeText={t("no_organization_warn_msg")}
          href="/profile/edit"
          linkLabel={t("no_organization_link_label")}
        />
      </SubSection>
    );
  }

  if (isUserOrg) {
    // @ts-ignore
    bookingsViaWebsite = await getBookingsViaWebsite(userId);
    bookingsBlockedByAdmin = await getBookingsByRole(
      userId,
      "blocked_by_admin",
    );
    bookingsCanceled = await getBookingsViaWebsite(userId, "true");
  } else {
    // @ts-ignore
    bookingsViaWebsite = await getBookingsByRole(userId);
    bookingsCanceled = await getCanceledBookingsByRole(userId);
  }

  return (
    <SubSection>
      <h2 className="title">{t("heading")}</h2>
      <PremiseMyBookings
        bookingsViaWebsite={bookingsViaWebsite}
        bookingsBlockedByAdmin={bookingsBlockedByAdmin}
        bookingsCanceled={bookingsCanceled}
      />
    </SubSection>
  );
}
