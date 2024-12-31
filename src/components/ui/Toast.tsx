import { Alert, Snackbar } from "@mui/material";
import { toast } from "react-hot-toast";

interface NotifyOptions {
  variant: "success" | "error" | "info" | "warning";
}

export const notify = (message: string, opts?: NotifyOptions) => {
  toast.custom((t: any) => (
    <Snackbar
      open={t.visible}
      autoHideDuration={6000}
      onClose={() => toast.dismiss(t.id)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={() => toast.dismiss(t.id)} severity={opts?.variant}>
        {message}
      </Alert>
    </Snackbar>
  ));
};
