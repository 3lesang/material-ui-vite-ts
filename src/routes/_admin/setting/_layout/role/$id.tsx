import { axiosClient } from "@/axios";
import BackButton from "@/components/BackButton";
import PermissionTable, {
  PermissionColumnsProps,
} from "@/components/Permission";
import { notify } from "@/components/ui/Toast";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_admin/setting/_layout/role/$id")({
  component: RouteComponent,
});

const FormSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  permissions: z.any().array(),
});

export type RoleSchema = z.infer<typeof FormSchema>;

interface FormProps {
  defaultValues?: RoleSchema;
  onSubmit: (data: RoleSchema) => void;
  actionText?: string;
}

export function formatPermissions(data: any[]) {
  return data.reduce((prev, current) => {
    return {
      ...prev,
      [current.module]: {
        ...prev[current.module],
        [current.action]: current,
      },
    };
  }, {});
}

const columns: PermissionColumnsProps[] = [
  {
    field: "module",
    headerName: "Module",
    type: "string",
  },
  {
    field: "read",
    headerName: "View",
    align: "center",
    type: "checkbox",
  },
  {
    field: "create",
    headerName: "Create",
    align: "center",
    type: "checkbox",
  },
  {
    field: "update",
    headerName: "Edit",
    align: "center",
    type: "checkbox",
  },
  {
    field: "delete",
    headerName: "Delete",
    align: "center",
    type: "checkbox",
  },
  {
    field: "assign",
    headerName: "Assign",
    align: "center",
    type: "checkbox",
  },
];

export function RoleForm({ defaultValues, onSubmit, actionText }: FormProps) {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues,
    resolver: zodResolver(FormSchema),
  });

  const url = `/roles/${defaultValues?.id}/permissions`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => axiosClient.get(url),
  });

  const rows = formatPermissions(data?.data || []);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                          size="small"
                          {...field}
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
          <Grid2 size={12}></Grid2>
        </Grid2>
      </Box>
      <PermissionTable onChange={(value) => {}} columns={columns} rows={rows} />
    </>
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

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <BackButton />
      </Grid2>
      <Grid2 size={12}>
        {data?.data && (
          <RoleForm
            defaultValues={data?.data}
            onSubmit={handleSubmit}
            actionText="Update"
          />
        )}
      </Grid2>
    </Grid2>
  );
}
