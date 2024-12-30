import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { createContext, ReactNode, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";

interface ConfirmDialogOptions {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface AppContextValue {
  confirm: (options: ConfirmDialogOptions) => Promise<boolean>;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: AppProviderProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<ConfirmDialogOptions | null>(
    null
  );
  const [resolveDialog, setResolveDialog] = useState<
    ((value: boolean) => void) | null
  >(null);

  const confirm = async (options: ConfirmDialogOptions): Promise<boolean> => {
    setDialogConfig(options);
    setDialogOpen(true);

    return new Promise((resolve) => {
      setResolveDialog(() => resolve);
    });
  };

  const handleConfirm = () => {
    setDialogOpen(false);
    resolveDialog?.(true);
    setResolveDialog(null);
  };

  const handleCancel = () => {
    setDialogOpen(false);
    resolveDialog?.(false);
    setResolveDialog(null);
  };

  const value: AppContextValue = {
    confirm,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <Dialog
        open={dialogOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialogConfig?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogConfig?.description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>
            {dialogConfig?.cancelLabel || "Cancel"}
          </Button>
          <Button onClick={handleConfirm} color="error" autoFocus>
            {dialogConfig?.confirmLabel || "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster position="bottom-center" reverseOrder={false} />
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
