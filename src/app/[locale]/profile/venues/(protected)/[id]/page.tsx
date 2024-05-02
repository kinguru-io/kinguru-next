import { getTranslations } from "next-intl/server";
import { PremiseView } from "@/components/premise";
import { AddItemLink } from "@/components/profile";
import { ProfileSectionLayout } from "@/layout/page";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";
import { Grid } from "~/styled-system/jsx";

export default async function ProfileVenuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const venue = await prisma.venue.findUnique({
    where: { id },
    include: {
      premises: { orderBy: { updatedAt: "desc" }, select: { id: true } },
    },
  });

  if (!venue) {
    return redirect("/profile/venues");
  }

  const t = await getTranslations("profile.venues");

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{venue.name}</h1>
      <section>
        <Grid gap="20px" gridAutoRows="fr">
          {venue.premises.map(({ id: premiseId }) => (
            <PremiseView
              key={premiseId}
              id={premiseId}
              linkLabel={t("edit_premise_link_label")}
            />
          ))}
          <AddItemLink
            fontSize="8px" // for the plus icon to be smaller
            href={`/profile/venues/${id}/add-premise?venueId=${id}`}
            borderRadius="27px"
            minHeight="225px"
          />
        </Grid>
      </section>
    </ProfileSectionLayout>
  );
}
