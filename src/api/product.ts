import { axiosClient } from "./axios";

interface ProductType {
  params?: ProductParams;
}

interface ProductParams {
  page: number;
  limit: number;
}

export const getProducts = async (args?: ProductType) =>
  axiosClient.get("/products", { params: args?.params });

export const getProduct = async (id: number) =>
  axiosClient.get(`/products/${id}`);
