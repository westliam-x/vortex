import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { ApiResponse } from "@/types/api";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000/api";

axios.defaults.withCredentials = true;

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
  }
  return config;
});

export type RequestParams = {
  url: string;
  method?: Method;
  data?: unknown;
  config?: AxiosRequestConfig;
};

export const makeRequest = async <T = unknown>({
  url,
  method = "GET",
  data,
  config,
}: RequestParams): Promise<T> => {
  try {
    const response = await axiosInstance.request<ApiResponse<T>>({
      url,
      method,
      data,
      ...config,
    });

    // Only return the actual `data` part from the custom response
    return response.data.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    const message =
      err.response?.data?.message || err.message || "Unknown error";
    throw new Error(message);
  }
};
