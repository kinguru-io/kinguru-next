import { format } from "date-fns";

import { Modal } from "../Modal";
import CancelBookingBtn from "@/components/premise/myBookings/CancelBookingBtn";
import { RefundType } from "@/lib/shared/config/booking-cancel-terms";
import { Booking } from "@/lib/utils/premise-booking";
import { getCancellationDate } from "@/lib/utils/premise-booking/cancel-booking";
import { Grid, GridItem, HStack } from "~/styled-system/jsx";

interface RefundConditionProps {
  title: string;
  description: string;
  isActive: boolean;
  refundType: RefundType;
  booking: Booking;
  premiseSlotIds: string[];
  premiseSlotsPrice: number;
}

const RefundCondition = ({
  title,
  description,
  isActive,
  refundType,
  booking,
  premiseSlotIds,
  premiseSlotsPrice,
}: RefundConditionProps) => {
  const cancellationInfo = getCancellationDate(
    booking.premise.bookingCancelTerm,
    refundType,
    booking.startTime,
  );

  if (!cancellationInfo) {
    return (
      <HStack
        css={{
          gap: "6",
          padding: "4",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <strong>{title}</strong>
        <Modal>
          <CancelBookingBtn
            bookingStartTime={booking.startTime}
            bookingCancelTerm={booking.premise.bookingCancelTerm}
            premiseSlotIds={premiseSlotIds}
            paymentIntentId={booking.paymentIntentId}
            premiseAmount={premiseSlotsPrice}
            discountAmount={booking.discountAmount}
            isActive={isActive}
          />
        </Modal>
      </HStack>
    );
  }

  const { cancellationDate, dateLabel } = cancellationInfo;

  return (
    <Grid
      css={{
        gridTemplateColumns: "auto",
        gridAutoColumns: "1fr",
        alignItems: "center",
        gap: 6,
        padding: 4,
        bgColor: isActive ? "primary" : "white",
        borderRadius: "lg",
        marginBlock: "1",
        lg: {
          gridTemplateAreas: '"date time term description button"',
          gridTemplateColumns: "138px 47px 0.6fr 1fr max-content",
        },
      }}
    >
      <GridItem>
        {dateLabel} {format(cancellationDate, "dd.MM.yyyy")}
      </GridItem>
      <GridItem>{format(cancellationDate, "HH:mm")}</GridItem>
      <strong>{title}</strong>
      <GridItem>{description}</GridItem>
      <GridItem>
        <Modal>
          <CancelBookingBtn
            bookingStartTime={booking.startTime}
            bookingCancelTerm={booking.premise.bookingCancelTerm}
            premiseSlotIds={premiseSlotIds}
            paymentIntentId={booking.paymentIntentId}
            premiseAmount={premiseSlotsPrice}
            discountAmount={booking.discountAmount}
            isActive={isActive}
          />
        </Modal>
      </GridItem>
    </Grid>
  );
};

export default RefundCondition;
