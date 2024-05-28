import { z } from "zod";

export const mainInformationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  room: z.string().min(1, "Room is required"),
  floor: z.string().min(1, "Floor is required"),
});

export type MainInformationFormSchemaProps = z.infer<
  typeof mainInformationSchema
>;
