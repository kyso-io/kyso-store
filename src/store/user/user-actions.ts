import {
  CreateKysoAccessTokenDto,
  EmailUserChangePasswordDTO,
  KysoUserAccessToken,
  LoginProviderEnum,
  NormalizedResponseDTO,
  UpdateUserRequestDTO,
  UserAccount,
  UserChangePasswordDTO,
  UserDTO,
} from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, setError } from '..';
import { Api } from '../../api';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchUsersAction = createAsyncThunk('user/fetchUsers', async (args: { userIds: string[]; page: number; per_page: number; sort: string }, { dispatch, getState }): Promise<UserDTO[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<UserDTO[]> = await api.getUsers(args);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const fetchUserAction = createAsyncThunk('user/fetchUser', async (userId: string, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<UserDTO> = await api.getUser(userId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const fetchUserProfileAction = createAsyncThunk('user/fetchUserProfile', async (username: string, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<UserDTO> = await api.getUserProfileByUsername(username);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const fetchUserProfileActionByUserIdAction = createAsyncThunk('user/fetchUserProfileActionByUserId', async (args: { userId: string }, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<UserDTO> = await api.getUserProfileById(args.userId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const updateUserAction = createAsyncThunk('user/updateUser', async (args: { userId: string; updateUserRequestDto: UpdateUserRequestDTO }, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<UserDTO> = await api.updateUser(args.userId, args.updateUserRequestDto);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const deleteUserAction = createAsyncThunk('user/deleteUser', async (userId: string, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<boolean> = await api.deleteUser(userId);
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

export const addUserAccountAction = createAsyncThunk('user/addUserAccount', async (userAccount: UserAccount, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<boolean> = await api.addUserAccount(userAccount);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const removeAccountFromUser = createAsyncThunk('user/removeAccountFromUser', async (args: { provider: LoginProviderEnum; accountId: string }, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<boolean> = await api.removeUserAccount(args.provider, args.accountId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response.data) {
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

export const updateUserProfilePictureAction = createAsyncThunk('user/updateUserProfilePicture', async (file: File, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<UserDTO> = await api.updateUserProfileImage(file);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const refreshUserAction = createAsyncThunk('user/refresh', async (_, { getState, dispatch }): Promise<UserDTO | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<UserDTO> = await api.getUserFromToken();
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const getAccessTokensAction = createAsyncThunk('user/getAccessTokens', async (_, { getState, dispatch }): Promise<KysoUserAccessToken[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<KysoUserAccessToken[]> = await api.getAccessTokens();
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const createAccessTokenAction = createAsyncThunk('user/createAccessToken', async (args: CreateKysoAccessTokenDto, { dispatch, getState }): Promise<KysoUserAccessToken | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<KysoUserAccessToken> = await api.createAccessToken(args);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const revokeAllAccessTokenAction = createAsyncThunk('user/revokeAllAccessToken', async (_, { dispatch, getState }): Promise<KysoUserAccessToken[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<KysoUserAccessToken[]> = await api.revokeAllAccessTokens();
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const deleteAccessTokenAction = createAsyncThunk('user/deleteAccessToken', async (tokenId: string, { dispatch, getState }): Promise<KysoUserAccessToken | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<KysoUserAccessToken> = await api.deleteAccessToken(tokenId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
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

export const verifyCaptchaAction = createAsyncThunk('user/verifyCaptcha', async (token: string, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<boolean> = await api.verifyCaptcha(token);
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

export const emailRecoveryPasswordAction = createAsyncThunk('user/emailRecoveryPassword', async (emailUserChangePasswordDTO: EmailUserChangePasswordDTO, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<boolean> = await api.recoverPassword(emailUserChangePasswordDTO);
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

export const changePasswordAction = createAsyncThunk('user/changePassword', async (userChangePasswordDto: UserChangePasswordDTO, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<boolean> = await api.changePassword(userChangePasswordDto);
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
