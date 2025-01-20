import PermissionTable, {
  columns,
} from "@/components/PermissionTable";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckIcon from "@mui/icons-material/Check";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  permissions: z.any().array().optional(),
});

export type RoleSchema = z.infer<typeof FormSchema>;

interface FormProps {
  defaultValues?: RoleSchema;
  onSubmit?: (data: RoleSchema) => void;
  actionText?: string;
}

export function RoleForm({ defaultValues, onSubmit, actionText }: FormProps) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isDirty, isValid, errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });

  const handlePermissionChange = (value: any) => {
    setValue("permissions", value, { shouldDirty: true, shouldValidate: true });
  };

  const beforeSubmit = (data: RoleSchema) => {
    onSubmit?.(data);
    reset(defaultValues, { keepValues: true });
  };

  const isSupperAdmin = defaultValues?.id == 1;

  return (
    <Box component="form" onSubmit={handleSubmit(beforeSubmit)}>
      <Grid2 container spacing={1}>
        <Grid2 size={12}>
          <Stack alignItems="flex-end">
            <Box>
              <Button
                type="submit"
                startIcon={<CheckIcon />}
                variant="contained"
                disableElevation
                size="small"
                disabled={!isDirty || !isValid}
              >
                {actionText}
              </Button>
            </Box>
          </Stack>
        </Grid2>
        <Grid2 size={12}>
          <Card>
            <CardHeader
              title="Role Information"
              subheader="Enter the role information"
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
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <TextField
                        label="Name"
                        fullWidth
                        required
                        size="small"
                        {...field}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                      />
                    )}
                  />
                </Grid2>
                <Grid2 size={6}>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        size="small"
                        multiline
                        rows={5}
                      />
                    )}
                  />
                </Grid2>
              </Grid2>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={12}>
          <PermissionTable
            disable={isSupperAdmin}
            value={defaultValues?.permissions}
            columns={columns}
            onChange={handlePermissionChange}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
}
