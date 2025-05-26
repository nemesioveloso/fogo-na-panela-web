import axios from "axios";
import { env } from "../config/env";

export const api = axios.create({
  baseURL: env.API_URL,
  timeout: env.API_TIMEOUT,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
