import { Alert, Snackbar } from "@mui/material";
import { toast } from "react-hot-toast";

interface NotifyProps {
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

export const notify = ({ message, severity }: NotifyProps) => {
  toast.custom((t: any) => (
    <Snackbar
      open={t.visible}
      autoHideDuration={6000}
      onClose={() => toast.dismiss(t.id)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() => toast.dismiss(t.id)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  ));
};
