import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";

import { SubSection } from "@/components/common/cards/sub-section";
import { PremiseMyBookings } from "@/components/premise/PremiseMyBookings";

export default async function MyBookingsPage() {
  const t = await getTranslations("profile.my_bookings");
  const session = await getSession();

  const allBookings = await prisma.premiseSlot.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      premise: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });

  return (
    <SubSection>
      <h2 className="title">{t("heading")}</h2>
      {/*// @ts-ignore*/}
      <PremiseMyBookings allBookings={allBookings} />
    </SubSection>
  );
}
