import { getTranslations } from "next-intl/server";
import { AddPremiseForm } from "./_form/form";
import { getSession } from "@/auth.ts";
import { ProfileSectionLayout } from "@/layout/page";
import { createPremiseAction } from "@/lib/actions/premise";
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

  const t = await getTranslations("profile.premises.add");

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      <section>
        <AddPremiseForm
          createPremiseAction={createPremiseAction}
          venueId={venue.id}
          mapboxId={venue.locationMapboxId}
        />
      </section>
    </ProfileSectionLayout>
  );
}
