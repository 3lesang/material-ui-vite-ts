import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import AuthHeader from "./AuthHeader";

function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography variant="h6" component="div">
          Acme
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" component={Link} to="/user">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/role">
            Roles
          </Button>
        </Box>
        <AuthHeader />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
