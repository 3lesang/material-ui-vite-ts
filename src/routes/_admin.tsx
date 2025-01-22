import Sidebar from "@/components/Sidebar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: LayoutComponent,
});

const drawerWidth = 256;

function LayoutComponent() {
  return (
    <Stack direction="row" minHeight="100vh">
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Box px={1}>
          <Typography variant="h6">Acme</Typography>
        </Box>
        <Sidebar />
      </Box>
      <Box component="main" p={1} bgcolor="#eee" flexGrow={1}>
        <Outlet />
      </Box>
    </Stack>
  );
}
