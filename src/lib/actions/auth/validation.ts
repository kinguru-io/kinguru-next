import { z } from "zod";
// eslint-disable-next-line import/no-extraneous-dependencies
import { zfd } from "zod-form-data";

export const resetFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
});

export type ResetFormInput = z.infer<typeof resetFormSchema>;
