import { axiosClient } from "./axios";
import { QueryParams } from "./type";

export const getRolesHttp = async (params?: QueryParams) =>
  axiosClient.get("/roles", { params });
