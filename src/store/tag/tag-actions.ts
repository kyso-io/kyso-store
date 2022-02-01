import { NormalizedResponseDTO, Tag, TagAssign } from '@kyso-io/kyso-model';
import { EntityEnum } from '@kyso-io/kyso-model/dist/enums/entity.enum';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { LOGGER, RootState, setError } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchTagsAction = createAsyncThunk('tags/fetchTags', async (_, { getState, dispatch }): Promise<Tag[]> => {
  try {
    LOGGER.silly('fetchTagsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags`;
    LOGGER.silly(`fetchTagsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchTagsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchTagsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchTagsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchTagsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const createTagAction = createAsyncThunk('tags/createTag', async (tag: Tag, { getState, dispatch }): Promise<Tag | null> => {
  try {
    LOGGER.silly('createTagAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags`;
    LOGGER.silly(`createTagAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.post(url, tag, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`createTagAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createTagAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createTagAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createTagAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchTagAction = createAsyncThunk('tags/fetchTags', async (tagId: string, { getState, dispatch }): Promise<Tag | null> => {
  try {
    LOGGER.silly('fetchTagsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${tagId}`;
    LOGGER.silly(`fetchTagsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchTagsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchTagsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchTagsAction: Response didn't have data, returning an empty array []`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchTagsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const checkTagNameAction = createAsyncThunk('tags/checkTagName', async (tagName: string, { getState, dispatch }): Promise<boolean> => {
  try {
    LOGGER.silly('checkTagNameAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/check/${tagName}`;
    LOGGER.silly(`checkTagNameAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`checkTagNameAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`checkTagNameAction: Response didn't have data, returning false`);
      return false;
    }
  } catch (e: any) {
    LOGGER.error(`checkTagNameAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return false;
  }
});

export const updateTagActions = createAsyncThunk('tags/updateTag', async (payload: { tagId: string; tag: Tag }, { getState, dispatch }): Promise<Tag | null> => {
  try {
    LOGGER.silly('updateTagActions invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${payload.tagId}`;
    LOGGER.silly(`updateTagActions: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.patch(url, payload.tag, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`updateTagActions: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`updateTagActions: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`updateTagActions: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`updateTagActions: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteTagAction = createAsyncThunk('tags/deleteTag', async (tagId: string, { getState, dispatch }): Promise<Tag | null> => {
  try {
    LOGGER.silly('deleteTagAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${tagId}`;
    LOGGER.silly(`deleteTagAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteTagAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteTagAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteTagAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteTagAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const assignTagToEntityAction = createAsyncThunk(
  'tags/assignTagToEntity',
  async (payload: { tagId: string; entityId: string; entityEnum: EntityEnum }, { getState, dispatch }): Promise<TagAssign | null> => {
    try {
      LOGGER.silly('assignTagToEntityAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${payload.tagId}/assign/${payload.entityId}/${payload.entityEnum}`;
      LOGGER.silly(`assignTagToEntityAction: ${printAuthenticated(auth)} - POST ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TagAssign>> = await httpClient.post(url, null, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`assignTagToEntityAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`assignTagToEntityAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`assignTagToEntityAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      LOGGER.error(`assignTagToEntityAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const unassignTagFromEntityAction = createAsyncThunk(
  'tags/unassignTagFromEntityAction',
  async (payload: { tagId: string; entityId: string }, { getState, dispatch }): Promise<TagAssign | null> => {
    try {
      LOGGER.silly('unassignTagFromEntityAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${payload.tagId}/unassign/${payload.entityId}`;
      LOGGER.silly(`unassignTagFromEntityAction: ${printAuthenticated(auth)} - DELETE ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TagAssign>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        LOGGER.silly(`unassignTagFromEntityAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`unassignTagFromEntityAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`unassignTagFromEntityAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      LOGGER.error(`unassignTagFromEntityAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);
