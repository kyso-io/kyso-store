import { NormalizedResponseDTO, Organization, OrganizationMember, UpdateOrganizationMembersDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchOrganizationAction = createAsyncThunk('organizations/fetchOrganization', async (organizationId: string, { getState, dispatch }): Promise<Organization | null> => {
  try {
    LOGGER.silly('fetchOrganizationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}`;
    LOGGER.silly(`fetchOrganizationAction: ${printAuthenticated(auth)} - GET ${url} `);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchOrganizationAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchOrganizationAction: axiosResponse ${axiosResponse.data.data}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchOrganizationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchOrganizationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteOrganizationAction = createAsyncThunk('organizations/deleteOrganization', async (organizationId: string, { getState, dispatch }): Promise<Organization | null> => {
  try {
    LOGGER.silly('deleteOrganizationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}`;
    LOGGER.silly(`deleteOrganizationAction: ${printAuthenticated(auth)} - DELETE ${url} `);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteOrganizationAction: axiosResponse ${axiosResponse.data.data}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteOrganizationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteOrganizationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateOrganizationAction = createAsyncThunk(
  'organizations/updateOrganization',
  async (payload: { organizationId: string; organization: Organization }, { getState, dispatch }): Promise<Organization | null> => {
    try {
      LOGGER.silly('updateOrganizationAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}`;
      LOGGER.silly(`updateOrganizationAction: ${printAuthenticated(auth)} - PUT ${url} `);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.put(url, payload.organization, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`updateOrganizationAction: relations ${axiosResponse.data.relations}`);
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`updateOrganizationAction: axiosResponse ${axiosResponse.data.data}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`updateOrganizationAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      LOGGER.error(`updateOrganizationAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const fetchOrganizationMembersAction = createAsyncThunk('discussions/fetchOrganizationMembers', async (organizationId: string, { getState, dispatch }): Promise<OrganizationMember[]> => {
  try {
    LOGGER.silly('fetchOrganizationMembers invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}/members`;
    LOGGER.silly(`fetchOrganizationMembers: ${printAuthenticated(auth)} - GET ${url} `);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchOrganizationMembers: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchOrganizationMembers: axiosResponse ${axiosResponse.data.data}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchOrganizationMembers: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchOrganizationMembers: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const createOrganizationAction = createAsyncThunk('organizations/createOrganization', async (organization: Organization, { getState, dispatch }): Promise<Organization | null> => {
  try {
    LOGGER.silly('createOrganization invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations`;
    LOGGER.silly(`createOrganization: ${printAuthenticated(auth)} - POST ${url} `);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.post(url, organization, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`createOrganization: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createOrganization: axiosResponse ${axiosResponse.data.data}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createOrganization: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createOrganization: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const addUserToOrganizationAction = createAsyncThunk(
  'organizations/addUserToOrganization',
  async (payload: { organizationId: string; userId: string }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      LOGGER.silly('addUserToOrganization invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}/members/${payload.userId}`;
      LOGGER.silly(`addUserToOrganization: ${printAuthenticated(auth)} - POST ${url} `);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.post(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`addUserToOrganization: relations ${axiosResponse.data.relations}`);
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`addUserToOrganization: axiosResponse ${axiosResponse.data.data}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`addUserToOrganization: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`addUserToOrganization: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const removeUserFromOrganizationAction = createAsyncThunk(
  'organizations/removeUserFromOrganization',
  async (payload: { organizationId: string; userId: string }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      LOGGER.silly('removeUserFromOrganization invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}/members/${payload.userId}`;
      LOGGER.silly(`removeUserFromOrganization: ${printAuthenticated(auth)} - DELETE ${url} `);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`removeUserFromOrganization: relations ${axiosResponse.data.relations}`);
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`removeUserFromOrganization: axiosResponse ${axiosResponse.data.data}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`removeUserFromOrganization: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`removeUserFromOrganization: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const updateMembersRolesToOrganizationAction = createAsyncThunk(
  'organizations/updateMembersRolesToOrganization',
  async (payload: { organizationId: string; data: UpdateOrganizationMembersDTO[] }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      LOGGER.silly('updateMembersRolesToOrganization invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}/members-roles`;
      LOGGER.silly(`updateMembersRolesToOrganization: ${printAuthenticated(auth)} - POST ${url} `);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.post(url, payload.data, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`updateMembersRolesToOrganization: relations ${axiosResponse.data.relations}`);
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`updateMembersRolesToOrganization: axiosResponse ${axiosResponse.data.data}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`updateMembersRolesToOrganization: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`updateMembersRolesToOrganization: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const deleteRoleToUserFromOrganizationAction = createAsyncThunk(
  'organizations/deleteRoleToUserFromOrganization',
  async (payload: { organizationId: string; userId: string; role: string }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      LOGGER.silly('deleteRoleToUserFromOrganization invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}/members/${payload.userId}/${payload.role}`;
      LOGGER.silly(`deleteRoleToUserFromOrganization: ${printAuthenticated(auth)} - DELETE ${url} `);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`deleteRoleToUserFromOrganization: relations ${axiosResponse.data.relations}`);
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`deleteRoleToUserFromOrganization: axiosResponse ${axiosResponse.data.data}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`deleteRoleToUserFromOrganization: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`deleteRoleToUserFromOrganization: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);
