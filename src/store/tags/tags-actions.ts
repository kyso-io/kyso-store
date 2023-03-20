import { EntityEnum, NormalizedResponseDTO, Tag, TagAssign } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState, setError } from '../..';
import { Api } from '../../api';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchTagsAction = createAsyncThunk('tags/fetchTags', async (args: { filter?: object; sort?: string; page?: number; per_page?: number }, { getState, dispatch }): Promise<Tag[]> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<Tag[]> = await api.getTags(args);
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

export const createTagAction = createAsyncThunk('tags/createTag', async (tag: Tag, { getState, dispatch }): Promise<Tag | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<Tag> = await api.createTag(tag);
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

export const fetchTagAction = createAsyncThunk('tags/fetchTags', async (tagId: string, { getState, dispatch }): Promise<Tag | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<Tag> = await api.getTag(tagId);
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

export const checkTagNameAction = createAsyncThunk('tags/checkTagName', async (tag: Tag, { getState, dispatch }): Promise<boolean> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<boolean> = await api.tagExists(tag);
    if (response?.data) {
      return response.data;
    } else {
      return false;
    }
  } catch (e: any) {
    if (axios.isAxiosError(e)) {
      dispatch(setError(e.response?.data.message));
    } else {
      dispatch(setError(e.toString()));
    }
    return false;
  }
});

export const updateTagActions = createAsyncThunk('tags/updateTag', async (payload: { tagId: string; tag: Tag }, { getState, dispatch }): Promise<Tag | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<Tag> = await api.updateTag(payload.tagId, payload.tag);
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

export const deleteTagAction = createAsyncThunk('tags/deleteTag', async (tagId: string, { getState, dispatch }): Promise<Tag | null> => {
  try {
    const { auth } = getState() as RootState;
    const api: Api = new Api(auth.token);
    const response: NormalizedResponseDTO<Tag> = await api.deleteTag(tagId);
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

export const assignTagToEntityAction = createAsyncThunk(
  'tags/assignTagToEntity',
  async (payload: { tagId: string; entityId: string; entityEnum: EntityEnum }, { getState, dispatch }): Promise<TagAssign | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token);
      const response: NormalizedResponseDTO<TagAssign> = await api.assignTagToEntity(payload.tagId, payload.entityId, payload.entityEnum);
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
  },
);

export const unassignTagFromEntityAction = createAsyncThunk(
  'tags/unassignTagFromEntityAction',
  async (payload: { tagId: string; entityId: string }, { getState, dispatch }): Promise<TagAssign | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token);
      const response: NormalizedResponseDTO<TagAssign> = await api.unassignTagFromEntity(payload.tagId, payload.entityId);
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
  },
);
