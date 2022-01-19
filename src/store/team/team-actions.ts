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

export const fetchUsersTeamAction = createAsyncThunk('team/fetchUsersTeam', async (teamName: string) => {
  // TODO
  /**  Legacy implementation
  * @function fetchUsersTeam
  * @param {string} teamname
  * @description Fetches a team that the user is a member of.
  * @return Sets `state.team`
  * @example import { fetchUsersTeam } from './store/team/actions'
  * dispatch(fetchUsersTeam({ teamname }))
  */
  /*
  try {
    const { user } = getStore()

    if (!user) return

    const team = await handleRequest({
      url: `/v1/teams/${teamname}`,
      method: 'get',
      token: user.session_token,
    })

    dispatch(setTeam(team))
  } catch (e) {
    console.error(e)
  }
  */

  return [];
});
