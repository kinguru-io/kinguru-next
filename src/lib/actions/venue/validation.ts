import { z } from "zod";
import { zfd } from "zod-form-data";

export const createVenueSchema = zfd.formData({
  name: zfd.text(z.string()),
  description: zfd.text(z.string()),
  image: zfd.text(z.string()),
  locationMapboxId: zfd.text(z.string()),
  locationTutorial: zfd.text(z.string()),
  featureCCTV: zfd.checkbox(),
  featureParking: zfd.checkbox(),
  featureAge: zfd.numeric(),
  manager: z.object({
    firstname: zfd.text(z.string()),
    lastname: zfd.text(z.string()),
    email: zfd.text(z.string().email()),
    phoneNumber: zfd.text(z.string()),
  }),
});

export type CreateVenueInput = z.infer<typeof createVenueSchema>;
