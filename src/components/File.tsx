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
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { LoadingButton } from "@mui/lab";
import { Stack, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import LightBox from "./ui/LightBox";
import AlignItemsList from "./AlignItemsList";

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

const convertByte = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

function FileList() {
  const { selected, clearName, setAll, selectedAll, setNameAll } = useMedia();

  const { data, refetch, isLoading } = useQuery<ListObjectsV2CommandOutput>({
    queryKey: ["media"],
    queryFn: () => s3Client.send(commandListObject),
    retry: 0,
  });

  const { mutate: upload, isPending: isUploading } = useMutation({
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

    const uploadPromises = Array.from(files).map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      const params: PutObjectCommandInput = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: uint8Array,
        ContentType: file.type,
      };

      return upload(params);
    });

    Promise.all(uploadPromises);
  };

  const handleDelete = () => {
    deleteObject(selected);
  };

  const columns: GridColDef[] = [
    {
      field: "Key",
      headerName: "Name",
      width: 500,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Stack direction="row" alignItems="center" gap={1}>
            <ImageOutlinedIcon fontSize="small" />
            <LightBox name={params.value}>{params.value}</LightBox>
          </Stack>
        );
      },
    },
    {
      field: "Size",
      headerName: "Size",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => convertByte(params.value),
    },
    {
      field: "LastModified",
      headerName: "Last Modified",
      width: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) =>
        formatDistanceToNow(new Date(params.value), { addSuffix: true }),
    },
  ];

  return (
    <Card>
      <CardHeader
        title="File"
        subheader="List of file"
        action={
          <Stack direction="row" spacing={1}>
            {selected.length > 0 && (
              <LoadingButton
                color="error"
                size="small"
                onClick={handleDelete}
                loading={isDeleting}
              >
                Delete
              </LoadingButton>
            )}
            <LoadingButton
              loading={isUploading}
              component="label"
              role={undefined}
              size="small"
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
      <AlignItemsList/>
      {/*
      
      <DataGrid
        // checkboxSelection
        rowSelection
        loading={isLoading}
        columns={columns}
        rows={data?.Contents}
        getRowId={(row) => row.Key as string}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setNameAll(newRowSelectionModel as string[]);
        }}
      />
      */}

    </Card>
  );
}

function File() {
  return (
    <AppMediaProvider>
      <FileList />
    </AppMediaProvider>
  );
}

export default File;
