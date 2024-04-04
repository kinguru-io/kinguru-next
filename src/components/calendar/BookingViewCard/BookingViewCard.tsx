"use client";

import type { Premise } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { compareAsc } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import { BookingSlotsListing } from "./BookingSlotsListing";
import { NoBookingsNotice } from "./NoBookingsNotice";
import { PriceBlock } from "./PriceBlock";
import { useBookingView } from "../BookingViewContext";
import CheckoutForm from "@/components/common/checkout/CheckoutForm";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import {
  Button,
  Card,
  CardFooter,
  CardInner,
  Checkbox,
  ModalWindow,
  useModal,
} from "@/components/uikit";
import type {
  CreatePremiseSlotsIntent,
  RevalidatePremisePage,
} from "@/lib/actions/booking";
import { groupBy } from "@/lib/utils/array";
import { processDiscounts } from "@/lib/utils/price";
import { Box, VStack } from "~/styled-system/jsx";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export function BookingViewCard({
  premiseId,
  createIntent,
  revalidateFn,
  discountsMap,
  inModal = false,
}: {
  premiseId: Premise["id"];
  createIntent: CreatePremiseSlotsIntent;
  revalidateFn: RevalidatePremisePage;
  discountsMap: Record<number, number | undefined>;
  inModal?: boolean;
}) {
  const t = useTranslations("booking_view");
  const timeZone = useSearchBoxTimeZone();
  const [isPending, startTransition] = useTransition();
  const { selectedSlots, resetSlots } = useBookingView();
  const { open, setOpen, setClosable } = useModal();
  const [isUserAwareOfRules, setAwarenessState] = useState(inModal);
  const [intentResponse, setIntentResponse] = useState<{
    clientSecret: string;
    paymentIntentId: string;
  } | null>(null);

  const areThereNoSlots = selectedSlots.length === 0;
  const isOutsideModal = open && !inModal;

  const groupedSlots = groupBy(
    Array.from(selectedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.time, slotB.time),
    ),
    ({ time }) => formatInTimeZone(time, timeZone, "dd.MM.yyyy"),
  );
  const priceInfo = processDiscounts(groupedSlots, discountsMap);

  const checkboxChanged = () => {
    setAwarenessState((prevState) => !prevState);
  };

  const payBtnClicked = () => {
    if (!open) {
      setOpen(true);
      return;
    }

    startTransition(async () => {
      const response = await createIntent({
        premiseId,
        slots: selectedSlots,
        timeZone,
      });

      if (response) {
        setClosable(false);
        setIntentResponse(response);

        void revalidateFn();
      }
    });
  };

  const paymentSucceed = () => {
    setOpen(false);
    resetSlots();

    void revalidateFn();
  };

  if (inModal && intentResponse?.clientSecret) {
    return (
      <VStack gap="12px" minHeight="350px">
        <h4>{t("booking_modal_heading")}</h4>
        <Box bg="neutral.5" borderRadius="10px">
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: intentResponse?.clientSecret }}
          >
            <CheckoutForm succeedRefetch={paymentSucceed} />
          </Elements>
        </Box>
      </VStack>
    );
  }

  return (
    <>
      <Card
        border="1px solid"
        borderColor="neutral.2"
        alignSelf="flex-start"
        minHeight="352px"
      >
        <CardInner padding="25px 18px" alignItems="center" gap="0px">
          <h4>{t("card_heading")}</h4>
          {areThereNoSlots ? (
            <NoBookingsNotice label={t("no_selected_slots")} />
          ) : (
            <BookingSlotsListing groupedSlots={groupedSlots} />
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
                <PriceBlock priceInfo={priceInfo} />
                <Checkbox
                  checked={isUserAwareOfRules}
                  disabled={isOutsideModal}
                  onChange={checkboxChanged}
                  label={t("rules_agreement")}
                  required
                />
              </>
            )}
            <Button
              size="md"
              isLoading={isPending}
              disabled={
                isOutsideModal || !isUserAwareOfRules || areThereNoSlots
              }
              onClick={payBtnClicked}
            >
              {t("pay_btn")}
            </Button>
          </CardFooter>
        </CardInner>
      </Card>
      {!inModal && (
        <ModalWindow>
          <BookingViewCard
            premiseId={premiseId}
            createIntent={createIntent}
            revalidateFn={revalidateFn}
            discountsMap={discountsMap}
            inModal={true}
          />
        </ModalWindow>
      )}
    </>
  );
}