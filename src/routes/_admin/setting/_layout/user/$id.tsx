import { axiosClient } from "@/axios";
import BackButton from "@/components/BackButton";
import { notify } from "@/components/ui/CustomToast";
import UserForm, {
  UserFormProps,
  UserSchema,
} from "@/components/UserForm";
import Grid2 from "@mui/material/Grid2";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

interface AssignRoleBody {
  user_id?: number;
  role_ids?: number[];
}

export const Route = createFileRoute("/_admin/setting/_layout/user/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const url = `/users/${id}`;
  const role = `/users/${id}/roles`;
  const assignRole = "/users/roles";

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => axiosClient.get(url),
  });

  const { data: userRoleData } = useQuery({
    queryKey: [role],
    queryFn: () => axiosClient.get(role),
  });

  const defaultValues: UserFormProps["defaultValues"] = {
    id: data?.data?.id,
    name: data?.data?.name,
    email: data?.data?.email,
    username: data?.data?.username,
    active: data?.data?.active,
    roles: userRoleData?.data?.map((item: any) => item?.id),
  };

  const { mutate: infoMutate } = useMutation({
    mutationFn: (data: UserSchema) => axiosClient.patch(url, data),
    onSuccess() {
      notify("User updated");
    },
  });

  const { mutate: roleMutate } = useMutation({
    mutationFn: (data: AssignRoleBody) => axiosClient.post(assignRole, data),
  });

  const handleSubmit = (data: UserSchema) => {
    infoMutate(data);
    roleMutate({ user_id: Number(id), role_ids: data?.roles });
  };

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <BackButton />
      </Grid2>
      <Grid2 size={12}>
        {data?.data && (
          <UserForm defaultValues={defaultValues} onSubmit={handleSubmit} />
        )}
      </Grid2>
    </Grid2>
  );
}
