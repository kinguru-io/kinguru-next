import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";

import { SubSection } from "@/components/common/cards/sub-section";
import { PremiseMyBookings } from "@/components/premise/PremiseMyBookings";
import { redirect } from "@/navigation.ts";

export default async function MyBookingsPage() {
  const t = await getTranslations("user.my_bookings");
  const session = await getSession();

  if (session?.user?.role !== "organization") {
    redirect("/");
  }
  const userBookings = await prisma.premiseSlot.findMany({
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
      <h2 className="title">
        {t("heading")} ({userBookings.length})
      </h2>
      {/*// @ts-ignore*/}
      <PremiseMyBookings userBookings={userBookings} />
    </SubSection>
  );
}
