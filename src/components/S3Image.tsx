import s3Client, { BUCKET_NAME } from "@/minio";
import { GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";
import { useQuery } from "@tanstack/react-query";

const arrayBufferToBase64 = (buffer: Uint8Array) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const convertResponse = async (response: GetObjectCommandOutput) => {
  const bytes = await response.Body?.transformToByteArray();
  if (!bytes) throw new Error("Failed to load image");

  const base64 = arrayBufferToBase64(bytes);
  const mimeType = response.ContentType;

  return `data:${mimeType};base64,${base64}`;
};

function S3Image({ name }: { name: string }) {
  const { data, isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: name,
        })
      );
      return convertResponse(response);
    },
    enabled: !!name,
    retry: 0,
  });

  if (isLoading) return;

  return (
    <img
      alt={name}
      src={data}
      width="100%"
      height="100%"
      loading="lazy"
      style={{ objectFit: "cover" }}
    />
  );
}

export default S3Image;
