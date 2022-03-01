
import { AddUserOrganizationDto, NormalizedResponseDTO, Organization, OrganizationMember, OrganizationOptions, UpdateOrganizationDTO, UpdateOrganizationMembersDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, setError } from '..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchOrganizationAction = createAsyncThunk('organizations/fetchOrganization', async (organizationId: string, { getState, dispatch }): Promise<Organization | null> => {
  try {
    // console.log('fetchOrganizationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}`;
    // console.log(`fetchOrganizationAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchOrganizationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchOrganizationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchOrganizationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchOrganizationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteOrganizationAction = createAsyncThunk('organizations/deleteOrganization', async (organizationId: string, { getState, dispatch }): Promise<Organization | null> => {
  try {
    // console.log('deleteOrganizationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}`;
    // console.log(`deleteOrganizationAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`deleteOrganizationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteOrganizationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteOrganizationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateOrganizationAction = createAsyncThunk(
  'organizations/updateOrganization',
  async (payload: { organizationId: string; updateOrganizationDto: UpdateOrganizationDTO }, { getState, dispatch }): Promise<Organization | null> => {
    try {
      // console.log('updateOrganizationAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}`;
      // console.log(`updateOrganizationAction: ${printAuthenticated(auth)} - PATCH ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.patch(url, payload.updateOrganizationDto, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateOrganizationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateOrganizationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateOrganizationAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`updateOrganizationAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const updateOrganizationOptionsAction = createAsyncThunk(
  'organizations/updateOrganizationOptions',
  async (args: { organizationId: string; options: OrganizationOptions }, { getState, dispatch }): Promise<Organization | null> => {
    try {
      // console.log('updateOrganizationOptionsAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${args.organizationId}/options`;
      // console.log(`updateOrganizationOptionsAction: ${printAuthenticated(auth)} - PATCH ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.patch(url, args.options, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateOrganizationOptionsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateOrganizationOptionsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateOrganizationOptionsAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`updateOrganizationOptionsAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const fetchOrganizationMembersAction = createAsyncThunk('discussions/fetchOrganizationMembers', async (organizationId: string, { getState, dispatch }): Promise<OrganizationMember[]> => {
  try {
    // console.log('fetchOrganizationMembers invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${organizationId}/members`;
    // console.log(`fetchOrganizationMembers: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchOrganizationMembers: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchOrganizationMembers: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchOrganizationMembers: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchOrganizationMembers: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const createOrganizationAction = createAsyncThunk('organizations/createOrganization', async (organization: Organization, { getState, dispatch }): Promise<Organization | null> => {
  try {
    // console.log('createOrganization invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations`;
    // console.log(`createOrganization: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.post(url, organization, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`createOrganization: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createOrganization: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createOrganization: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createOrganization: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const addUserToOrganizationAction = createAsyncThunk('organizations/addUserToOrganization', async (data: AddUserOrganizationDto, { getState, dispatch }): Promise<OrganizationMember[]> => {
  try {
    // console.log('addUserToOrganization invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/members`;
    // console.log(`addUserToOrganization: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.post(url, data, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`addUserToOrganization: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`addUserToOrganization: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`addUserToOrganization: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`addUserToOrganization: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const removeUserFromOrganizationAction = createAsyncThunk(
  'organizations/removeUserFromOrganization',
  async (payload: { organizationId: string; userId: string }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      // console.log('removeUserFromOrganization invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}/members/${payload.userId}`;
      // console.log(`removeUserFromOrganization: ${printAuthenticated(auth)} - DELETE ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`removeUserFromOrganization: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`removeUserFromOrganization: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`removeUserFromOrganization: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`removeUserFromOrganization: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const updateMembersRolesToOrganizationAction = createAsyncThunk(
  'organizations/updateMembersRolesToOrganization',
  async (payload: { organizationId: string; data: UpdateOrganizationMembersDTO[] }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      // console.log('updateMembersRolesToOrganization invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}/members-roles`;
      // console.log(`updateMembersRolesToOrganization: ${printAuthenticated(auth)} - POST ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.post(url, payload.data, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateMembersRolesToOrganization: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateMembersRolesToOrganization: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateMembersRolesToOrganization: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`updateMembersRolesToOrganization: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const deleteRoleToUserFromOrganizationAction = createAsyncThunk(
  'organizations/deleteRoleToUserFromOrganization',
  async (payload: { organizationId: string; userId: string; role: string }, { getState, dispatch }): Promise<OrganizationMember[]> => {
    try {
      // console.log('deleteRoleToUserFromOrganization invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${payload.organizationId}/members/${payload.userId}/${payload.role}`;
      // console.log(`deleteRoleToUserFromOrganization: ${printAuthenticated(auth)} - DELETE ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<OrganizationMember[]>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`deleteRoleToUserFromOrganization: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`deleteRoleToUserFromOrganization: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`deleteRoleToUserFromOrganization: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`deleteRoleToUserFromOrganization: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const updateOrganizationPictureAction = createAsyncThunk(
  'user/updateOrganizationProfilePicture',
  async (args: { organizationId: string; file: File }, { dispatch, getState }): Promise<Organization | null> => {
    try {
      // console.log('updateOrganizationPictureAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/organizations/${args.organizationId}/profile-picture`;
      // console.log(`updateOrganizationPictureAction: ${printAuthenticated(auth)} - POST ${url}`);
      const formData = new FormData();
      formData.append('file', args.file);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Organization>> = await httpClient.post(url, formData, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateOrganizationPictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateOrganizationPictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateOrganizationPictureAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`updateOrganizationPictureAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);
