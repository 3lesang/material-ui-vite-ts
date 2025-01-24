import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { Outlet } from "@tanstack/react-router";
import Header from "./Header";

export default function MiniDrawer() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} height="100vh">
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }} bgcolor="#F9F9FA" pt={1}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
