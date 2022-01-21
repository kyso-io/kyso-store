import { NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LOGGER } from '../..';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';

export const loginAction = createAsyncThunk('auth/login', async (credentials: { username: string; password: string; provider: string }, { dispatch }): Promise<string | null> => {
  try {
    LOGGER.silly('loginAction invoked');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;
    LOGGER.silly(`loginAction - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.post(url, { ...credentials });
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`loginAction: axiosResponse ${axiosResponse.data.data}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`loginAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`loginAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
