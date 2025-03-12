import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";

function AppLogo() {
  return (
    <Link to="/">
      <Stack direction="row">
        <img
          src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/36-simple-512.png"
          alt="logo"
          width="30"
          height="30"
        />
        <Typography variant="h6" mx={1}>
          Wave
        </Typography>
      </Stack>
    </Link>
  );
}

export default AppLogo;
