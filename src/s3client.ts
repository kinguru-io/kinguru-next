import { S3Client, type S3ClientConfig } from "@aws-sdk/client-s3";

export const s3client = new S3Client({
  region: process.env.S3_UPLOAD_REGION,
  endpoint: process.env.S3_UPLOAD_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.S3_UPLOAD_KEY,
    secretAccessKey: process.env.S3_UPLOAD_SECRET,
  },
} as S3ClientConfig);
