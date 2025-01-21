import Header from "@/components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <Container disableGutters>
      <Header />
      <Box pt={1}>
        <Outlet />
      </Box>
    </Container>
  );
}
