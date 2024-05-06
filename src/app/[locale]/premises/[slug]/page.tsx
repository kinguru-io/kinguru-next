import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  BookingViewCard,
  BookingViewProvider,
  WeekView,
  DiscountViewCard,
  PriceDescription,
} from "@/components/calendar";
import { MapboxSearchBoxResponseProvider } from "@/components/common/maps/MapboxResponseProvider";
import { SingleMarkerMap } from "@/components/common/maps/SingleMarkerMap";
import { PremiseAttributes, PremiseAmenities } from "@/components/premise";
import {
  AccordionItemToggle,
  Accordion,
  AccordionItem,
  AccordionItemContent,
  Modal,
  Slider,
  SliderItem,
  Tag,
} from "@/components/uikit";
import {
  PremiseAccordionLayout,
  PremiseCalendarLayout,
  PremiseMainInfoLayout,
  PremiseMapLayout,
} from "@/layout/block/premise";
import {
  cancelPremiseSlotsIntent,
  createPremiseSlotsIntent,
  revalidatePremisePage,
} from "@/lib/actions/booking";
import type { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import { groupBy } from "@/lib/utils/array";
import {
  prepareBookedSlots,
  generateTimeSlots,
} from "@/lib/utils/premise-time-slots";
import { prepareDiscountRangeMap } from "@/lib/utils/price";
import { Link, type Locale } from "@/navigation";
import { css } from "~/styled-system/css";
import {
  AspectRatio,
  Box,
  Grid,
  InlineBox,
  Stack,
  VStack,
} from "~/styled-system/jsx";

export default async function PremisePage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale };
}) {
  const nowDate = new Date();
  const premise = await prisma.premise.findUnique({
    where: { slug },
    include: {
      venue: true,
      resources: true,
      discounts: {
        orderBy: {
          duration: "asc",
        },
      },
      slots: {
        where: {
          date: { gte: nowDate.toISOString() },
        },
      },
      openHours: {
        orderBy: {
          price: "asc",
        },
      },
    },
  });

  if (!premise) {
    notFound();
  }

  const t = await getTranslations("premise");
  const translationsBCT = await getTranslations("booking_cancel_terms");
  const {
    name,
    venue,
    resources,
    discounts,
    slots,
    openHours,
    rules,
    amenities,
    bookingCancelTerm,
    area,
    capacity,
  } = premise;

  const minPrice = openHours.at(0)?.price;
  const maxPrice = openHours.at(-1)?.price;

  const timeSlots = openHours.map((record) => generateTimeSlots(record));
  const timeSlotsGroup = groupBy(timeSlots, ({ day }) => day);
  const bookedSlots = prepareBookedSlots(slots);
  const discountMap = prepareDiscountRangeMap(discounts);

  const accordionItems = [
    {
      title: t("amenities_and_facilities"),
      description: <PremiseAmenities amenities={amenities} />,
    },
    {
      title: t("area_and_capacity"),
      description: (
        <Stack alignItems="flex-start" gap="15px">
          <Tag variant="secondaryLighter" size="md" fontWeight="normal">
            {t("area", { area })}
          </Tag>
          <Tag variant="secondaryLighter" size="md" fontWeight="normal">
            {t("capacity", { capacity })}
          </Tag>
        </Stack>
      ),
    },
    {
      title: t("booking_cancellation_terms"),
      description: bookingCancelTerm && (
        <Stack gap="20px" color="neutral.0">
          <InlineBox textStyle="body.1">
            {translationsBCT(bookingCancelTerm as BookingCancelTerm)}
          </InlineBox>
          <p>
            {translationsBCT(`${bookingCancelTerm as BookingCancelTerm}_desc`)}
          </p>
        </Stack>
      ),
    },
    { title: t("premise_rules"), description: rules },
    { title: t("how_to_get_there"), description: venue.locationTutorial },
  ];

  return (
    <MapboxSearchBoxResponseProvider mapboxId={venue.locationMapboxId}>
      <PremiseMainInfoLayout>
        <VStack gap="0">
          <h1>{name}</h1>
          <Link
            className={css({
              textStyle: "body.1",
              textDecoration: {
                _hover: "underline",
                _focus: "underline",
              },
            })}
            href={`/venues/${venue.slug}`}
          >
            {venue.name}
          </Link>
        </VStack>
        <PremiseAttributes price={minPrice} />
        <Box w="100%">
          <Slider slidesCount={resources.length}>
            {resources.map((resource) => (
              <SliderItem key={resource.id}>
                <AspectRatio ratio={16 / 9}>
                  <Image src={resource.url} fill alt="" />
                </AspectRatio>
              </SliderItem>
            ))}
          </Slider>
        </Box>
        {/* TODO insert dropdown component */}
      </PremiseMainInfoLayout>

      <PremiseAccordionLayout>
        <Accordion>
          {accordionItems.map(({ title, description }) => (
            <AccordionItem key={title}>
              <AccordionItemToggle textStyle="heading.3" fontWeight="bold">
                {title}
              </AccordionItemToggle>
              <AccordionItemContent>{description}</AccordionItemContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PremiseAccordionLayout>

      <PremiseCalendarLayout>
        <h2>{t("calendar_heading")}</h2>
        <BookingViewProvider>
          <Grid
            gap="20px"
            gridTemplateColumns={{ base: "1fr", md: "1fr 260px" }}
          >
            <WeekView
              locale={locale}
              nowDate={nowDate}
              timeSlotsGroup={timeSlotsGroup}
              bookedSlots={bookedSlots}
              aggregatedPrices={{
                minPrice,
                maxPrice,
              }}
            />
            <Grid
              gap="30px"
              gridAutoFlow="row"
              position="sticky"
              top="100px" // header height + 15px
              height="min-content"
            >
              <Modal>
                <BookingViewCard
                  premiseId={premise.id}
                  createIntent={createPremiseSlotsIntent}
                  cancelIntent={cancelPremiseSlotsIntent}
                  revalidateFn={revalidatePremisePage}
                  discountsMap={discountMap}
                />
              </Modal>
              <DiscountViewCard discounts={discounts} locale={locale} />
              <PriceDescription />
            </Grid>
          </Grid>
        </BookingViewProvider>
      </PremiseCalendarLayout>

      <PremiseMapLayout>
        <h2 className={css({ textAlign: "center" })}>{t("map")}</h2>
        <AspectRatio
          ratio={{ base: 4 / 3, md: 16 / 9 }}
          marginBlockStart="50px"
        >
          <SingleMarkerMap
            mapboxId={venue.locationMapboxId}
            image={venue.image}
            name={name}
          />
        </AspectRatio>
      </PremiseMapLayout>
    </MapboxSearchBoxResponseProvider>
  );
}
