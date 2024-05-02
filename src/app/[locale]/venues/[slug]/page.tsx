import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { Description } from "@/components/common/description";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import { PremiseListing } from "@/components/premise";
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
        orderBy: { updatedAt: "desc" },
        select: { id: true },
      },
    },
  });

  if (!venue) {
    notFound();
  }

  const { image, name, premises, description } = venue;

  return (
    <>
      <VenueMainInfoLayout bgImageSrc={image}>
        <h1 className={css({ textAlign: "center" })}>{name}</h1>
        <AspectRatio
          ratio={16 / 9}
          maxWidth="820px"
          marginInline="auto"
          marginBlock="30px 60px"
          borderRadius="6px"
          overflow="hidden"
        >
          <Image
            src={image}
            alt={t("image_alt", { name })}
            width={820}
            height={461}
          />
        </AspectRatio>
        <Description
          description={description}
          showLessLabel={t("show_less")}
          showMoreLabel={t("show_more")}
        />
      </VenueMainInfoLayout>

      <Container paddingBlock="26px 42px">
        <section>
          <h2 className={css({ textAlign: "center" })}>
            {t("premises_heading")}
          </h2>
          <PremiseListing premiseIdList={premises} />
        </section>
      </Container>

      <VenueMapLayout>
        <h2 className={css({ textAlign: "center" })}>{t("map")}</h2>
        <AspectRatio
          ratio={{ base: 4 / 3, md: 16 / 9 }}
          marginBlockStart="50px"
        >
          <SingleMarkerMap
            mapboxId={venue.locationMapboxId}
            image={image}
            name={name}
          />
        </AspectRatio>
      </VenueMapLayout>
    </>
  );
}
