import AdbIcon from "@mui/icons-material/Adb";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "@tanstack/react-router";
import APopover from "../ui/APopover";
import AuthButton from "./AuthButton";

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
          <APopover
            trigger="hover"
            dropdown={
              <List disablePadding>
                <ListItem disablePadding dense>
                  <ListItemButton>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
              </List>
            }
          >
            <Button color="inherit" endIcon={<ExpandMoreIcon />}>
              Settings
            </Button>
          </APopover>
        </Box>
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
