import { axiosClient } from "@/axios";
import ProductForm, { ProductSchema } from "@/components/ProductForm";
import { notify } from "@/components/ui/CustomToast";
import { generateSKU } from "@/helper";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/product/new")({
  component: RouteComponent,
});

const url = "/products";

function RouteComponent() {
  const { mutate } = useMutation({
    mutationFn: (data: ProductSchema) => axiosClient.post(url, data),
    onSuccess() {
      notify("Product created successfully");
    },
  });

  const onSubmit = (data: ProductSchema) => {
    const payload = { ...data, code: generateSKU(), sku: generateSKU() };
    mutate(payload);
  };

  return <ProductForm actionText="Create" onSubmit={onSubmit} />;
}
