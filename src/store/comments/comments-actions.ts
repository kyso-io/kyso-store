import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import httpClient from '../../services/http-client';
import { Comment } from '@kyso-io/kyso-model'
import { LOGGER } from '../..';
import { RootState } from '..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import { NormalizedResponseDTO } from '../../types/normalized-response';
import { fetchRelationsAction } from '../relations/relations-actions';
import { setError } from '../error/error-slice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchReportCommentsAction = createAsyncThunk('comments/fetchReportComments', async (payload: { owner: string; reportName: string }, { getState, dispatch }) => {
  try {
    LOGGER.silly("fetchReportCommentsAction invoked")
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.owner}/${payload.reportName}/comments`;
    LOGGER.silly(`${printAuthenticated(auth)} - GET ${url} `)
    
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth)
    });

    if (axiosResponse?.data?.relations) {
      dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
    }

    if (axiosResponse?.data.data) {
      LOGGER.silly(axiosResponse.data.data)
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`Response didn't have data, returning an empty array []`)
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`Error processing action: ${e.toString()}`)
    dispatch(setError(e.toString()))
    return []
  }
});

export const fetchComment = createAsyncThunk('comments/fetchComment', async (id: string) => {
  try {
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.get(`/comments/${id}`);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const createComment = createAsyncThunk('comments/createComment', async (payload: Comment) => {
  try {
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.post('/comments', payload);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const updateComment = createAsyncThunk('comments/updateComment', async (payload: { id: string; comment: Comment }) => {
  try {
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.put(`/comments/${payload.id}`, payload.comment);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id: string) => {
  try {
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.delete(`/comments/${id}`);
    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});
