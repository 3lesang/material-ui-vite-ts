import { loginHttp } from "@/api/auth";
import { notify } from "@/components/CustomToast";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import { CardActions } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/auth/register")({
  component: RouteComponent,
});

const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

function RouteComponent() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "3lesang@gmail.com", password: "test" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormSchema) => loginHttp(data),
    onSuccess() {
      notify({
        message: "Login successfully",
        severity: "success",
      });
    },
  });

  const onSubmit = (data: LoginFormSchema) => {
    mutate(data);
  };

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ width: 400 }}>
        <CardHeader title="Sign up" />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  size="small"
                  fullWidth
                  margin="normal"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
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
              Sign up
            </LoadingButton>
          </Box>
        </CardContent>

        <CardActions>
          <p>Don't have an account?</p>
          <Link to="/auth/login">
            <p>Sign in</p>
          </Link>
        </CardActions>
      </Card>
    </Stack>
  );
}
