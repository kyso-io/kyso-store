import { NormalizedResponse } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import httpClient from '../../services/http-client';

export const loginAction = createAsyncThunk('auth/login', async (credentials: { username: string; password: string; provider: string }) => {
  try {
    const axiosResponse: AxiosResponse<NormalizedResponse> = await httpClient.post('/auth/login', { ...credentials });
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});
