import { CreateDiscussionRequestDTO, Discussion, NormalizedResponseDTO, UpdateDiscussionRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';

export const fetchDiscussionsAction = createAsyncThunk('discussions/fetchDiscussions', async (_, { getState }) => {
  try {
    LOGGER.silly("fetchDiscussionsAction invoked")
    const { discussions, team, user, auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions?owner=${team?.team ? team.team.name : user.user!.nickname}&page=${discussions.page}&per_page=${discussions.limit}&sort=asc`;
    
    LOGGER.silly(`${printAuthenticated(auth)} - GET ${url} `)
    
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth)
    });
    
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`${JSON.stringify(axiosResponse.data)}`)
      return axiosResponse.data.data;
    } else {
      return [];
    }
  } catch(e: any) {
    LOGGER.error(`Error processing action fetchDiscussionsAction: ${e.toString()}`)
    return [];
  }
});

export const fetchDiscussionsByTeam = createAsyncThunk('discussions/fetchDiscussionsByTeam', async (team_id: string) => {
  try {
    const url = `/discussions/team/${team_id}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await httpClient.get(url);
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
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion[]>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const createDiscussion = createAsyncThunk('discussions/createDiscussion', async (payload: CreateDiscussionRequestDTO) => {
  try {
    const url = `/discussions`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.post(url, payload);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const updateDiscussion = createAsyncThunk('discussions/updateDiscussion', async (payload: { id: string; data: UpdateDiscussionRequestDTO }) => {
  try {
    const url = `/discussions/${payload.id}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.patch(url, payload.data);
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
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Discussion>> = await httpClient.delete(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});
