import { z } from "zod";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export const rulesSchema = (t: (arg: string) => string = (value) => value) =>
  z.object({
    rules: z.string().min(10, { message: requiredFieldMessage(t, "rulesMin") }),
  });

export type RulesFormSchemaProps = z.infer<ReturnType<typeof rulesSchema>>;
