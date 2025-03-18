import Stack from "@mui/material/Stack";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      height="100vh"
      px={[1, 0]}
    >
      <Outlet />
    </Stack>
  );
}
