import axios from "axios";
import { getAuthToken } from "@/lib/auth";

const apiBaseUrl ="https://portfolio-backend-omega-rust.vercel.app/api";

export const http = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

http.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    // Normalize error shape
    const normalized = {
      status: error?.response?.status ?? 0,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Unexpected error, please try again.",
      data: error?.response?.data,
    };
    return Promise.reject(normalized);
  }
);
