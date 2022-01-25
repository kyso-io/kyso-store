import { CreateUserRequestDTO, NormalizedResponseDTO, User } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { refreshUserAction, setTokenAuthAction } from '..';
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
      LOGGER.silly(`loginAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      dispatch(setTokenAuthAction(axiosResponse.data.data));
      dispatch(refreshUserAction());
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

export const signUpAction = createAsyncThunk('auth/signup', async (payload: CreateUserRequestDTO, { dispatch }): Promise<User | null> => {
  try {
    LOGGER.silly('signUpAction invoked');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`;
    LOGGER.silly(`signUpAction - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.post(url, payload);
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`signUpAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`signUpAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`signUpAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
