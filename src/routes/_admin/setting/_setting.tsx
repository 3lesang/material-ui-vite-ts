import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid2 from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_setting")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Container>
      <Grid2 container spacing={2} p={2}>
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
    </Container>
  );
}
