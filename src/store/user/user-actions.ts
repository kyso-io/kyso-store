import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import httpClient from '../../services/http-client';
import { NormalizedResponse } from '../../types/normalized-response';
import { UpdateUserRequest } from '../../types/update-user-request';
import { User } from '../../types/user';

export const refreshUserAction = createAsyncThunk('user/refresh', async () => {
  try {
    const axiosResponse: AxiosResponse<NormalizedResponse<User>> = await httpClient.get('/user');
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
});

export const updateUserAction = createAsyncThunk('user/update', async (payload: UpdateUserRequest, { getState }) => {
  try {
    const email: string = ((getState() as RootState).user.user! as User).email;
    const url = `/users/${email}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<User>> = await httpClient.patch(url, payload);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
});

export const resetPasswordAction = createAsyncThunk('user/resetPassword', async (email: string) => {
  try {
    const url = `/parse/requestPasswordReset`;
    await httpClient.post(url, { email }, { headers: { 'X-Parse-Application-Id': 'api-kyso-io' } });
  } catch (e: any) {
    return null;
  }
});

export const disconnectGithubAction = createAsyncThunk('user/disconnectGithub', async () => {
  try {
    const url = `/user`;
    const axiosResponse: AxiosResponse<NormalizedResponse<User>> = await httpClient.patch(url, {
      accessToken: null,
    });
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
});
