import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import {
  BookingViewCard,
  BookingViewProvider,
  WeekView,
} from "@/components/calendar";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import { PremiseAttributes, PremiseAmenities } from "@/components/premise";
import {
  AccordinItemToggle,
  Accordion,
  AccordionItem,
  AccordionItemContent,
  Slider,
  SliderItem,
} from "@/components/uikit";
import {
  PremiseAccordionLayout,
  PremiseCalendarLayout,
  PremiseMainInfoLayout,
  PremiseMapLayout,
} from "@/layout/block/premise";
import { groupBy } from "@/lib/utils/array";
import {
  generateBookedTimeSlots,
  generateTimeSlots,
} from "@/lib/utils/premise-time-slots";
import type { Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import { AspectRatio, Box, Grid, VStack } from "~/styled-system/jsx";

export default async function PremisePage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale };
}) {
  const nowDate = new Date();
  const premise = await prisma.premise.findUnique({
    where: {
      slug: slug,
    },
    include: {
      venue: true,
      resources: true,
      slots: {
        where: {
          date: { gte: nowDate.toISOString() },
        },
      },
      openHours: {
        include: {
          pricing: true,
        },
      },
    },
  });

  if (!premise) {
    notFound();
  }

  const t = await getTranslations("premise");
  const {
    name,
    venue,
    resources,
    slots,
    openHours,
    rules,
    amenities,
    direction,
    bookingCancelTerm,
  } = premise;

  const pricings = await prisma.premisePricing.findMany({
    where: {
      premiseOpenHoursId: {
        in: openHours.map((openHoursRecord) => openHoursRecord.id),
      },
    },
    orderBy: { priceForHour: "asc" },
    select: { priceForHour: true },
  });

  const timeSlots = openHours.map((record) => generateTimeSlots(record));
  const timeSlotsGroup = groupBy(timeSlots, ({ day }) => day);
  const bookedSlots = generateBookedTimeSlots(slots);

  const accordionItems = [
    {
      title: t("amenities_and_facilities"),
      description: <PremiseAmenities amenities={amenities} />,
    },
    { title: t("booking_cancellation_terms"), description: bookingCancelTerm },
    { title: t("premise_rules"), description: rules },
    { title: t("how_to_get_there"), description: direction },
  ];

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

      <PremiseAccordionLayout>
        <Accordion>
          {accordionItems.map(({ title, description }) => (
            <AccordionItem key={title}>
              <AccordinItemToggle textStyle="heading.3">
                {title}
              </AccordinItemToggle>
              <AccordionItemContent>{description}</AccordionItemContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PremiseAccordionLayout>

      <PremiseCalendarLayout>
        <BookingViewProvider>
          <Grid gap="20px" gridTemplateColumns="1fr 260px">
            <WeekView
              locale={locale}
              nowDate={nowDate}
              timeSlotsGroup={timeSlotsGroup}
              bookedSlots={bookedSlots}
              aggregatedPrices={{
                minPrice: pricings.at(0)?.priceForHour,
                maxPrice: pricings.at(-1)?.priceForHour,
              }}
            />
            <BookingViewCard />
          </Grid>
        </BookingViewProvider>
      </PremiseCalendarLayout>

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
