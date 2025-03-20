import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "@tanstack/react-router";

function Error() {
  const router = useRouter();
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Typography textAlign="center" color="textSecondary" variant="body2">
        Not found!
      </Typography>
      <Button onClick={() => router.history.back()}>Go back</Button>
    </Stack>
  );
}

export default Error;
