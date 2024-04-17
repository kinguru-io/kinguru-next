import { z } from "zod";
import { zfd } from "zod-form-data";

export const createVenueSchema = zfd.formData({
  name: zfd.text(z.string()),
  description: zfd.text(z.string()),
  image: zfd.text(z.string()),
  locationMapboxId: zfd.text(z.string()),
  locationTutorial: zfd.text(z.string()),

  // TODO add more fields
});

export type CreateVenueInput = z.infer<typeof createVenueSchema>;
