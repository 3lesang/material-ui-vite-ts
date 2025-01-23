import AdbIcon from "@mui/icons-material/Adb";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AuthHeader from "./AuthHeader";

const pages = ["Users", "Roles"];

function Header() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        <Typography variant="h6" component="div">
          Acme
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button key={page} color="inherit">
              {page}
            </Button>
          ))}
        </Box>
        <AuthHeader />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
