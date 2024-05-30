import { z } from "zod";
import { Amenity } from "@/lib/shared/config/amenities";
import { PremiseType } from "@/lib/shared/config/premise-types";

export const parametersAndAmenitiesSchema = z.object({
  type: z
    .custom<PremiseType>()
    .refine((type) => z.string().safeParse(type).success),
  area: z.coerce
    .number()
    .min(1, { message: "errors.area_min" })
    .max(100000, { message: "errors.area_max" }),
  capacity: z.number().min(1).positive(),
  amenities: z
    .record(z.custom<Amenity>(), z.boolean())
    .refine(
      (amenities) => Object.values(amenities).filter(Boolean).length >= 5,
      {
        message: "Should be chosen at least 5 amenities",
      },
    ),
});

export type ParametersAndAmenitiesFormSchemaProps = z.infer<
  typeof parametersAndAmenitiesSchema
>;
