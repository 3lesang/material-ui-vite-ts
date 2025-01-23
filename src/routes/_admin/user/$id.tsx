import { axiosClient } from "@/axios";
import { notify } from "@/components/ui/CustomToast";
import UserForm, { UserFormProps, UserSchema } from "@/components/UserForm";
import Container from "@mui/material/Container";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

interface AssignRoleBody {
  user_id?: number;
  role_ids?: number[];
}

export const Route = createFileRoute("/_admin/user/$id")({
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
    gcTime: 0,
  });

  const { data: userRoleData } = useQuery({
    queryKey: [role],
    queryFn: () => axiosClient.get(role),
    gcTime: 0,
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
    onError(error) {
      notify(error.message, { variant: "error" });
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
    <Container>
      {data?.data && userRoleData?.data && (
        <UserForm defaultValues={defaultValues} onSubmit={handleSubmit} />
      )}
    </Container>
  );
}
