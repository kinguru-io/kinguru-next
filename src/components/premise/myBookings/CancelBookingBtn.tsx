"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import {
  Button,
  Card,
  CardInner,
  ModalInitiator,
  ModalWindow,
  useModal,
} from "@/components/uikit";
import {
  CancelBookingActionProps,
  cancelBookingAction,
} from "@/lib/actions/premise/cancel-booking";
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
  const t = useTranslations("booking_cancel_terms");
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

  return (
    <>
      {isActive ? (
        <ModalInitiator>
          <Button type="button" rounded={false}>
            {t("cancel_booking_btn")}
          </Button>
        </ModalInitiator>
      ) : (
        <Button type="button" rounded={false} disabled={!isActive}>
          {t("cancel_booking_btn")}
        </Button>
      )}
      <ModalWindow>
        <Flex gap="1rem" minWidth="100px">
          {isLoading ? (
            <LoaderIcon />
          ) : (
            <>
              <Card
                border="1px solid"
                borderColor="neutral.2"
                alignSelf="flex-start"
              >
                <CardInner padding="25px 18px" alignItems="center" gap="0px">
                  <h4>{t("modal_cancel_confirmation_desc")}</h4>
                  <Flex gap="1rem" padding="1rem 0 0">
                    <Button onClick={closeModal}>{t("cancel")}</Button>
                    <Button colorPalette="dark" onClick={onCancelBooking}>
                      {t("confirm")}
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
