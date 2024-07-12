import Image from "next/image";
import { useTranslations } from "next-intl";
import BookingLabels from "./BookingLabels";
import {
  PremiseMyBookingCard,
  PremiseMyBookingCardContent,
  PremiseMyBookingCardDescription,
  PremiseMyBookingCardTitle,
} from "@/components/uikit";
import { Booking } from "@/lib/utils/premise-booking";
import { AspectRatio } from "~/styled-system/jsx";

interface BookingCardProps {
  booking: Booking;
  imageSrc: string;
}

const BookingCard = ({ booking, imageSrc }: BookingCardProps) => {
  const t = useTranslations("profile.my_bookings");

  return (
    <PremiseMyBookingCard>
      <AspectRatio
        ratio={16 / 9}
        flexBasis="40"
        borderRadius="sm"
        overflow="hidden"
      >
        <Image src={imageSrc} fill alt={booking.premise.description} />
      </AspectRatio>
      <PremiseMyBookingCardContent
        href={`/premises/${booking.premise.slug}`}
        label={booking.premise.name}
      >
        <div>
          <PremiseMyBookingCardTitle>
            {booking.premise.name}
          </PremiseMyBookingCardTitle>
          <PremiseMyBookingCardDescription>
            {!!booking.discountAmount &&
              (`${t("with_discount")} ${booking.discountAmount}%` as string)}
          </PremiseMyBookingCardDescription>
        </div>
        <BookingLabels booking={booking} />
      </PremiseMyBookingCardContent>
    </PremiseMyBookingCard>
  );
};

export default BookingCard;
