import { z } from "zod";
import { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";

export const bookingCancelTermSchema = z.object({
  bookingCancelTerm: z
    .custom<BookingCancelTerm>()
    .refine((type) => z.string().safeParse(type).success, {
      message: "You should choose one",
    }),
});

export type BookingCancelTermFormSchemaProps = z.infer<
  typeof bookingCancelTermSchema
>;
