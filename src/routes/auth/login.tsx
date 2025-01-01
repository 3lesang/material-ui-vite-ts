import { axiosClient } from "@/axios";
import { notify } from "@/components/ui/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/auth/login")({
  component: RouteComponent,
});

const formSchema = z.object({
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

function RouteComponent() {
  const [user, saveUser] = useLocalStorage("user", null);
  const [_, saveToken] = useLocalStorage("token", null);
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
    onSuccess(res) {
      saveUser(res?.data?.user);
      saveToken(res?.data?.token);
      notify("Login successfully", {
        variant: "success",
      });
      navigate({ to: "/" });
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
              fullWidth
            >
              Log in
            </LoadingButton>
          </Box>
        </CardContent>

        <CardActions>
          <p>Don't have an account?</p>
          <Link to="/auth/register">
            <p>Sign up</p>
          </Link>
        </CardActions>
      </Card>
    </Stack>
  );
}
