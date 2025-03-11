import CloseIcon from "@mui/icons-material/Close";
import { alpha, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { createPortal } from "react-dom";
import S3Image from "../S3Image";

interface LightBoxProps {
  children: React.ReactNode;
  name: string;
}

function LightBox({ children, name }: LightBoxProps) {
  const [open, setOpen] = useState(false);

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(false);
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const model = createPortal(
    <Box
      position="fixed"
      top={0}
      bgcolor={alpha("#000", 0.5)}
      bottom={0}
      zIndex={1300}
      left={0}
      right={0}
      color="white"
    >
      <Box ml="auto" width="fit-content" position="absolute" right={0}>
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box width="100vw" height="100vh" alignContent="center">
        <Box>
          <S3Image name={name} />
        </Box>
      </Box>
    </Box>,
    document.body
  );

  return (
    <>
      <IconButton onClick={handleOpen}>{children}</IconButton>
      {open && <>{model}</>}
    </>
  );
}

export default LightBox;
