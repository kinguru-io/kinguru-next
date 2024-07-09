import { getTranslations } from "next-intl/server";
import { getSession } from "@/auth";
import { SubSection } from "@/components/common/cards/sub-section";
import { LocationAddressFallback } from "@/components/common/maps";
import { NoticeScreen } from "@/components/profile";
import { AddItemLink } from "@/components/profile/add-item-link";
import { VenueCardView } from "@/components/profile/profile-venue";
import { retrieveLocationPropertiesById } from "@/searchBox";
import { Grid } from "~/styled-system/jsx";

export default async function VenuesPage() {
  const t = await getTranslations("profile.venues");
  const session = await getSession();
  const organization = session?.user?.organizations.at(0);

  return (
    <SubSection>
      <h1 className="title">{t("heading")}</h1>
      {organization ? (
        <VenueCardListing organizationId={organization.id} />
      ) : (
        <NoticeScreen
          noticeText={t("no_organization_warn_msg")}
          href="/profile/edit"
          linkLabel={t("no_organization_link_label")}
        />
      )}
    </SubSection>
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

  const addresses = await Promise.allSettled(
    venues.map(({ locationMapboxId }) =>
      retrieveLocationPropertiesById(locationMapboxId),
    ),
  );

  return (
    <Grid
      css={{
        gap: "4",
        gridTemplateColumns: "repeat(auto-fill, minmax({spacing.72}, 1fr))",
        md: { gap: "8" },
      }}
    >
      <AddItemLink
        minHeight="60"
        href="/profile/venues/add"
        label={t("add_venue_btn_label")}
      />
      {venues.map((venue, idx) => {
        const locationProperties = addresses.at(idx);
        const address =
          locationProperties?.status === "fulfilled"
            ? locationProperties.value
            : null;
        const addressSlot = address?.full_address ||
          address?.place_formatted || (
            <LocationAddressFallback label={t("cannot_load_location")} />
          );

        return (
          <VenueCardView
            key={venue.id}
            venue={venue}
            noPremiseLabel={t("no_premises")}
            noPremiseLabelShort={t("no_premises_short")}
            addressSlot={addressSlot}
          />
        );
      })}
    </Grid>
  );
}
