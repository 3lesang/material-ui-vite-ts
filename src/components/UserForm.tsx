import { axiosClient } from "@/axios";
import CustomSelect, { CustomSelectProps } from "@/components/ui/CustomSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  active: z.boolean().optional(),
  roles: z.number().array().optional(),
});

export type UserSchema = z.infer<typeof FormSchema>;

const ROLE_API = "/roles";
const PARAMS = {
  page: 1,
  limit: 10,
};

export interface UserFormProps {
  defaultValues?: UserSchema;
  onSubmit?: (data: UserSchema) => void;
}

function UserForm({ defaultValues, onSubmit }: UserFormProps) {
  const { data } = useQuery({
    queryKey: [ROLE_API],
    queryFn: () => axiosClient.get(ROLE_API, { params: PARAMS }),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });

  const beforeSubmit = (data: UserSchema) => {
    onSubmit?.(data);
    reset(defaultValues, { keepValues: true });
  };

  const options: CustomSelectProps["options"] = data?.data?.data?.map(
    (item: any) => ({
      label: item?.name,
      value: item?.id,
    })
  );

  return (
    <Box component="form" onSubmit={handleSubmit(beforeSubmit)}>
      <Grid2 container spacing={1}>
        <Grid2 size={12}>
          <Stack alignItems="flex-end">
            <Box>
              <Button
                type="submit"
                disabled={!isDirty || !isValid}
                startIcon={<CheckIcon />}
                variant="contained"
                disableElevation
                size="small"
              >
                Save
              </Button>
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Card>
            <CardHeader
              title="User details"
              subheader="Enter the user information"
              titleTypographyProps={{
                variant: "button",
              }}
              subheaderTypographyProps={{
                variant: "caption",
              }}
            />
            <CardContent>
              <Grid2 container spacing={1}>
                <Grid2 size={6}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Name"
                        fullWidth
                        size="small"
                        {...field}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Username"
                        fullWidth
                        size="small"
                        {...field}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        label="Email"
                        fullWidth
                        size="small"
                        {...field}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={4}>
                  {options?.length && (
                    <Controller
                      name="roles"
                      control={control}
                      render={({ field }) => (
                        <CustomSelect
                          options={options}
                          label="Roles"
                          {...field}
                        />
                      )}
                    />
                  )}
                </Grid2>
                <Grid2 size={2}>
                  <Controller
                    name="active"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={<Switch checked={value} onChange={onChange} />}
                        label="Active"
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default UserForm;
