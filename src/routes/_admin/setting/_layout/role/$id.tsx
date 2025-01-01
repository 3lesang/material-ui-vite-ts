import { axiosClient } from "@/axios";
import BackButton from "@/components/BackButton";
import { notify } from "@/components/ui/Toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid2 from "@mui/material/Grid2";
import TextField from "@mui/material/TextField";
import { useMutation, useQuery } from "@tanstack/react-query";

import CheckIcon from "@mui/icons-material/Check";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_admin/setting/_layout/role/$id")({
  component: RouteComponent,
});

const FormSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type RoleSchema = z.infer<typeof FormSchema>;

interface FormProps {
  defaultValues?: RoleSchema;
  onSubmit: (data: RoleSchema) => void;
  actionText?: string;
}

export function RoleForm({ defaultValues, onSubmit, actionText }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });

  return (
    <Card component="form" onSubmit={handleSubmit(onSubmit)}>
      <CardHeader
        title={defaultValues?.name}
        subheader={defaultValues?.description}
        action={
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
        }
      />
      <CardContent>
        <Grid2 container spacing={1}>
          <Grid2 size={6}>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextField label="Name" fullWidth size="small" {...field} />
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
  );
}

function RouteComponent() {
  const { id } = Route.useParams();
  const url = `/roles/${id}`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => axiosClient.get(url),
  });

  const { mutate } = useMutation({
    mutationKey: [url],
    mutationFn: (data: RoleSchema) => axiosClient.patch(url, data),
    onSuccess() {
      notify("Role updated");
    },
  });

  const handleSubmit = (data: RoleSchema) => {
    mutate(data);
  };

  const values = data?.data;

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <BackButton />
      </Grid2>
      <Grid2 size={12}>
        {values && (
          <RoleForm
            defaultValues={values}
            onSubmit={handleSubmit}
            actionText="Update"
          />
        )}
      </Grid2>
      <Grid2 size={12}></Grid2>
    </Grid2>
  );
}
