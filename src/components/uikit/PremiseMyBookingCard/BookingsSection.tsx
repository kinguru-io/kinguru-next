import { TicketIntentStatus } from "@prisma/client";
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
import { Booking, isUserOrganization } from "@/lib/utils/premise-booking";
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
}

const paidRefund = [
  REFUND_TYPES.FULL_REFUND,
  REFUND_TYPES.PARTIAL_REFUND,
  REFUND_TYPES.NO_REFUND,
];

const freeSlot = [REFUND_TYPES.FREE_SLOT];

const BookingsSection = async ({
  date,
  premises,
  imageSrcs,
}: BookingsSectionProps) => {
  const t = useTranslations("profile.my_bookings");
  const now = new Date();

  const isUserOrg = await isUserOrganization();

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
          const premiseSlotIds = booking.discountAmount
            ? Object.entries(bookings).map(([_, value]) => value.id)
            : [booking.id];

          const premiseSlotsPrice = Object.entries(bookings).reduce(
            (acc, [_, value]) => acc + value.amount,
            0,
          );

          const imageSrc = imageSrcs[booking.premiseId];
          const showCancelBtn = booking.discountAmount
            ? index === bookings.length - 1
            : true;

          const refundConditions = (
            premiseSlotsPrice === 0 ? freeSlot : paidRefund
          ).map((refundType) => (
            <RefundCondition
              key={refundType}
              title={t(`conditions.${refundType}`)}
              description={t(`conditions.${refundType}_desc`)}
              isActive={["FREE_SLOT", activeTerm].includes(refundType)}
              refundType={refundType}
              booking={booking}
              premiseSlotIds={premiseSlotIds}
              premiseSlotsPrice={premiseSlotsPrice}
            />
          ));

          const showCancelBooking =
            booking.status !== TicketIntentStatus.canceled && !isUserOrg;
          const isDisabled =
            booking.status === TicketIntentStatus.canceled || undefined;

          return (
            <Box
              key={`${booking.id}-${booking.premiseId}`}
              data-disabled={isDisabled}
              css={{
                "&:last-child > div:last-child": {
                  marginBlockEnd: "0",
                },
                _disabled: {
                  opacity: 0.6,
                },
              }}
            >
              <BookingCard booking={booking} imageSrc={imageSrc} />
              {showCancelBooking && showCancelBtn && (
                <Accordion marginBlockEnd="3.5">
                  <AccordionItem>
                    <AccordionItemToggle textStyle="heading.3">
                      {t("cancel_btn_accordion_label")}
                    </AccordionItemToggle>
                    <AccordionItemContent>
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
