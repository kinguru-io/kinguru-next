import { z } from "zod";
import { videoRegex } from "@/lib/shared/utils/regex";

const oneMegabyte = 1024 * 1024;

export const maxFileSizeMB = 5;
export const maxVideoFileSizeMB = 20;
export const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const maxImageSize = maxFileSizeMB * oneMegabyte;
const maxVideoSize = maxVideoFileSizeMB * oneMegabyte;

export const imageSchema = z
  .object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })
  .refine(({ size }) => size <= maxImageSize, "incorrect_file_size")
  .refine(
    ({ type }) => ACCEPTED_IMAGE_MIME_TYPES.includes(type),
    "incorrect_file_type",
  );

export const videoSchema = z
  .object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
  })
  .refine(({ size }) => size <= maxVideoSize, "incorrect_file_size")
  .refine(({ name }) => videoRegex.test(name), "incorrect_file_type");
