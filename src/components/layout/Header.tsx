import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMediaQuery, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "@tanstack/react-router";
import APopover from "../ui/APopover";
import TemporaryDrawer from "./AppDrawer";
import AppLogo from "./AppLogo";
import AuthButton from "./AuthButton";

const list = [
  { label: "Product", to: "/product" },
  { label: "Category", to: "/category" },
  { label: "File", to: "/file" },
  { label: "Users", to: "/user" },
  { label: "Roles", to: "/role" },
];

function ManagerMenu() {
  return (
    <APopover
      trigger="hover"
      dropdown={
        <List>
          {list.map((item) => (
            <ListItem key={item.to} disablePadding dense>
              <ListItemButton component={Link} to={item.to}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      }
    >
      <Button color="inherit" endIcon={<ExpandMoreIcon />}>
        List
      </Button>
    </APopover>
  );
}

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="sticky">
      <Toolbar variant="dense">
        {!isMobile && <AppLogo />}
        {isMobile && <TemporaryDrawer />}
        {!isMobile && <ManagerMenu />}
        <Box mx="auto" />
        <AuthButton />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
