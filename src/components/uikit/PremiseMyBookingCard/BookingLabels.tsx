import type { BookingType, TicketIntentStatus } from "@prisma/client";
import { formatInTimeZone } from "date-fns-tz";
import CancelBookingBtn from "@/components/premise/myBookings/CancelBookingBtn";
import { Icon, Modal, Tag } from "@/components/uikit";
import { Booking } from "@/lib/utils/premise-booking";
import { css } from "~/styled-system/css";
import { Flex, HStack } from "~/styled-system/jsx";

interface LabelProps {
  date: { date: Date };
  time: { startTime: Date; endTime: Date };
  status: { status: TicketIntentStatus };
  cancelBtn: Booking;
}

type LabelKey = keyof LabelProps;

type LabelsType = {
  [K in LabelKey]: {
    format: (props: LabelProps[K]) => React.ReactNode;
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
  cancelBtn: {
    format: (booking: Booking) => (
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
};

const labelsForBookedViaWebsite: LabelKey[] = ["date", "time", "status"];
const labelsForBookedByAdmin: LabelKey[] = ["date", "time", "cancelBtn"];

const labelGroups: Record<BookingType, LabelKey[]> = {
  blocked_by_admin: labelsForBookedByAdmin,
  via_website: labelsForBookedViaWebsite,
};

export async function BookingLabels({ booking }: { booking: Booking }) {
  const labelsForBooking = labelGroups[booking.type as BookingType] || [];

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
          flexDirection="column"
          justifyContent="space-between"
          fontSize="sm"
        >
          {labels[label].format(booking as any)}
        </Flex>
      ))}
    </Flex>
  );
}
