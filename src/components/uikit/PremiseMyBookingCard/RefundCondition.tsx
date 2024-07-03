import { format } from "date-fns";

import { Modal } from "../Modal";
import CancelBookingBtn from "@/components/premise/myBookings/CancelBookingBtn";
import { RefundType } from "@/lib/shared/config/booking-cancel-terms";
import { Booking } from "@/lib/utils/premise-booking";
import { getCancellationDate } from "@/lib/utils/premise-booking/cancel-booking";
import { Grid, GridItem } from "~/styled-system/jsx";

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
  const { cancellationDate, dateLabel } = getCancellationDate(
    booking.premise.bookingCancelTerm,
    refundType,
    booking.startTime,
  );

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
      <GridItem>
        <strong>{title}</strong>
      </GridItem>
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
