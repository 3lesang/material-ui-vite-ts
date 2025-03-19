import { axiosClient } from "@/axios";
import { RoleForm, RoleSchema } from "@/components/RoleForm";
import { notify } from "@/components/ui/CustomToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/role/$id")({
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
    gcTime: 0,
  });

  const { data: permissionData } = useQuery({
    queryKey: [permissionUrl],
    queryFn: () => axiosClient.get(permissionUrl),
    gcTime: 0,
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
    onError: (res) => {
      notify(res.message, { variant: "error" });
    },
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

  if (data?.data && permissionData?.data) {
    return (
      <RoleForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        actionText="Update"
      />
    );
  }
}
