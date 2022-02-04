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
      LOGGER.silly('fetchInvitationsAction invoked');
      const { auth } = getState() as RootState;
      const qs = new URLSearchParams({
        page: (payload?.page || 1).toString(),
        per_page: (payload?.per_page || 20).toString(),
        sort: 'desc',
        ...payload?.filter,
      });
      const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations?${qs.toString()}`;
      LOGGER.silly(`fetchInvitationsAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`fetchInvitationsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`fetchInvitationsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`fetchInvitationsAction: Response didn't have data, returning an empty array []`);
        return [];
      }
    } catch (e: any) {
      LOGGER.error(`fetchInvitationsAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return [];
    }
  }
);

export const createInvitationAction = createAsyncThunk('tags/createInvitation', async (createInvitationDto: CreateInvitationDto, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    LOGGER.silly('createInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations`;
    LOGGER.silly(`createInvitationAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.post(url, createInvitationDto, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`createInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const acceptInvitationAction = createAsyncThunk('tags/acceptInvitation', async (invitationId: string, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    LOGGER.silly('acceptInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations/accept-invitation/${invitationId}`;
    LOGGER.silly(`acceptInvitationAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.patch(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`acceptInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`acceptInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`acceptInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`acceptInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const rejectInvitationAction = createAsyncThunk('tags/rejectInvitation', async (invitationId: string, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    LOGGER.silly('rejectInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations/reject-invitation/${invitationId}`;
    LOGGER.silly(`rejectInvitationAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.patch(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`rejectInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`rejectInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`rejectInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`rejectInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteInvitationAction = createAsyncThunk('tags/deleteInvitation', async (invitationId: string, { getState, dispatch }): Promise<Invitation | null> => {
  try {
    LOGGER.silly('deleteInvitationAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/invitations/${invitationId}`;
    LOGGER.silly(`deleteInvitationAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Invitation>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteInvitationAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteInvitationAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteInvitationAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteInvitationAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
