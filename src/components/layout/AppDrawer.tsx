import CategoryIcon from "@mui/icons-material/Category";
import CookieIcon from "@mui/icons-material/Cookie";
import FolderIcon from "@mui/icons-material/Folder";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import TuneIcon from "@mui/icons-material/Tune";
import { ListItemIcon } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "@tanstack/react-router";
import * as React from "react";

const list = [
  { label: "Product", to: "/product", icon: <CookieIcon fontSize="small" /> },
  {
    label: "Category",
    to: "/category",
    icon: <CategoryIcon fontSize="small" />,
  },
  { label: "File", to: "/file", icon: <FolderIcon fontSize="small" /> },
  { label: "Users", to: "/user", icon: <PersonIcon fontSize="small" /> },
  { label: "Roles", to: "/role", icon: <TuneIcon fontSize="small" /> },
];

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List dense>
        {list.map((item, index) => (
          <ListItem
            key={item.label}
            disablePadding
            dense
            component={Link}
            to={item.to}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="small" />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
