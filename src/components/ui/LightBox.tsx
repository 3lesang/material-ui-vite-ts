import CloseIcon from "@mui/icons-material/Close";
import { alpha, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "usehooks-ts";
import S3Image from "../S3Image";

interface LightBoxProps {
  children: React.ReactNode;
  name: string;
}

function LightBox({ children, name }: LightBoxProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  useOnClickOutside(ref as React.RefObject<HTMLElement>, handleClose);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const modal = createPortal(
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgcolor={alpha("#000", 0.9)}
      zIndex={1300}
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="absolute" top={8} right={8}>
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box width={["100%", "50%"]} mx="auto" ref={ref}>
        <S3Image name={name} />
      </Box>
    </Box>,
    document.body
  );

  return (
    <>
      <div onClick={handleOpen} style={{ display: "flex", cursor: "pointer" }}>
        {children}
      </div>
      {open && modal}
    </>
  );
}

export default LightBox;
