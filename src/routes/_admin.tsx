import AuthHeader from "@/components/AuthHeader";
import pages from "@/data/page";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <Container disableGutters>
      <AppBar component="nav" position="sticky" elevation={0} color="inherit">
        <Toolbar variant="dense" disableGutters>
          <Typography
            variant="h6"
            component={Link}
            color="inherit"
            to="/"
            sx={{ textDecoration: "none" }}
          >
            Acme
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.to}
                color="inherit"
                size="small"
              >
                {item.name}
              </Button>
            ))}
          </Box>
          <AuthHeader />
        </Toolbar>
      </AppBar>
      <Outlet />
    </Container>
  );
}
