import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});

const navItems = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Contact",
    to: "/contact",
  },
  {
    name: "Product",
    to: "/product",
  },
];

function LayoutComponent() {
  return (
    <Stack>
      <AppBar component="nav" elevation={0}>
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            component={Link}
            color="inherit"
            to="/"
            sx={{
              display: { xs: "none", sm: "block" },
              textDecoration: "none",
            }}
          >
            Acme
          </Typography>
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.name}
                sx={{ color: "#fff" }}
                component={Link}
                to={`/${item.to}`}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" component="main">
        <Toolbar variant="dense" />
        <Box p={4}>
          <Outlet />
        </Box>
      </Container>
    </Stack>
  );
}
