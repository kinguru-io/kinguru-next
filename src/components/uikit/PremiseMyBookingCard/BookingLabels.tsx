import type { BookingType, TicketIntentStatus } from "@prisma/client";
import { formatInTimeZone } from "date-fns-tz";
import { BookingPaymentActions } from "./booking-payment-actions";
import { ConfirmBookingActions } from "./confirm-booking-actions";
import CancelBookingBtn from "@/components/premise/myBookings/CancelBookingBtn";
import { Icon, Modal, Tag } from "@/components/uikit";
import { Booking } from "@/lib/utils/premise-booking";
import { css } from "~/styled-system/css";
import { Flex, HStack } from "~/styled-system/jsx";

type LabelKey =
  | "date"
  | "time"
  | "status"
  | "cancelButton"
  | "confirmButton"
  | "payButton";

type LabelsType = {
  [K in LabelKey]: {
    format: (booking: Booking, isCompany: boolean) => React.ReactNode;
  };
};

const statusColorPallets: Record<TicketIntentStatus, string> = {
  failed: "danger",
  succeed: "success",
  progress: "primary",
  canceled: "dark",
};

const labels: LabelsType = {
  date: {
    format: ({ date }) => {
      const dateTime = formatInTimeZone(date, "UTC", "dd.MM.yyyy");

      return (
        <HStack gap="1">
          <Icon name="common/calendar" className={css({ fontSize: "xl" })} />
          <time dateTime={dateTime}>{dateTime}</time>
        </HStack>
      );
    },
  },
  time: {
    format: ({ startTime, endTime }) =>
      `${formatInTimeZone(startTime, "UTC", "HH:mm")} - ${formatInTimeZone(endTime, "UTC", "HH:mm")}`,
  },
  status: {
    format: ({ status }) => (
      <Tag variant="solid" colorPalette={statusColorPallets[status]}>
        {status}
      </Tag>
    ),
  },
  cancelButton: {
    format: (booking) => (
      <Modal>
        <CancelBookingBtn
          bookingStartTime={booking.startTime}
          bookingCancelTerm={booking.premise.bookingCancelTerm}
          premiseSlotIds={[booking.id]}
          paymentIntentId={booking.paymentIntentId}
          premiseAmount={0}
          discountAmount={booking.discountAmount}
          isActive={true}
          type="tag"
        />
      </Modal>
    ),
  },
  confirmButton: {
    format: (booking, isCompany) => {
      if (booking.status === "canceled") return null;

      return (
        <ConfirmBookingActions
          isCompany={isCompany}
          intentId={booking.paymentIntentId}
        />
      );
    },
  },
  payButton: {
    format: (booking, isCompany) => {
      if (booking.status === "canceled") return null;

      return (
        <BookingPaymentActions
          isCompany={isCompany}
          intentId={booking.paymentIntentId}
        />
      );
    },
  },
};

const labelGroups: Record<BookingType, LabelKey[]> = {
  blocked_by_admin: ["date", "time", "cancelButton"],
  via_website: ["date", "time", "status"],
  needs_confirmation: ["date", "time", "confirmButton"],
  ready_for_payment: ["date", "time", "payButton"],
};

export async function BookingLabels({
  booking,
  isCompany,
}: {
  booking: Booking;
  isCompany: boolean;
}) {
  const labelsForBooking = labelGroups[booking.type] || [];

  return (
    <Flex
      css={{
        alignItems: "center",
        flexWrap: "wrap",
        gap: "4",
        md: { marginLeft: "auto", gap: "7" },
      }}
    >
      {labelsForBooking.map((label) => (
        <Flex
          key={label}
          css={{
            zIndex: "1",
            gap: "2",
            alignItems: "center",
            fontSize: "sm",
          }}
        >
          {labels[label].format(booking, isCompany)}
        </Flex>
      ))}
    </Flex>
  );
}
