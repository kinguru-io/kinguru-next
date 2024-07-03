import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import {
  BookingViewCard,
  BookingViewProvider,
  WeekView,
  DiscountViewCard,
  PriceDescription,
} from "@/components/calendar";
import { Description } from "@/components/common/description";
import { MapSection } from "@/components/common/maps";
import { MapboxSearchBoxResponseProvider } from "@/components/common/maps/MapboxResponseProvider";
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
  type AggregatedPrices,
  Loader,
} from "@/components/uikit";
import {
  PremiseAccordionLayout,
  PremiseCalendarLayout,
  PremiseMainInfoLayout,
} from "@/layout/block/premise";
import {
  cancelPremiseSlotsIntent,
  createPremiseSlotsIntent,
  revalidatePremisePage,
} from "@/lib/actions/booking";
import type { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import { groupBy } from "@/lib/utils/array";
import { isUserOwnerOfPremise } from "@/lib/utils/premise-booking";
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
      slots: {
        where: {
          date: { gte: nowDate.toISOString() },
        },
      },
      discounts: { orderBy: { duration: "asc" } },
      openHours: { orderBy: { openTime: "asc" } },
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

  const aggregatedPrices = openHours.reduce((borders, { price }) => {
    if (borders.minPrice === undefined || borders.maxPrice === undefined) {
      return { minPrice: price, maxPrice: price };
    }

    if (borders.minPrice >= price) {
      borders.minPrice = price;
    }

    if (borders.maxPrice <= price) {
      borders.maxPrice = price;
    }

    return borders;
  }, {} as AggregatedPrices);

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
          <Tag variant="secondaryLighter" size="md" fontWeight="500">
            {t("area", { area })}
          </Tag>
          <Tag variant="secondaryLighter" size="md" fontWeight="500">
            {t("capacity", { capacity })}
          </Tag>
        </Stack>
      ),
    },
    {
      title: t("booking_cancellation_terms"),
      description: bookingCancelTerm && (
        <Stack gap="20px" color="dark">
          <InlineBox textStyle="body.1">
            {translationsBCT(bookingCancelTerm as keyof typeof translationsBCT)}
          </InlineBox>
          <p>
            {translationsBCT(
              `${bookingCancelTerm as keyof typeof translationsBCT}_desc`,
            )}
          </p>
        </Stack>
      ),
    },
    { title: t("premise_rules"), description: rules },
    { title: t("how_to_get_there"), description: venue.locationTutorial },
  ];

  const isOwner = await isUserOwnerOfPremise(premise?.venue?.organizationId);

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
        <PremiseAttributes price={aggregatedPrices.minPrice} />
        <Box width="full" marginBlockEnd="30px">
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
        <Description
          description={premise.description}
          showMoreLabel={t("show_more")}
          showLessLabel={t("show_less")}
        />
      </PremiseMainInfoLayout>

      <PremiseAccordionLayout>
        <Accordion>
          {accordionItems.map(({ title, description }) => (
            <AccordionItem key={title}>
              <AccordionItemToggle textStyle="heading.6" fontWeight="bold">
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
              aggregatedPrices={aggregatedPrices}
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
                  isOwner={isOwner}
                />
              </Modal>
              <DiscountViewCard discounts={discounts} locale={locale} />
              <PriceDescription />
            </Grid>
          </Grid>
        </BookingViewProvider>
      </PremiseCalendarLayout>

      <section
        id="map" // TODO connect with link
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
            image={venue.image}
          />
        </Suspense>
      </section>
    </MapboxSearchBoxResponseProvider>
  );
}
