import { getTranslations } from "next-intl/server";
import { EditVenueForm } from "./form";
import { PremiseView } from "@/components/premise";
import { AddItemLink } from "@/components/profile";
import { ProfileSectionLayout } from "@/layout/page";
import { editVenueAction } from "@/lib/actions/venue";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";
import { Box, Grid } from "~/styled-system/jsx";

export default async function ProfileVenuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const venue = await prisma.venue.findUnique({
    where: { id },
    include: {
      premises: { orderBy: { updatedAt: "desc" }, select: { id: true } },
      manager: true,
    },
  });

  if (!venue) {
    return redirect("/profile/venues");
  }

  const t = await getTranslations("profile.venues");
  const { premises, ...restVenue } = venue;

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{venue.name}</h1>
      <section>
        <EditVenueForm venue={restVenue} editVenue={editVenueAction} />
        <Box
          textStyle="heading.6"
          marginBlock="80px 20px"
          paddingInlineStart="30px"
        >
          {t("premises_heading")}
        </Box>
        <Grid gap="20px" gridAutoRows="fr">
          {premises.map(({ id: premiseId }) => (
            <PremiseView
              key={premiseId}
              id={premiseId}
              linkLabel={t("edit_premise_link_label")}
              href={`/profile/venues/${id}/edit-premise?venueId=${id}&premiseId=${premiseId}`}
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
