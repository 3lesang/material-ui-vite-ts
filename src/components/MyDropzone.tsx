import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import MySortable from "./MySortable";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <input {...getInputProps()} />
      <Box {...getRootProps()}>
        <Button startIcon={<CloudUploadIcon />}>Upload files</Button>
      </Box>
      <Box height={4} />
      <Stack direction="row" gap={1}>
        <Box bgcolor="lightblue" borderRadius={1} height={100} width={100} />
        <Box bgcolor="lightgreen" borderRadius={1} height={100} width={100} />
        <Box bgcolor="lightpink" borderRadius={1} height={100} width={100} />
        <Box bgcolor="lightyellow" borderRadius={1} height={100} width={100} />
      </Stack>
      <MySortable />
    </Box>
  );
}

export default MyDropzone;
