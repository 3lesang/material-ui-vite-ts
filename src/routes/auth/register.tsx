import RegisterForm from "@/components/RegisterForm";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400 }} elevation={1}>
        <CardHeader
          title="Sign up"
          subheader="Enter your account information"
        />
        <CardContent>
          <RegisterForm />
          <Typography mt={1}>
            Don't have an account? <Link to="/auth/login"> Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
}
