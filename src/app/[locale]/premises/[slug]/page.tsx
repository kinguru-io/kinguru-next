import Image from "next/image";
import { notFound } from "next/navigation";
import { PremiseAttributes } from "@/components/premise/PremiseAttributes";
import { Slider, SliderItem } from "@/components/uikit";
import { PremiseMainInfoLayout } from "@/layout/block/premise/PremiseMainInfoLayout";
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
    </>
  );
}
