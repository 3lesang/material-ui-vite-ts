import s3Client, { BUCKET_NAME } from "@/minio";
import {
  GetObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { CardActions, CardMedia, Grid2, Skeleton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/media/")({
  component: RouteComponent,
});

const commandListObject = new ListObjectsV2Command({
  Bucket: BUCKET_NAME,
  MaxKeys: 100,
});

function Image({ name }: { name?: string }) {
  const commandGetObject = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: name,
  });

  const { data, isLoading } = useQuery({
    queryKey: [name],
    queryFn: async () => {
      const response = await s3Client.send(commandGetObject);
      if (!response.Body) throw new Error("Empty response body");

      const chunks: Uint8Array[] = [];
      for await (const chunk of response.Body as any) {
        chunks.push(chunk);
      }
      const blob = new Blob(chunks, {
        type: response.ContentType,
      });

      return URL.createObjectURL(blob);
    },
    retry: 0,
  });

  const height = 160;

  return (
    <Card>
      {isLoading && <Skeleton variant="rectangular" height={height} />}
      {data && (
        <CardMedia component="img" alt={name} height={height} image={data} />
      )}
      <CardActions>
        <Button size="small">Share</Button>
      </CardActions>
    </Card>
  );
}

function RouteComponent() {
  const { data } = useQuery<ListObjectsV2CommandOutput>({
    queryKey: ["media"],
    queryFn: () => s3Client.send(commandListObject),
    retry: 0,
  });

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
            <Grid2 size={[12, 3]} key={obj.Key}>
              <Image name={obj.Key} key={obj.Key} />
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
}
