import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { store } from '../store';

const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: { 'Content-Type': 'application/json' },
});
httpClient.interceptors.request.use((config: any) => {
  const token: string | null = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
httpClient.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default httpClient;
