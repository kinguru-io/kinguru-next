import { $Enums } from "@prisma/client";
import { isBefore } from "date-fns";
import { z } from "zod";

export const openHoursSchema = z
  .object({
    day: z.custom<$Enums.DayOfTheWeek>(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    price: z.number().nonnegative(),
  })
  .refine(({ startTime, endTime }) => isBefore(startTime, endTime), {
    message: "Start time should be before end time",
    path: ["startTime"],
  });

export const discountsSchema = z.object({
  duration: z.number().step(1).min(1).max(23),
  discountPercentage: z.number().step(0.1).min(0.1).max(100),
});

export const openHoursAndPriceSchema = z.object({
  openHours: z
    .array(openHoursSchema)
    .min(1, { message: "You should work at least one day a week" }),
  discounts: z
    .array(discountsSchema)
    .refine(
      (fields) =>
        new Set(fields.map(({ duration }) => duration)).size === fields.length,
    ),
});

export type OpenHoursSchema = z.infer<typeof openHoursSchema>;
export type DiscountsSchema = z.infer<typeof discountsSchema>;

export type OpenHoursAndPriceFormSchemaProps = z.infer<
  typeof openHoursAndPriceSchema
>;
