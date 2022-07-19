import { Login, NormalizedResponseDTO, OrganizationAuthOptions, SignUpDto, TokenPermissions, User, VerifyEmailRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
import { Api } from '../../api';
import { setError } from '../error/error-slice';
import { resetTagsSlice } from '../tags/tags-slice';
import { resetUserSlice } from '../user/user-slice';

export const loginAction = createAsyncThunk('auth/login', async (login: Login, { dispatch }): Promise<string | null> => {
  try {
    const api: Api = new Api();
    const response: NormalizedResponseDTO<string> = await api.login(login);
    if (response?.data) {
      await dispatch(setTokenAuthAction(response.data));
      await dispatch(refreshUserAction());
      return response.data;
    } else {
      return null;
    }
  } catch (e: any) {
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
    const api: Api = new Api(auth.token);
    await api.logout();
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

export const signUpAction = createAsyncThunk('auth/signup', async (signUpDato: SignUpDto, { dispatch }): Promise<User | null> => {
  try {
    const api: Api = new Api();
    const response: NormalizedResponseDTO<User> = await api.signup(signUpDato);
    if (response?.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (e: any) {
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
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<string> = await api.refreshToken();
    if (response?.data) {
      await dispatch(setTokenAuthAction(response.data));
      await dispatch(refreshUserAction());
      return response.data;
    } else {
      return null;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchOrganizationAuthOptions = createAsyncThunk('auth/fetchOrganizationAuthOptions', async (organizationSlug: string, { dispatch, getState }): Promise<OrganizationAuthOptions | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<OrganizationAuthOptions> = await api.getOrganizationAuthOptions(organizationSlug);
    if (response?.data) {
      dispatch(setOrganizationAuthOptionsAction(response.data));
      return response.data;
    } else {
      return null;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchUserPermissions = createAsyncThunk('auth/fetchUserPermissions', async (username: string, { getState, dispatch }): Promise<TokenPermissions | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<TokenPermissions> = await api.getUserPermissions(username);
    if (response?.data) {
      dispatch(setUserPermissionsAction(response.data));
      dispatch(refreshUserAction());
      return response.data;
    } else {
      return null;
    }
  } catch (e: any) {
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
    const api: Api = new Api();
    const response: string = await api.getApiVersion();
    return response;
  } catch (e: any) {
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
    const api: Api = new Api();
    const response: string = await api.getDbVersion();
    return response;
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const verifyEmailAction = createAsyncThunk('auth/verifyEmail', async (verifyEmailRequestDTO: VerifyEmailRequestDTO, { dispatch }): Promise<boolean> => {
  try {
    const api: Api = new Api();
    const response: NormalizedResponseDTO<boolean> = await api.verifyEmail(verifyEmailRequestDTO);
    if (response?.data) {
      return response.data;
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
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<boolean> = await api.sendVerificationEmail();
    if (response?.data) {
      return response.data;
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
    const api: Api = new Api();
    const response: NormalizedResponseDTO<boolean> = await api.isUsernameAvailable(username);
    if (response?.data) {
      return response.data;
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
