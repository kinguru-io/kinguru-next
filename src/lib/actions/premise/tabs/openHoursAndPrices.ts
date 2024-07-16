import { $Enums } from "@prisma/client";
import { z } from "zod";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export const openHoursSchema = z
  .object({
    day: z.custom<$Enums.DayOfTheWeek>(),
    openTime: z.number().nonnegative(),
    closeTime: z.number().nonnegative(),
    price: z.number().nonnegative(),
  })
  .refine(({ openTime, closeTime }) => openTime < closeTime, {
    message: "Start time should be before end time",
    path: ["startTime"],
  });

export const discountsSchema = z.object({
  duration: z.number().step(1).min(1).max(23),
  discountPercentage: z.number().step(0.1).min(0.1).max(100),
});

export const openHoursAndPriceSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z.object({
    openHours: z
      .array(openHoursSchema)
      .min(1, { message: requiredFieldMessage(t, "openHours") }),
    discounts: z
      .array(discountsSchema)
      .refine(
        (fields) =>
          new Set(fields.map(({ duration }) => duration)).size ===
          fields.length,
      ),
  });

export type OpenHoursSchema = z.infer<typeof openHoursSchema>;
export type DiscountsSchema = z.infer<typeof discountsSchema>;

export type OpenHoursAndPriceFormSchemaProps = z.infer<
  ReturnType<typeof openHoursAndPriceSchema>
>;
