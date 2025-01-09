"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import toast from "react-hot-toast";
import { Button, Tag } from "@/components/uikit";
import { confirmBooking } from "@/lib/actions/booking";

export function ConfirmBookingActions({
  isCompany,
  intentId,
}: {
  isCompany: boolean;
  intentId: string;
}) {
  const t = useTranslations("profile.my_bookings");
  const [pending, startTransition] = useTransition();

  if (!isCompany) {
    return (
      <Tag colorPalette="secondary" size="xs">
        {t("confirmation_not_received")}
      </Tag>
    );
  }

  const confirmClicked = () => {
    startTransition(async () => {
      const result = await confirmBooking(intentId);

      if (result.ok) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Button
      type="button"
      rounded={false}
      isLoading={pending}
      onClick={confirmClicked}
    >
      {t("confirm_booking_btn_label")}
    </Button>
  );
}
