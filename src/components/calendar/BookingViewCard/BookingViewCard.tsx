"use client";

import type { Premise } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { addHours, compareAsc, isValid } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import { useCallback, useState, useTransition } from "react";
import { toast } from "react-hot-toast";
import { BookingSlotsListing } from "./BookingSlotsListing";
import { NoBookingsNotice } from "./NoBookingsNotice";
import { PriceBlock } from "./PriceBlock";
import { useBookingView } from "../BookingViewContext";
import { CheckoutForm } from "@/components/common/checkout";
import { useSearchBoxTimeZone } from "@/components/common/maps/MapboxResponseProvider";
import { Timer } from "@/components/common/timer";
import {
  Button,
  Card,
  CardFooter,
  CardInner,
  Checkbox,
  ModalWindow,
  useModal,
} from "@/components/uikit";
import {
  blockPremiseSlotsIntent,
  CancelPremiseSlotsIntent,
  CreatePremiseSlotsIntent,
  RevalidatePremisePage,
} from "@/lib/actions/booking";
import { groupBy } from "@/lib/utils/array";
import {
  MergedTimeSlots,
  groupAndMergeTimeslots,
} from "@/lib/utils/premise-booking";
import { getSlotDiscount, processOrderTotalDiscounts } from "@/lib/utils/price";
import { Box, VStack } from "~/styled-system/jsx";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export function BookingViewCard({
  premiseId,
  createIntent,
  cancelIntent,
  revalidateFn,
  discountsMap,
  isOwner,
  inModal = false,
}: {
  premiseId: Premise["id"];
  createIntent: CreatePremiseSlotsIntent;
  cancelIntent: CancelPremiseSlotsIntent;
  revalidateFn: RevalidatePremisePage;
  discountsMap: Record<number, number | undefined>;
  isOwner: boolean;
  inModal?: boolean;
}) {
  const t = useTranslations("booking_view");
  const timeZone = useSearchBoxTimeZone() || "UTC";
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

  const newSlots = selectedSlots
    .map(({ time, price }) => {
      if (!isValid(time)) {
        console.error("Invalid date detected:", time);
        return null; // Skip invalid dates
      }

      return {
        premiseId,
        price,
        date: time,
        startTime: time,
        endTime: addHours(time, 1),
        discountAmount: getSlotDiscount(selectedSlots, time, discountsMap),
      };
    })
    .filter(Boolean) as MergedTimeSlots[]; // Remove null values

  const newGroupedSlots = groupAndMergeTimeslots(newSlots);

  const groupedSlots = groupBy(
    Array.from(newGroupedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.startTime, slotB.startTime),
    ),
    ({ startTime }) => formatInTimeZone(startTime, timeZone, "dd.MM.yyyy"),
  );

  const priceGroupedSlots = groupBy(
    Array.from(selectedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.time, slotB.time),
    ),
    ({ time }) => {
      if (!isValid(time)) {
        console.error("Invalid date detected during grouping:", time);
        return "Invalid Date"; // Group invalid dates separately
      }
      return formatInTimeZone(time, timeZone, "dd.MM.yyyy");
    },
  );

  const priceInfo = processOrderTotalDiscounts(priceGroupedSlots, discountsMap);

  const checkboxChanged = () => {
    setAwarenessState((prevState) => !prevState);
  };

  const blockSlotsBtnClicked = () => {
    if (!open) {
      setOpen(true);
      return;
    }

    startTransition(async () => {
      const { status, messageIntlKey, response } =
        await blockPremiseSlotsIntent({
          premiseId,
          slots: selectedSlots,
          discountsMap,
        });

      if (response) {
        setOpen(false);
        resetSlots();

        void revalidateFn();
        toast.success(t("action_successfully_blocked_slots"));
      }

      if (status === "error" && messageIntlKey) {
        toast.error(t(messageIntlKey));
      }
    });
  };

  const payBtnClicked = () => {
    if (!open) {
      setOpen(true);
      return;
    }

    startTransition(async () => {
      const { status, messageIntlKey, response } = await createIntent({
        premiseId,
        slots: selectedSlots,
        timeZone,
        discountsMap,
      });

      if (response) {
        setClosable(false);
        setIntentResponse(response);

        void revalidateFn();
      }

      if (status === "error" && messageIntlKey) {
        toast.error(t(messageIntlKey));
      }
    });
  };

  const paymentSucceed = () => {
    setOpen(false);
    resetSlots();

    void revalidateFn();
    toast.success(t("action_successful_booking"));
  };

  const paymentCancelled = useCallback(async () => {
    if (!intentResponse?.paymentIntentId) return;

    const { status, messageIntlKey } = await cancelIntent({
      paymentIntentId: intentResponse?.paymentIntentId,
    });

    if (status === "error" && messageIntlKey) {
      toast.error(t(messageIntlKey));
    }

    setOpen(false);
    setClosable(true);
    setIntentResponse(null);

    void revalidateFn();
  }, [intentResponse?.paymentIntentId]);

  if (inModal && intentResponse?.clientSecret) {
    return (
      <VStack gap="12px" minHeight="350px">
        <h4>{t("booking_modal_heading")}</h4>
        <Timer minutes={10} callback={paymentCancelled} />
        <Box bg="light" borderRadius="10px">
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

  const SubmitBtn = () =>
    isOwner ? (
      <Button
        isLoading={isPending}
        disabled={isOutsideModal || !isUserAwareOfRules || areThereNoSlots}
        onClick={blockSlotsBtnClicked}
      >
        {t("block_slot_btn")}
      </Button>
    ) : (
      <Button
        isLoading={isPending}
        disabled={isOutsideModal || !isUserAwareOfRules || areThereNoSlots}
        onClick={payBtnClicked}
      >
        {t("pay_btn")}
      </Button>
    );

  return (
    <>
      <Card
        border="1px solid"
        borderColor="secondary"
        alignSelf="flex-start"
        minHeight="352px"
      >
        <CardInner padding="25px 18px" alignItems="center" gap="0">
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
          >
            {!areThereNoSlots && (
              <>
                {!isOwner && <PriceBlock priceInfo={priceInfo} />}
                <Checkbox
                  checked={isUserAwareOfRules}
                  disabled={isOutsideModal}
                  onChange={checkboxChanged}
                  label={t("rules_agreement")}
                  required
                />
              </>
            )}
            <SubmitBtn />
          </CardFooter>
        </CardInner>
      </Card>
      {!inModal && (
        <ModalWindow>
          <BookingViewCard
            premiseId={premiseId}
            createIntent={createIntent}
            cancelIntent={cancelIntent}
            revalidateFn={revalidateFn}
            discountsMap={discountsMap}
            inModal={true}
            isOwner={isOwner}
          />
        </ModalWindow>
      )}
    </>
  );
}
