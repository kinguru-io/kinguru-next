import { TicketIntentStatus } from "@prisma/client";
import { format } from "date-fns";
import { getTranslations } from "next-intl/server";
import { LiaCalendar } from "react-icons/lia";

import CancelBookingBtn from "./myBookings/CancelBookingBtn";
import Tabs from "./Tabs";
import BookingCard from "../uikit/PremiseMyBookingCard/BookingCard";
import BookingsSection from "../uikit/PremiseMyBookingCard/BookingsSection";
import { getSession } from "@/auth";
import { Modal, Tag } from "@/components/uikit";
import { fetchImageSrc } from "@/lib/utils/fetch-image-src";
import { bookingsGroupedByDateAndPremiseAndPayment } from "@/lib/utils/groupBy-bookings";
import { Booking } from "@/lib/utils/premise-booking";
import { HStack } from "~/styled-system/jsx";

export async function PremiseMyBookings({
  allBookings,
}: {
  allBookings: Booking[];
}) {
  const session = await getSession();
  const t = await getTranslations("user.my_bookings");

  const statusColorPallets: Record<TicketIntentStatus, string> = {
    failed: "danger",
    succeed: "success",
    progress: "primary",
  };

  const labels = {
    date: {
      format: ({ date }: { date: Date }) => (
        <HStack gap="3px">
          <LiaCalendar size="1.125em" />{" "}
          <time dateTime={format(date, "dd.MM.yyyy")}>
            {format(date, "dd.MM.yyyy")}
          </time>
        </HStack>
      ),
    },
    time: {
      format: ({ startTime, endTime }: { startTime: Date; endTime: Date }) =>
        `${format(startTime, "HH:mm")} - ${format(endTime, "HH:mm")}`,
    },
    status: {
      format: ({ status }: { status: TicketIntentStatus }) => (
        <Tag variant="solid" colorPalette={statusColorPallets[status]}>
          {status}
        </Tag>
      ),
    },
  };

  function partition(array: any[], isValid: (elem: any) => boolean) {
    return array.reduce(
      ([pass, fail]: [any[], any[]], elem) => {
        return isValid(elem)
          ? [[...pass, elem], fail]
          : [pass, [...fail, elem]];
      },
      [[], []],
    );
  }

  const [myBookings, companyBookings] = partition(
    allBookings,
    (e) => !!e.paymentIntentId,
  );

  const groupedBookings = bookingsGroupedByDateAndPremiseAndPayment(myBookings);

  const imageSrcs: Record<string, string> = {};
  for (const booking of allBookings) {
    imageSrcs[booking.premiseId] = await fetchImageSrc(booking.premiseId);
  }

  const MyBookings = () =>
    Object.entries(groupedBookings).map(([date, premises]) => (
      <BookingsSection
        key={date}
        date={date}
        premises={premises}
        imageSrcs={imageSrcs}
        labels={labels}
      />
    ));

  const CompanyBookings = () =>
    companyBookings.map((booking: Booking) => (
      <>
        <BookingCard
          booking={booking}
          imageSrc={imageSrcs[booking.premiseId]}
          labels={labels}
        />
        <Modal>
          <CancelBookingBtn
            bookingStartTime={booking.startTime}
            bookingCancelTerm={booking.premise.bookingCancelTerm}
            premiseSlotIds={[booking.id]}
            paymentIntentId={booking.paymentIntentId}
            premiseAmount={0}
            discountAmount={booking.discountAmount}
            isActive={true}
          />
        </Modal>
      </>
    ));

  const tabs = [
    { label: "My Bookings", content: <MyBookings /> },
    { label: "Company", content: <CompanyBookings /> },
  ];

  return (
    <>
      {!allBookings.length && <section>{t("no_bookings")}</section>}
      {session?.user?.role === "organization" ? (
        <Tabs tabs={tabs} />
      ) : (
        <MyBookings />
      )}
    </>
  );
}
