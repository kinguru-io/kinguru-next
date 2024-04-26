import { z } from "zod";

export const createPremiseSchema = z.object({
  name: z.string(),
  description: z.string(),
  room: z.string(),
  floor: z.string(),
  resources: z.array(z.object({ url: z.string() })).refine((array) =>
    array.some(({ url }) => z.string().url().safeParse(url).success, {
      message: "Should be at least one image",
      path: ["resources"],
    }),
  ),
  type: z.string(),
  area: z.number().nonnegative(),
  capacity: z.number().nonnegative(),
  amenities: z.array(z.object({ amenity: z.string() })).min(5),
  // TODO incomplete yet
});

export type CreatePremiseSchema = z.infer<typeof createPremiseSchema>;
