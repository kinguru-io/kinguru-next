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

const regexNIP = /^\d{10}$/m; // NIP is a 10 number string
// https://gist.github.com/akndmr/7ba7af0c07a3ec517c651bc6f1c508d5
const regexIBAN =
  /^([A-Z]{2}[ '+'\\\\'+'-]?[0-9]{2})(?=(?:[ '+'\\\\'+'-]?[A-Z0-9]){9,30}$)((?:[ '+'\\\\'+'-]?[A-Z0-9]{3,5}){2,7})([ '+'\\\\'+'-]?[A-Z0-9]{1,3})?$/m;

const addressSchema = z.object({
  country: zfd.text(),
  city: zfd.text().nullish(),
  street: zfd.text().nullish(),
  building: zfd.text().nullish(),
  room: zfd.text().optional().nullish(),
  zipCode: zfd.text().nullish(),
});

export const orgRegisterSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  zfd.formData({
    name: zfd.text(z.string().min(3).max(50)),
    foundationDate: zfd.numeric(
      z.number().min(1900).step(1).max(new Date().getFullYear()),
    ),
    country: zfd.text(),
    city: zfd.text(),
    businessName: zfd.text(),
    NIP: zfd.text(
      z
        .string()
        .regex(regexNIP, {
          message: requiredFieldMessage(t, "NIP"),
        })
        .min(10)
        .max(10),
    ),
    bankName: zfd.text().nullish(),
    IBAN: zfd
      .text(
        z
          .string()
          .regex(regexIBAN, { message: requiredFieldMessage(t, "IBAN") }),
      )
      .transform((x) => x.replace(/\s/g, "")),
    address: zfd.repeatable(z.array(addressSchema).min(2).max(2)),
    logotype: zfd.text(z.string().url().nullish()).nullish(),
    socialLinks: zfd
      .repeatableOfType(socialLinkSchema(t))
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

export type OrgRegisterInput = z.infer<ReturnType<typeof orgRegisterSchema>>;
