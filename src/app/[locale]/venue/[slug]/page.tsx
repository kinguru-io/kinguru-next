import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { VenueDescriptionCollapse } from "./VenueDescriptionCollapse";
import { VenueMap } from "./VenueMap";
import { VenueMainInfoLayout, VenueMapLayout } from "@/layout/page";
import prisma from "@/server/prisma";
import { css } from "~/styled-system/css";
import { AspectRatio, Container } from "~/styled-system/jsx";

export default async function VenuePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const t = await getTranslations("venue.public_page");

  const venue = await prisma.venue.findFirst({
    where: { slug },
    select: {
      image: true,
      name: true,
      description: true,
      locationMapboxId: true,
      // premises: {
      //   select: {
      //     id: true,
      //     name: true,
      //     description: true,
      //     area: true,
      //     resources: {
      //       select: {
      //         id: true,
      //         url: true,
      //       },
      //     },
      //   },
      // },
    },
  });

  if (!venue) {
    notFound();
  }

  console.log(venue);

  return (
    <>
      <VenueMainInfoLayout bgImageSrc={venue.image}>
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
            src={venue.image}
            alt={t("image_alt", { name: venue.name })}
            fill
          />
        </AspectRatio>
        <VenueDescriptionCollapse description={venue.description} />
      </VenueMainInfoLayout>

      <Container paddingBlock="26px 40px">
        <h2 className={css({ textAlign: "center" })}>
          {t("premises_heading")}
        </h2>
      </Container>

      <VenueMapLayout>
        <h2 className={css({ textAlign: "center" })}>{t("map")}</h2>
        {/* <AspectRatio ratio={16 / 9}> */}
        <VenueMap mapboxId={venue.locationMapboxId} />
        {/* </AspectRatio> */}
      </VenueMapLayout>
    </>
  );
}
