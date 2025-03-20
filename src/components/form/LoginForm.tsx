import { axiosClient } from "@/axios";
import { notify } from "@/components/ui/CustomToast";
import { TOKEN_LOCAL_KEY, USER_LOCAL_KEY } from "@/constant/key";
import { zodResolver } from "@hookform/resolvers/zod";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

function LoginForm() {
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
    <Card
      sx={{ maxWidth: 400 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CardHeader title="Login" subheader="Enter your account" />
      <CardContent>
        <Grid2 container spacing={2}>
          <Grid2 size={[12, 12]}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Email"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              color="inherit"
            >
              Login
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button startIcon={<GoogleIcon />} color="error">
              Login with Google
            </Button>
          </Grid2>
          <Grid2 size={6}>
            <Button startIcon={<FacebookIcon />}>Login with Facebook</Button>
          </Grid2>
        </Grid2>
      </CardContent>
      <CardActions>
        <Typography variant="caption">
          Don't have an account?
          <Link to="/auth/register"> Create a account</Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default LoginForm;
