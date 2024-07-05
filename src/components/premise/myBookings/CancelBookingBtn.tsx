"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import {
  Button,
  Card,
  CardInner,
  ModalWindow,
  useModal,
} from "@/components/uikit";
import { tagStyles } from "@/components/uikit/Tag/Tag";
import {
  CancelBookingActionProps,
  cancelBookingAction,
} from "@/lib/actions/premise/cancel-booking";
import { css, cx } from "~/styled-system/css";
import { Flex } from "~/styled-system/jsx";

export default function CancelBookingBtn({
  bookingStartTime,
  bookingCancelTerm,
  premiseSlotIds,
  premiseAmount,
  paymentIntentId,
  discountAmount,
  isActive,
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
            padding: "4",
            _selected: {
              colorPalette: "dark",
              _hover: { colorPalette: "danger" },
            },
            _disabled: {
              opacity: 0.5,
            },
          }),
        )}
        onClick={() => setOpen(isActive)}
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
        <Flex gap="1rem" minWidth="100px">
          {isLoading ? (
            <LoaderIcon />
          ) : (
            <>
              <Card alignSelf="flex-start">
                <CardInner padding="25px 18px" alignItems="center" gap="0">
                  <h4>{t("modal_cancel_confirmation_desc")}</h4>
                  <Flex gap="1rem" padding="1rem 0 0">
                    <Button onClick={closeModal}>{t("modal_cancel")}</Button>
                    <Button colorPalette="dark" onClick={onCancelBooking}>
                      {t("modal_confirm")}
                    </Button>
                  </Flex>
                </CardInner>
              </Card>
            </>
          )}
        </Flex>
      </ModalWindow>
    </>
  );
}
