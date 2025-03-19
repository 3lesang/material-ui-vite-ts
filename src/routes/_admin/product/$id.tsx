import { axiosClient } from "@/axios";
import ProductForm, { ProductSchema } from "@/components/ProductForm";
import { notify } from "@/components/ui/CustomToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const url = `/products/${id}`;

  const { data } = useQuery({
    queryKey: [url],
    queryFn: () => axiosClient.get(url),
  });

  const { mutate } = useMutation({
    mutationFn: (data: ProductSchema) => axiosClient.patch(url, data),
    onSuccess() {
      notify("Product updated successfully");
    },
  });

  const onSubmit = (data: ProductSchema) => {
    mutate(data);
  };

  const defaultValues: ProductSchema = {
    name: data?.data?.name,
    slug: data?.data?.slug,
    description: data?.data?.description,
    code: data?.data?.code,
    sku: data?.data?.sku,
    inStock: false,
    price: data?.data?.price,
    category_id: data?.data?.category_id,
  };

  if (data?.data) {
    return (
      <ProductForm
        defaultValues={defaultValues}
        actionText="Update"
        onSubmit={onSubmit}
      />
    );
  }
}
