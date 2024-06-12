import { SocialNetwork } from "@prisma/client";
import { z } from "zod";
import { zfd } from "zod-form-data";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export const socialLinkSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z.object({
    network: zfd.text(z.nativeEnum(SocialNetwork)),
    url: zfd
      .text(
        z
          .string()
          .trim()
          .url({ message: requiredFieldMessage(t, "socialLink") })
          .optional(),
      )
      .optional(),
  });
