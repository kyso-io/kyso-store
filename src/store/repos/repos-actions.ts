import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import httpClient from '../../services/http-client';
import { NormalizedResponse } from '../../types/normalized-response';
import { Repository } from '../../types/repository';
import { setSearchQuery } from './repos-slice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchReposAction = createAsyncThunk('repos/fetchRepos', async (_, { getState }) => {
  try {
    const { repos } = getState() as RootState;
    let url = `/repos/${repos.provider}?page=${repos.page}&per_page=${repos.limit}`;
    if (repos?.searchQuery && repos.searchQuery.length > 0) {
      url += `&filter=${repos.searchQuery}`;
    }
    const axiosResponse: AxiosResponse<NormalizedResponse<Repository[]>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return [];
    }
  } catch {
    return [];
  }
});

export const setSearchAndRefresh = createAsyncThunk('repos/setSearchAndRefresh', async (query: string, { dispatch }) => {
  dispatch(setSearchQuery(query));
  await dispatch(fetchReposAction());
});

export const fetchRepoAction = createAsyncThunk('repos/fetchRepo', async (payload: { owner: string; name: string }, { getState }) => {
  try {
    const { repos } = getState() as RootState;
    const url = `/repos/${repos.provider}/${payload.owner}/${payload.name}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Repository>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchRepoTreeAction = createAsyncThunk('repos/fetchTree', async (payload: { owner: string; branch: string }, { getState }) => {
  try {
    const { repos } = getState() as RootState;
    if (!repos.active) {
      return;
    }
    const url = `/repos/${repos.provider}/${payload.owner}/${repos.active.name}/${payload.branch}/tree`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Repository>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});
