import { z } from "zod";
import { zfd } from "zod-form-data";
import { socialLinkSchema } from "./social-link";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

z.setErrorMap((issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === "string" || issue.expected === "number") {
      return { message: "" };
    }
  }
  return { message: ctx.defaultError };
});

export const userProfileSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  zfd.formData({
    image: zfd.text(z.string().url().nullish()),
    firstname: zfd.text(
      z.string().min(2, {
        message: requiredFieldMessage(t, "firstname"),
      }),
    ),
    lastname: zfd.text(
      z.string().min(2, {
        message: requiredFieldMessage(t, "lastname"),
      }),
    ),
    email: zfd.text(
      z.string().email({
        message: requiredFieldMessage(t, "email"),
      }),
    ),
    phoneNumber: zfd.text(z.string()),
    country: zfd.text(z.string()),
    city: zfd.text(z.string().nullish()),
    birthdate: zfd.text(z.string().date(requiredFieldMessage(t, "birthdate"))),
    description: zfd.text(z.string().nullish()),
    socialLinks: z
      .array(socialLinkSchema(t))
      .refine(
        (socials) =>
          socials.some(
            ({ url }) => z.string().trim().url().safeParse(url).success,
          ),
        {
          message: requiredFieldMessage(t, "socialLinks"),
        },
      ),
  });

export type UserProfileInput = z.infer<ReturnType<typeof userProfileSchema>>;
