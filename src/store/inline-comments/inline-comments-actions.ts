import { CreateInlineCommentDto, InlineCommentDto, NormalizedResponseDTO, UpdateInlineCommentDto } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { buildAuthHeaders, getAPIBaseURL } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const getInlineCommentsAction = createAsyncThunk('inline-comments/getInlineComments', async (reportId: string, { getState, dispatch }): Promise<InlineCommentDto[]> => {
  try {
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/inline-comments/${reportId}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<InlineCommentDto[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return [];
    }
  } catch (e: any) {
    return [];
  }
});

export const createInlineCommentAction = createAsyncThunk(
  'inline-comments/createInlineComment',
  async (createInlineCommentDto: CreateInlineCommentDto, { getState, dispatch }): Promise<InlineCommentDto | null> => {
    try {
      const { auth } = getState() as RootState;
      const url = `${getAPIBaseURL()}/inline-comments`;
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<InlineCommentDto>> = await httpClient.post(url, createInlineCommentDto, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        return axiosResponse.data.data;
      } else {
        return null;
      }
    } catch (e: any) {
      return null;
    }
  }
);

export const updateInlineCommentAction = createAsyncThunk(
  'inline-comments/updateInlineComment',
  async (payload: { inlineCommentId: string; updateInlineCommentDto: UpdateInlineCommentDto }, { getState, dispatch }): Promise<InlineCommentDto | null> => {
    try {
      const { auth } = getState() as RootState;
      const url = `${getAPIBaseURL()}/inline-comments/${payload.inlineCommentId}`;
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<InlineCommentDto>> = await httpClient.patch(url, payload.updateInlineCommentDto, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        return axiosResponse.data.data;
      } else {
        return null;
      }
    } catch (e: any) {
      return null;
    }
  }
);

export const deleteInlineCommentAction = createAsyncThunk('inline-comment/deleteInlineComment', async (inlineCommentId: string, { getState }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const url = `${getAPIBaseURL()}/inline-comments/${inlineCommentId}`;
    const axiosResponse: AxiosResponse<boolean> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    return axiosResponse.data;
  } catch (e: any) {
    return false;
  }
});
