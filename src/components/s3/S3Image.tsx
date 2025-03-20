import { useS3Url } from "./useS3Url";

function S3Image({ name }: { name: string }) {
  const { data } = useS3Url(name);
  return (
    <img
      alt={name}
      src={data?.src}
      width="100%"
      height="100%"
      loading="lazy"
      style={{ objectFit: "cover" }}
    />
  );
}

export default S3Image;
