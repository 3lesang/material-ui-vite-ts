import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid2 from "@mui/material/Grid2";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_setting/user/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={12}>
        <Card>
          <CardHeader title="User details" />
          <CardContent>
            <Grid2 container>
              <Grid2 size={6}>
                <TextField
                  label="Name"
                  fullWidth
                  size="small"
                  margin="normal"
                />
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={12}>
        <Card>
          <CardHeader title="Roles" />
          <CardContent>
            <Select size="small" multiple value={["user", "admin"]}>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </Select>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
