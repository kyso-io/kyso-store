import {
  CreateKysoAccessTokenDto,
  EmailUserChangePasswordDTO,
  KysoUserAccessToken,
  LoginProviderEnum,
  NormalizedResponseDTO,
  UpdateUserRequestDTO,
  User,
  UserAccount,
  UserChangePasswordDTO,
  UserDTO,
} from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { buildAuthHeaders, getAPIBaseURL } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchUsersAction = createAsyncThunk(
  'user/fetchUsers',
  async (payload: { userIds: string[]; page: number; per_page: number; sort: string }, { dispatch, getState }): Promise<UserDTO[]> => {
    try {
      // console.log('fetchUsersAction invoked');
      const { auth } = getState() as RootState;

      if (!payload.page) {
        payload.page = 1;
      }

      if (!payload.per_page) {
        payload.per_page = 20;
      }

      if (!payload.sort) {
        payload.sort = 'created_at';
      }

      let userIdsQueryString = '';
      if (payload.userIds) {
        userIdsQueryString = payload.userIds.map(x => `userId=${x}`).reduce((prev, last) => prev + '&' + last);
      }

      const url = `${getAPIBaseURL()}/users?page=${payload.page}&per_page=${payload.per_page}&sort=${payload.sort}${userIdsQueryString}`;
      // console.log(`fetchTeamsAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchUsersAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchUsersAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchUsersAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchTeamsAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return [];
    }
  }
);

export const createUserAction = createAsyncThunk('user/createUser', async (user: User, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    // console.log('createUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users`;
    // console.log(`createUserAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.post(url, user, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`createUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createUserAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchUserAction = createAsyncThunk('user/fetchUser', async (userId: string, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    // console.log('fetchUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/${userId}`;
    // console.log(`fetchUserAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchUserAction: Error processing action: ${e.toString()}`);
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
    // console.log('fetchUserProfileAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/${username}/profile`;
    // console.log(`fetchUserProfileAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchUserProfileAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchUserProfileAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchUserProfileAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchUserProfileAction: Error processing action: ${e.toString()}`);
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
    const url = `${getAPIBaseURL()}/users/${args.userId}/public-data`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
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

export const updateUserAction = createAsyncThunk(
  'user/updateUser',
  async (payload: { userId: string; updateUserRequestDto: UpdateUserRequestDTO }, { dispatch, getState }): Promise<UserDTO | null> => {
    try {
      // console.log('updateUserAction invoked');
      const { auth } = getState() as RootState;
      const url = `${getAPIBaseURL()}/users/${payload.userId}`;
      // console.log(`updateUserAction: ${printAuthenticated(auth)} - PATCH ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.patch(url, payload.updateUserRequestDto, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateUserAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`updateUserAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);

export const deleteUserAction = createAsyncThunk('user/deleteUser', async (userId: string, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    // console.log('deleteUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/${userId}`;
    // console.log(`deleteUserAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteUserAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const addUserAccountAction = createAsyncThunk('user/addUserAccount', async (userAccount: UserAccount, { dispatch, getState }): Promise<boolean> => {
  try {
    // console.log('addUserAccountAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/accounts`;
    // console.log(`addUserAccountAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.post(url, userAccount, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`addUserAccountAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`addUserAccountAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`addUserAccountAction: Response didn't have data, returning false`);
      return false;
    }
  } catch (e: any) {
    // console.log(`addUserAccountAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});

export const removeAccountFromUser = createAsyncThunk(
  'user/removeAccountFromUser',
  async (payload: { provider: LoginProviderEnum; accountId: string }, { dispatch, getState }): Promise<boolean> => {
    try {
      const { auth } = getState() as RootState;
      const url = `${getAPIBaseURL()}/users/accounts/${payload.provider}/${payload.accountId}`;
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data.data) {
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
  }
);

export const updateUserProfilePictureAction = createAsyncThunk('user/updateUserProfilePicture', async (file: File, { dispatch, getState }): Promise<UserDTO | null> => {
  try {
    // console.log('updateUserProfilePictureAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/profile-picture`;
    // console.log(`updateUserProfilePictureAction: ${printAuthenticated(auth)} - POST ${url}`);
    const formData = new FormData();
    formData.append('file', file);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.post(url, formData, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`updateUserProfilePictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`updateUserProfilePictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`updateUserProfilePictureAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`updateUserProfilePictureAction: Error processing action: ${e.toString()}`);
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
    // console.log('refreshUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/user`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<UserDTO>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`refreshUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`refreshUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`refreshUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`refreshUserAction: Error processing action: ${e.toString()}`);
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
    // console.log('getAccessTokensAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/access-tokens`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`getAccessTokensAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`getAccessTokensAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`getAccessTokensAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`getAccessTokensAction: Error processing action: ${e.toString()}`);
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
    // console.log('createAccessTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/access-token`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken>> = await httpClient.post(url, args, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`createAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createAccessTokenAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createAccessTokenAction: Error processing action: ${e.toString()}`);
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
    // console.log('revokeAllAccessTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/access-token/revoke-all`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken[]>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`revokeAllAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`revokeAllAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`revokeAllAccessTokenAction: Response didn't have data, returning false`);
      return [];
    }
  } catch (e: any) {
    // console.log(`revokeAllAccessTokenAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const deleteAccessTokenAction = createAsyncThunk('user/deleteAccessToken', async (tokenId: string, { dispatch, getState }): Promise<KysoUserAccessToken[]> => {
  try {
    // console.log('deleteAccessTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/access-token/${tokenId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<KysoUserAccessToken[]>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteAccessTokenAction: Response didn't have data, returning false`);
      return [];
    }
  } catch (e: any) {
    // console.log(`deleteAccessTokenAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});

export const verifyCaptchaAction = createAsyncThunk('user/verifyCaptcha', async (token: string, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/verify-captcha`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.post(
      url,
      {
        token,
      },
      {
        headers: buildAuthHeaders(auth),
      }
    );
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

export const emailRecoveryPasswordAction = createAsyncThunk('user/emailRecoveryPassword', async (emailUserChangePasswordDTO: EmailUserChangePasswordDTO, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/email-recovery-password`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.post(url, emailUserChangePasswordDTO, {
      headers: buildAuthHeaders(auth),
    });
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

export const changePasswordAction = createAsyncThunk('user/changePassword', async (userChangePasswordDto: UserChangePasswordDTO, { dispatch, getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/users/change-password`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.post(url, userChangePasswordDto, {
      headers: buildAuthHeaders(auth),
    });
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
