import { SettingsOutlined } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={3}>
        <Card>
          <List dense disablePadding>
            <ListItem>
              <ListItemText>Setting</ListItemText>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton dense component={Link} to="/setting/user">
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>User</ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/setting/role">
                <ListItemIcon>
                  <SettingsOutlined />
                </ListItemIcon>
                <ListItemText>Role</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Card>
      </Grid2>
      <Grid2 size={9}>
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
