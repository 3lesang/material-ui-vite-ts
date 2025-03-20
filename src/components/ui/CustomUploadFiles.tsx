import { convertByte } from "@/helper";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Close";
import {
  Card,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { arrayMoveImmutable } from "array-move";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import SortableList, { SortableItem } from "react-easy-sort";

interface ItemType {
  id: number;
  name: string;
  preview?: string;
  size?: string;
}

function CustomUploadFiles() {
  const [files, setFiles] = useState<ItemType[]>([]);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setFiles((prev) => arrayMoveImmutable(prev, oldIndex, newIndex));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      preview: URL.createObjectURL(file),
      size: convertByte(file.size),
    }));
    setFiles((prev) => [...prev, ...newFiles]);
  }, []);

  const removeItem = (id: number) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <Box>
      <Box
        {...getRootProps()}
        textAlign="center"
        p={5}
        borderRadius={1}
        border="1px dashed gray"
        sx={{ cursor: "pointer" }}
      >
        <input {...getInputProps()} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          color="gray"
        >
          <Typography variant="body2">
            {isDragActive ? "Drop the files here..." : "Upload files"}
          </Typography>
        </Stack>
      </Box>

      <Box height={16} />

      <SortableList
        onSortEnd={onSortEnd}
        lockAxis="x"
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
        }}
      >
        {files.map((item) => (
          <SortableItem key={item.id}>
            <Card
              elevation={1}
              sx={{
                display: "inline-block",
                minWidth: 200,
                maxWidth: 200,
                userSelect: "none",
              }}
            >
              <CardHeader
                title={item.name}
                subheader={item.size}
                sx={{
                  "& .MuiCardHeader-content": {
                    display: "block",
                    overflow: "hidden",
                  },
                }}
                slotProps={{
                  title: {
                    variant: "caption",
                    noWrap: true,
                    textOverflow: "ellipsis",
                  },
                }}
                action={
                  <IconButton size="small" onClick={() => removeItem(item.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                }
              />
              <CardMedia image={item.preview} sx={{ height: 80 }} />
            </Card>
          </SortableItem>
        ))}
      </SortableList>
    </Box>
  );
}

export default CustomUploadFiles;
