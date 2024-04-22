import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth.ts";
import { ProfileSectionLayout } from "@/layout/page";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

export default async function AddPremisePage({
  searchParams: { venueId },
}: {
  searchParams: { venueId?: string };
}) {
  if (!venueId) {
    return redirect("/profile/venues");
  }

  const session = await getSession();

  const organization = session?.user?.organizations.at(0);

  const venue = await prisma.venue.findUnique({
    where: { id: venueId, organizationId: organization?.id },
  });

  if (!venue) {
    return redirect("/profile/venues");
  }

  const t = await getTranslations("profile.venues.add_premise");

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
    </ProfileSectionLayout>
  );
}
