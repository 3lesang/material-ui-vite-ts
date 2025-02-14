import { axiosClient } from "@/axios";
import { notify } from "@/components/ui/CustomToast";
import { TOKEN_LOCAL_KEY, USER_LOCAL_KEY } from "@/constant/key";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            label="Email"
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
            type="password"
            margin="normal"
            fullWidth
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />
      <Box mt={2} />
      <LoadingButton
        variant="contained"
        color="primary"
        type="submit"
        size="medium"
        loading={isPending}
        disableElevation
        fullWidth
      >
        Log in
      </LoadingButton>
    </Box>
  );
}

export default LoginForm;
