import { S3Client } from "@aws-sdk/client-s3";

export const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
export const MINIO_ENDPOINT = import.meta.env.VITE_MINIO_ENDPOINT;
export const ACCESS_KEY_ID = import.meta.env.VITE_ACCESS_KEY_ID;
export const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY;
export const BUCKET_REGION = import.meta.env.VITE_BUCKET_REGION;

const s3Client = new S3Client({
  region: BUCKET_REGION,
  endpoint: MINIO_ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export default s3Client;
