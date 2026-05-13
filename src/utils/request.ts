import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from "axios";
import { clearToken, getToken } from "@/utils/auth";

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorBody {
  error?: string;
  message?: string;
  code?: string | number;
  [key: string]: unknown;
}

export class ApiError extends Error {
  status: number;
  body: ApiErrorBody;

  constructor(status: number, body: ApiErrorBody, message?: string) {
    super(message ?? body.message ?? body.error ?? `HTTP ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: "/",
  timeout: 15000,
  withCredentials: true,
  paramsSerializer: {
    indexes: false
  }
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status ?? 500;
    const raw = error.response?.data;
    const body = (typeof raw === "object" && raw ? raw : {}) as ApiErrorBody;

    if (status === 401) {
      clearToken();
      if (typeof window !== "undefined" && window.location.pathname !== "/login") {
        const redirect = encodeURIComponent(window.location.pathname + window.location.search);
        window.location.href = `/login?redirect=${redirect}`;
      }
    }

    return Promise.reject(new ApiError(status, body, body.message ?? body.error ?? error.message));
  }
);

function unwrapResponse<T>(payload: unknown): T {
  if (payload && typeof payload === "object" && "data" in payload && "code" in payload) {
    return (payload as ApiResponse<T>).data;
  }
  return payload as T;
}

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await instance.request(config);
  return unwrapResponse<T>(response.data);
}

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) => request<T>({ ...config, url, method: "GET" }),
  post: <T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, data, method: "POST" }),
  put: <T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, data, method: "PUT" }),
  patch: <T, B = unknown>(url: string, data?: B, config?: AxiosRequestConfig) =>
    request<T>({ ...config, url, data, method: "PATCH" }),
  delete: <T>(url: string, config?: AxiosRequestConfig) => request<T>({ ...config, url, method: "DELETE" })
};