"use client";

import type { Premise } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { addHours, compareAsc, isValid } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useState,
  useTransition,
  type ComponentProps,
} from "react";
import { toast } from "react-hot-toast";

import { BookingSlotsListing } from "./BookingSlotsListing";
import { NoBookingsNotice } from "./NoBookingsNotice";
import { PriceBlock } from "./PriceBlock";
import { useBookingView } from "../BookingViewContext";
import { CheckoutForm } from "@/components/common/checkout";
import { Timer } from "@/components/common/timer";
import { Button, ModalWindow, useModal } from "@/components/uikit";
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
import { css } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export function BookingViewCard({
  premiseId,
  premiseOrgId,
  createIntent,
  cancelIntent,
  revalidateFn,
  discountsMap,
  isOwner,
  isUserOrg,
  inModal = false,
}: {
  premiseId: Premise["id"];
  premiseOrgId: string;
  createIntent: CreatePremiseSlotsIntent;
  cancelIntent: CancelPremiseSlotsIntent;
  revalidateFn: RevalidatePremisePage;
  discountsMap: Record<number, number | undefined>;
  isOwner: boolean;
  isUserOrg: boolean;
  inModal?: boolean;
}) {
  const t = useTranslations("booking_view");
  const [isPending, startTransition] = useTransition();
  const { selectedSlots, resetSlots } = useBookingView();
  const { open, setOpen, setClosable } = useModal();
  const [intentResponse, setIntentResponse] = useState<{
    clientSecret: string;
    paymentIntentId: string;
  } | null>(null);

  const areThereNoSlots = selectedSlots.length === 0;
  const isOutsideModal = open && !inModal;

  const newSlots = selectedSlots
    .map(({ time, price }) => {
      if (!isValid(time)) {
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
    ({ startTime }) => formatInTimeZone(startTime, "UTC", "dd.MM.yyyy"),
  );

  const priceGroupedSlots = groupBy(
    Array.from(selectedSlots).sort((slotA, slotB) =>
      compareAsc(slotA.time, slotB.time),
    ),
    ({ time }) => {
      if (!isValid(time)) {
        return "Invalid Date"; // Group invalid dates separately
      }
      return formatInTimeZone(time, "UTC", "dd.MM.yyyy");
    },
  );

  const priceInfo = processOrderTotalDiscounts(priceGroupedSlots, discountsMap);

  const blockSlotsBtnClicked = () => {
    if (!open) {
      setOpen(true);
      return;
    }

    startTransition(async () => {
      const { status, messageIntlKey, response } =
        await blockPremiseSlotsIntent({
          premiseId,
          premiseOrgId,
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

  const payBtnClicked = async () => {
    if (isUserOrg && !isOwner) {
      toast.error(t("organization_cannot_pay"));
      return;
    }
    if (!open) {
      setOpen(true);
      return;
    }

    startTransition(async () => {
      const { status, messageIntlKey, response } = await createIntent({
        premiseId,
        premiseOrgId,
        slots: selectedSlots,
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

  const cancelPayment = useCallback(() => {
    if (!intentResponse?.paymentIntentId) return;

    startTransition(async () => {
      const { status, messageIntlKey } = await cancelIntent({
        paymentIntentId: intentResponse.paymentIntentId,
      });

      if (status === "error" && messageIntlKey) {
        toast.error(t(messageIntlKey));
      }

      setOpen(false);
      setClosable(true);
      setIntentResponse(null);

      void revalidateFn();
    });
  }, [intentResponse?.paymentIntentId]);

  if (inModal && intentResponse?.clientSecret) {
    return (
      <section className={stack({ gap: "4", minHeight: "80" })}>
        <HStack gap="4" justifyContent="space-between">
          <h3 className={css({ fontWeight: "bold" })}>
            {t("booking_modal_heading")}
          </h3>
          <Timer minutes={10} callback={cancelPayment} />
        </HStack>
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: intentResponse?.clientSecret }}
        >
          <CheckoutForm
            succeedRefetch={paymentSucceed}
            total={priceInfo.totalPrice}
            cancelButton={
              <Button
                type="button"
                onClick={cancelPayment}
                colorPalette="secondary"
                rounded={false}
                isLoading={isPending}
                className={css({ paddingInline: "3" })}
              >
                {t("cancel_payment_btn")}
              </Button>
            }
          />
        </Elements>
      </section>
    );
  }

  const submitButtonProps: ComponentProps<typeof Button> = {
    type: "button",
    isLoading: isPending,
    disabled: isOutsideModal || areThereNoSlots,
    onClick: isOwner ? blockSlotsBtnClicked : payBtnClicked,
    centered: true,
    size: "lg",
  };

  const isPriceInfoShown = !(isOwner || areThereNoSlots);

  return (
    <>
      <section
        className={stack({
          gap: "1",
          padding: "6",
          fontSize: "sm",
          borderRadius: "lg",
          borderWidth: "1px",
          borderColor: "tertiary",
          "&[data-in-modal]": { border: "none", padding: "0" },
        })}
        data-in-modal={inModal || undefined}
      >
        <h3 className={css({ fontSize: "px17", fontWeight: "bold" })}>
          {t("card_heading")}
        </h3>
        {areThereNoSlots ? (
          <NoBookingsNotice label={t("no_selected_slots")} />
        ) : (
          <BookingSlotsListing groupedSlots={groupedSlots} />
        )}

        <Stack gap="6">
          {isPriceInfoShown && <PriceBlock priceInfo={priceInfo} />}
          <Button {...submitButtonProps}>
            {t(isOwner ? "block_slot_btn" : "pay_btn")}
          </Button>
          {!areThereNoSlots && (
            <span
              className={css({
                color: "secondary",
                fontSize: "xs",
                textAlign: "center",
              })}
            >
              {t("rules_agreement")}
            </span>
          )}
        </Stack>
      </section>
      {!inModal && (
        <ModalWindow>
          <BookingViewCard
            premiseId={premiseId}
            premiseOrgId={premiseOrgId}
            createIntent={createIntent}
            cancelIntent={cancelIntent}
            revalidateFn={revalidateFn}
            discountsMap={discountsMap}
            inModal={true}
            isOwner={isOwner}
            isUserOrg={isUserOrg}
          />
        </ModalWindow>
      )}
    </>
  );
}
