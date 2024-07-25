import { z } from "zod";
import { zfd } from "zod-form-data";

export const resetFormSchema = zfd.formData({
  email: zfd.text(z.string().email().toLowerCase()),
});

export type ResetFormInput = z.infer<typeof resetFormSchema>;
