import { z } from "zod";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export const mainInformationSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z.object({
    name: z.string().min(1, { message: requiredFieldMessage(t, "name") }),
    description: z
      .string()
      .min(1, { message: requiredFieldMessage(t, "description") }),
    room: z.string().optional(),
    floor: z.string().min(1, { message: requiredFieldMessage(t, "floor") }),
  });

export type MainInformationFormSchemaProps = z.infer<
  ReturnType<typeof mainInformationSchema>
>;
