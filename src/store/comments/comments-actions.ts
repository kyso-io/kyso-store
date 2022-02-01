import { Comment, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchReportCommentsAction = createAsyncThunk('comments/fetchReportComments', async (reportId: string, { getState, dispatch }): Promise<Comment[]> => {
  try {
    LOGGER.silly('fetchReportCommentsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/comments`;
    LOGGER.silly(`fetchReportCommentsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportCommentsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchReportCommentsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchReportCommentsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchReportCommentsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchCommentAction = createAsyncThunk('comments/fetchComment', async (commentId: string, { getState, dispatch }): Promise<Comment | null> => {
  try {
    LOGGER.silly('fetchCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`;
    LOGGER.silly(`fetchCommentAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const createCommentAction = createAsyncThunk('comments/createComment', async (payload: Comment, { getState, dispatch }): Promise<Comment | null> => {
  try {
    LOGGER.silly('createCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments`;
    LOGGER.silly(`createCommentAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.post(url, payload, { headers: buildAuthHeaders(auth) });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`createCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createCommentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateCommentAction = createAsyncThunk('comments/updateComment', async (payload: { commentId: string; comment: Comment }, { getState, dispatch }): Promise<Comment | null> => {
  try {
    LOGGER.silly('updateCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments/${payload.commentId}`;
    LOGGER.silly(`updateCommentAction: ${printAuthenticated(auth)} - PUT ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.put(url, payload.comment, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`updateCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`updateCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`updateCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`updateCommentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteCommentAction = createAsyncThunk('comments/deleteComment', async (commentId: string, { getState, dispatch }): Promise<Comment | null> => {
  try {
    LOGGER.trace('deleteCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`;
    LOGGER.silly(`deleteCommentAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.delete(url, { headers: buildAuthHeaders(auth) });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteCommentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
