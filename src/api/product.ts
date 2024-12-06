import { UpdateFormSchema } from "@/routes/_admin/product/$id";
import { CreateFormSchema } from "@/routes/_admin/product/create";
import { axiosClient } from "./axios";

interface ProductParams {
  page: number;
  limit: number;
  order?: string;
}

interface ProductArgs {
  params?: ProductParams;
}

export const getProductsHttp = async (args?: ProductArgs) =>
  axiosClient.get("/products", { params: args?.params });

export const getProductHttp = async (id: number) =>
  axiosClient.get(`/products/${id}`);

export const createProductHttp = async (payload: CreateFormSchema) =>
  axiosClient.post("/products", payload);

export const updateProductHttp = async (
  id: number,
  payload?: UpdateFormSchema
) => axiosClient.put(`/products/${id}`, payload);

export const deleteOneProductHttp = async (id: number) =>
  axiosClient.delete(`/products/${id}`);

export const deleteManyProductHttp = async (payload: { ids: number[] }) =>
  axiosClient.delete("/products", { data: payload });
