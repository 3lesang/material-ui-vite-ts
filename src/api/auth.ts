import { LoginFormSchema } from "@/routes/auth/login";
import { axiosClient } from "./axios";

export const loginHttp = async (data: LoginFormSchema) => {
  return axiosClient.post("/auth/login", data);
};
