import { axiosClient } from "./axios";

interface ProductParams {
  page: number;
  limit: number;
}

export interface UpdateProductBody {
  name?: string;
  description?: string;
  price?: number;
}

interface ProductArgs {
  params?: ProductParams;
}

export const getProducts = async (args?: ProductArgs) =>
  axiosClient.get("/products", { params: args?.params });

export const getProduct = async (id: number) =>
  axiosClient.get(`/products/${id}`);

export const updateProduct = async (id: number, payload?: UpdateProductBody) =>
  axiosClient.put(`/products/${id}`, payload);

export const deleteProduct = async (id: number) =>
  axiosClient.delete(`/products/${id}`);
