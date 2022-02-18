import { GithubAccount, GithubFileHash, GithubRepository, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { fetchRelationsAction, RootState, setError } from '..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';

export const fetchBitbucketRepositoriesAction = createAsyncThunk(
  'bitbucket/fetchBitbucketRepositories',
  async (payload: { filter?: string; page?: number; per_page?: number }, { getState, dispatch }): Promise<GithubRepository[]> => {
    try {
      // console.log('fetchBitbucketRepositoriesAction invoked');
      const { auth } = getState() as RootState;

      const qs = new URLSearchParams({
        page: (payload?.page || 1).toString(),
        per_page: (payload?.per_page || 20).toString(),
        sort: 'desc',
        filter: payload?.filter || '',
      });

      const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/bitbucket?${qs.toString()}`;
      // console.log(`fetchBitbucketRepositoriesAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubRepository[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchBitbucketRepositoriesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchBitbucketRepositoriesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchBitbucketRepositoriesAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchBitbucketRepositoriesAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const fetchBitbucketUserAction = createAsyncThunk('bitbucket/fetchBitbucketUser', async (_, { getState, dispatch }): Promise<GithubAccount | null> => {
  try {
    // console.log('fetchBitbucketUserAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/bitbucket/user`;
    // console.log(`fetchBitbucketUserAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchBitbucketUserAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchBitbucketUserAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchBitbucketUserAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchBitbucketUserAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchBitbucketRepositoryAction = createAsyncThunk('bitbucket/fetchBitbucketRepository', async (repositoryName: string, { getState, dispatch }): Promise<GithubRepository | null> => {
  try {
    // console.log('fetchBitbucketRepositoryAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/bitbucket/repository?name=${repositoryName}`;
    // console.log(`fetchBitbucketRepositoryAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubRepository>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchBitbucketRepositoryAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchBitbucketRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchBitbucketRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchBitbucketRepositoryAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchBitbucketRepositoryTreeAction = createAsyncThunk(
  'bitbucket/fetchBitbucketRepositoryTree',
  async (payload: { repositoryName: string; branch: string }, { getState, dispatch }): Promise<GithubFileHash[]> => {
    try {
      // console.log('fetchBitbucketRepositoryTreeAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/repos/bitbucket/${payload.branch}/tree?name=${payload.repositoryName}`;
      // console.log(`fetchBitbucketRepositoryTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubFileHash[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchBitbucketRepositoryTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchBitbucketRepositoryTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchBitbucketRepositoryTreeAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchBitbucketRepositoryTreeAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);
