import { Comment, NormalizedResponseDTO, CommentDto } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '..';
import { Api } from '../../api';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchReportCommentsAction = createAsyncThunk('comments/fetchReportComments', async (args: { reportId: string; sort?: string }, { getState, dispatch }): Promise<Comment[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Comment[]> = await api.getReportComments(args.reportId, args.sort);
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

export const fetchDiscussionComments = createAsyncThunk('discussions/fetchDiscussionComments', async (args: { discussionId: string; sort?: string }, { getState, dispatch }): Promise<Comment[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Comment[]> = await api.getDiscussionComments(args.discussionId, args.sort);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response?.relations));
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

export const fetchCommentAction = createAsyncThunk('comments/fetchComment', async (commentId: string, { getState, dispatch }): Promise<Comment | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Comment> = await api.getComment(commentId);
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

export const createCommentAction = createAsyncThunk('comments/createComment', async (payload: CommentDto, { getState, dispatch }): Promise<Comment | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Comment> = await api.createComment(payload);
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

export const updateCommentAction = createAsyncThunk('comments/updateComment', async (payload: { commentId: string; comment: CommentDto }, { getState, dispatch }): Promise<Comment | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Comment> = await api.updateComment(payload.commentId, payload.comment);
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

export const deleteCommentAction = createAsyncThunk('comments/deleteComment', async (commentId: string, { getState, dispatch }): Promise<Comment | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<Comment> = await api.deleteComment(commentId);
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
