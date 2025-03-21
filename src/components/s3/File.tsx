import s3Client, { BUCKET_NAME } from "@/components/s3/minio";
import { useApp } from "@/context/app";
import { useTable } from "@/context/table";
import { convertByte } from "@/helper";
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
import {
  Box,
  CardContent,
  ListItemIcon,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import AlignItemsList from "../ui/CustomList";
import CreateFolder from "./CreateFolder";
import ListFile from "./ListFile";
import ListFolder from "./ListFolder";
import S3Image from "./S3Image";

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

async function listObjectsByPage(
  bucketName: string,
  pageSize: number,
  pageNumber: number
) {
  let startAfter: string | undefined;

  if (pageNumber > 1) {
    const previousPage = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucketName,
        MaxKeys: (pageNumber - 1) * pageSize,
      })
    );

    const objects = previousPage.Contents || [];
    if (objects.length > 0) {
      startAfter = objects[objects.length - 1].Key;
    }
  }

  const command = new ListObjectsV2Command({
    Bucket: bucketName,
    MaxKeys: pageSize,
    StartAfter: startAfter,
    Delimiter: "/",
  });

  return s3Client.send(command);
}

function FileList() {
  const [page, setPage] = useState(1);

  const { selected, setName } = useTable();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const commandListObject = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    MaxKeys: 10,
  });

  const { data, refetch, isLoading } = useQuery<ListObjectsV2CommandOutput>({
    queryKey: ["file", page],
    // queryFn: () => s3Client.send(commandListObject),
    queryFn: () => listObjectsByPage(BUCKET_NAME, 17, page),
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
      setName([]);
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

  const { handleOpenLightBox } = useApp();

  const handleItemClick = (row: any) => {
    handleOpenLightBox(true, row?.Key);
  };

  const columns: GridColDef[] = [
    {
      field: "url",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => (
        <Stack alignItems="center" justifyContent="center" height={1}>
          <Box width={30} height={30} borderRadius={1} overflow="hidden">
            <S3Image name={params?.id.toString()} />
          </Box>
        </Stack>
      ),
    },
    {
      field: "Key",
      headerName: "Name",
      width: 400,
      sortable: false,
      disableColumnMenu: true,
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
        format(new Date(params.value), "HH:mm dd MMM yyyy"),
    },
  ];

  const listColumns = [
    {
      field: "Key",
      renderCell: (value: any) => {
        return (
          <ListItemIcon>
            <ImageOutlinedIcon />
          </ListItemIcon>
        );
      },
    },
    {
      field: "Key",
    },
    {
      field: "LastModified",
      renderCell: (value: any) => format(new Date(value), "HH:mm dd MMM yyyy"),
    },
  ];

  const listCardColumns = [
    {
      field: "Key",
    },
    {
      field: "Key",
    },
    {
      field: "Size",
      renderCell: (value: any) => convertByte(value),
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
            <CreateFolder />
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

      {isMobile ? (
        <AlignItemsList
          rows={data?.Contents}
          columns={listColumns}
          onItemClick={handleItemClick}
        />
      ) : (
        // <DataGrid
        //   loading={isLoading}
        //   columns={columns}
        //   rows={data?.Contents}
        //   getRowId={(row) => row.Key as string}
        //   onRowSelectionModelChange={(newRowSelectionModel) => {
        //     setName(newRowSelectionModel as string[]);
        //   }}
        // />
        <CardContent>
          <ListFolder />
          <ListFile rows={data?.Contents} columns={listCardColumns} />
        </CardContent>
      )}
    </Card>
  );
}

export default FileList;
