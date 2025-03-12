import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "@tanstack/react-router";
import Header from "./Header";

export default function MiniDrawer() {
  return (
    <Box>
      <Header />
      <Box component="main" py={1}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
