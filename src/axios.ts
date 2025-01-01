import axios, { InternalAxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

const onRequest = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    const tokenParsed = JSON.parse(token);
    config.headers.Authorization = `Bearer ${tokenParsed}`;
  }
  return config;
};

axiosClient.interceptors.request.use(onRequest);

export { axiosClient };
