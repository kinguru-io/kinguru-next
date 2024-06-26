import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { MapboxSearchBoxResponseProvider } from "@/components/common/maps/MapboxResponseProvider";
import { WarningNotice } from "@/components/profile";
import { AddItemLink } from "@/components/profile/AddItemLink";
import { VenueCardView } from "@/components/profile/profile-venue";
import { ProfileSectionLayout } from "@/layout/page";
import { GridItem } from "~/styled-system/jsx";

export default async function VenuesPage() {
  const t = await getTranslations("profile.venues");
  const session = await getSession();
  const organization = session?.user?.organizations.at(0);

  return (
    <ProfileSectionLayout>
      <h1 className="heading">{t("heading")}</h1>
      {organization ? (
        <VenueCardListing organizationId={organization.id} />
      ) : (
        <WarningNotice
          noticeText={t("no_organization_warn_msg")}
          href="/profile/edit"
          linkLabel={t("no_organization_link_label")}
        />
      )}
    </ProfileSectionLayout>
  );
}

async function VenueCardListing({
  organizationId,
}: {
  organizationId: string;
}) {
  const t = await getTranslations("profile.venues");
  const venues = await prisma.venue.findMany({
    where: { organizationId },
    orderBy: { updatedAt: "desc" },
    include: { premises: true },
  });

  return (
    <GridItem
      gridColumn="1 / -1"
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(auto-fill, minmax(310px, 1fr))"
    >
      {venues.map((venue) => (
        <MapboxSearchBoxResponseProvider
          key={venue.id}
          mapboxId={venue.locationMapboxId}
        >
          <VenueCardView venue={venue} noPremiseLabel={t("no_premises")} />
        </MapboxSearchBoxResponseProvider>
      ))}
      <AddItemLink
        maxWidth="310px"
        minHeight="330px"
        href="/profile/venues/add"
      />
    </GridItem>
  );
}
