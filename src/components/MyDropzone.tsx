import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { BasicFunction } from "./Sortable";

function MyDropzone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box>
      <input {...getInputProps()} />
      <Box {...getRootProps()}>
        <Button startIcon={<CloudUploadIcon />}>Upload files</Button>
      </Box>
      <Box height={4} />
      <BasicFunction />
    </Box>
  );
}

export default MyDropzone;
