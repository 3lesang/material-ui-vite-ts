import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Typography>home</Typography>;
}
