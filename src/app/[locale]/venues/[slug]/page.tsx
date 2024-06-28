import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { Suspense, useId } from "react";
import { Description } from "@/components/common/description";
import {
  LocationAddressFallback,
  LocationAddressField,
  MapSection,
} from "@/components/common/maps";
import { PremiseStack } from "@/components/premise";
import { Loader, SpinnerIcon } from "@/components/uikit";
import { VenueMainInfoLayout } from "@/layout/block";
import prisma from "@/server/prisma";

import { css } from "~/styled-system/css";
import { Box, Container, Stack } from "~/styled-system/jsx";
import { container } from "~/styled-system/patterns";

export default async function VenuePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const mapId = useId();
  const t = await getTranslations("venue.public_page");
  const venue = await prisma.venue.findUnique({
    where: { slug },
    include: {
      premises: {
        orderBy: { updatedAt: "desc" },
        select: { id: true },
      },
    },
  });

  if (!venue) {
    return notFound();
  }

  const { image, name, premises, description } = venue;

  return (
    <>
      <VenueMainInfoLayout bgImageSrc={image}>
        <Stack gap="2">
          <h1>{name}</h1>
          <a
            href={`#${mapId}`}
            className={css({
              display: "flex",
              alignItems: "center",
              gap: "1",
              fontSize: "px13",
              "& > svg": {
                fontSize: "1.5em",
                color: "primary",
                flexShrink: "0",
              },
              md: { fontSize: "md" },
              _hoverOrFocusVisible: { color: "primary" },
            })}
          >
            <Suspense fallback={<SpinnerIcon />}>
              <LocationAddressField
                locationId={venue.locationMapboxId}
                fallback={
                  <LocationAddressFallback label={t("cannot_load_location")} />
                }
              />
            </Suspense>
          </a>
        </Stack>
      </VenueMainInfoLayout>

      <Box paddingBlock="8" borderBlockEnd="1px solid {colors.tertiary}">
        <Container>
          <Description
            description={description}
            showLessLabel={t("show_less")}
            showMoreLabel={t("show_more")}
          />
        </Container>
      </Box>

      <section className={container({ marginBlock: "8" })}>
        <h2
          className={css({
            textStyle: "heading.section",
            marginBlockEnd: { base: "6", md: "8" },
          })}
        >
          {t("premises_heading")}
        </h2>
        <PremiseStack premiseIdList={premises} />
      </section>

      <section
        id={mapId}
        className={css({
          height: { base: "50vh", md: "breakpoint-sm" },
          maxHeight: "75vh",
        })}
      >
        <h3 className={css({ srOnly: true })}>{t("map")}</h3>
        <Suspense fallback={<Loader />}>
          <MapSection
            locationId={venue.locationMapboxId}
            locationName={name}
            image={image}
          />
        </Suspense>
      </section>
    </>
  );
}
