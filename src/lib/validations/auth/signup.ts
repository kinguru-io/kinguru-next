import { z } from "zod";
import { zfd } from "zod-form-data";

export const signupFormSchema = zfd
  .formData({
    name: zfd.text(),
    email: zfd.text(z.string().email().toLowerCase()),
    password: zfd.text(z.string()),
    confirmPassword: zfd.text(z.string()),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "The passwords you entered did not match, please try again",
    path: ["confirmPassword"],
  });

export type SignupFormInput = z.infer<typeof signupFormSchema>;

export const userSignupFormSchema = zfd
  .formData({
    email: zfd.text(z.string().email().toLowerCase()),
    password: zfd.text(z.string()),
    confirmPassword: zfd.text(z.string()),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "The passwords you entered did not match, please try again",
    path: ["confirmPassword"],
  });

export type UserSignupFormInput = z.infer<typeof userSignupFormSchema>;
