import {
  differenceInDays,
  differenceInHours,
  format,
  addDays,
  subDays,
  addMinutes,
} from "date-fns";
import Image from "next/image";
import BookingLabels from "./BookingLabels";
import CancelBookingBtn from "@/components/premise/myBookings/CancelBookingBtn";
import {
  PremiseMyBookingCard,
  PremiseMyBookingCardContent,
  PremiseMyBookingCardDescription,
  PremiseMyBookingCardTitle,
  Modal,
  Accordion,
  AccordionItem,
  AccordionItemToggle,
  AccordionItemContent,
} from "@/components/uikit";
import { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import { Booking } from "@/lib/utils/premise-booking";
import { Box, Flex, Grid, GridItem } from "~/styled-system/jsx";

const BookingsSection = ({
  date,
  premises,
  imageSrcs,
  labels,
  t,
}: {
  date: string;
  premises: { [key: string]: Booking[] };
  imageSrcs: Record<string, string>;
  labels: any;
  t: any;
}) => (
  <section key={date}>
    <h2
      style={{
        fontSize: "1rem",
        fontWeight: "bold",
        marginBottom: "1rem",
      }}
    >
      {date}
    </h2>
    {Object.entries(premises).map(([_key, bookings]) =>
      bookings.map((booking, index) => {
        const showCancelBtn = () => {
          if (booking.discountAmount) {
            return index === bookings.length - 1;
          }
          return true;
        };
        const premiseSlotIds = Object.entries(bookings).map(
          ([_, value]) => value.id,
        );
        const imageSrc = imageSrcs[booking.premiseId];

        const now = new Date();
        const hoursUntilEvent = differenceInHours(booking.startTime, now);
        const daysUntilEvent = differenceInDays(booking.startTime, now);

        function getActiveCancelTermAndDates({
          bookingCancelTerm,
        }: {
          bookingCancelTerm: BookingCancelTerm;
        }) {
          let term = "";

          switch (bookingCancelTerm) {
            case "very_flexible":
              if (hoursUntilEvent >= 24) {
                term = "full_refund";
              } else {
                term = "no_refund";
              }
              break;
            case "flexible":
              if (daysUntilEvent >= 7) {
                term = "full_refund";
              } else if (daysUntilEvent >= 1 && hoursUntilEvent >= 24) {
                term = "partial_refund";
              } else {
                term = "no_refund";
              }
              break;
            case "default_30":
              if (daysUntilEvent >= 30) {
                term = "full_refund";
              } else if (daysUntilEvent >= 7) {
                term = "partial_refund";
              } else {
                term = "no_refund";
              }
              break;
            case "default_90":
              if (daysUntilEvent >= 90) {
                term = "full_refund";
              } else if (daysUntilEvent >= 14) {
                term = "partial_refund";
              } else {
                term = "no_refund";
              }
              break;
            default:
              throw new Error("Invalid cancellation policy");
          }

          return { term };
        }

        const getCancellationDate = (cancelCondition: string) => {
          const startTimeDate = booking.startTime;
          let cancellationDate = null;
          let dateLabel = "до";

          switch (cancelCondition) {
            case "very_flexible__full_refund":
              cancellationDate = subDays(startTimeDate, 1);
              break;
            case "very_flexible__no_refund":
              cancellationDate = subDays(startTimeDate, 1);
              dateLabel = "после";
              break;
            case "flexible__full_refund":
              cancellationDate = subDays(startTimeDate, 7);
              break;
            case "flexible__partial_refund":
              cancellationDate = subDays(startTimeDate, 1);
              break;
            case "flexible__no_refund":
              cancellationDate = subDays(startTimeDate, 1);
              dateLabel = "после";
              break;
            case "default_30__full_refund":
              cancellationDate = subDays(startTimeDate, 30);
              break;
            case "default_30__partial_refund":
              cancellationDate = subDays(startTimeDate, 7);
              break;
            case "default_30__no_refund":
              cancellationDate = subDays(startTimeDate, 7);
              dateLabel = "после";
              break;
            case "default_90__full_refund":
              cancellationDate = subDays(startTimeDate, 90);
              break;
            case "default_90__partial_refund":
              cancellationDate = subDays(startTimeDate, 14);
              break;
            case "default_90__no_refund":
              cancellationDate = subDays(startTimeDate, 14);
              dateLabel = "после";
              break;
            default:
              throw new Error("Invalid cancellation policy");
          }

          return {
            cancellationDate,
            dateLabel,
          };
        };

        const { term: activeTerm } = getActiveCancelTermAndDates({
          bookingCancelTerm: booking.premise.bookingCancelTerm,
        });

        const RefundCondition = ({
          title,
          description,
          isActive,
          refundType,
        }: {
          title: string;
          description: string;
          isActive: boolean;
          refundType: string;
        }) => {
          const { cancellationDate, dateLabel } = getCancellationDate(
            `${booking.premise.bookingCancelTerm}__${refundType}`,
          );

          return (
            <Grid
              gridTemplateAreas='"date time term description button"'
              gridTemplateColumns="138px 47px 0.6fr 1fr max-content"
              gridAutoColumns="1fr"
              alignItems="center"
              gap={6}
              padding={4}
              bgColor={isActive ? "primary" : "white"}
              borderRadius="lg"
              marginBlock="1"
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
                    premiseAmount={booking.amount}
                    discountAmount={booking.discountAmount}
                    isActive={isActive}
                  />
                </Modal>
              </GridItem>
            </Grid>
          );
        };

        const createRefundContent = (refundType: string, isActive: boolean) => {
          switch (refundType) {
            case "full_refund":
              return (
                <RefundCondition
                  title={t("conditions.full_refund")}
                  description={t("conditions.full_refund_desc")}
                  isActive={isActive}
                  refundType={refundType}
                />
              );
            case "partial_refund":
              return (
                <RefundCondition
                  title={t("conditions.partial_refund")}
                  description={t("conditions.partial_refund_desc")}
                  isActive={isActive}
                  refundType={refundType}
                />
              );
            case "no_refund":
              return (
                <RefundCondition
                  title={t("conditions.no_refund")}
                  description={t("conditions.no_refund_desc")}
                  isActive={isActive}
                  refundType={refundType}
                />
              );
            default:
              return null;
          }
        };

        const cancelTermsOptions = {
          very_flexible: [
            {
              refundType: "full_refund",
            },
            {
              refundType: "no_refund",
            },
          ],
          flexible: [
            {
              refundType: "full_refund",
            },
            {
              refundType: "partial_refund",
            },
            {
              refundType: "no_refund",
            },
          ],
          default_30: [
            {
              refundType: "full_refund",
            },
            {
              refundType: "partial_refund",
            },
            {
              refundType: "no_refund",
            },
          ],
          default_90: [
            {
              refundType: "full_refund",
            },
            {
              refundType: "partial_refund",
            },
            {
              refundType: "no_refund",
            },
          ],
        };

        const bookingCancelTermsContent = Array.from(
          { length: 1 },
          (_, idx) => ({
            id: "product-" + idx,
            title: t("cancel_btn_accordion_label"),
            content: cancelTermsOptions?.[
              booking.premise.bookingCancelTerm as BookingCancelTerm
            ]?.map((term) =>
              createRefundContent(
                term.refundType,
                term.refundType === activeTerm,
              ),
            ),
          }),
        );

        return (
          <Box
            borderLeft="solid"
            paddingLeft="2"
            borderColor="secondary.lighter"
            key={booking.id}
          >
            <PremiseMyBookingCard>
              <div style={{ borderRadius: "8px", overflow: "hidden" }}>
                <Image
                  src={imageSrc}
                  width={159}
                  height={90}
                  alt={booking.premise.description}
                />
              </div>
              <PremiseMyBookingCardContent href="/#" label="Go to premise page">
                <PremiseMyBookingCardTitle>
                  {booking.premise.name} {booking.premise.bookingCancelTerm}
                </PremiseMyBookingCardTitle>
                <PremiseMyBookingCardDescription>
                  {!!booking.discountAmount &&
                    (`with Discount ${booking.discountAmount}%` as string)}
                </PremiseMyBookingCardDescription>
              </PremiseMyBookingCardContent>
              <BookingLabels booking={booking} labels={labels} />
            </PremiseMyBookingCard>
            {showCancelBtn() && (
              <>
                <Accordion>
                  {bookingCancelTermsContent.map(({ id, title, content }) => {
                    return (
                      <AccordionItem key={id}>
                        <AccordionItemToggle textStyle="heading.3">
                          {title}
                        </AccordionItemToggle>
                        <AccordionItemContent padding="0">
                          {content}
                        </AccordionItemContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </>
            )}
          </Box>
        );
      }),
    )}
  </section>
);

export default BookingsSection;
