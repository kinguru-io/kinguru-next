import { z } from "zod";

export const resourcesSchema = z.object({
  resources: z
    .array(z.object({ url: z.string() }))
    .refine(
      (array) =>
        array.some(({ url }) => z.string().url().safeParse(url).success),
      {
        message: "Should be at least one image",
      },
    ),
});

export type ResourcesFormSchemaProps = z.infer<typeof resourcesSchema>;
