import { SocialNetwork } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";

const regexNIP = /^\d{10}$/m; // NIP is a 10 number string
// https://gist.github.com/akndmr/7ba7af0c07a3ec517c651bc6f1c508d5
const regexIBAN =
  /^([A-Z]{2}[ '+'\\\\'+'-]?[0-9]{2})(?=(?:[ '+'\\\\'+'-]?[A-Z0-9]){9,30}$)((?:[ '+'\\\\'+'-]?[A-Z0-9]{3,5}){2,7})([ '+'\\\\'+'-]?[A-Z0-9]{1,3})?$/m;

const addressSchema = z.object({
  country: zfd.text(),
  city: zfd.text(),
  street: zfd.text(),
  building: zfd.text(),
  room: zfd.text().optional().nullish(),
  zipCode: zfd.text(),
});

const socialLinkSchema = z.object({
  network: zfd.text(z.nativeEnum(SocialNetwork)),
  url: zfd.text(z.string().optional()),
});

export const orgRegisterSchema = zfd.formData({
  name: zfd.text(z.string()),
  foundationDate: zfd.numeric(
    z.number().min(1900).step(1).max(new Date().getFullYear()),
  ),
  country: zfd.text(),
  city: zfd.text(),
  businessName: zfd.text(),
  NIP: zfd.text(z.string().regex(regexNIP)),
  bankName: zfd.text(),
  IBAN: zfd.text(z.string().regex(regexIBAN)),
  address: zfd.repeatable(z.array(addressSchema).min(2).max(2)),
  logotype: zfd.text(z.string().url().nullish()),
  socialLinks: zfd
    .repeatableOfType(socialLinkSchema)
    .refine(
      (socials) =>
        socials.some(({ url }) => z.string().url().safeParse(url).success),
      {
        message: "At least one social network should be provided",
        path: ["socialLinks", "0", "url"],
      },
    ),
});

export type OrgRegisterInput = z.infer<typeof orgRegisterSchema>;
