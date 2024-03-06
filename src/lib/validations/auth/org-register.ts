import { z } from "zod";
import { zfd } from "zod-form-data";

export const orgRegisterSchema = zfd.formData({
  name: zfd.text(z.string().nullish()),
  foundationDate: zfd.text(z.string()),
  activitySphere: zfd.text(z.string().nullish()),
  logotype: zfd.text(z.string()),
  aboutCompany: zfd.text(z.string()),
});

export type OrgRegisterInput = z.infer<typeof orgRegisterSchema>;
