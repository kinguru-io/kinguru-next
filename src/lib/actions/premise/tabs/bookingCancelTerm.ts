import { z } from "zod";
import { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export const bookingCancelTermSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z.object({
    bookingCancelTerm: z
      .custom<BookingCancelTerm>()
      .refine((type) => z.string().safeParse(type).success, {
        message: requiredFieldMessage(t, "bookingCancelTerm"),
      }),
  });

export type BookingCancelTermFormSchemaProps = z.infer<
  ReturnType<typeof bookingCancelTermSchema>
>;
