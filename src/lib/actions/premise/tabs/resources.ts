import { z } from "zod";
import { requiredFieldMessage } from "@/utils/forms/validationMessages";

export const resourcesSchema = (
  t: (arg: string) => string = (value) => value,
) =>
  z.object({
    resources: z
      .array(z.object({ url: z.string() }))
      .refine(
        (array) =>
          array.some(({ url }) => z.string().url().safeParse(url).success),
        {
          message: requiredFieldMessage(t, "photos"),
        },
      ),
  });

export type ResourcesFormSchemaProps = z.infer<
  ReturnType<typeof resourcesSchema>
>;
