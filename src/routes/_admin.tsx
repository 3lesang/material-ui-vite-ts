import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: LayoutComponent,
});

const pages = [
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
  {
    name: "Setting",
    to: "/setting",
  },
];

function LayoutComponent() {
  return (
    <>
      <AppBar component="nav" position="static">
        <Toolbar>
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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((item) => (
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
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component="main" disableGutters>
        <Outlet />
      </Container>
    </>
  );
}
