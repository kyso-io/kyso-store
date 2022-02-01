import { NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { fetchRelationsAction, RootState, setError } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';

export const fetchRepositoriesAction = createAsyncThunk('repos/fetchRepositories', async (_, { getState, dispatch }): Promise<any[]> => {
  try {
    LOGGER.silly('fetchRepositoriesAction invoked');
    const { auth, repos } = getState() as RootState;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}?page=${repos.page}&per_page=${repos.limit}`;
    if (repos?.searchQuery && repos.searchQuery.length > 0) {
      url += `&filter=${repos.searchQuery}`;
    }
    LOGGER.silly(`fetchRepositoriesAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchRepositoriesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchRepositoriesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchRepositoriesAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchRepositoriesAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchRepositoryUserAction = createAsyncThunk('repos/fetchRepositoryUser', async (_, { getState, dispatch }): Promise<any> => {
  try {
    LOGGER.silly('fetchRepositoryUserAction invoked');
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/user`;
    LOGGER.silly(`fetchRepositoryUserAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchRepositoryUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchRepositoryUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchRepositoryUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchRepositoryUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchRepositoryAction = createAsyncThunk('repos/fetchRepository', async (repoName: string, { getState, dispatch }): Promise<any> => {
  try {
    LOGGER.silly(`fetchRepositoryAction: repoName ${repoName}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/${repoName}`;
    LOGGER.silly(`fetchRepositoryAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchRepositoryAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchRepositoryAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchRepositoryTreeAction = createAsyncThunk('repos/fetchRepositoryTree', async (payload: { repoName: string; branch: string }, { getState, dispatch }): Promise<any> => {
  try {
    LOGGER.silly(`fetchRepositoryTreeAction: repoName ${payload.repoName} branch ${payload.branch}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/${payload.repoName}/${payload.branch}/tree`;
    LOGGER.silly(`fetchRepositoryTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchRepositoryTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchRepositoryTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchRepositoryTreeAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchRepositoryTreeAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchUserByAccessTokenAction = createAsyncThunk('repos/fetchUserByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<any> => {
  try {
    LOGGER.silly(`fetchUserByAccessTokenAction: accessToken ${accessToken}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/user/${accessToken}`;
    LOGGER.silly(`fetchUserByAccessTokenAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchUserByAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchUserByAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchUserByAccessTokenAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchUserByAccessTokenAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchUserEmailsByAccessToken = createAsyncThunk('repos/fetchUserEmailsByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<any> => {
  try {
    LOGGER.silly(`fetchUserEmailsByAccessToken: accessToken ${accessToken}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/user/emails/${accessToken}`;
    LOGGER.silly(`fetchUserEmailsByAccessToken: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchUserEmailsByAccessToken: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchUserEmailsByAccessToken: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchUserEmailsByAccessToken: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchUserEmailsByAccessToken: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
