"use client";

import type { Premise } from "@prisma/client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementLocale } from "@stripe/stripe-js";
import { addHours, compareAsc, isValid } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import type { Session } from "next-auth";
import { useLocale, useTranslations } from "next-intl";
import {
  useCallback,
  useRef,
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
import {
  Button,
  Input,
  ModalWindow,
  Textarea,
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
import { css } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";
import { stack } from "~/styled-system/patterns";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type BookingViewCardProps = {
  premiseId: Premise["id"];
  premiseOrgId: string;
  createIntent: CreatePremiseSlotsIntent;
  cancelIntent: CancelPremiseSlotsIntent;
  revalidateFn: RevalidatePremisePage;
  discountsMap: Record<number, number | undefined>;
  isOwner: boolean;
  isUserOrg: boolean;
  inModal?: boolean;
  minimalSlotsToBook?: Premise["minimalSlotsToBook"];
  session: Session | null;
  accountCreationSlot: React.ReactNode;
  personConfirmationSlot: React.ReactNode;
};

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
  minimalSlotsToBook,
  session,
  accountCreationSlot,
  personConfirmationSlot,
}: BookingViewCardProps) {
  const locale = useLocale() as StripeElementLocale;
  const t = useTranslations("booking_view");
  const [isPending, startTransition] = useTransition();
  const { selectedSlots, resetSlots, priceMode } = useBookingView();
  const { open, setOpen, setClosable } = useModal();
  const [intentResponse, setIntentResponse] = useState<{
    clientSecret: string;
    paymentIntentId: string;
    amountToBeCharged: number;
  } | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const donationRef = useRef<HTMLInputElement | null>(null);

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
        comment: commentRef.current?.value || "",
        donationAmount: donationRef.current?.value,
      });

      if (response && response.clientSecret !== null) {
        setClosable(false);
        setIntentResponse({
          ...response,
          clientSecret: response.clientSecret,
        });

        void revalidateFn();
      } else {
        paymentSucceed();
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

  if (inModal && session === null) {
    return (
      <section className={stack({ gap: "4", minHeight: "80" })}>
        <h3 className={css({ fontWeight: "bold" })}>
          {t("booking_modal_register_heading")}
        </h3>
        {accountCreationSlot}
      </section>
    );
  }

  if (inModal && session && !session.user?.confirmed) {
    return (
      <section className={stack({ gap: "4", minHeight: "80" })}>
        <h3 className={css({ fontWeight: "bold" })}>
          {t("booking_modal_verify_heading")}
        </h3>
        {personConfirmationSlot}
      </section>
    );
  }

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
          options={{ clientSecret: intentResponse?.clientSecret, locale }}
        >
          <CheckoutForm
            succeedRefetch={paymentSucceed}
            total={intentResponse.amountToBeCharged}
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

  const minSlotsReached =
    typeof minimalSlotsToBook !== "number" ||
    minimalSlotsToBook <= selectedSlots.length;
  const submitButtonProps: ComponentProps<typeof Button> = {
    type: "button",
    isLoading: isPending,
    disabled:
      isOutsideModal || areThereNoSlots || !(isOwner || minSlotsReached),
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
          {inModal && !isOwner && priceMode === "donation" && (
            <Stack gap="2">
              <span>{t("donation_amount_input_notice")}</span>
              <Input
                ref={donationRef}
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                placeholder={t("donation_amount_input_label")}
                onInput={preventNonDigit}
              />
            </Stack>
          )}
          {inModal && !isOwner && (
            <Stack gap="2">
              <span>{t("leave_comment_label")}</span>
              <Textarea ref={commentRef} rows={4} placeholder="..." />
            </Stack>
          )}
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
            isOwner={isOwner}
            isUserOrg={isUserOrg}
            minimalSlotsToBook={minimalSlotsToBook}
            session={session}
            accountCreationSlot={accountCreationSlot}
            personConfirmationSlot={personConfirmationSlot}
            inModal
          />
        </ModalWindow>
      )}
    </>
  );
}

function preventNonDigit({ target }: React.ChangeEvent<HTMLInputElement>) {
  target.value = target.value.replace(/\D/g, "");
}
