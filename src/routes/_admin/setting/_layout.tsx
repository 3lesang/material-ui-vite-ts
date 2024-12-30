import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid2 from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={3}>
        <Card>
          <CardHeader title="Setting" />
          <MenuList>
            <MenuItem component={Link} to="/setting/user">
              User
            </MenuItem>
            <MenuItem component={Link} to="/setting/role">
              Role
            </MenuItem>
          </MenuList>
        </Card>
      </Grid2>
      <Grid2 size={9}>
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
