import { useMedia } from "@/context/media";
import s3Client, { BUCKET_NAME } from "@/minio";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import ImageIcon from "@mui/icons-material/Image";
import { CardMedia, Checkbox, Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const arrayBufferToBase64 = (buffer: Uint8Array) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

function S3Image({ name }: { name?: string }) {
  const { pushName, removeName, selectedAll } = useMedia();
  const [checked, setChecked] = useState(selectedAll);

  const commandGetObject = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: name,
  });

  const { data, isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const response = await s3Client.send(
        new GetObjectCommand({
          Bucket: BUCKET_NAME,
          Key: name,
        })
      );

      const bytes = await response.Body?.transformToByteArray();
      if (!bytes) throw new Error("Failed to load image");

      const base64 = arrayBufferToBase64(bytes);
      const mimeType = response.ContentType || "image/jpeg";

      return `data:${mimeType};base64,${base64}`;
    },
    enabled: !!name,
    retry: 0,
  });

  const height = 140;

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setChecked(checked);
    if (checked && name) pushName(name);
    else if (!checked && name) removeName(name);
  };

  useEffect(() => {
    setChecked(selectedAll);
  }, [selectedAll]);

  return (
    <Card
      sx={{
        bgcolor: checked ? "action.hover" : "background.paper",
      }}
    >
      <CardHeader
        avatar={<ImageIcon fontSize="small" />}
        action={<Checkbox onChange={handleCheck} checked={checked} />}
        sx={{
          "& .MuiCardHeader-content": {
            display: "block",
            overflow: "hidden",
          },
        }}
        title={name}
        titleTypographyProps={{
          noWrap: true,
          textOverflow: "ellipsis",
        }}
      />
      {isLoading && <Skeleton variant="rectangular" height={height} />}
      {data && (
        <CardMedia component="img" alt={name} height={height} image={data} />
      )}
    </Card>
  );
}

export default S3Image;
