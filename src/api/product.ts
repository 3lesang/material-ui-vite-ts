import { axiosClient } from "./axios";

interface ProductType {
  params?: ProductParams;
}

interface ProductParams {
  page: number;
  limit: number;
}

export const getProducts = async (data?: ProductType) =>
  axiosClient.get("/products", { params: data?.params });
