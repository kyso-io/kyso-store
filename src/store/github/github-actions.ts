import { GithubAccount, GithubEmail, GithubFileHash, GithubRepository, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { buildAuthHeaders, getAPIBaseURL } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchGithubRepositoriesAction = createAsyncThunk(
  'github/fetchGithubRepositories',
  async (payload: { filter?: object; page?: number; per_page?: number }, { getState, dispatch }): Promise<GithubRepository[]> => {
    try {
      // console.log('fetchGithubRepositoriesAction invoked');
      const { auth } = getState() as RootState;

      const qs = new URLSearchParams({
        page: (payload?.page || 1).toString(),
        per_page: (payload?.per_page || 20).toString(),
        sort: 'desc',
        ...payload?.filter,
      });

      const url = `${getAPIBaseURL()}/repos/github?${qs.toString()}`;
      // console.log(`fetchGithubRepositoriesAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubRepository[]>> = await httpClient.get(url, {
        headers: await buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchGithubRepositoriesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchGithubRepositoriesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchGithubRepositoriesAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchGithubRepositoriesAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return [];
    }
  }
);

export const fetchGithubUserAction = createAsyncThunk('github/fetchGithubUser', async (_, { getState, dispatch }): Promise<GithubAccount | null> => {
  try {
    // console.log('fetchGithubUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/repos/github/user`;
    // console.log(`fetchGithubUserAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubAccount>> = await httpClient.get(url, {
      headers: await buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchGithubUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchGithubUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchGithubUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchGithubUserAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchGithubRepositoryAction = createAsyncThunk('github/fetchGithubRepository', async (repositoryName: string, { getState, dispatch }): Promise<GithubRepository | null> => {
  try {
    // console.log('fetchGithubRepositoryAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/repos/github/${repositoryName}`;
    // console.log(`fetchGithubRepositoryAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubRepository>> = await httpClient.get(url, {
      headers: await buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchGithubRepositoryAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchGithubRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchGithubRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchGithubRepositoryAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchGithubRepositoryTreeAction = createAsyncThunk(
  'github/fetchgithubRepositoryTree',
  async (payload: { repositoryName: string; branch: string }, { getState, dispatch }): Promise<GithubFileHash[]> => {
    try {
      // console.log('fetchGithubRepositoryTreeAction invoked');
      const { auth } = getState() as RootState;
      const url = `${getAPIBaseURL()}/repos/github/${payload.repositoryName}/${payload.branch}/tree`;
      // console.log(`fetchGithubRepositoryTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubFileHash[]>> = await httpClient.get(url, {
        headers: await buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchGithubRepositoryTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchGithubRepositoryTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchGithubRepositoryTreeAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchGithubRepositoryTreeAction: Error processing action: ${e.toString()}`);
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return [];
    }
  }
);

export const fetchGithubUserByAccessTokenAction = createAsyncThunk('github/fetchGithubUserByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<any> => {
  try {
    // console.log('fetchGithubUserByAccessTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/repos/github/user/access-token/${accessToken}`;
    // console.log(`fetchGithubUserByAccessTokenAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubAccount>> = await httpClient.get(url, {
      headers: await buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchGithubUserByAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchGithubUserByAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchGithubUserByAccessTokenAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchGithubUserByAccessTokenAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return null;
  }
});

export const fetchGithubUserEmailsByAccessTokenAction = createAsyncThunk('github/fetchGithubUserEmailsByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<GithubEmail[]> => {
  try {
    // console.log('fetchGithubUserEmailsByAccessTokenAction invoked');
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/repos/github/user/emails/access-token/${accessToken}`;
    // console.log(`fetchGithubUserEmailsByAccessTokenAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubEmail[]>> = await httpClient.get(url, {
      headers: await buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchGithubUserEmailsByAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchGithubUserEmailsByAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchGithubUserEmailsByAccessTokenAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchGithubUserEmailsByAccessTokenAction: Error processing action: ${e.toString()}`);
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return [];
  }
});
