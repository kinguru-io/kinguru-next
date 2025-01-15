"use client";

import { useTranslations } from "next-intl";
import { RestorePaymentButton } from "./restore-payment-button";
import { Modal, Tag } from "@/components/uikit";

export function BookingPaymentActions({
  isCompany,
  intentId,
}: {
  isCompany: boolean;
  intentId: string;
}) {
  const t = useTranslations("profile.my_bookings");

  if (isCompany) {
    return (
      <Tag colorPalette="secondary" size="xs">
        {t("payment_not_received")}
      </Tag>
    );
  }

  return (
    <>
      <Tag colorPalette="secondary" size="xs">
        {t("booking_approved")}
      </Tag>
      <Modal>
        <RestorePaymentButton intentId={intentId} />
      </Modal>
    </>
  );
}
