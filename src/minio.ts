import { S3Client } from "@aws-sdk/client-s3";

export const BUCKET_NAME = import.meta.env.VITE_BUCKET_NAME;
export const MINIO_ENDPOINT = import.meta.env.VITE_MINIO_ENDPOINT;

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: MINIO_ENDPOINT,
  credentials: {
    accessKeyId: "AP8VP3aR8vhnnBr08uEl",
    secretAccessKey: "39cEp3Vz9fLGAdEsm8INsj9degICRfX9DJWP33bY",
  },
  forcePathStyle: true,
});

export default s3Client;
