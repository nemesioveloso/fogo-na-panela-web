import { api } from "./axiosInstance";
import type { ApiError, ApiResponse } from "../models/ApiTypes";
import {
  AxiosError,
  HttpStatusCode,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { notify } from "../utils/toast";

const defaultErrorMessages: Record<number, ApiError> = {
  [HttpStatusCode.BadRequest]: {
    title: "Requisição Inválida",
    message: "Verifique os dados enviados.",
  },
  [HttpStatusCode.Unauthorized]: {
    title: "Não Autorizado",
    message: "Sessão expirada ou inválida.",
  },
  [HttpStatusCode.Forbidden]: {
    title: "Acesso Negado",
    message: "Você não tem permissão.",
  },
  [HttpStatusCode.NotFound]: {
    title: "Não Encontrado",
    message: "Recurso não encontrado.",
  },
  [HttpStatusCode.InternalServerError]: {
    title: "Erro no Servidor",
    message: "Erro inesperado. Tente mais tarde.",
  },
};

function parseError(err: unknown): ApiError {
  const axiosError = err as AxiosError;

  const status = axiosError.response?.status ?? 0;
  const data = axiosError.response?.data as {
    title?: string;
    message?: string;
  };

  const fallback = defaultErrorMessages[status] ?? {
    title: "Erro Desconhecido",
    message: "Algo deu errado. Tente novamente.",
  };

  return {
    title: data?.title ?? fallback.title,
    message: data?.message ?? fallback.message,
    status,
  };
}

async function request<T>(
  fn: () => Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> {
  try {
    const response = await fn();
    return { data: response.data, error: null, status: response.status };
  } catch (err) {
    const parsedError = parseError(err);

    // 🔥 Exibir erro no toast automaticamente
    notify.error(`${parsedError.title}: ${parsedError.message}`);

    return {
      data: null,
      error: parsedError,
      status: parsedError.status ?? 500,
    };
  }
}

export const apiService = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(() => api.get<T>(url, config)),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(() => api.post<T>(url, data, config)),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(() => api.put<T>(url, data, config)),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    request<T>(() => api.patch<T>(url, data, config)),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    request<T>(() => api.delete<T>(url, config)),

  upload: <T>(url: string, file: File, config?: AxiosRequestConfig) => {
    const form = new FormData();
    form.append("file", file);
    return request<T>(() =>
      api.post<T>(url, form, {
        ...config,
        headers: { "Content-Type": "multipart/form-data" },
      })
    );
  },

  downloadBlob: async (url: string, config?: AxiosRequestConfig) => {
    const response = await api.get(url, { ...config, responseType: "blob" });
    const filename =
      response.headers["content-disposition"]?.split("filename=")[1] ??
      "arquivo";
    return { filename, blob: response.data };
  },

  downloadBase64: (url: string, config?: AxiosRequestConfig) =>
    request<{ base64: string }>(() => api.get(url, config)),
};
