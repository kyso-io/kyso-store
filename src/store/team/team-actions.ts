import { NormalizedResponse, Team, TeamMember } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import httpClient from '../../services/http-client';

export const fetchTeamByNameAction = createAsyncThunk('team/fetchTeamByName', async (teamName: string) => {
  try {
    const url = `/teams/${teamName}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Team>> = await httpClient.get(url, {
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

export const fetchTeamByIdAction = createAsyncThunk('team/fetchTeamById', async (id: string) => {
  try {
    const url = `/teams/id/${id}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Team>> = await httpClient.get(url);
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

export const createTeamAction = createAsyncThunk('team/createTeam', async (team: Team) => {
  try {
    const url = `/teams`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Team>> = await httpClient.post(url, team);
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

export const deleteTeamAction = createAsyncThunk('team/deleteTeam', async (id: number) => {
  try {
    const url = `/teams/${id}`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Team>> = await httpClient.delete(url);
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

export const fetchTeamMembersAction = createAsyncThunk('team/fetchTeamMembers', async (teamName: string) => {
  try {
    const url = `/teams/${teamName}/members`;
    const axiosResponse: AxiosResponse<NormalizedResponse<TeamMember[]>> = await httpClient.get(url, {
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

export const fetchUsersTeamAction = createAsyncThunk('team/fetchUsersTeam', async () => {
  return [];
});
