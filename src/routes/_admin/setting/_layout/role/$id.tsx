import { axiosClient } from "@/axios";
import BackButton from "@/components/BackButton";
import { RoleForm, RoleSchema } from "@/components/role/RoleForm";
import { notify } from "@/components/ui/Toast";
import Grid2 from "@mui/material/Grid2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_layout/role/$id")({
  component: RouteComponent,
});

interface AssignPermissionBody {
  role_id: number;
  permission_ids: number[];
}

function RouteComponent() {
  const { id } = Route.useParams();
  const url = `/roles/${id}`;
  const permissionUrl = `/roles/${id}/permissions`;
  const assignPermissionUrl = "/roles/permissions";

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => axiosClient.get(url),
  });

  const { data: permissionData } = useQuery({
    queryKey: [permissionUrl],
    queryFn: () => axiosClient.get(permissionUrl),
  });

  const defaultValues: RoleSchema = {
    id: data?.data?.id,
    name: data?.data?.name,
    description: data?.data?.description,
    permissions: permissionData?.data,
  };

  const { mutate } = useMutation({
    mutationKey: [url],
    mutationFn: (data: RoleSchema) => axiosClient.patch(url, data),
    onSuccess() {
      notify("Role updated");
    },
  });

  const { mutate: assignPermissionMutate } = useMutation({
    mutationKey: [assignPermissionUrl],
    mutationFn: (data: AssignPermissionBody) =>
      axiosClient.post(assignPermissionUrl, data),
  });

  const handleSubmit = (data: RoleSchema) => {
    mutate(data);
    const ids: number[] = data?.permissions?.map((item) => item?.id) || [];
    const payload = {
      role_id: Number(id),
      permission_ids: ids,
    };
    assignPermissionMutate(payload);
  };

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <BackButton />
      </Grid2>
      <Grid2 size={12}>
        {data?.data && permissionData?.data && (
          <RoleForm
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            actionText="Update"
          />
        )}
      </Grid2>
    </Grid2>
  );
}
