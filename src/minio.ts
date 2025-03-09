import { S3Client } from "@aws-sdk/client-s3";

export const BUCKET_NAME = "bucket";
export const MINIO_ENDPOINT = "http://178.128.21.155:9000";
// export const MINIO_ENDPOINT = "https://minio.lesang.id.vn";

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
