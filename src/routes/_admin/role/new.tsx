import { axiosClient } from "@/axios";
import { RoleForm, RoleSchema } from "@/components/RoleForm";
import { notify } from "@/components/ui/CustomToast";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_admin/role/new")({
  component: RouteComponent,
});

interface AssignPermissionBody {
  role_id: number;
  permission_ids: number[];
}

const defaultValues: RoleSchema = {
  id: 0,
  name: "",
  description: "",
  permissions: [],
};

const assignPermissionUrl = "/roles/permissions";
const roleUrl = "/roles";

function RouteComponent() {
  const [permission, setPermission] = useState<any[]>([]);

  const { mutate: assignPermissionMutate } = useMutation({
    mutationFn: (data: AssignPermissionBody) =>
      axiosClient.post(assignPermissionUrl, data),
  });

  const { mutate } = useMutation({
    mutationFn: (data: RoleSchema) => axiosClient.post(roleUrl, data),
    onSuccess: (res) => {
      const ids = permission.map((item) => item.id);
      const payload = {
        role_id: Number(res?.data?.id),
        permission_ids: ids,
      };
      assignPermissionMutate(payload);
      notify("Role created successfully");
    },
    onError: (res) => {
      notify(res.message, { variant: "error" });
    },
  });

  const handleSubmit = (data: RoleSchema) => {
    if (data.permissions?.length) {
      setPermission(data?.permissions);
    }
    mutate(data);
  };

  return (
    <RoleForm
      actionText="Create"
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
}
