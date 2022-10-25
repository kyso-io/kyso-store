import {
  AddUserOrganizationDto,
  NormalizedResponseDTO,
  Organization,
  OrganizationInfoDto,
  OrganizationMember,
  OrganizationOptions,
  UpdateOrganizationDTO,
  UpdateOrganizationMembersDTO,
} from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, setError } from '..';
import { Api } from '../../api';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchOrganizationsAction = createAsyncThunk(
  'teams/fetchOrganizations',
  async (payload: { filter?: object; sort?: string; page?: number; per_page?: number }, { getState, dispatch }): Promise<Organization[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<Organization[]> = await api.getOrganizations(payload);
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

export const fetchOrganizationAction = createAsyncThunk('organizations/fetchOrganization', async (organizationId: string, { getState, dispatch }): Promise<Organization | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Organization> = await api.getOrganization(organizationId);
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

export const deleteOrganizationAction = createAsyncThunk('organizations/deleteOrganization', async (organizationId: string, { getState, dispatch }): Promise<Organization | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Organization> = await api.deleteOrganization(organizationId);
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

export const updateOrganizationAction = createAsyncThunk(
  'organizations/updateOrganization',
  async (payload: { organizationId: string; updateOrganizationDto: UpdateOrganizationDTO }, { getState, dispatch }): Promise<Organization | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<Organization> = await api.updateOrganization(payload.organizationId, payload.updateOrganizationDto);
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
  },
);

export const updateOrganizationOptionsAction = createAsyncThunk(
  'organizations/updateOrganizationOptions',
  async (args: { organizationId: string; options: OrganizationOptions }, { getState, dispatch }): Promise<Organization | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<Organization> = await api.updateOrganizationOptions(args.organizationId, args.options);
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
  },
);

export const fetchOrganizationMembersAction = createAsyncThunk('discussions/fetchOrganizationMembers', async (organizationId: string, { getState, dispatch }): Promise<OrganizationMember[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<OrganizationMember[]> = await api.getOrganizationMembers(organizationId);
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

export const createOrganizationAction = createAsyncThunk('organizations/createOrganization', async (organization: Organization, { getState, dispatch }): Promise<Organization | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Organization> = await api.createOrganization(organization);
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

export const addUserToOrganizationAction = createAsyncThunk('organizations/addUserToOrganization', async (data: AddUserOrganizationDto, { getState, dispatch }): Promise<OrganizationMember[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<OrganizationMember[]> = await api.addUserToOrganization(data);
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

export const joinUserToOrganizationAction = createAsyncThunk(
  'organizations/joinUserToOrganization',
  async (
    args: {
      organizationName: string;
      invitationCode: string;
    },
    { getState, dispatch },
  ): Promise<any> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<any> = await api.joinUserToOrganization(args.organizationName, args.invitationCode);
      return response?.data;
    } catch (e: any) {
      if (axios.isAxiosError(e) && e.response?.data?.message) {
        dispatch(setError(e.response.data.message));
        return e.response.data;
      } else {
        dispatch(setError(e.toString()));
      }
      return false;
    }
  },
);

export const removeUserFromOrganizationAction = createAsyncThunk(
  'organizations/removeUserFromOrganization',
  async (payload: { organizationId: string; userId: string }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<OrganizationMember[]> = await api.removeUserFromOrganization(payload.organizationId, payload.userId);
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

export const updateMembersRolesToOrganizationAction = createAsyncThunk(
  'organizations/updateMembersRolesToOrganization',
  async (payload: { organizationId: string; data: UpdateOrganizationMembersDTO }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<OrganizationMember[]> = await api.updateOrganizationMemberRoles(payload.organizationId, payload.data);
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

export const deleteRoleToUserFromOrganizationAction = createAsyncThunk(
  'organizations/deleteRoleToUserFromOrganization',
  async (payload: { organizationId: string; userId: string; role: string }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<OrganizationMember[]> = await api.deleteUserRoleOrganization(payload.organizationId, payload.userId, payload.role);
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

export const updateOrganizationPictureAction = createAsyncThunk(
  'user/updateOrganizationProfilePicture',
  async (args: { organizationId: string; file: File }, { dispatch, getState }): Promise<Organization | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<Organization> = await api.updateOrganizationImage(args.organizationId, args.file);
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
  },
);

export const getOrganizationInfoAction = createAsyncThunk('organization/getOrganizationInfo', async (organizationId: string, { getState, dispatch }): Promise<OrganizationInfoDto[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<OrganizationInfoDto[]> = await api.getOrganizationsInfo(organizationId);
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
