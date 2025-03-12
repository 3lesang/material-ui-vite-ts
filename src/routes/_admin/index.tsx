import { Box, Card, Grid2 } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={6}>
        <Card>
          <Box height={300} bgcolor="#cecece" />
        </Card>
      </Grid2>
      <Grid2 size={6}>
        <Card>
          <Box height={300} bgcolor="#eeeeee" />
        </Card>
      </Grid2>
      <Grid2 size={12}>
        <Card>
          <Box height={300} bgcolor="#cecece" />
        </Card>
      </Grid2>
    </Grid2>
  );
}
