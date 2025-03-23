import { AxiosResponse, ResponseType } from 'axios';
import { axiosInstance } from '../auth';
import { handleApiError } from './handleApiError';

type RequestParams = {
  url: string;
  body?: unknown[] | object;
  responseType?: ResponseType;
};

export const apiService = {
  get: async ({ url, responseType }: RequestParams): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.get(url, { responseType });
      return response;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  post: async ({ url, body, responseType }: RequestParams): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.post(url, body, { responseType });
      return response;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  put: async ({ url, body, responseType }: RequestParams): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.put(url, body, { responseType });
      return response;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },

  delete: async ({ url, responseType }: RequestParams): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.delete(url, { responseType });
      return response;
    } catch (error) {
      handleApiError(error);
      throw error;
    }
  },
};
