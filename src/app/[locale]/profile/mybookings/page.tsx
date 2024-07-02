import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { PremiseMyBookings } from "@/components/premise/PremiseMyBookings";
import { ProfileSectionLayout } from "@/layout/page";
import { redirect } from "@/navigation.ts";
import { Stack } from "~/styled-system/jsx";

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
    <ProfileSectionLayout>
      <h1 className="heading">
        {t("heading")} ({userBookings.length})
      </h1>
      <section>
        <Stack gap="20px">
          <PremiseMyBookings userBookings={userBookings} />
        </Stack>
      </section>
    </ProfileSectionLayout>
  );
}
