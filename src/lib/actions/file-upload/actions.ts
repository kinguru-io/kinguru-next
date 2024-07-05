"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { imageSchema } from "./validation";
import { s3client } from "@/s3client";

export type ProfileImageActionData = Pick<File, "name" | "size" | "type">;
type GroupKey = string;
type ImageUploadError = keyof IntlMessages["form"]["common"];

export async function uploadProfileImage(
  data: ProfileImageActionData,
  groupKey: GroupKey,
) {
  const imageExtension = data.type.split("/").pop();
  const command = new PutObjectCommand({
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: `${groupKey}/${uuid()}.${imageExtension}`,
    ContentType: data.type,
  });

  const parseResult = imageSchema.safeParse(data);

  if (!parseResult.success) {
    return parseResult.error.flatten().formErrors as ImageUploadError[];
  }

  try {
    return await getSignedUrl(s3client, command); // default URL lifetime = 900s (15mins)
  } catch (_) {
    return ["upload_failed"] as ImageUploadError[];
  }
}
