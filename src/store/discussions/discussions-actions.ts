import { CreateDiscussionRequestDTO, Discussion, NormalizedResponseDTO, UpdateDiscussionRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { Api } from '../../api';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';
import { selectActiveTeam } from '../teams/teams-slice';

export const fetchDiscussionsAction = createAsyncThunk('discussions/fetchDiscussions', async (payload: { page: number; per_page: number; sort?: string }, { getState, dispatch }) => {
  try {
    const { user, auth, ...state } = getState() as RootState;
    const team = selectActiveTeam(state as RootState);
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const args: any = { ...payload };
    if (team) {
      args.teamId = team.id;
    } else {
      args.userId = user.user.id;
    }
    if (!args.sort) {
      args.sort = '-created_at';
    }
    const response: NormalizedResponseDTO<Discussion[]> = await api.getDiscussions(args);
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

export const fetchDiscussionsOfATeam = createAsyncThunk(
  'discussions/fetchDiscussionsOfATeam',
  async (payload: { team_id: string; page: number; per_page: number; sort?: string; search?: string }, { getState, dispatch }) => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const args: any = { ...payload };
      if (!args.sort) {
        args.sort = 'desc';
      }
      const response: NormalizedResponseDTO<Discussion[]> = await api.getDiscussions(args);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response?.relations));
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
  },
);

export const fetchDiscussionById = createAsyncThunk('discussions/fetchDiscussionById', async (payload: { discussionId: string }, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Discussion> = await api.getDiscussion(payload.discussionId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response?.relations));
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

export const createDiscussion = createAsyncThunk('discussions/createDiscussion', async (payload: CreateDiscussionRequestDTO, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Discussion> = await api.createDiscussion(payload);
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

export const updateDiscussion = createAsyncThunk(
  'discussions/updateDiscussion',
  async (payload: { discussionId: string; data: UpdateDiscussionRequestDTO }, { getState, dispatch }): Promise<Discussion | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<Discussion> = await api.updateDiscussion(payload.discussionId, payload.data);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (e: any) {
      return null;
    }
  },
);

export const deleteDiscussion = createAsyncThunk('discussions/deleteDiscussion', async (discussionId: string, { getState, dispatch }): Promise<Discussion | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Discussion> = await api.deleteDiscussion(discussionId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
});
