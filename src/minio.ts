import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "us-east-1",
  endpoint: "https://minio.lesang.id.vn",
  credentials: {
    accessKeyId: "AP8VP3aR8vhnnBr08uEl",
    secretAccessKey: "39cEp3Vz9fLGAdEsm8INsj9degICRfX9DJWP33bY",
  },
  forcePathStyle: true,
});

export default s3Client;
