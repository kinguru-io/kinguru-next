// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { VenueDescriptionCollapse } from "./VenueDescriptionCollapse";
import { VenueMainInfoLayout, VenueMapLayout } from "@/layout/page";
import prisma from "@/server/prisma";
import { css } from "~/styled-system/css";
import { AspectRatio, Container } from "~/styled-system/jsx";

// TODO remove once venue's resources are defined
const image = faker.image.urlLoremFlickr({
  width: 1280,
  height: 720,
  category: "house",
});

export default async function VenuePage({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = await getTranslations("venue.public_page");

  const venue = await prisma.venue.findUnique({ where: { id } });

  if (!venue) {
    return "Not found";
  }

  return (
    <>
      <VenueMainInfoLayout bgImageSrc={image}>
        <h1 className={css({ textAlign: "center" })}>{venue.name}</h1>
        <AspectRatio
          ratio={16 / 9}
          maxWidth="900px"
          marginInline="auto"
          marginBlock="30px 60px"
          borderRadius="6px"
          overflow="hidden"
        >
          <Image src={image} alt={t("image_alt", { name: venue.name })} fill />
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
        <AspectRatio ratio={16 / 9}></AspectRatio>
      </VenueMapLayout>
    </>
  );
}
