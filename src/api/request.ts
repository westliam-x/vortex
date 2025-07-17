import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

type RequestParams = {
  url: string;
  method?: Method;
  data?: unknown;
  config?: AxiosRequestConfig ;
};

export const makeRequest = async <T = unknown>({
  url,
  method = "GET",
  data,
  config,
}: RequestParams): Promise<T> => {
  try {
    const response = await axiosInstance.request<T>({
      url,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message?: string }>;
    console.error("API Error:", err);
    const message =
      err.response?.data?.message || err.message || "Unknown error";
    throw new Error(message);
  }
};

