import { NormalizedResponseDTO, Report, Team, TeamMember, UpdateTeamMembersDTO, UpdateTeamRequest } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchTeamsAction = createAsyncThunk('teams/fetchTeams', async (_, { getState, dispatch }): Promise<Team[]> => {
  try {
    LOGGER.silly('fetchTeamsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams`;
    LOGGER.silly(`fetchTeamsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchTeamsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchTeamsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchTeamsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchTeamsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchTeamAction = createAsyncThunk('team/fetchTeam', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    LOGGER.silly(`fetchTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`;
    LOGGER.silly(`fetchTeamAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const createTeamAction = createAsyncThunk('team/createTeam', async (team: Team, { getState, dispatch }): Promise<Team | null> => {
  try {
    LOGGER.silly(`createTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams`;
    LOGGER.silly(`createTeamAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.post(url, team, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`createTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteTeamAction = createAsyncThunk('team/deleteTeam', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    LOGGER.silly(`deleteTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}`;
    LOGGER.silly(`deleteTeamAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchTeamMembersAction = createAsyncThunk('team/fetchTeamMembers', async (teamId: string, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    LOGGER.silly(`fetchTeamMembers invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/members`;
    LOGGER.silly(`fetchTeamMembers: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchTeamMembers: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchTeamMembers: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchTeamMembers: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchTeamMembers: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const checkMemberBelongsToTheTeamAction = createAsyncThunk('team/checkMemberBelongsToTheTeam', async (payload: { teamId: string; userId: string }, { getState, dispatch }): Promise<boolean> => {
  try {
    LOGGER.silly(`checkMemberBelongsToTheTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members/${payload.userId}`;
    LOGGER.silly(`checkMemberBelongsToTheTeamAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`checkMemberBelongsToTheTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`checkMemberBelongsToTheTeamAction: Response didn't have data, returning null`);
      return false;
    }
  } catch (e: any) {
    LOGGER.error(`checkMemberBelongsToTheTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return false;
  }
});

export const addMemberToTheTeamAction = createAsyncThunk('team/addMemberToTheTeam', async (payload: { teamId: string; userId: string }, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    LOGGER.silly(`addMemberToTheTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members/${payload.userId}`;
    LOGGER.silly(`addMemberToTheTeamAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.patch(url, payload, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`addMemberToTheTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`addMemberToTheTeamAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`addMemberToTheTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const deleteMemberFromTheTeamAction = createAsyncThunk('team/deleteMemberFromTheTeam', async (payload: { teamId: string; userId: string }, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    LOGGER.silly(`deleteMemberFromTheTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members/${payload.userId}`;
    LOGGER.silly(`deleteMemberFromTheTeamAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.patch(url, payload, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteMemberFromTheTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteMemberFromTheTeamAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`deleteMemberFromTheTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const updateTeamAction = createAsyncThunk('team/updateTeamAction', async (payload: { teamId: string; data: UpdateTeamRequest }, { getState, dispatch }): Promise<Team | null> => {
  try {
    LOGGER.silly(`updateTeamAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}`;
    LOGGER.silly(`updateTeamAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.patch(url, payload.data, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`updateTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`updateTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`updateTeamAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`updateTeamAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const checkTeamNameIsUniqueAction = createAsyncThunk('team/checkTeamNameIsUnique', async (teamName: string, { getState, dispatch }): Promise<boolean> => {
  try {
    LOGGER.silly(`checkTeamNameIsUniqueAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/check-name/${teamName}`;
    LOGGER.silly(`checkTeamNameIsUniqueAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`checkTeamNameIsUniqueAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`checkTeamNameIsUniqueAction: Response didn't have data, returning null`);
      return false;
    }
  } catch (e: any) {
    LOGGER.error(`checkTeamNameIsUniqueAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return false;
  }
});

export const fetchTeamReportsAction = createAsyncThunk('team/fetchTeamReports', async (teamId: string, { getState, dispatch }): Promise<Report[]> => {
  try {
    LOGGER.silly(`fetchTeamReportsAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/reports`;
    LOGGER.silly(`fetchTeamReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchTeamReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchTeamReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchTeamReportsAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchTeamReportsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const updateRoleToMembersOfTeamAction = createAsyncThunk(
  'team/updateRoleToMembersOfTeam',
  async (payload: { teamId: string; data: UpdateTeamMembersDTO }, { getState, dispatch }): Promise<TeamMember[]> => {
    try {
      LOGGER.silly(`updateRoleToMembersOfTeamAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members-roles`;
      LOGGER.silly(`updateRoleToMembersOfTeamAction: ${printAuthenticated(auth)} - PATCH ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.patch(url, payload.data, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`updateRoleToMembersOfTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`updateRoleToMembersOfTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`updateRoleToMembersOfTeamAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`updateRoleToMembersOfTeamAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const deleteRoleOfMembersOfTeamAction = createAsyncThunk(
  'team/updateRoleToMembersOfTeam',
  async (payload: { teamId: string; userId: string; role: string }, { getState, dispatch }): Promise<TeamMember[]> => {
    try {
      LOGGER.silly(`deleteRoleOfMembersOfTeamAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/members-roles/${payload.userId}/${payload.role}`;
      LOGGER.silly(`deleteRoleOfMembersOfTeamAction: ${printAuthenticated(auth)} - DELETE ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TeamMember[]>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`deleteRoleOfMembersOfTeamAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`deleteRoleOfMembersOfTeamAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`deleteRoleOfMembersOfTeamAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`deleteRoleOfMembersOfTeamAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const updateTeamProfilePictureAction = createAsyncThunk('team/updateTeamProfilePicture', async (payload: { teamId: string; file: File }, { getState, dispatch }): Promise<Team | null> => {
  try {
    LOGGER.silly(`updateTeamProfilePictureAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${payload.teamId}/profile-picture`;
    LOGGER.silly(`updateTeamProfilePictureAction: ${printAuthenticated(auth)} - POST ${url}`);
    const formData = new FormData();
    formData.append('file', payload.file);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.post(url, formData, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`updateTeamProfilePictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`updateTeamProfilePictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`updateTeamProfilePictureAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`updateTeamProfilePictureAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteTeamProfilePictureAction = createAsyncThunk('team/deleteTeamProfilePictureAction', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    LOGGER.silly(`deleteTeamProfilePictureAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/teams/${teamId}/profile-picture`;
    LOGGER.silly(`deleteTeamProfilePictureAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Team>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteTeamProfilePictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteTeamProfilePictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteTeamProfilePictureAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteTeamProfilePictureAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
