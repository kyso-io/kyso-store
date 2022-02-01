import { GithubAccount, GithubEmail, GithubFileHash, GithubRepository, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchGithubRepositoriesAction = createAsyncThunk(
  'github/fetchGithubRepositories',
  async (payload: { filter?: object; page?: number; per_page?: number }, { getState, dispatch }): Promise<GithubRepository[]> => {
    try {
      LOGGER.silly('fetchGithubRepositoriesAction invoked');
      const { auth } = getState() as RootState;

      const qs = new URLSearchParams({
        page: (payload?.page || 1).toString(),
        per_page: (payload?.per_page || 20).toString(),
        sort: 'desc',
        ...payload?.filter,
      });

      const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/github?${qs.toString()}`;
      LOGGER.silly(`fetchGithubRepositoriesAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubRepository[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`fetchGithubRepositoriesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`fetchGithubRepositoriesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`fetchGithubRepositoriesAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`fetchGithubRepositoriesAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const fetchGithubUserAction = createAsyncThunk('github/fetchGithubUser', async (_, { getState, dispatch }): Promise<GithubAccount | null> => {
  try {
    LOGGER.silly('fetchGithubUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/github/user`;
    LOGGER.silly(`fetchGithubUserAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubAccount>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchGithubUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchGithubUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchGithubUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchGithubUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchGithubRepositoryAction = createAsyncThunk('github/fetchGithubRepository', async (repositoryName: string, { getState, dispatch }): Promise<GithubRepository | null> => {
  try {
    LOGGER.silly('fetchGithubRepositoryAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/github/${repositoryName}`;
    LOGGER.silly(`fetchGithubRepositoryAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubRepository>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchGithubRepositoryAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchGithubRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchGithubRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchGithubRepositoryAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchGithubRepositoryTreeAction = createAsyncThunk(
  'github/fetchgithubRepositoryTree',
  async (payload: { repositoryName: string; branch: string }, { getState, dispatch }): Promise<GithubFileHash[]> => {
    try {
      LOGGER.silly('fetchGithubRepositoryTreeAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/github/${payload.repositoryName}/${payload.branch}/tree`;
      LOGGER.silly(`fetchGithubRepositoryTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubFileHash[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`fetchGithubRepositoryTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`fetchGithubRepositoryTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`fetchGithubRepositoryTreeAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`fetchGithubRepositoryTreeAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const fetchGithubUserByAccessTokenAction = createAsyncThunk('github/fetchGithubUserByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<any> => {
  try {
    LOGGER.silly('fetchGithubUserByAccessTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/github/user/access-token/${accessToken}`;
    LOGGER.silly(`fetchGithubUserByAccessTokenAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubAccount>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchGithubUserByAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchGithubUserByAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchGithubUserByAccessTokenAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchGithubUserByAccessTokenAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchGithubUserEmailsByAccessTokenAction = createAsyncThunk('github/fetchGithubUserEmailsByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<GithubEmail[]> => {
  try {
    LOGGER.silly('fetchGithubUserEmailsByAccessTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/github/user/emails/access-token/${accessToken}`;
    LOGGER.silly(`fetchGithubUserEmailsByAccessTokenAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubEmail[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchGithubUserEmailsByAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchGithubUserEmailsByAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchGithubUserEmailsByAccessTokenAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchGithubUserEmailsByAccessTokenAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});
