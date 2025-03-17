import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader } from "@mui/material";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export type RoleSchema = z.infer<typeof FormSchema>;

interface FormProps {
  defaultValues?: RoleSchema;
  onSubmit?: (data: RoleSchema) => void;
  actionText?: string;
}

export function CategoryForm({
  defaultValues,
  onSubmit,
  actionText,
}: FormProps) {
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

  const beforeSubmit = (data: RoleSchema) => {
    onSubmit?.(data);
    reset(defaultValues, { keepValues: true });
  };

  return (
    <Card component="form" onSubmit={handleSubmit(beforeSubmit)}>
      <CardHeader
        title="Roles"
        subheader="Define the rights given to the role"
        action={
          <Button type="submit" disabled={!isDirty || !isValid}>
            {actionText}
          </Button>
        }
      />
      <CardContent>
        <Grid2 container spacing={1}>
          <Grid2 size={[12, 6]}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField
                  label="Name"
                  fullWidth
                  required
                  {...field}
                  error={!!errors.name}
                  helperText={errors?.name?.message}
                />
              )}
            />
          </Grid2>
          <Grid2 size={[12, 6]}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  multiline
                  minRows={3}
                />
              )}
            />
          </Grid2>
        </Grid2>
      </CardContent>
    </Card>
  );
}
