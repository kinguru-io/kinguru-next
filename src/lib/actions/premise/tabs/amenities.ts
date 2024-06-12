import { z } from "zod";
import { Amenity } from "@/lib/shared/config/amenities";
import { premiseTypes } from "@/lib/shared/config/premise-types";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export type PremiseType = (typeof premiseTypes)[number];

const PremiseTypeEnum = (t: (arg: string) => string = (value) => value) =>
  // @ts-expect-error
  z.enum([...premiseTypes], {
    errorMap: () => ({ message: requiredFieldMessage(t, "type") }),
  });

export const parametersAndAmenitiesSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z.object({
    type: PremiseTypeEnum(t),
    area: z.preprocess(
      (value) => (value === "" ? undefined : Number(value)),
      z
        .number({ message: requiredFieldMessage(t, "area") })
        .min(3, { message: requiredFieldMessage(t, "areaMin") })
        .max(100000, { message: requiredFieldMessage(t, "areaMax") })
        .positive(),
    ),
    capacity: z.preprocess(
      (value) => (value === "" ? undefined : Number(value)),
      z
        .number({ message: requiredFieldMessage(t, "capacity") })
        .min(1, { message: requiredFieldMessage(t, "capacityMin") })
        .max(100000, { message: requiredFieldMessage(t, "capacityMax") })
        .positive(),
    ),
    amenities: z
      .record(z.custom<Amenity>(), z.boolean())
      .refine(
        (amenities) => Object.values(amenities).filter(Boolean).length >= 5,
        {
          message: requiredFieldMessage(t, "amenities"),
        },
      ),
  });

export type ParametersAndAmenitiesFormSchemaProps = z.infer<
  ReturnType<typeof parametersAndAmenitiesSchema>
>;
