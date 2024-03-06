import { z } from "zod";
import { zfd } from "zod-form-data";

export const orgRegisterSchema = zfd.formData({
  name: zfd.text(z.string()),
  foundationDate: zfd.text(z.string()),
  activitySphere: zfd.text(z.string()),
  logotype: zfd.text(z.string().url()),
  aboutCompany: zfd.text(z.string()),
  requisitesUrl: zfd.text(z.string()),
});

export type OrgRegisterInput = z.infer<typeof orgRegisterSchema>;
