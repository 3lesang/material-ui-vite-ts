import {
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
} from "@aws-sdk/client-s3";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import s3Client, { BUCKET_NAME } from "./minio";

export const S3_FOLDER_KEY = "folder";

function ListFolder() {
  const commandListObject = new ListObjectsV2Command({
    Bucket: BUCKET_NAME,
    MaxKeys: 10,
    Delimiter: "/",
  });
  const navigate = useNavigate();
  const { data } = useQuery<ListObjectsV2CommandOutput>({
    queryKey: [S3_FOLDER_KEY],
    queryFn: () => s3Client.send(commandListObject),
    retry: 0,
  });

  const folders =
    data?.CommonPrefixes?.map((prefix) => prefix.Prefix?.trim()) || [];

  const handleClick = (name: string) => {
    navigate({ to: "/file/$id", params: { id: name } });
  };

  return (
    <Stack direction="row" gap={1}>
      {folders?.map((name) => (
        <Button
          variant="contained"
          disableElevation
          color="inherit"
          startIcon={<FolderIcon />}
          endIcon={<MoreVertIcon fontSize="small" />}
          onClick={() => handleClick(name as string)}
        >
          {name?.replace("/", "")}
        </Button>
      ))}
    </Stack>
  );
}

export default ListFolder;
