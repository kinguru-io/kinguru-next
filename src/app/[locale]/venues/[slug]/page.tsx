import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { PremiseListing } from "@/components/premise";
import { VenueDescriptionCollapse, VenueMap } from "@/components/venue/";
import { VenueMainInfoLayout, VenueMapLayout } from "@/layout/block";
import prisma from "@/server/prisma";

import { css } from "~/styled-system/css";
import { AspectRatio, Container } from "~/styled-system/jsx";

export default async function VenuePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const t = await getTranslations("venue.public_page");

  const venue = await prisma.venue.findUnique({
    where: { slug },
    include: {
      premises: {
        select: { id: true },
      },
    },
  });

  if (!venue) {
    notFound();
  }

  return (
    <>
      <VenueMainInfoLayout bgImageSrc={venue.image || ""}>
        <h1 className={css({ textAlign: "center" })}>{venue.name}</h1>
        <AspectRatio
          ratio={16 / 9}
          maxWidth="900px"
          marginInline="auto"
          marginBlock="30px 60px"
          borderRadius="6px"
          overflow="hidden"
        >
          <Image
            src={venue.image || ""}
            alt={t("image_alt", { name: venue.name })}
            fill
          />
        </AspectRatio>
        <VenueDescriptionCollapse description={venue.description} />
      </VenueMainInfoLayout>

      <Container paddingBlock="26px 42px">
        <section>
          <h2 className={css({ textAlign: "center" })}>
            {t("premises_heading")}
          </h2>
          <PremiseListing premiseIdList={venue.premises} />
        </section>
      </Container>

      <VenueMapLayout>
        <h2 className={css({ textAlign: "center" })}>{t("map")}</h2>
        <AspectRatio ratio={16 / 9} marginBlockStart="50px">
          <VenueMap mapboxId={venue.locationMapboxId || ""} />
        </AspectRatio>
      </VenueMapLayout>
    </>
  );
}
