import { axiosClient } from "@/axios";
import { CategoryForm, CategorySchema } from "@/components/form/CategoryForm";
import { notify } from "@/components/ui/CustomToast";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/category/new")({
  component: RouteComponent,
});

const defaultValues: CategorySchema = {
  id: 0,
  name: "",
  slug: "",
  description: "",
};

const url = "/categories";

function RouteComponent() {
  const { mutate } = useMutation({
    mutationFn: (data: CategorySchema) => axiosClient.post(url, data),
    onSuccess: (res) => {
      notify("Category created successfully");
    },
    onError: (res) => {
      notify(res.message, { variant: "error" });
    },
  });

  const handleSubmit = (data: CategorySchema) => {
    mutate(data);
  };

  return (
    <CategoryForm
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      actionText="Create"
    />
  );
}
