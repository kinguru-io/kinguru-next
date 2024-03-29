"use client";

import type { Premise } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

import { BookingSlotsListing } from "./BookingSlotsListing";
import { NoBookingsNotice } from "./NoBookingsNotice";
import { PriceBlock } from "./PriceBlock";
import { useBookingView } from "../BookingViewContext";
import CheckoutForm from "@/components/common/checkout/CheckoutForm";
import {
  Button,
  Card,
  CardFooter,
  CardInner,
  Checkbox,
  Modal,
  ModalWindow,
  useModal,
} from "@/components/uikit";
import type {
  CreatePremiseSlotsIntent,
  RevalidatePremisePage,
} from "@/lib/actions/booking";
import { Box, VStack } from "~/styled-system/jsx";

export function BookingViewCard({
  premiseId,
  createIntent,
  revalidateFn,
}: {
  premiseId: Premise["id"];
  createIntent: CreatePremiseSlotsIntent;
  revalidateFn: RevalidatePremisePage;
}) {
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
          <Modal>
            <PayButton
              premiseId={premiseId}
              createIntent={createIntent}
              revalidateFn={revalidateFn}
              buttonLabel={t("pay_btn")}
              modalHeading={t("booking_modal_heading")}
              isInactive={!isUserAwareOfRules || areThereNoSlots}
            />
          </Modal>
        </CardFooter>
      </CardInner>
    </Card>
  );
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

function PayButton({
  premiseId,
  buttonLabel,
  modalHeading,
  isInactive,
  createIntent,
  revalidateFn,
}: {
  premiseId: Premise["id"];
  buttonLabel: string;
  modalHeading: string;
  isInactive: boolean;
  createIntent: CreatePremiseSlotsIntent;
  revalidateFn: RevalidatePremisePage;
}) {
  const { selectedSlots, resetSlots } = useBookingView();
  const [isPending, startTransition] = useTransition();
  const [secret, setSecret] = useState<string | null>(null);
  const { setOpen } = useModal();

  const payBtnClicked = () => {
    startTransition(async () => {
      const clientSecret = await createIntent({
        premiseId,
        slots: selectedSlots,
      });

      if (clientSecret) {
        setSecret(clientSecret);
        setOpen(true);
      }
    });
  };

  const paymentSucceed = () => {
    setOpen(false);
    resetSlots();
    void revalidateFn();
  };

  return (
    <>
      <Button
        size="md"
        isLoading={isPending}
        disabled={isInactive}
        onClick={payBtnClicked}
      >
        {buttonLabel}
      </Button>
      <ModalWindow>
        {secret && (
          <VStack gap="12px" minHeight="350px">
            <h4>{modalHeading}</h4>
            <Box bg="neutral.5" borderRadius="10px">
              <Elements
                stripe={stripePromise}
                options={{ clientSecret: secret }}
              >
                <CheckoutForm succeedRefetch={paymentSucceed} />
              </Elements>
            </Box>
          </VStack>
        )}
      </ModalWindow>
    </>
  );
}
