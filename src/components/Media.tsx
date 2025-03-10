import { AppMediaProvider, useMedia } from "@/context/media";
import s3Client, { BUCKET_NAME } from "@/minio";
import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { LoadingButton } from "@mui/lab";
import { Button, Grid2, Stack, styled, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import S3Image from "./S3Image";

const commandListObject = new ListObjectsV2Command({
  Bucket: BUCKET_NAME,
  MaxKeys: 12,
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function MediaList() {
  const { selected, clearName, setAll, selectedAll, setNameAll } = useMedia();

  const { data, refetch, isLoading } = useQuery<ListObjectsV2CommandOutput>({
    queryKey: ["media"],
    queryFn: () => s3Client.send(commandListObject),
    retry: 0,
  });

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: async (params: PutObjectCommandInput) => {
      const command = new PutObjectCommand(params);
      return s3Client.send(command);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteObject, isPending: isDeleting } = useMutation({
    mutationFn: async (keys: string[]) => {
      const command = new DeleteObjectsCommand({
        Bucket: BUCKET_NAME,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
        },
      });
      return s3Client.send(command);
    },
    onSuccess: () => {
      clearName();
      setAll(false);
      refetch();
    },
  });

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    const file = files[0];

    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const params: PutObjectCommandInput = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: uint8Array,
      ContentType: file.type,
    };

    mutate(params);
  };

  const handleDelete = () => {
    deleteObject(selected);
  };

  const handleSelectAll = () => {
    const name = data?.Contents?.map((obj) => obj.Key);
    setAll(!selectedAll);
    if (selectedAll) {
      setNameAll([]);
    } else {
      setNameAll(name as string[]);
    }
  };

  const renderContent = () => {
    if (!data?.Contents && !isLoading) {
      return (
        <Typography textAlign="center" variant="body2">
          This location is empty, please try uploading a new file
        </Typography>
      );
    }
    return (
      <Grid2 container spacing={2}>
        {data?.Contents?.map((obj) => (
          <Grid2 size={[12, 3]} key={obj.Key}>
            <S3Image name={obj.Key} />
          </Grid2>
        ))}
      </Grid2>
    );
  };

  return (
    <Card>
      <CardHeader
        title="Assets"
        subheader="List of assets"
        action={
          <Stack direction="row" spacing={1}>
            {selected.length > 0 && (
              <LoadingButton
                color="error"
                onClick={handleDelete}
                loading={isDeleting}
              >
                Delete
              </LoadingButton>
            )}

            <Button onClick={handleSelectAll} color="inherit">
              Select
            </Button>
            <LoadingButton
              loading={isUploading}
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              <VisuallyHiddenInput
                type="file"
                onChange={handleUpload}
                multiple
                accept="image/*"
              />
              Upload
            </LoadingButton>
          </Stack>
        }
      />
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}

function Media() {
  return (
    <AppMediaProvider>
      <MediaList />
    </AppMediaProvider>
  );
}

export default Media;
