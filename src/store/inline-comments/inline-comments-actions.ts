import { CreateInlineCommentDto, InlineCommentDto, NormalizedResponseDTO, UpdateInlineCommentDto } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { Api } from '../../api';
import { fetchRelationsAction } from '../relations/relations-actions';

export const getInlineCommentsAction = createAsyncThunk('inline-comments/getInlineComments', async (reportId: string, { getState, dispatch }): Promise<InlineCommentDto[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<InlineCommentDto[]> = await api.getInlineComments(reportId);
    if (response?.relations) {
      dispatch(fetchRelationsAction(response.relations));
    }
    if (response?.data) {
      return response.data;
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
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<InlineCommentDto> = await api.createInlineComment(createInlineCommentDto);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (e: any) {
      return null;
    }
  },
);

export const updateInlineCommentAction = createAsyncThunk(
  'inline-comments/updateInlineComment',
  async (payload: { inlineCommentId: string; updateInlineCommentDto: UpdateInlineCommentDto }, { getState, dispatch }): Promise<InlineCommentDto | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<InlineCommentDto> = await api.updateInlineComment(payload.inlineCommentId, payload.updateInlineCommentDto);
      if (response?.relations) {
        dispatch(fetchRelationsAction(response.relations));
      }
      if (response?.data) {
        return response.data;
      } else {
        return null;
      }
    } catch (e: any) {
      return null;
    }
  },
);

export const deleteInlineCommentAction = createAsyncThunk('inline-comment/deleteInlineComment', async (inlineCommentId: string, { getState }): Promise<boolean | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token, auth.organization, auth.team);
    const response: NormalizedResponseDTO<boolean> = await api.deleteInlineComment(inlineCommentId);
    if (response?.data) {
      return response.data;
    } else {
      return null;
    }
  } catch (e: any) {
    return null;
  }
});
