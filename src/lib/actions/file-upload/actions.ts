"use server";

import { S3Client, PutObjectCommand, S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuid } from "uuid";

const client = new S3Client({
  region: process.env.S3_UPLOAD_REGION,
  endpoint: process.env.S3_UPLOAD_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
  },
} as S3ClientConfig);

export async function uploadProfileImage(data: FormData, key: string) {
  const image = data.get(key) as File;

  if (!image) {
    // TODO handle an error?
    return;
  }

  try {
    // TODO add zod validation

    const command = new PutObjectCommand({
      Bucket: process.env.S3_UPLOAD_BUCKET,
      Key: `test-uploads/${uuid()}/${image.name}`,
      ContentType: "image/*",
    });

    const presignedURL = await getSignedUrl(client, command); // default URL lifetime = 900s (15mins)

    await fetch(presignedURL, { method: "PUT", body: image });

    return cutSearchParams(presignedURL);
  } catch (e) {
    // TODO handle an error?
    return JSON.stringify(e);
  }
}

// TODO move to utils
function cutSearchParams(url: string) {
  return url.slice(0, url.indexOf("?"));
}
