import axios, { InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosClient.interceptors.request.use(onRequest);

export { axiosClient };
