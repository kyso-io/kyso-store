import { GithubEmail, NormalizedResponseDTO, RepositoryProvider } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchRelationsAction, RootState, setError } from '..';
import { Api } from '../../api';
import { setRequestingRepos } from './repos-slice';

export const fetchRepositoriesAction = createAsyncThunk(
  'repos/fetchRepositories',
  async (args: { provider: RepositoryProvider; page: number; per_page: number; query?: string }, { getState, dispatch }): Promise<any[]> => {
    try {
      await dispatch(setRequestingRepos(true));
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<any[]> = await api.getRepositories(args);
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
      await dispatch(setRequestingRepos(false));
      return [];
    }
  }
);

export const fetchRepositoryUserAction = createAsyncThunk('repos/fetchRepositoryUser', async (_, { getState, dispatch }): Promise<any> => {
  try {
    const { auth, repos } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<any> = await api.getUserRepositories(repos.provider);
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

export const fetchRepositoryAction = createAsyncThunk('repos/fetchRepository', async (repoName: string, { getState, dispatch }): Promise<any> => {
  try {
    const { auth, repos } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<any> = await api.getRepository(repos.provider, repoName);
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

export const fetchRepositoryTreeAction = createAsyncThunk('repos/fetchRepositoryTree', async (payload: { repoName: string; branch: string }, { getState, dispatch }): Promise<any> => {
  try {
    const { auth, repos } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<any> = await api.getRepositoryTree(repos.provider, payload.repoName, payload.branch);
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

export const fetchUserByAccessTokenAction = createAsyncThunk('repos/fetchUserByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<any> => {
  try {
    const { auth, repos } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<any> = await api.getUserFromRepositoryProviderGivenAccessToken(repos.provider, accessToken);
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

export const fetchUserEmailsByAccessToken = createAsyncThunk('repos/fetchUserEmailsByAccessToken', async (accessToken: string, { getState, dispatch }): Promise<GithubEmail[]> => {
  try {
    const { auth, repos } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<GithubEmail[]> = await api.getUserEmailsFromRepositoryProviderGivenAccessToken(repos.provider, accessToken);
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
