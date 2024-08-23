"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import { ImageActionData, preprocessFiles } from "./util";
import { videoRegex } from "@/lib/shared/utils/regex";
import { s3client } from "@/s3client";

type GroupKey = string;
type ImageUploadError = keyof IntlMessages["form"]["common"];
type UploadImageActionReturn =
  | { ok: true; urls: string[] }
  | { ok: false; messages: ImageUploadError[] };

export async function uploadImageAction(
  data: ImageActionData | ImageActionData[],
  groupKey: GroupKey,
): Promise<UploadImageActionReturn> {
  const fileMetaList = Array.isArray(data) ? data : [data];

  const parseResults = preprocessFiles(fileMetaList);

  if (parseResults.length === 0) return { ok: false, messages: [] };

  const commandsPromises = parseResults.map(({ type, name }) => {
    const isVideo = videoRegex.test(name);
    const extension = isVideo ? name.split(".").pop() : type.split("/").pop();
    const basePath = `${groupKey}${isVideo ? "/video" : ""}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: `${basePath}/${uuid()}.${extension}`,
      ContentType: type,
    });

    return getSignedUrl(s3client, command).catch(() => null); // default URL lifetime = 900s (15mins)
  });

  try {
    const urls = (await Promise.all(commandsPromises)).filter(
      (url) => typeof url === "string",
    );

    if (urls.length === 0) return { ok: false, messages: ["upload_failed"] };

    return { ok: true, urls };
  } catch (_) {
    return {
      ok: false,
      messages: ["upload_failed"],
    };
  }
}
