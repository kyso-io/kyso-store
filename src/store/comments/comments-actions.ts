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
    console.log('fetchReportCommentsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/comments`;
    console.log(`fetchReportCommentsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      console.log(`fetchReportCommentsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      console.log(`fetchReportCommentsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      console.log(`fetchReportCommentsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    console.log(`fetchReportCommentsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchDiscussionComments = createAsyncThunk('discussions/fetchDiscussionComments', async (payload: { discussionId: string }, { getState, dispatch }): Promise<Comment[]> => {
 try {
   console.log('fetchDiscussionComments invoked');
   
   const url = `${process.env.NEXT_PUBLIC_API_URL}/discussions/${payload.discussionId}/comments`;
   const { auth } = getState() as RootState;
   
   console.log(`fetchDiscussionComments: ${printAuthenticated(auth)} - GET ${url}`);
   
   const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment[]>> = await httpClient.get(url, {
     headers: buildAuthHeaders(auth)
   });
   
   if (axiosResponse?.data?.relations) {
     console.log(`fetchDiscussionComments: relations ${JSON.stringify(axiosResponse.data.relations)}`);
     dispatch(fetchRelationsAction(axiosResponse?.data?.relations));
   }

   if (axiosResponse?.data?.data) {
     console.log(`fetchDiscussionComments: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
     return axiosResponse.data.data;
   } else {
     console.log(`fetchDiscussionComments: Response didn't have data, returning null`);
     return [];
   }
 } catch (e: any) {
   console.log(`fetchDiscussionComments: Error processing action: ${e.toString()}`);
   return [];
 }
});



export const fetchCommentAction = createAsyncThunk('comments/fetchComment', async (commentId: string, { getState, dispatch }): Promise<Comment | null> => {
  try {
    console.log('fetchCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`;
    console.log(`fetchCommentAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      console.log(`fetchCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      console.log(`fetchCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      console.log(`fetchCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    console.log(`Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const createCommentAction = createAsyncThunk('comments/createComment', async (payload: Comment, { getState, dispatch }): Promise<Comment | null> => {
  try {
    console.log('createCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments`;
    console.log(`createCommentAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.post(url, payload, { headers: buildAuthHeaders(auth) });
    if (axiosResponse?.data?.relations) {
      console.log(`createCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      console.log(`createCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      console.log(`createCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    console.log(`createCommentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateCommentAction = createAsyncThunk('comments/updateComment', async (payload: { commentId: string; comment: Comment }, { getState, dispatch }): Promise<Comment | null> => {
  try {
    console.log('updateCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments/${payload.commentId}`;
    console.log(`updateCommentAction: ${printAuthenticated(auth)} - PUT ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.patch(url, payload.comment, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      console.log(`updateCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      console.log(`updateCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      console.log(`updateCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    console.log(`updateCommentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteCommentAction = createAsyncThunk('comments/deleteComment', async (commentId: string, { getState, dispatch }): Promise<Comment | null> => {
  try {
    console.log('deleteCommentAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}`;
    console.log(`deleteCommentAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Comment>> = await httpClient.delete(url, { headers: buildAuthHeaders(auth) });
    if (axiosResponse?.data?.relations) {
      console.log(`deleteCommentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      console.log(`deleteCommentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      console.log(`deleteCommentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    console.log(`deleteCommentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
