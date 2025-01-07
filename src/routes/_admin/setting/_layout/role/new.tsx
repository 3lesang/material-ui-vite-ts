import { axiosClient } from "@/axios";
import BackButton from "@/components/BackButton";
import { RoleForm, RoleSchema } from "@/components/role/RoleForm";
import { notify } from "@/components/ui/Toast";
import Grid2 from "@mui/material/Grid2";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_layout/role/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const url = "/roles";

  const { mutate } = useMutation({
    mutationFn: (data: RoleSchema) => axiosClient.post(url, data),
    onSuccess: () => {
      notify("Role created successfully");
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
        <RoleForm actionText="Create" onSubmit={handleSubmit} />
      </Grid2>
      <Grid2 size={12}></Grid2>
    </Grid2>
  );
}
