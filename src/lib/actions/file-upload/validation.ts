import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 mb
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const imageSchema = z
  .object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })
  .refine(({ size }) => size <= MAX_FILE_SIZE)
  .refine(({ type }) => ACCEPTED_IMAGE_MIME_TYPES.includes(type));
