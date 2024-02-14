import { z } from "zod";
import { zfd } from "zod-form-data";

// TODO error messages (?)

export const resetFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
});

export type ResetFormInput = z.infer<typeof resetFormSchema>;

export const signinFormSchema = zfd.formData({
  email: zfd.text(z.string().email()),
  password: zfd.text(z.string()),
});

export type SigninFormInput = z.infer<typeof signinFormSchema>;

export const signupFormSchema = zfd
  .formData({
    email: zfd.text(z.string().email()),
    password: zfd.text(z.string()),
    confirmPassword: zfd.text(z.string()),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword);

export type SignupFormInput = z.infer<typeof signupFormSchema>;
