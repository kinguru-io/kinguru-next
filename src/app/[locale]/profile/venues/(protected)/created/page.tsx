import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth.ts";
import { WarningNotice } from "@/components/profile";
import { ProfileSectionLayout } from "@/layout/page";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";

export default async function CreatedNoticePage({
  searchParams: { venueId },
}: {
  searchParams: { venueId?: string };
}) {
  if (!venueId) {
    redirect("/profile/venues");
  }

  const t = await getTranslations("profile.venues.created");
  const session = await getSession();

  const organization = session?.user?.organizations.at(0);

  const venue = await prisma.venue.findUnique({
    where: { id: venueId, organizationId: organization?.id },
  });

  if (!venue) {
    redirect("/profile/venues");
  }

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <WarningNotice
          noticeText={t("no_premise_warn_msg")}
          linkLabel={t("no_premise_link_label")}
          href={`/profile/venues/${venueId}/add-premise?venueId=${venueId}`}
        />
      </section>
    </ProfileSectionLayout>
  );
}
