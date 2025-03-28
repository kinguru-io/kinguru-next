import { User } from "@prisma/client";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Suspense, useId } from "react";
import { PremiseGallery } from "./_gallery";
import { getSession } from "@/auth";
import {
  BookingViewCard,
  BookingViewProvider,
  WeekView,
  DiscountViewCard,
  PriceDescription,
} from "@/components/calendar";
import { Description } from "@/components/common/description";
import {
  LinkToMap,
  LocationAddressFallback,
  LocationAddressField,
  MapSection,
} from "@/components/common/maps";
import { MapboxSearchBoxResponseProvider } from "@/components/common/maps/MapboxResponseProvider";
import { PremiseAmenities } from "@/components/premise";
import {
  PersonVerificationForm,
  QuickAccountCreation,
  QuickAuth,
  QuickSignIn,
} from "@/components/quick-account-creation";
import {
  AccordionItemToggle,
  Accordion,
  AccordionItem,
  AccordionItemContent,
  Modal,
  Tag,
  type AggregatedPrices,
  Loader,
  SpinnerIcon,
} from "@/components/uikit";
import { formatPriceWithTax, quickUserSignUp } from "@/lib/actions";
import {
  cancelPremiseSlotsIntent,
  createPremiseSlotsIntent,
  revalidatePremisePage,
} from "@/lib/actions/booking";
import type { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import { groupBy } from "@/lib/utils/array";
import {
  isUserOrganization,
  isUserOwnerOfPremise,
} from "@/lib/utils/premise-booking";
import {
  prepareBookedSlots,
  generateTimeSlots,
} from "@/lib/utils/premise-time-slots";
import { prepareDiscountRangeMap } from "@/lib/utils/price";
import { Link, type Locale } from "@/navigation";
import { css, cx } from "~/styled-system/css";
import {
  Box,
  Container,
  Flex,
  Grid,
  InlineBox,
  Stack,
} from "~/styled-system/jsx";
import { container } from "~/styled-system/patterns";
import { button } from "~/styled-system/recipes";

const alertBaseClasses = css.raw({
  fontSize: "sm",
  color: "dark",
  borderRadius: "sm",
  padding: "4",
});

export default async function PremisePage({
  params: { slug, locale },
}: {
  params: { slug: string; locale: Locale };
}) {
  const mapId = useId();
  const calendarId = useId();
  const nowDate = new Date();
  const premise = await prisma.premise.findUnique({
    where: { slug },
    include: {
      venue: true,
      resources: true,
      information: { where: { locale }, select: { description: true } },
      slots: {
        where: {
          date: { gte: nowDate.toISOString() },
          status: {
            not: "canceled",
          },
        },
      },
      discounts: { orderBy: { duration: "asc" } },
      openHours: { orderBy: { openTime: "asc" } },
    },
  });

  // TODO add `old slugs` field to `Premise` (or something like that) model to handle links with old slugs

  if (!premise) {
    return notFound();
  }

  const [session, t, translationsBCT, translationsBookingView] =
    await Promise.all([
      getSession(),
      getTranslations("premise"),
      getTranslations("booking_cancel_terms"),
      getTranslations("booking_view"),
    ]);
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
    minimalSlotsToBook,
    withConfirmation,
  } = premise;
  let user = null;
  if (session?.user?.id) {
    user = await prisma?.user?.findUnique({
      where: { id: session?.user?.id },
    });
  }

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

  const isTaxedPrice =
    user?.isRegisteredFromUntaxedForm && user.transactionCount <= 5;
  const parametersLine = [
    {
      title: t("amenities_and_facilities"),
      tagsList: <PremiseAmenities amenities={amenities} />,
    },
    {
      title: t("area_and_capacity"),
      tagsList: (
        <Flex gap="1" flexWrap="wrap">
          <Tag colorPalette="tertiary" fontSize="sm">
            {area} {t("area_literal")}
          </Tag>
          <Tag colorPalette="tertiary" fontSize="sm">
            {t("capacity", { capacity })}
          </Tag>
        </Flex>
      ),
    },
  ];

  const accordionItems = [
    {
      title: t("booking_cancellation_terms"),
      description: bookingCancelTerm && (
        <Stack gap="2">
          <InlineBox fontWeight="bold">
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

  const isOwner = await isUserOwnerOfPremise(premise?.venue?.organizationId);
  const isUserOrg = await isUserOrganization();

  const priceLabel = t("from", {
    price: await formatPriceWithTax(aggregatedPrices.minPrice || 0),
  });

  return (
    <>
      <section
        className={container({
          mdDown: { maxWidth: "unset", paddingInline: "unset" },
          md: {
            display: "grid",
            gap: "4%",
            gridTemplateColumns: "50% auto",
            paddingBlock: "8",
          },
        })}
      >
        <PremiseGallery resources={resources} />
        <Container
          css={{
            width: "full",
            mdDown: { paddingBlockStart: "4", paddingBlockEnd: "8" },
            md: { paddingInline: "unset" },
          }}
        >
          <Stack gap="4">
            <div>
              <h1 className={css({ textStyle: "heading.page" })}>{name}</h1>
              <Link
                className={css({
                  color: "secondary",
                  textDecoration: {
                    base: "underline",
                    _hoverOrFocusVisible: "none",
                  },
                })}
                href={`/venues/${venue.slug}`}
              >
                {venue.name}
              </Link>
              <Flex
                css={{ gap: "1", fontWeight: "bold", marginBlockStart: "3" }}
              >
                <Tag variant="solid" colorPalette="success">
                  {area} {t("area_literal")}
                </Tag>
                <Tag variant="solid" colorPalette="primary">
                  {priceLabel}
                </Tag>
              </Flex>
            </div>
            <LinkToMap mapId={mapId}>
              <Suspense fallback={<SpinnerIcon />}>
                <LocationAddressField
                  locationId={venue.locationMapboxId}
                  fallback={
                    <LocationAddressFallback
                      label={t("cannot_load_location")}
                    />
                  }
                />
              </Suspense>
            </LinkToMap>
            <Description
              description={premise.information.at(0)?.description || ""}
              showMoreLabel={t("show_more")}
              showLessLabel={t("show_less")}
            />
            <Link
              className={cx(
                button({ size: "lg" }),
                css({
                  marginBlockStart: "4",
                  justifyContent: "center",
                  sm: { width: "fit-content" },
                }),
              )}
              href={`#${calendarId}`}
            >
              {t("bookings_link")}
            </Link>
          </Stack>
        </Container>
      </section>

      <Box
        css={{
          bgColor: "secondary.lightest",
          paddingBlock: { base: "6", md: "8" },
        }}
      >
        <Container>
          <Flex gap="6" flexWrap="wrap">
            {parametersLine.map(({ title, tagsList }) => (
              <Stack
                key={title}
                css={{ gap: "4", flexBasis: "{sizes.md}", flexGrow: "1" }}
              >
                <InlineBox css={{ fontWeight: "bold", md: { fontSize: "lg" } }}>
                  {title}
                </InlineBox>
                {tagsList}
              </Stack>
            ))}
          </Flex>
        </Container>
      </Box>

      <section
        id={calendarId}
        className={container({ paddingBlock: { base: "6", md: "8" } })}
      >
        <BookingViewProvider
          priceMode={premise.priceMode}
          minimalPrice={premise.minimalPrice}
        >
          <Grid gap="10" gridTemplateColumns={{ base: "1fr", md: "1fr 19rem" }}>
            <MapboxSearchBoxResponseProvider
              mapboxId={venue.locationMapboxId}
              shouldFetchTimeZone
            >
              <WeekView
                locale={locale}
                nowDate={nowDate}
                timeSlotsGroup={timeSlotsGroup}
                bookedSlots={bookedSlots}
                isTaxedPrice={isTaxedPrice ?? false}
                aggregatedPrices={aggregatedPrices}
                headingSlot={
                  <h2 className={css({ textStyle: "heading.section" })}>
                    {t("calendar_heading")}
                  </h2>
                }
                subheadingSlot={
                  <>
                    {withConfirmation && (
                      <span
                        className={css(alertBaseClasses, {
                          bgColor: "secondary.lighter",
                        })}
                      >
                        ⚠️{" "}
                        {isOwner
                          ? translationsBookingView("booking_request_sent")
                          : translationsBookingView(
                              "booking_request_sent_client",
                            )}
                      </span>
                    )}
                    {(minimalSlotsToBook || 0) > 0 && (
                      <span
                        className={css(alertBaseClasses, {
                          textAlign: "center",
                          bgColor: "danger.lighter",
                          position: "sticky",
                          top: "2",
                          zIndex: "1",
                        })}
                      >
                        {t("minimum_slots_to_book", {
                          amount: minimalSlotsToBook,
                        })}
                      </span>
                    )}
                  </>
                }
              />
            </MapboxSearchBoxResponseProvider>
            <Stack
              css={{
                gap: "4",
                position: "sticky",
                top: "2",
                height: "min-content",
                md: { gap: "8" },
              }}
            >
              <Modal>
                <BookingViewCard
                  premiseId={premise.id}
                  premiseOrgId={premise.venue.organizationId}
                  createIntent={createPremiseSlotsIntent}
                  cancelIntent={cancelPremiseSlotsIntent}
                  revalidateFn={revalidatePremisePage}
                  discountsMap={discountMap}
                  isOwner={isOwner}
                  isUserOrg={isUserOrg}
                  user={user as User}
                  minimalSlotsToBook={minimalSlotsToBook}
                  session={session}
                  accountCreationSlot={
                    <QuickAuth
                      signUpSlot={
                        <QuickAccountCreation quickSignUp={quickUserSignUp} />
                      }
                      signInSlot={<QuickSignIn />}
                    />
                  }
                  personConfirmationSlot={<PersonVerificationForm />}
                />
              </Modal>
              <DiscountViewCard discounts={discounts} locale={locale} />
              <PriceDescription />
            </Stack>
          </Grid>
        </BookingViewProvider>
      </section>

      <Container>
        <Accordion
          css={{
            gap: "2",
            paddingBlock: "6",
            md: { gap: "4", paddingBlock: "8" },
          }}
        >
          {accordionItems.map(({ title, description }) => (
            <AccordionItem key={title}>
              <AccordionItemToggle
                css={{
                  fontSize: "px15",
                  fontWeight: "bold",
                  borderRadius: "sm",
                  _peerChecked: { bgColor: "primary" },
                  md: { padding: "6", fontSize: "md" },
                }}
              >
                {title}
              </AccordionItemToggle>
              <AccordionItemContent
                className={css({
                  padding: "4",
                  fontSize: "sm",
                  md: { paddingInline: "6", fontSize: "px15" },
                  whiteSpace: "pre-line",
                })}
              >
                {description}
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>

      <section
        id={mapId}
        className={css({
          marginBlockStart: "6",
          height: "50vh",
          maxHeight: "75vh",
          md: {
            height: "breakpoint-sm",
            marginBlockStart: "8",
          },
        })}
      >
        <h2 className={css({ srOnly: true })}>{t("map")}</h2>
        <Suspense fallback={<Loader />}>
          <MapSection
            locationId={venue.locationMapboxId}
            locationName={name}
            image={venue.image}
          />
        </Suspense>
      </section>
    </>
  );
}
