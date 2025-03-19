import { axiosClient } from "@/axios";
import { CategoryForm, CategorySchema } from "@/components/CategoryForm";
import { notify } from "@/components/ui/CustomToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/category/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const url = `/categories/${id}`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => axiosClient.get(url),
    gcTime: 0,
  });

  const defaultValues: CategorySchema = {
    id: data?.data?.id,
    name: data?.data?.name,
    slug: data?.data?.slug,
    description: data?.data?.description,
  };

  const { mutate } = useMutation({
    mutationFn: (data: CategorySchema) => axiosClient.patch(url, data),
    onSuccess: (res) => {
      notify("Category updated successfully");
    },
    onError: (res) => {
      notify(res.message, { variant: "error" });
    },
  });

  const handleSubmit = (data: CategorySchema) => {
    mutate(data);
  };

  if (data?.data) {
    return (
      <CategoryForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        actionText="Update"
      />
    );
  }
}
