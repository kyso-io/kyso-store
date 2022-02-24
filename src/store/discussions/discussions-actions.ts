import { CreateDiscussionRequestDTO, Discussion, NormalizedResponseDTO, UpdateDiscussionRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';
import { selectActiveTeam } from '../teams/teams-slice';

/**
 * Fetch discussions based on team and user data in the Store. Pagination allowed using page and per_page parameters
 */
export const fetchDiscussionsAction = createAsyncThunk('discussions/fetchDiscussions', async (payload: { page: number; per_page: number; sort?: string }, { getState, dispatch }) => {
  try {
    if (!payload.sort) {
      payload.sort = 'desc';
    }

    // console.log('fetchDiscussionsAction invoked');
    const { user, auth, ...state } = getState() as RootState;
    const team = selectActiveTeam(state as RootState);

    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions?${team ? `team_id=${team.id}` : `user_id=${user.user!.id}`}&page=${payload.page}&per_page=${payload.per_page}&sort=${payload.sort}`;
    // console.log(`fetchDiscussionsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchDiscussionsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchDiscussionsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchDiscussionsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`Error processing action fetchDiscussionsAction: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

/**
 * Fetch all discussions related to the team specified as parameter. Pagination allowed using page and per_page parameters
 */
export const fetchDiscussionsOfATeam = createAsyncThunk(
  'discussions/fetchDiscussionsOfATeam',
  async (payload: { team_id: string; page: number; per_page: number; sort?: string; search?: string }, { getState, dispatch }) => {
    try {
      // console.log('fetchTeamDiscussions invoked');
      const { auth } = getState() as RootState;

      if (!payload.sort) {
        payload.sort = 'desc';
      }

      let url = `${process.env.NEXT_PUBLIC_API_URL}/discussions?team_id=${payload.team_id}&page=${payload.page}&per_page=${payload.per_page}`;
      if (payload.search && payload.search.length > 0) {
        url += `&search=${payload.search}`;
      }
      if (payload.sort && payload.sort.length > 0) {
        url += `&sort=${payload.sort}`;
      }
      // console.log(`fetchTeamDiscussions: ${printAuthenticated(auth)} - GET ${url}`);

      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });

      if (axiosResponse?.data?.relations) {
        // console.log(`fetchTeamDiscussions: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchTeamDiscussions: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchTeamDiscussions: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      // console.log(`Error processing action fetchTeamDiscussions: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

/**
 *
 */
export const fetchDiscussionById = createAsyncThunk('discussions/fetchDiscussionById', async (payload: { discussionId: string }, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    // console.log('fetchDiscussionById invoked');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${payload.discussionId}`;
    const { auth } = getState() as RootState;
    // console.log(`fetchDiscussionById: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });

    if (axiosResponse?.data?.relations) {
      // console.log(`fetchDiscussionById: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchDiscussionById: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchDiscussionById: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchDiscussionById: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const createDiscussion = createAsyncThunk('discussions/createDiscussion', async (payload: CreateDiscussionRequestDTO, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    // console.log('createDiscussion invoked');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions`;
    const { auth } = getState() as RootState;
    // console.log(`createDiscussion: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.post(url, payload, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`createDiscussion: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createDiscussion: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createDiscussion: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createDiscussion: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateDiscussion = createAsyncThunk(
  'discussions/updateDiscussion',
  async (payload: { discussionId: string; data: UpdateDiscussionRequestDTO }, { getState, dispatch }): Promise<Discussion | null> => {
    try {
      // console.log('updateDiscussion invoked');
      const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${payload.discussionId}`;
      const { auth } = getState() as RootState;
      // console.log(`updateDiscussion: ${printAuthenticated(auth)} - PUT ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.patch(url, payload.data, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateDiscussion: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateDiscussion: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateDiscussion: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`updateDiscussion: Error processing action: ${e.toString()}`);
      return null;
    }
  }
);

export const deleteDiscussion = createAsyncThunk('discussions/deleteDiscussion', async (discussionId: string, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    // console.log('deleteDiscussion invoked');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}`;
    const { auth } = getState() as RootState;
    // console.log(`deleteDiscussion: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteDiscussion: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteDiscussion: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteDiscussion: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteDiscussion: Error processing action: ${e.toString()}`);
    return null;
  }
});
