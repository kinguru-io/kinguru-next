import { z } from "zod";
import { zfd } from "zod-form-data";

export const signupFormSchema = zfd
  .formData({
    email: zfd.text(z.string().email()),
    password: zfd.text(z.string()),
    confirmPassword: zfd.text(z.string()),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword);

export type SignupFormInput = z.infer<typeof signupFormSchema>;
