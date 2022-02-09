import { CreateInvitationDto, Invitation, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LOGGER, RootState, setError } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchInvitationsAction = createAsyncThunk(
  'tags/fetchInvitations',
  async (payload: { filter?: object; page?: number; per_page?: number }, { getState, dispatch }): Promise<Invitation[]> => {
    try {
      // console.log('fetchInvitationsAction invoked');
      const { auth } = getState() as RootState;
      const qs = new URLSearchParams({
        page: (payload?.page || 1).toString(),
        per_page: (payload?.per_page || 20).toString(),
        sort: 'desc',
        ...payload?.filter,
      });
      const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations?${qs.toString()}`;
      // console.log(`fetchInvitationsAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchInvitationsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchInvitationsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchInvitationsAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchInvitationsAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const fetchInvitationAction = createAsyncThunk(
  'tags/fetchInvitation',
  async (invitationId: string, { getState, dispatch }): Promise<Invitation | null> => {
    try {
      // console.log('fetchInvitationAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations/${invitationId}`;
      // console.log(`fetchInvitationAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchInvitationAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`fetchInvitationAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const createInvitationAction = createAsyncThunk('tags/createInvitation', async (createInvitationDto: CreateInvitationDto, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    // console.log('createInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations`;
    // console.log(`createInvitationAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.post(url, createInvitationDto, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`createInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const acceptInvitationAction = createAsyncThunk('tags/acceptInvitation', async (invitationId: string, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    // console.log('acceptInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations/accept-invitation/${invitationId}`;
    // console.log(`acceptInvitationAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.patch(url, {}, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`acceptInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`acceptInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`acceptInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`acceptInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const rejectInvitationAction = createAsyncThunk('tags/rejectInvitation', async (invitationId: string, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    // console.log('rejectInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations/reject-invitation/${invitationId}`;
    // console.log(`rejectInvitationAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.patch(url, {}, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`rejectInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`rejectInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`rejectInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`rejectInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteInvitationAction = createAsyncThunk('tags/deleteInvitation', async (invitationId: string, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    // console.log('deleteInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations/${invitationId}`;
    // console.log(`deleteInvitationAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
