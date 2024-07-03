import { differenceInDays, differenceInHours } from "date-fns";
import { useTranslations } from "next-intl";

import BookingCard from "./BookingCard";
import RefundCondition from "./RefundCondition";
import {
  Accordion,
  AccordionItem,
  AccordionItemContent,
  AccordionItemToggle,
} from "../Accordion";
import { REFUND_TYPES } from "@/lib/shared/config/booking-cancel-terms";
import { Booking } from "@/lib/utils/premise-booking";
import { getActiveCancelTerm } from "@/lib/utils/premise-booking/cancel-booking";

import { css } from "~/styled-system/css";
import { Box } from "~/styled-system/jsx";

const dateStyle = css({
  fontSize: "1rem",
  fontWeight: "bold",
  marginBottom: "1rem",
});

interface BookingsSectionProps {
  date: string;
  premises: { [key: string]: Booking[] };
  imageSrcs: Record<string, string>;
  labels: any;
}

const BookingsSection = ({
  date,
  premises,
  imageSrcs,
  labels,
}: BookingsSectionProps) => {
  const t = useTranslations("booking_cancel_terms");
  const now = new Date();

  return (
    <span key={date}>
      <h2 className={dateStyle}>{date}</h2>
      {Object.values(premises).map((bookings) =>
        bookings.map((booking, index) => {
          const hoursUntilEvent = differenceInHours(booking.startTime, now);
          const daysUntilEvent = differenceInDays(booking.startTime, now);
          const activeTerm = getActiveCancelTerm(
            booking.premise.bookingCancelTerm,
            daysUntilEvent,
            hoursUntilEvent,
          );
          const premiseSlotIds = Object.entries(bookings).map(
            ([_, value]) => value.id,
          );
          const premiseSlotsPrice = Object.entries(bookings).reduce(
            (acc, [_, value]) => acc + value.amount,
            0,
          );

          const imageSrc = imageSrcs[booking.premiseId];
          const showCancelBtn = booking.discountAmount
            ? index === bookings.length - 1
            : true;

          const refundConditions = [
            REFUND_TYPES.FULL_REFUND,
            REFUND_TYPES.PARTIAL_REFUND,
            REFUND_TYPES.NO_REFUND,
          ].map((refundType) => (
            <RefundCondition
              key={refundType}
              title={t(`conditions.${refundType}`)}
              description={t(`conditions.${refundType}_desc`)}
              isActive={refundType === activeTerm}
              refundType={refundType}
              booking={booking}
              premiseSlotIds={premiseSlotIds}
              premiseSlotsPrice={premiseSlotsPrice}
            />
          ));

          return (
            <Box
              key={booking.id}
              css={{
                "&:last-child > div:last-child": {
                  marginBlockEnd: "0",
                },
              }}
            >
              <BookingCard
                booking={booking}
                imageSrc={imageSrc}
                labels={labels}
              />
              {showCancelBtn && (
                <Accordion>
                  <AccordionItem>
                    <AccordionItemToggle textStyle="heading.3">
                      {t("cancel_btn_accordion_label")}
                    </AccordionItemToggle>
                    <AccordionItemContent padding="0">
                      {refundConditions}
                    </AccordionItemContent>
                  </AccordionItem>
                </Accordion>
              )}
            </Box>
          );
        }),
      )}
    </span>
  );
};

export default BookingsSection;
