import { CreateDiscussionRequest, Discussion, NormalizedResponse, UpdateDiscussionRequest } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import httpClient from '../../services/http-client';

export const fetchDiscussionsAction = createAsyncThunk('discussions/fetchDiscussions', async (_, { getState }) => {
  try {
    const { discussions, team, user } = getState() as RootState;
    const url = `/discussions?owner=${team?.team ? team.team.name : user.user!.nickname}&page=${discussions.page}&per_page=${discussions.limit}&sort=asc`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Discussion[]>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchDiscussionsByTeam = createAsyncThunk('discussions/fetchDiscussionsByTeam', async (team_id: string) => {
  try {
    const url = `/discussions/team/${team_id}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Discussion[]>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const fetchDiscussionByTeamAndDiscussionNumber = createAsyncThunk('discussions/fetchDiscussionByTeamAndDiscussionNumber', async (payload: { team_id: string; discussion_number: number }) => {
  try {
    const url = `/discussions/${payload.team_id}/${payload.discussion_number}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Discussion[]>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const createDiscussion = createAsyncThunk('discussions/createDiscussion', async (payload: CreateDiscussionRequest) => {
  try {
    const url = `/discussions`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Discussion>> = await httpClient.post(url, payload);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const updateDiscussion = createAsyncThunk('discussions/updateDiscussion', async (payload: { id: string; data: UpdateDiscussionRequest }) => {
  try {
    const url = `/discussions/${payload.id}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Discussion>> = await httpClient.patch(url, payload.data);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const deleteDiscussion = createAsyncThunk('discussions/deleteDiscussion', async (id: string) => {
  try {
    const url = `/discussions/${id}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Discussion>> = await httpClient.delete(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});
