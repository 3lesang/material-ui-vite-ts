import { axiosClient } from "@/axios";
import { notify } from "@/components/ui/CustomToast";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
  confirm: z.string().min(1, "Confirm password is required"),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: LoginFormSchema) =>
      axiosClient.post("/auth/register", data),
    onSuccess() {
      notify("Sign up successfully");
    },
  });

  const onSubmit = (data: LoginFormSchema) => {
    mutate(data);
  };
  return (
    <Card
      sx={{ maxWidth: 400 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CardHeader
        title="Sign up"
        subheader="Enter your account information"
        action={<Button type="submit">Submit</Button>}
      />
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={[6, 6]}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  fullWidth
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={[6, 6]}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Username"
                  required
                  fullWidth
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={[12, 12]}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
                  required
                  fullWidth
                  {...field}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={[12, 12]}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Password"
                  required
                  type="password"
                  fullWidth
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={[12, 12]}>
            <Controller
              name="confirm"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Confirm password"
                  type="password"
                  required
                  fullWidth
                  {...field}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </CardContent>
      <CardActions>
        <Typography variant="caption">
          Don't have an account? <Link to="/auth/login"> Sign in</Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default RegisterForm;
