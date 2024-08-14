import { z } from "zod";
import { zfd } from "zod-form-data";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string" || issue.expected === "number") {
      return { message: "" };
    }
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

const mainInfoSchema = z.object({
  name: zfd.text(z.string()),
  description: zfd.text(z.string()),
});

const imageSchema = (t: (arg: string) => string = (value) => value) =>
  z.object({
    image: zfd.text(
      z
        .string({ message: requiredFieldMessage(t, "photo") })
        .trim()
        .url(),
    ),
  });

const locationSchema = z.object({
  locationMapboxId: zfd.text(z.string()),
  locationTutorial: zfd.text(z.string()),
});

const featuresSchema = z.object({
  featureCCTV: zfd.text().transform((value) => value === "1"),
  featureParking: zfd.text().transform((value) => value === "1"),
  featureAge: zfd.numeric(),
});

const managerSchema = (t: (arg: string) => string = (value) => value) =>
  z.object({
    manager: z.object({
      firstname: zfd.text(z.string()),
      lastname: zfd.text(z.string()),
      email: zfd.text(
        z.string().email({ message: requiredFieldMessage(t, "email") }),
      ),
      phoneNumber: zfd.text(z.string().min(8, { message: "+48 XX XXXXXXX" })),
    }),
  });

const idsSchema = z.object({
  venueId: zfd.text(z.string()).optional(),
  managerId: zfd.text(z.string()).optional(),
});

// Discriminated union schema
export const createVenueFormSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z.object({
    mainInfo: mainInfoSchema,
    image: imageSchema(t),
    location: locationSchema,
    features: featuresSchema,
    manager: managerSchema(t),
  });

export type CreateVenueFormSchemaProps = {
  mainInfo: z.infer<typeof mainInfoSchema>;
  image: z.infer<ReturnType<typeof imageSchema>>;
  location: z.infer<typeof locationSchema>;
  features: z.infer<typeof featuresSchema>;
  manager: z.infer<ReturnType<typeof managerSchema>>;
  idsSchema: z.infer<typeof idsSchema>;
};

// Merged schema with all fields
export const mergedVenueSchema = mainInfoSchema
  .extend(imageSchema().shape)
  .extend(locationSchema.shape)
  .extend(featuresSchema.shape)
  .extend(managerSchema().shape)
  .extend(idsSchema.shape);

export type MergedVenueFormSchemaProps = z.infer<typeof mergedVenueSchema>;
