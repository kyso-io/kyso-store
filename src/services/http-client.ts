import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
// import { store } from '../store'; // shouldnt use instance of store

const httpClient: AxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' },
  maxBodyLength: 100000000,
  maxContentLength: 100000000
});

/* Use axios-helper instead
httpClient.interceptors.request.use((config: any) => {
  const auth = {
    token: null,
    team: null, 
    organization: null
  }

  
  const token: string | null = auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const team: string | null = auth.team;
  if (team) {
    config.headers['x-kyso-team'] = team;
  }
  const organization: string | null = auth.organization;
  if (organization) {
    config.headers['x-kyso-organization'] = organization;
  }

  return config;
});
*/

httpClient.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default httpClient;
