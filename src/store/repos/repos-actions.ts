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
    // console.log('fetchRepositoriesAction invoked');
    const { auth, repos } = getState() as RootState;
    let url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}?page=${repos.page}&per_page=${repos.limit}`;
    if (repos?.searchQuery && repos.searchQuery.length > 0) {
      url += `&filter=${repos.searchQuery}`;
    }
    // console.log(`fetchRepositoriesAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchRepositoriesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchRepositoriesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchRepositoriesAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchRepositoriesAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchRepositoryUserAction = createAsyncThunk('repos/fetchRepositoryUser', async (_, { getState, dispatch }): Promise<any> => {
  try {
    // console.log('fetchRepositoryUserAction invoked');
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/user`;
    // console.log(`fetchRepositoryUserAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchRepositoryUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchRepositoryUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchRepositoryUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchRepositoryUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchRepositoryAction = createAsyncThunk('repos/fetchRepository', async (repoName: string, { getState, dispatch }): Promise<any> => {
  try {
    // console.log(`fetchRepositoryAction: repoName ${repoName}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/${repoName}`;
    // console.log(`fetchRepositoryAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchRepositoryAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchRepositoryAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchRepositoryTreeAction = createAsyncThunk('repos/fetchRepositoryTree', async (payload: { repoName: string; branch: string }, { getState, dispatch }): Promise<any> => {
  try {
    // console.log(`fetchRepositoryTreeAction: repoName ${payload.repoName} branch ${payload.branch}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/${payload.repoName}/${payload.branch}/tree`;
    // console.log(`fetchRepositoryTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchRepositoryTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchRepositoryTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchRepositoryTreeAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchRepositoryTreeAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchUserByAccessTokenAction = createAsyncThunk('repos/fetchUserByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<any> => {
  try {
    // console.log(`fetchUserByAccessTokenAction: accessToken ${accessToken}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/user/${accessToken}`;
    // console.log(`fetchUserByAccessTokenAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchUserByAccessTokenAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchUserByAccessTokenAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchUserByAccessTokenAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchUserByAccessTokenAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchUserEmailsByAccessToken = createAsyncThunk('repos/fetchUserEmailsByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<any> => {
  try {
    // console.log(`fetchUserEmailsByAccessToken: accessToken ${accessToken}`);
    const { auth, repos } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/${repos.provider}/user/emails/${accessToken}`;
    // console.log(`fetchUserEmailsByAccessToken: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchUserEmailsByAccessToken: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchUserEmailsByAccessToken: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchUserEmailsByAccessToken: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchUserEmailsByAccessToken: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
