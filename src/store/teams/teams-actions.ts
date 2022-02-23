import { NormalizedResponseDTO, Report, Team, TeamMember, UpdateTeamMembersDTO, UpdateTeamRequest } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchTeamsAction = createAsyncThunk('teams/fetchTeams', async (payload: { filter?: object; sort?: string; page?: number; per_page?: number }, { getState, dispatch }): Promise<Team[]> => {
  try {
    // console.log('fetchTeamsAction invoked');
    const { auth } = getState() as RootState;

    const qs = new URLSearchParams({
      page: (payload?.page || 1).toString(),
      per_page: (payload?.per_page || 20).toString(),
      sort: payload?.sort && payload.sort.length > 0 ? payload.sort : '-created_at',
      ...payload?.filter,
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams?${qs.toString()}`;
    // console.log(`fetchTeamsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchTeamsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchTeamsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchTeamsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchTeamsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchTeamAction = createAsyncThunk('team/fetchTeam', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    // console.log(`fetchTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`;
    // console.log(`fetchTeamAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const createTeamAction = createAsyncThunk('team/createTeam', async (team: Team, { getState, dispatch }): Promise<Team | null> => {
  try {
    // console.log(`createTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams`;
    // console.log(`createTeamAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.post(url, team, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`createTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteTeamAction = createAsyncThunk('team/deleteTeam', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    // console.log(`deleteTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`;
    // console.log(`deleteTeamAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchTeamMembersAction = createAsyncThunk('team/fetchTeamMembers', async (teamId: string, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    // console.log(`fetchTeamMembers invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/members`;
    // console.log(`fetchTeamMembers: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchTeamMembers: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchTeamMembers: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchTeamMembers: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchTeamMembers: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const checkMemberBelongsToTheTeamAction = createAsyncThunk('team/checkMemberBelongsToTheTeam', async (payload: { teamId: string; userId: string }, { getState, dispatch }): Promise<boolean> => {
  try {
    // console.log(`checkMemberBelongsToTheTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members/${payload.userId}`;
    // console.log(`checkMemberBelongsToTheTeamAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`checkMemberBelongsToTheTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`checkMemberBelongsToTheTeamAction: Response didn't have data, returning null`);
      return false;
    }
  } catch (e: any) {
    // console.log(`checkMemberBelongsToTheTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return false;
  }
});

export const addMemberToTheTeamAction = createAsyncThunk('team/addMemberToTheTeam', async (payload: { teamId: string; userId: string }, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    // console.log(`addMemberToTheTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members/${payload.userId}`;
    // console.log(`addMemberToTheTeamAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.patch(url, payload, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`addMemberToTheTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`addMemberToTheTeamAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`addMemberToTheTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const deleteMemberFromTheTeamAction = createAsyncThunk('team/deleteMemberFromTheTeam', async (payload: { teamId: string; userId: string }, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    // console.log(`deleteMemberFromTheTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members/${payload.userId}`;
    // console.log(`deleteMemberFromTheTeamAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`deleteMemberFromTheTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteMemberFromTheTeamAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`deleteMemberFromTheTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const updateTeamAction = createAsyncThunk('team/updateTeamAction', async (payload: { teamId: string; data: UpdateTeamRequest }, { getState, dispatch }): Promise<Team | null> => {
  try {
    // console.log(`updateTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}`;
    // console.log(`updateTeamAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.patch(url, payload.data, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`updateTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`updateTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`updateTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`updateTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const checkTeamNameIsUniqueAction = createAsyncThunk('team/checkTeamNameIsUnique', async (teamName: string, { getState, dispatch }): Promise<boolean> => {
  try {
    // console.log(`checkTeamNameIsUniqueAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/check-name/${teamName}`;
    // console.log(`checkTeamNameIsUniqueAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`checkTeamNameIsUniqueAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`checkTeamNameIsUniqueAction: Response didn't have data, returning null`);
      return false;
    }
  } catch (e: any) {
    // console.log(`checkTeamNameIsUniqueAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return false;
  }
});

export const fetchTeamReportsAction = createAsyncThunk('team/fetchTeamReports', async (teamId: string, { getState, dispatch }): Promise<Report[]> => {
  try {
    // console.log(`fetchTeamReportsAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/reports`;
    // console.log(`fetchTeamReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchTeamReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchTeamReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchTeamReportsAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchTeamReportsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const updateRoleToMembersOfTeamAction = createAsyncThunk(
  'team/updateRoleToMembersOfTeam',
  async (payload: { teamId: string; data: UpdateTeamMembersDTO }, { getState, dispatch }): Promise<TeamMember[]> => {
    try {
      // console.log(`updateRoleToMembersOfTeamAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members-roles`;
      // console.log(`updateRoleToMembersOfTeamAction: ${printAuthenticated(auth)} - PATCH ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.patch(url, payload.data, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateRoleToMembersOfTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateRoleToMembersOfTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateRoleToMembersOfTeamAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`updateRoleToMembersOfTeamAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const deleteRoleOfMembersOfTeamAction = createAsyncThunk(
  'team/updateRoleToMembersOfTeam',
  async (payload: { teamId: string; userId: string; role: string }, { getState, dispatch }): Promise<TeamMember[]> => {
    try {
      // console.log(`deleteRoleOfMembersOfTeamAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members-roles/${payload.userId}/${payload.role}`;
      // console.log(`deleteRoleOfMembersOfTeamAction: ${printAuthenticated(auth)} - DELETE ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`deleteRoleOfMembersOfTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`deleteRoleOfMembersOfTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`deleteRoleOfMembersOfTeamAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`deleteRoleOfMembersOfTeamAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const updateTeamProfilePictureAction = createAsyncThunk('team/updateTeamProfilePicture', async (payload: { teamId: string; file: File }, { getState, dispatch }): Promise<Team | null> => {
  try {
    // console.log(`updateTeamProfilePictureAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/profile-picture`;
    // console.log(`updateTeamProfilePictureAction: ${printAuthenticated(auth)} - POST ${url}`);
    const formData = new FormData();
    formData.append('file', payload.file);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.post(url, formData, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`updateTeamProfilePictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`updateTeamProfilePictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`updateTeamProfilePictureAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`updateTeamProfilePictureAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteTeamProfilePictureAction = createAsyncThunk('team/deleteTeamProfilePictureAction', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    // console.log(`deleteTeamProfilePictureAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/profile-picture`;
    // console.log(`deleteTeamProfilePictureAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteTeamProfilePictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteTeamProfilePictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteTeamProfilePictureAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteTeamProfilePictureAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
