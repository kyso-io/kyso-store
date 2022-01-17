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
  const team: string | null = store.getState().auth.team;
  if (team) {
    config.headers['x-kyso-team'] = team;
  }
  const organization: string | null = store.getState().auth.organization;
  if (organization) {
    config.headers['x-kyso-organization'] = organization;
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
