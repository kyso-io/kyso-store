import { Login, NormalizedResponseDTO, SignUpDto, User } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import {
  refreshUserAction,
  resetAuthSlice,
  resetBitbucketRepositoriesSlice,
  resetCommentsSlice,
  resetDiscussionsSlice,
  resetGithubRepositoriesSlice,
  resetInvitationsSlice,
  resetOrganizationsSlice,
  resetReportsSlice,
  resetSettingsSlice,
  resetTeamsSlice,
  RootState,
  setOrganizationAuthOptionsAction,
  setTokenAuthAction,
  setUserPermissionsAction,
} from '..';
import { buildAuthHeaders, getAPIBaseURL } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { resetTagsSlice } from '../tags/tags-slice';
import { resetUserSlice } from '../user/user-slice';

export const loginAction = createAsyncThunk('auth/login', async (login: Login, { dispatch }): Promise<string | null> => {
  try {
    // console.log('loginAction invoked')
    const url = `${getAPIBaseURL()}/auth/login`;
    // console.log(`loginAction - POST ${url}`)
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.post(url, login);
    if (axiosResponse?.data?.data) {
      // console.log(`loginAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`)
      await dispatch(setTokenAuthAction(axiosResponse.data.data));
      await dispatch(refreshUserAction());
      return axiosResponse.data.data;
    } else {
      // console.log(`loginAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`loginAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const logoutAction = createAsyncThunk('auth/logout', async (_, { dispatch, getState }): Promise<void> => {
  try {
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/auth/logout`;
    await httpClient.post(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    await dispatch(resetAuthSlice());
    await dispatch(resetBitbucketRepositoriesSlice());
    await dispatch(resetCommentsSlice());
    await dispatch(resetDiscussionsSlice());
    await dispatch(resetGithubRepositoriesSlice());
    await dispatch(resetInvitationsSlice());
    await dispatch(resetOrganizationsSlice());
    await dispatch(resetReportsSlice());
    await dispatch(resetSettingsSlice());
    await dispatch(resetTagsSlice());
    await dispatch(resetTeamsSlice());
    await dispatch(resetUserSlice());
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
  }
});

export const signUpAction = createAsyncThunk('auth/signup', async (payload: SignUpDto, { dispatch }): Promise<User | null> => {
  try {
    // console.log('signUpAction invoked');
    const url = `${getAPIBaseURL()}/auth/sign-up`;
    // console.log(`signUpAction - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<User>> = await httpClient.post(url, payload);
    if (axiosResponse?.data?.data) {
      // console.log(`signUpAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`signUpAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`signUpAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const refreshTokenAction = createAsyncThunk('auth/refreshToken', async (_, { dispatch, getState }): Promise<string | null> => {
  try {
    // console.log('refreshTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/auth/refresh-token`;
    // console.log(`refreshTokenAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.post(url, undefined, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`refreshTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      await dispatch(setTokenAuthAction(axiosResponse.data.data));
      await dispatch(refreshUserAction());
      return axiosResponse.data.data;
    } else {
      // console.log(`refreshTokenAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`refreshTokenAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchOrganizationAuthOptions = createAsyncThunk('auth/fetchOrganizationAuthOptions', async (organizationSlugName: string, { dispatch }): Promise<string | null> => {
  try {
    // console.log('fetchOrganizationAuthOptions invoked');
    const url = `${getAPIBaseURL()}/auth/organization/${organizationSlugName}/options`;
    // console.log(`fetchOrganizationAuthOptions - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      // console.log(`fetchOrganizationAuthOptions: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      dispatch(setOrganizationAuthOptionsAction(axiosResponse.data.data));
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchOrganizationAuthOptions: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchOrganizationAuthOptions: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchUserPermissions = createAsyncThunk('auth/fetchUserPermissions', async (username: string, { getState, dispatch }): Promise<string | null> => {
  try {
    const { auth } = getState() as RootState;
    // console.log('loginAction invoked');
    const url = `${getAPIBaseURL()}/auth/user/${username}/permissions`;
    // console.log(`loginAction - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`fetchUserPermissions: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      dispatch(setUserPermissionsAction(axiosResponse.data.data));
      dispatch(refreshUserAction());
      return axiosResponse.data.data;
    } else {
      // console.log(`loginAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`loginAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchApiVersionAction = createAsyncThunk('auth/fetchApiVersion', async (_, { dispatch }): Promise<string | null> => {
  try {
    // console.log('fetchApiVersionAction invoked');
    const url = `${getAPIBaseURL()}/auth/version`;
    // console.log(`fetchApiVersionAction - GET ${url}`);
    const axiosResponse: AxiosResponse<string> = await httpClient.get(url);
    return axiosResponse.data;
  } catch (e: any) {
    // console.log(`fetchApiVersionAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchDbVersionAction = createAsyncThunk('auth/fetchDbVersion', async (_, { dispatch }): Promise<string | null> => {
  try {
    // console.log('fetchDbVersionAction invoked');
    const url = `${getAPIBaseURL()}/auth/db`;
    // console.log(`fetchDbVersionAction - GET ${url}`);
    const axiosResponse: AxiosResponse<string> = await httpClient.get(url);
    return axiosResponse.data;
  } catch (e: any) {
    // console.log(`fetchDbVersionAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchOrganizationLoginOptions = createAsyncThunk('auth/fetchOrganizationLoginOptions', async (organizationSlugName: string, { dispatch }): Promise<string | null> => {
  try {
    // console.log('fetchOrganizationLoginOptions invoked');
    const url = `${getAPIBaseURL()}/auth/organization/${organizationSlugName}/options`;
    // console.log(`fetchOrganizationLoginOptions - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      // console.log(`fetchOrganizationLoginOptions: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchOrganizationLoginOptions: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchOrganizationLoginOptions: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const verifyEmailAction = createAsyncThunk('auth/verifyEmail', async (args: { email: string; token: string }, { dispatch }): Promise<boolean> => {
  try {
    const url = `${getAPIBaseURL()}/auth/verify-email`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.post(url, args);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return false;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});

export const sendVerificationEmailAction = createAsyncThunk('auth/sendVerificationEmail', async (_, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/auth/send-verification-email`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.post(
      url,
      {},
      {
        headers: {
          ...buildAuthHeaders(auth),
          headers: { 'content-type': 'multipart/form-data' },
        },
      }
    );
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return false;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      console.log(e.response?.data);
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});

export const checkUsernameAvailabilityAction = createAsyncThunk('auth/checkUsernameAvailability', async (username: string, { dispatch }): Promise<boolean> => {
  try {
    const url = `${getAPIBaseURL()}/auth/username-available/${username}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return false;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});
