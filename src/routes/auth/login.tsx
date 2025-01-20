import { axiosClient } from "@/axios";
import { notify } from "@/components/ui/CustomToast";
import { TOKEN_LOCAL_KEY, USER_LOCAL_KEY } from "@/data/page";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  redirect,
  useNavigate,
} from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

function RouteComponent() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "3lesang@gmail.com", password: "test" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormSchema) =>
      axiosClient.post("/auth/login", data),
    onSuccess: (res) => {
      localStorage.setItem(USER_LOCAL_KEY, JSON.stringify(res?.data?.user));
      localStorage.setItem(TOKEN_LOCAL_KEY, res?.data?.token);
      navigate({ to: "/" });
    },
    onError: (res) => {
      notify(res.message, { variant: "error" });
    },
  });

  const onSubmit = (data: LoginFormSchema) => {
    mutate(data);
  };

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400 }}>
        <CardHeader title="Login" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  size="small"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Password"
                  size="small"
                  type="password"
                  margin="normal"
                  fullWidth
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={isPending}
              disableElevation
              fullWidth
            >
              Log in
            </LoadingButton>
          </Box>
          <Stack mt={1} direction="row">
            <Typography>Don't have an account?</Typography>
            <Typography
              to="/auth/register"
              color="blue"
              component={Link}
              sx={{
                textDecoration: "none",
              }}
            >
              Sign up
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
