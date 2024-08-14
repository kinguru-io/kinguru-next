import { getTranslations } from "next-intl/server";
import { EditVenueForm } from "./form";
import { SubSection } from "@/components/common/cards/sub-section";
import { PremiseView } from "@/components/premise";
import { AddItemLink } from "@/components/profile";
import {
  Accordion,
  AccordionItemContent,
  AccordionItemToggle,
} from "@/components/uikit";
import { editVenueAction } from "@/lib/actions/venue";
import { redirect } from "@/navigation.ts";
import prisma from "@/server/prisma.ts";
import { css } from "~/styled-system/css";
import { Grid, Stack } from "~/styled-system/jsx";

export default async function ProfileVenuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const venue = await prisma.venue.findUnique({
    where: { id },
    include: {
      information: true,
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
    <Stack css={{ md: { gap: "8" } }}>
      <SubSection>
        <h1 className={css({ fontSize: "3xl", fontWeight: "bold" })}>
          {venue.name}
        </h1>
        <Accordion>
          <AccordionItemToggle>{t("edit_venue_btn_label")}</AccordionItemToggle>
          <AccordionItemContent>
            <EditVenueForm venue={restVenue} editVenue={editVenueAction} />
          </AccordionItemContent>
        </Accordion>
      </SubSection>
      <SubSection>
        <span className="title">{t("premises_heading")}</span>
        <Grid
          css={{
            gap: "4",
            gridTemplateColumns: "repeat(auto-fill, minmax({spacing.72}, 1fr))",
            md: { gap: "8" },
          }}
        >
          <AddItemLink
            minHeight="60"
            href={`/profile/venues/${id}/add-premise`}
            label={t("add_premise_btn_label")}
          />
          {premises.map(({ id: premiseId }) => (
            <PremiseView
              key={premiseId}
              id={premiseId}
              href={`/profile/venues/${id}/${premiseId}`}
            />
          ))}
        </Grid>
      </SubSection>
    </Stack>
  );
}
