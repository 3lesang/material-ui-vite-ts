import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import { useRouter } from "@tanstack/react-router";

function BackButton() {
  const { history } = useRouter();
  const handleBack = () => {
    history.go(-1);
  };

  return (
    <Button startIcon={<ChevronLeftIcon />} onClick={handleBack}>
      Back
    </Button>
  );
}

export default BackButton;
