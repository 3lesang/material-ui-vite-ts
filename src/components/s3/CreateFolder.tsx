import { PutObjectCommand } from "@aws-sdk/client-s3";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { S3_FOLDER_KEY } from "./ListFolder";
import s3Client, { BUCKET_NAME } from "./minio";

function CreateFolder() {
  const [open, setOpen] = React.useState(false);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();
  const { mutate: createFolder } = useMutation({
    mutationFn: (name: string) => {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: name,
        Body: "",
      });
      return s3Client.send(command);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [S3_FOLDER_KEY],
      });
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = ({ name }: { name: string }) => {
    createFolder(`${name}/`);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
        New folder
      </Button>
      <Dialog open={open} onClose={handleClose} disableRestoreFocus>
        <DialogTitle>Create new folder</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  autoFocus
                  {...field}
                  margin="normal"
                  fullWidth
                  label="Folder name"
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" disableElevation>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default CreateFolder;
