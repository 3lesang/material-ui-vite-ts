import LoginForm from "@/components/LoginForm";
import { USER_LOCAL_KEY } from "@/constant/key";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const user = localStorage.getItem(USER_LOCAL_KEY);
    if (user) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400 }} elevation={1}>
        <CardHeader title="Login" subheader="Enter your account" />
        <CardContent>
          <LoginForm />
          <Typography mt={1}>
            Don't have an account? <Link to="/auth/register"> Sign up</Link>
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
