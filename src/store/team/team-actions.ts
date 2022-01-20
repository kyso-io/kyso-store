import { NormalizedResponseDTO, Team, TeamMember } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import httpClient from '../../services/http-client';

export const fetchTeamByNameAction = createAsyncThunk('team/fetchTeamByName', async (teamName: string): Promise<Team | null> => {
  try {
    const url = `/teams/${teamName}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.get(url, {
      headers: { 'x-kyso-team': teamName },
    });
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return null;
  }
});

export const fetchTeamByIdAction = createAsyncThunk('team/fetchTeamById', async (id: string): Promise<Team | null> => {
  try {
    const url = `/teams/id/${id}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return null;
  }
});

export const createTeamAction = createAsyncThunk('team/createTeam', async (team: Team): Promise<Team | null> => {
  try {
    const url = `/teams`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.post(url, team);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return null;
  }
});

export const deleteTeamAction = createAsyncThunk('team/deleteTeam', async (id: number): Promise<Team | null> => {
  try {
    const url = `/teams/${id}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.delete(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return null;
  }
});

export const fetchTeamMembersAction = createAsyncThunk('team/fetchTeamMembers', async (teamName: string): Promise<TeamMember[]> => {
  try {
    const url = `/teams/${teamName}/members`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.get(url, {
      headers: { 'x-kyso-team': teamName },
    });
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return [];
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return [];
  }
});

export const checkMemberBelongsToTheTeamAction = createAsyncThunk('team/checkMemberBelongsToTheTeam', async (payload: { teamId: string; userId: string }): Promise<boolean> => {
  try {
    const url = `/teams/${payload.teamId}/members/${payload.userId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.post(url, payload);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return false;
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return false;
  }
});

export const updateTeamAction = createAsyncThunk('team/updateTeamAction', async (team: Team): Promise<Team | null> => {
  try {
    const url = `/teams/${team.id}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.patch(url, team);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return null;
  }
});

export const checkTeamNameIsUniqueAction = createAsyncThunk('team/checkTeamNameIsUnique', async (teamName: string): Promise<boolean> => {
  try {
    const url = `/teams/check-name/${teamName}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return false;
    }
  } catch (e: any) {
    console.error(`${e.response.status} ${e?.response.statusText}`);
    return false;
  }
});
