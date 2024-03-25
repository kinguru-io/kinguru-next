"use client";

import { compareAsc, lightFormat } from "date-fns";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import { LiaCalendar } from "react-icons/lia";
import { useBookingView } from "../BookingViewContext";
import { TimeSlotCard } from "../TimeSlotCard";
import {
  Button,
  Card,
  CardFooter,
  CardInner,
  Checkbox,
} from "@/components/uikit";
import { priceFormatter } from "@/lib/utils";
import { groupBy } from "@/lib/utils/array";
import { Box, Center, Flex, Grid, HStack } from "~/styled-system/jsx";

export function BookingViewCard() {
  const t = useTranslations("booking_view");
  const { selectedSlots } = useBookingView();
  const [isUserAwareOfRules, setAwarenessState] = useState(false);

  const areThereNoSlots = selectedSlots.length === 0;
  const total = selectedSlots.reduce(
    (totalPrice, { price }) => totalPrice + price,
    0,
  );

  const checboxChanged = () => {
    setAwarenessState((prevState) => !prevState);
  };

  return (
    <Card
      border="1px solid"
      borderColor="neutral.2"
      alignSelf="flex-start"
      minHeight="352px"
      position="sticky"
      top="100px" // header height + 15px
    >
      <CardInner padding="25px 18px" alignItems="center" gap="0px">
        <h4>{t("card_heading")}</h4>
        {areThereNoSlots ? (
          <NoBookingsNotice label={t("no_selected_slots")} />
        ) : (
          <BookingSlotsListing />
        )}
        <CardFooter
          width="full"
          display="flex"
          gap="20px"
          flexDirection="column"
          alignItems="center"
          css={{ "& .button": { width: "min-content" } }}
        >
          {!areThereNoSlots && (
            <>
              <PriceBlock price={{ total }} />
              <Checkbox
                checked={isUserAwareOfRules}
                onChange={checboxChanged}
                label={t("rules_agreement")}
                required
              />
            </>
          )}
          <Button size="md" disabled={!isUserAwareOfRules || areThereNoSlots}>
            {t("pay_btn")}
          </Button>
        </CardFooter>
      </CardInner>
    </Card>
  );
}

function BookingSlotsListing() {
  const t = useTranslations("booking_view");
  const { selectedSlots, toggleSlot } = useBookingView();

  const groupedSlots = groupBy(
    Array.from(selectedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.time, slotB.time),
    ),
    ({ time }) => lightFormat(time, "dd.MM.yyyy"),
  );

  return (
    <Grid
      alignSelf="stretch"
      gridAutoFlow="row"
      marginBlock="30px 40px"
      gap="30px"
    >
      {Object.entries(groupedSlots).map(([date, slots]) => {
        return (
          <Grid gap="10px" gridAutoFlow="row">
            <HStack gap="3px">
              <LiaCalendar size="1.125em" /> <time dateTime={date}>{date}</time>
            </HStack>
            {slots.map((timeSlotInfo) => (
              <TimeSlotCard
                key={"booking-view" + timeSlotInfo.time.toISOString()}
                onClick={() => toggleSlot(timeSlotInfo)}
                buttonLabel={t("remove_timeslot_btn")}
                {...timeSlotInfo}
              />
            ))}
          </Grid>
        );
      })}
    </Grid>
  );
}

function NoBookingsNotice({ label }: { label: string }) {
  return (
    <Center
      flexBasis="full"
      maxWidth="156px"
      textStyle="body.2"
      textAlign="center"
      color="neutral.2"
    >
      <span>{label}</span>
    </Center>
  );
}

// TODO initial implementation. Should be moved out there
type PriceBlockProps = {
  price: {
    total: number;
  };
};

function PriceBlock({ price }: PriceBlockProps) {
  const t = useTranslations("price");

  const { total } = price;

  return (
    <Box
      alignSelf="stretch"
      paddingBlockStart="10px"
      marginBlockStart="auto"
      borderBlockStart="1px solid"
      borderColor="neutral.2"
      textStyle="body.3"
      css={{ "& > [data-total=true]": { textStyle: "heading.4" } }}
    >
      <Flex justifyContent="space-between" data-total={true}>
        <span>{t("total")}</span>
        <span>{priceFormatter.format(total)}</span>
      </Flex>
    </Box>
  );
}
