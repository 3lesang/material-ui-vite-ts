import s3Client from "@/minio";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
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

const commandListObject = new ListObjectsV2Command({
  Bucket: BUCKET_NAME,
  MaxKeys: 100,
});

const commandGetObject = new GetObjectCommand({
  Bucket: BUCKET_NAME,
  Key: "wp12583031-anime-scene-4k-wallpapers.jpg",
});

function RouteComponent() {
  const { data, isLoading } = useQuery<ListObjectsV2CommandOutput>({
    queryKey: ["media"],
    queryFn: () => s3Client.send(commandListObject),
  });

  const { data: image } = useQuery({
    queryKey: ["s3Image"],
    queryFn: () => s3Client.send(commandGetObject),
    retry: false,
  });

  console.log(image);
  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader
        title="Media"
        subheader="List of media"
        action={<Button startIcon={<AddOutlinedIcon />}>Upload</Button>}
      />
      <CardContent>
        <Grid2 container spacing={2}>
          {data?.Contents?.map((obj) => (
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
