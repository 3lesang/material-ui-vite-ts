import { axiosClient } from "@/axios";
import { notify } from "@/components/ui/CustomToast";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string(),
  email: z.string().email("Must be a valid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormSchema = z.infer<typeof formSchema>;

function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            label="Name"
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
      <Box mt={2}/>
      <LoadingButton
        variant="contained"
        color="primary"
        type="submit"
        size="medium"
        loading={isPending}
        disableElevation
        fullWidth
      >
        Sign up
      </LoadingButton>
    </Box>
  );
}

export default RegisterForm;
