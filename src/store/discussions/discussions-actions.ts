import { CreateDiscussionRequestDTO, Discussion, NormalizedResponseDTO, UpdateDiscussionRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, selectActiveReport } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';
import { selectActiveTeam } from '../teams/teams-slice';
/**
 * Fetch discussions based on team and user data in the Store. Pagination allowed using page and per_page parameters
 */
export const fetchDiscussionsAction = createAsyncThunk('discussions/fetchDiscussions', async (payload: { page: number, per_page: number, sort?: string }, { getState, dispatch }) => {
  try {
    if(!payload.sort) {
      payload.sort = 'desc'
    }
    
    LOGGER.silly('fetchDiscussionsAction invoked');
    const { user, auth, ...state } = getState() as RootState;
    const team = selectActiveTeam(state as RootState)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions?${team ? `team_id=${team.id}` : `user_id=${user.user!.id}`}&page=${payload.page}&per_page=${payload.per_page}&sort=${payload.sort}`;
    LOGGER.silly(`fetchDiscussionsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchDiscussionsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchDiscussionsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchDiscussionsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`Error processing action fetchDiscussionsAction: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

/**
 * Fetch all discussions related to the team specified as parameter. Pagination allowed using page and per_page parameters
 */
 export const fetchDiscussionsOfATeam = createAsyncThunk('discussions/fetchDiscussionsOfATeam', async (payload: { team_id: string, page: number, per_page: number }, { getState, dispatch }) => {
  try {
    LOGGER.silly('fetchTeamDiscussions invoked');
    const { auth } = getState() as RootState;
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions?team_id=${payload.team_id}&page=${payload.page}&per_page=${payload.per_page}&sort=asc`;
    LOGGER.silly(`fetchTeamDiscussions: ${printAuthenticated(auth)} - GET ${url}`);
    
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchTeamDiscussions: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchTeamDiscussions: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchTeamDiscussions: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`Error processing action fetchTeamDiscussions: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

/**
 * 
 */
export const fetchDiscussionById = createAsyncThunk(
  'discussions/fetchDiscussionById',
  async (payload: { discussionId: string }, { getState, dispatch }): Promise<Discussion | null> => {
    try {
      LOGGER.silly('fetchDiscussionById invoked');
      const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${payload.discussionId}`;
      const { auth } = getState() as RootState;
      LOGGER.silly(`fetchDiscussionById: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`fetchDiscussionById: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`fetchDiscussionById: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`fetchDiscussionById: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      LOGGER.error(`fetchDiscussionById: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

/**
 * Fetchs all the comments from the discussion_id provided as param
 * TODO: this should be paged as well
 */
export const fetchDiscussionComments = createAsyncThunk('discussions/fetchDiscussionComments', async (payload: { discussionId: string }, { getState, dispatch }): Promise<Comment[]> => {
  try {
    LOGGER.silly('fetchDiscussionComments invoked');
    
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${payload.discussionId}/comments`;
    const { auth } = getState() as RootState;
    
    LOGGER.silly(`fetchDiscussionComments: ${printAuthenticated(auth)} - GET ${url}`);
    
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth)
    });
    
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchDiscussionComments: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
    }

    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchDiscussionComments: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchDiscussionComments: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchDiscussionComments: Error processing action: ${e.toString()}`);
    return [];
  }
});

export const createDiscussion = createAsyncThunk('discussions/createDiscussion', async (payload: CreateDiscussionRequestDTO, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    LOGGER.silly('createDiscussion invoked');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions`;
    const { auth } = getState() as RootState;
    LOGGER.silly(`createDiscussion: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.post(url, payload, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`createDiscussion: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createDiscussion: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createDiscussion: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createDiscussion: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateDiscussion = createAsyncThunk(
  'discussions/updateDiscussion',
  async (payload: { discussionId: string; data: UpdateDiscussionRequestDTO }, { getState, dispatch }): Promise<Discussion | null> => {
    try {
      LOGGER.silly('updateDiscussion invoked');
      const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${payload.discussionId}`;
      const { auth } = getState() as RootState;
      LOGGER.silly(`updateDiscussion: ${printAuthenticated(auth)} - PUT ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.patch(url, payload.data, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`updateDiscussion: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`updateDiscussion: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`updateDiscussion: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      LOGGER.error(`updateDiscussion: Error processing action: ${e.toString()}`);
      return null;
    }
  }
);

export const deleteDiscussion = createAsyncThunk('discussions/deleteDiscussion', async (discussionId: string, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    LOGGER.silly('deleteDiscussion invoked');
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${discussionId}`;
    const { auth } = getState() as RootState;
    LOGGER.silly(`deleteDiscussion: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteDiscussion: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteDiscussion: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteDiscussion: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteDiscussion: Error processing action: ${e.toString()}`);
    return null;
  }
});
