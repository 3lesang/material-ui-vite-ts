import { axiosClient } from "@/axios";
import ProductForm, { ProductSchema } from "@/components/ProductForm";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/product/new")({
  component: RouteComponent,
});

const url = "/products";

function RouteComponent() {
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ProductSchema) => axiosClient.post(url, data),
    onSuccess() {},
  });

  const onSubmit = (data: ProductSchema) => {
    mutate(data);
  };

  return <ProductForm actionText="Create" />;
}
