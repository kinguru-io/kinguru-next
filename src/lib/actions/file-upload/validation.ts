import { z } from "zod";

export const maxFileSizeMB = 5;
const MAX_FILE_SIZE = maxFileSizeMB * 1024 * 1024;
export const ACCEPTED_IMAGE_MIME_TYPES = [
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
  .refine(({ size }) => size <= MAX_FILE_SIZE, "incorrect_file_size")
  .refine(
    ({ type }) => ACCEPTED_IMAGE_MIME_TYPES.includes(type),
    "incorrect_file_type",
  );
