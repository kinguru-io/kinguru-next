import type { $Enums } from "@prisma/client";
import { isBefore } from "date-fns";
import { z } from "zod";
import type { Amenity } from "@/lib/shared/config/amenities";
import type { BookingCancelTerm } from "@/lib/shared/config/booking-cancel-terms";
import type { PremiseType } from "@/lib/shared/config/premise-types";

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

export const createPremiseSchema = z.object({
  name: z.string(),
  description: z.string(),
  room: z.string(),
  floor: z.string(),
  resources: z.array(z.object({ url: z.string() })).refine((array) =>
    array.some(({ url }) => z.string().url().safeParse(url).success, {
      message: "Should be at least one image",
      path: ["resources"],
    }),
  ),
  type: z
    .custom<PremiseType>()
    .refine((type) => z.string().safeParse(type).success),
  area: z.number().nonnegative(),
  capacity: z.number().nonnegative(),
  amenities: z
    .record(z.custom<Amenity>(), z.boolean())
    .refine(
      (amenities) => Object.values(amenities).filter(Boolean).length >= 5,
      {
        message: "Should be chosen at least 5 amenities",
        path: ["amenities"],
      },
    ),
  rules: z.string(),
  openHours: z.array(openHoursSchema).min(1),
  bookingCancelTerm: z
    .custom<BookingCancelTerm>()
    .refine((type) => z.string().safeParse(type).success),
});

export type OpenHoursSchema = z.infer<typeof openHoursSchema>;
export type CreatePremiseSchema = z.infer<typeof createPremiseSchema>;
