import { z } from "zod";

export const rulesSchema = z.object({
  rules: z.string().min(1, "Rules is required"),
});

export type RulesFormSchemaProps = z.infer<typeof rulesSchema>;
