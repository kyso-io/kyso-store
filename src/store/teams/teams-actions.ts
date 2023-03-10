import { NormalizedResponseDTO, Report, Team, TeamInfoDto, TeamMember, TeamsInfoQuery, UpdateTeamMembersDTO, UpdateTeamRequest } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, setError } from '..';
import { Api } from '../../api';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchTeamsAction = createAsyncThunk('teams/fetchTeams', async (args: { filter?: object; sort?: string; page?: number; per_page?: number }, { getState, dispatch }): Promise<Team[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Team[]> = await api.getTeams(args);
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

export const fetchTeamAction = createAsyncThunk('team/fetchTeam', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Team> = await api.getTeam(teamId);
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

export const createTeamAction = createAsyncThunk('team/createTeam', async (team: Team, { getState, dispatch }): Promise<Team | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Team> = await api.createTeam(team);
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

export const deleteTeamAction = createAsyncThunk('team/deleteTeam', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Team> = await api.deleteTeam(teamId);
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

export const fetchTeamMembersAction = createAsyncThunk('team/fetchTeamMembers', async (teamId: string, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<TeamMember[]> = await api.getTeamMembers(teamId);
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

export const fetchAuthorsAction = createAsyncThunk('team/fetchAuthors', async (teamId: string, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<TeamMember[]> = await api.getTeamAuthors(teamId);
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

export const fetchTeamAssigneesAction = createAsyncThunk('team/fetchTeamAssignees', async (teamId: string, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<TeamMember[]> = await api.getTeamAssignees(teamId);
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

export const checkMemberBelongsToTheTeamAction = createAsyncThunk('team/checkMemberBelongsToTheTeam', async (args: { teamId: string; userId: string }, { getState, dispatch }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<boolean> = await api.userBelongsToTeam(args.teamId, args.userId);
    if (response?.data) {
      return response.data;
    } else {
      return false;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});

export const addMemberToTheTeamAction = createAsyncThunk('team/addMemberToTheTeam', async (args: { teamId: string; userId: string }, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<TeamMember[]> = await api.addUserToTeam(args.teamId, args.userId);
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

export const deleteMemberFromTheTeamAction = createAsyncThunk('team/deleteMemberFromTheTeam', async (args: { teamId: string; userId: string }, { getState, dispatch }): Promise<TeamMember[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<TeamMember[]> = await api.deleteUserFromTeam(args.teamId, args.userId);
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

export const updateTeamAction = createAsyncThunk('team/updateTeamAction', async (args: { teamId: string; data: UpdateTeamRequest }, { getState, dispatch }): Promise<Team | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Team> = await api.updateTeam(args.teamId, args.data);
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

export const checkTeamNameIsUniqueAction = createAsyncThunk('team/checkTeamNameIsUnique', async (args: { teamName: string; organizationId: string }, { getState, dispatch }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<boolean> = await api.teamNameIsAvailable(args.organizationId, args.teamName);
    if (response?.data) {
      return response.data;
    } else {
      return false;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});

export const fetchTeamReportsAction = createAsyncThunk('team/fetchTeamReports', async (teamId: string, { getState, dispatch }): Promise<Report[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Report[]> = await api.getReportsOfTeam(teamId);
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

export const updateRoleToMembersOfTeamAction = createAsyncThunk(
  'team/updateRoleToMembersOfTeam',
  async (args: { teamId: string; data: UpdateTeamMembersDTO }, { getState, dispatch }): Promise<TeamMember[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<TeamMember[]> = await api.updateTeamMemberRoles(args.teamId, args.data);
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
  },
);

export const deleteRoleOfMembersOfTeamAction = createAsyncThunk(
  'team/updateRoleToMembersOfTeam',
  async (args: { teamId: string; userId: string; role: string }, { getState, dispatch }): Promise<TeamMember[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<TeamMember[]> = await api.deleteTeamMembersRole(args.teamId, args.userId, args.role);
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
  },
);

export const updateTeamProfilePictureAction = createAsyncThunk('team/updateTeamProfilePicture', async (args: { teamId: string; file: File }, { getState, dispatch }): Promise<Team | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Team> = await api.updateTeamImage(args.teamId, args.file);
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

export const deleteTeamProfilePictureAction = createAsyncThunk('team/deleteTeamProfilePictureAction', async (teamId: string, { getState, dispatch }): Promise<Team | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Team> = await api.deleteTeamImage(teamId);
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

export const uploadMarkdownImageAction = createAsyncThunk('team/uploadMarkdownImage', async (args: { teamId: string; file: File }, { getState, dispatch }): Promise<string | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<string> = await api.uploadTeamMarkdownImage(args.teamId, args.file);
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

export const getTeamsInfoAction = createAsyncThunk('team/getTeamsInfo', async (teamsInfoQuery: TeamsInfoQuery, { getState, dispatch }): Promise<TeamInfoDto[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<TeamInfoDto[]> = await api.getTeamsInfo(teamsInfoQuery);
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
