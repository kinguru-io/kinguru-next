import { z } from "zod";
import { zfd } from "zod-form-data";

export const signinFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string()),
});

export type SigninFormInput = z.infer<typeof signinFormSchema>;
