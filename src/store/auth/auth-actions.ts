import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import httpClient from '../../services/http-client';

export const loginAction = createAsyncThunk('auth/login', async (credentials: { username: string; password: string; provider: string }) => {
  try {
    const axiosResponse: AxiosResponse<string> = await httpClient.post('/auth/login', { ...credentials });
    return axiosResponse.data;
  } catch {
    return null;
  }
});
