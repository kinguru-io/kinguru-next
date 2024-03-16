import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import { PremiseAttributes } from "@/components/premise/";
import { Slider, SliderItem } from "@/components/uikit";
import {
  PremiseMainInfoLayout,
  PremiseMapLayout,
} from "@/layout/block/premise/";
import { css } from "~/styled-system/css";
import { AspectRatio, Box, VStack } from "~/styled-system/jsx";

export default async function PremisePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const premise = await prisma.premise.findFirst({
    where: {
      slug: slug,
    },
    include: {
      venue: true,
      resources: true,
      openHours: { include: { pricing: { select: { priceForHour: true } } } },
    },
  });

  if (!premise) {
    notFound();
  }

  const { name, venue, resources, openHours } = premise;
  const t = await getTranslations("premise");

  const hoursWithMinPrices = await Promise.allSettled(
    openHours.map((openHour) =>
      prisma.premisePricing
        .aggregate({
          where: {
            premiseOpenHoursId: openHour.id,
          },
          _min: { priceForHour: true },
        })
        .then(({ _min: { priceForHour } }) => ({ priceForHour })),
    ),
  );

  // TODO: add profilling

  // const minPrice = Math.min(
  //   ...profilingHoursWithMinPrices.map((hour) => hour.value.priceForHour),
  // );

  return (
    <>
      <PremiseMainInfoLayout>
        <VStack gap="0">
          <h1>{name}</h1>
          <span className={css({ textStyle: "body.1" })}>{venue.name}</span>
        </VStack>
        <Box w="100%">
          <Slider slidesCount={resources.length}>
            {resources.map((resource) => (
              <SliderItem key={resource.id}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={resource.url} fill alt={name} />
                </AspectRatio>
              </SliderItem>
            ))}
          </Slider>
        </Box>
        {/*TODO: insert dropdown component */}
      </PremiseMainInfoLayout>

      <PremiseAttributes mapboxId={venue.locationMapboxId} price={100} />

      <PremiseMapLayout>
        <h2 className={css({ textAlign: "center" })}>{t("map")}</h2>
        <AspectRatio ratio={16 / 9} marginBlockStart="50px">
          <SingleMarkerMap
            mapboxId={venue.locationMapboxId}
            image={venue.image}
            name={name}
          />
        </AspectRatio>
      </PremiseMapLayout>
    </>
  );
}
