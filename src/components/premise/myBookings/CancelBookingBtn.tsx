"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";
import { Button, Loader, ModalWindow, useModal } from "@/components/uikit";
import { tagStyles } from "@/components/uikit/Tag/Tag";
import {
  CancelBookingActionProps,
  cancelBookingAction,
} from "@/lib/actions/premise/cancel-booking";
import { css, cx } from "~/styled-system/css";
import { HStack, Stack } from "~/styled-system/jsx";

export default function CancelBookingBtn({
  bookingStartTime,
  bookingCancelTerm,
  premiseSlotIds,
  premiseAmount,
  paymentIntentId,
  discountAmount,
  isActive,
  type,
}: CancelBookingActionProps) {
  const router = useRouter();
  const t = useTranslations("profile.my_bookings");
  const [isLoading, setIsLoading] = React.useState(false);

  const { setOpen } = useModal();

  const onCancelBooking = async () => {
    setIsLoading(true);
    try {
      const canceledBooking = await cancelBookingAction({
        bookingStartTime,
        bookingCancelTerm,
        premiseSlotIds,
        premiseAmount,
        paymentIntentId,
        discountAmount,
        isActive,
      });
      toast.success(canceledBooking.message);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
  };

  const CancelBookingButton = () => {
    return (
      <button
        type="button"
        className={cx(
          tagStyles({ variant: isActive ? "solid" : "outline" }),
          css({
            position: "relative",
            zIndex: 1,
            padding: type === "tag" ? "2" : "4",
            _selected: {
              colorPalette: "dark",
              _hover: { colorPalette: "danger" },
            },
            _disabled: {
              opacity: 0.5,
            },
          }),
        )}
        onClick={() => {
          setOpen(isActive);
        }}
        aria-selected={isActive}
        disabled={!isActive}
      >
        {t("cancel_booking_btn")}
      </button>
    );
  };

  return (
    <>
      <CancelBookingButton />
      <ModalWindow>
        <Stack
          css={{
            padding: "4",
            alignItems: "center",
            gap: "6",
            textAlign: "center",
            minHeight: "32",
            justifyContent: "center",
          }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <span>{t("modal_cancel_confirmation_desc")}</span>
              <HStack gap="4">
                <Button colorPalette="secondary" onClick={closeModal}>
                  {t("modal_cancel")}
                </Button>
                <Button colorPalette="dark" onClick={onCancelBooking}>
                  {t("modal_confirm")}
                </Button>
              </HStack>
            </>
          )}
        </Stack>
      </ModalWindow>
    </>
  );
}
