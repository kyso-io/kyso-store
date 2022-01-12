import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import httpClient from '../../services/http-client';
import { NormalizedResponse } from '../../types/normalized-response';

export const fetchDiscussionsAction = createAsyncThunk('discussions/fetchDiscussions', async (_, { getState }) => {
  try {
    const { discussions, team, user } = getState() as RootState;
    const url = `/discussions?owner=${team?.team ? team.team.name : user.user!.nickname}&page=${discussions.page}&per_page=${discussions.limit}&sort=asc`;
    const axiosResponse: AxiosResponse<NormalizedResponse<any>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});
