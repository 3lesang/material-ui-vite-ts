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
        <img
          src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/36-simple-512.png"
          alt="logo"
          width="30"
          height="30"
        />
        <Typography variant="h6" component="div" mx={1}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Wave
          </Link>
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <APopover
            trigger="hover"
            dropdown={
              <List>
                <ListItem dense disablePadding>
                  <ListItemButton component={Link} to="/user" color="inherit">
                    <ListItemText primary="Users" />
                  </ListItemButton>
                </ListItem>
                <ListItem dense disablePadding>
                  <ListItemButton component={Link} to="/role" color="inherit">
                    <ListItemText primary="Roles" />
                  </ListItemButton>
                </ListItem>
              </List>
            }
          >
            <Button color="inherit" endIcon={<ExpandMoreIcon />}>
              Manager
            </Button>
          </APopover>
        </Box>
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
