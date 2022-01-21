import { NormalizedResponseDTO, UpdateUserRequestDTO, User } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchUsersAction = createAsyncThunk('user/fetchUsers', async (_, { dispatch, getState }): Promise<User[]> => {
  try {
    LOGGER.silly('fetchUsersAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.REACT_APP_API_URL}/users`;
    LOGGER.silly(`fetchTeamsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchUsersAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchUsersAction: axiosResponse ${axiosResponse.data.data}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchUsersAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchTeamsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const refreshUserAction = createAsyncThunk('user/refresh', async () => {
  try {
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.get('/user');
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
});

export const updateUserAction = createAsyncThunk('user/update', async (payload: UpdateUserRequestDTO, { getState }) => {
  try {
    const email: string = ((getState() as RootState).user.user! as User).email;
    const url = `/users/${email}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.patch(url, payload);
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
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.patch(url, {
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
