import s3Client from "@/minio";
import { GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CardActions, CardMedia, Grid2 } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const BUCKET_NAME = "wave";
const MINIO_ENDPOINT = "https://minio.lesang.id.vn";

export const Route = createFileRoute("/_admin/media/")({
  component: RouteComponent,
});

const listObjects = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 100,
    });

    const response = await s3Client.send(command);
    return response.Contents || [];
  } catch (err) {
    console.error("Error listing objects:", err);
    return [];
  }
};

const getObject = async () => {
  try {
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: "wp12583031-anime-scene-4k-wallpapers.jpg",
    });

    const response = await s3Client.send(command);

    if (!response.Body) throw new Error("Empty response body");

    const contentType = response.ContentType || "image/jpeg";

    const chunks: Uint8Array[] = [];
    for await (const chunk of response.Body as AsyncIterable<Uint8Array>) {
      chunks.push(chunk);
    }

    const blob = new Blob(chunks, { type: contentType });
    return URL.createObjectURL(blob);
  } catch (error: any) {
    console.error("Error fetching image from S3:", error);
    throw new Error(`Failed to fetch image: ${error.message}`);
  }
};

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["media"],
    queryFn: listObjects,
  });

  const { data: image } = useQuery({
    queryKey: ["s3Image"],
    queryFn: getObject,
    retry: false,
  });

  console.log(image);
  console.log(data);

  return (
    <Card>
      <CardHeader
        title="Media"
        subheader="List of media"
        action={<Button startIcon={<AddOutlinedIcon />}>Upload</Button>}
      />
      <CardContent>
        <Grid2 container spacing={2}>
          {data?.map((obj) => (
            <Grid2 size={2} key={obj.Key}>
              <Card>
                <CardMedia
                  component="img"
                  alt={obj.Key}
                  height="140"
                  image={`${MINIO_ENDPOINT}/${BUCKET_NAME}/${obj.Key}`}
                />
                <CardActions>
                  <Button size="small">Share</Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
}
