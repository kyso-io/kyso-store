import { NormalizedResponseDTO, UpdateUserRequestDTO, User, UserAccount } from '@kyso-io/kyso-model';
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
      LOGGER.silly(`fetchUsersAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchUsersAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
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

export const createUserAction = createAsyncThunk('user/createUser', async (user: User, { dispatch, getState }): Promise<User | null> => {
  try {
    LOGGER.silly('createUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.REACT_APP_API_URL}/users`;
    LOGGER.silly(`createUserAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.post(url, user, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`createUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchUserAction = createAsyncThunk('user/fetchUser', async (userId: string, { dispatch, getState }): Promise<User | null> => {
  try {
    LOGGER.silly('fetchUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
    LOGGER.silly(`fetchUserAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateUserAction = createAsyncThunk('user/updateUser', async (payload: { userId: string; user: UpdateUserRequestDTO }, { dispatch, getState }): Promise<User | null> => {
  try {
    LOGGER.silly('updateUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.REACT_APP_API_URL}/users/${payload.userId}`;
    LOGGER.silly(`updateUserAction: ${printAuthenticated(auth)} - PUT ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.put(url, payload.user, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`updateUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`updateUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`updateUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`updateUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteUserAction = createAsyncThunk('user/deleteUser', async (userId: string, { dispatch, getState }): Promise<User | null> => {
  try {
    LOGGER.silly('deleteUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.REACT_APP_API_URL}/users/${userId}`;
    LOGGER.silly(`deleteUserAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const addAccountToUser = createAsyncThunk('user/addAccountToUser', async (payload: { userId: string; userAccount: UserAccount }, { dispatch, getState }): Promise<boolean> => {
  try {
    LOGGER.silly('addAccountToUser invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.REACT_APP_API_URL}/users/${payload.userId}/accounts`;
    LOGGER.silly(`addAccountToUser: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.patch(url, payload.userAccount, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`addAccountToUser: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`addAccountToUser: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`addAccountToUser: Response didn't have data, returning false`);
      return false;
    }
  } catch (e: any) {
    LOGGER.error(`addAccountToUser: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return false;
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
