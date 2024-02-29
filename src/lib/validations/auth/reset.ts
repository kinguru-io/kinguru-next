import { z } from "zod";
import { zfd } from "zod-form-data";

export const resetFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
});

export type ResetFormInput = z.infer<typeof resetFormSchema>;
