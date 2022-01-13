import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import httpClient from '../../services/http-client';
import { NormalizedResponse } from '../../types/normalized-response';
import { Team } from '../../types/team';

export const fetchTeamAction = createAsyncThunk('team/fetchTeam', async (teamName: string) => {
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
