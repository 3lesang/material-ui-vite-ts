import { axiosClient } from "@/axios";
import BackButton from "@/components/BackButton";
import { RoleForm, RoleSchema } from "@/components/RoleForm";
import { notify } from "@/components/ui/CustomToast";
import Grid2 from "@mui/material/Grid2";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_admin/setting/_layout/role/new")({
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
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <BackButton />
      </Grid2>
      <Grid2 size={12}>
        <RoleForm
          actionText="Create"
          onSubmit={handleSubmit}
          defaultValues={defaultValues}
        />
      </Grid2>
    </Grid2>
  );
}
