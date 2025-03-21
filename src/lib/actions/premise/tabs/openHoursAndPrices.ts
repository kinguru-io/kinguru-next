import { $Enums } from "@prisma/client";
import { isBefore } from "date-fns";
import { z } from "zod";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export const discountsSchema = z.object({
  duration: z.number().step(1).min(1).max(23),
  discountPercentage: z.number().step(0.1).min(0.1).max(100),
});

export const openHoursSchema = z
  .object({
    day: z.custom<$Enums.DayOfTheWeek>(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    price: z.number().nonnegative().optional(),
  })
  .refine(({ startTime, endTime }) => isBefore(startTime, endTime), {
    message: "Start time should be before end time",
    path: ["startTime"],
  });

export const openHoursAndPriceSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z
    .object({
      priceMode: z.custom<$Enums.PremisePriceMode>().optional(),
      minimalPrice: z.number().optional(),
      minimalSlotsToBook: z.number().optional(),
      withConfirmation: z.boolean().optional(),
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
    })
    .superRefine(({ minimalPrice, openHours }, ctx) => {
      if (!minimalPrice) {
        openHours.forEach((hour, index) => {
          if (hour.price === undefined) {
            ctx.addIssue({
              code: "custom",
              message: "Price is required when minimal price is not set",
              path: ["openHours", index, "price"],
            });
          }
        });
      }
    });

export type OpenHoursSchema = z.infer<typeof openHoursSchema>;
export type DiscountsSchema = z.infer<typeof discountsSchema>;

export type OpenHoursAndPriceFormSchemaProps = z.infer<
  ReturnType<typeof openHoursAndPriceSchema>
>;
