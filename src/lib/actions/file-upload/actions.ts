"use server";

import { randomUUID } from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { imageSchema } from "./validation";
import { s3client } from "@/s3client";

export type ProfileImageActionData = Pick<File, "name" | "size" | "type">;
type GroupKey = string;

export async function uploadProfileImage(
  data: ProfileImageActionData,
  groupKey: GroupKey,
) {
  const imageExtension = data.type.split("/").pop();
  const command = new PutObjectCommand({
    Bucket: process.env.S3_UPLOAD_BUCKET,
    Key: `${groupKey}/${randomUUID()}.${imageExtension}`,
    ContentType: data.type,
  });

  try {
    imageSchema.parse(data);

    return await getSignedUrl(s3client, command); // default URL lifetime = 900s (15mins)
  } catch (e) {
    // TODO handle an error?
    return JSON.stringify(e);
  }
}
