import { NormalizedResponseDTO, Tag, TagAssign } from '@kyso-io/kyso-model';
import { EntityEnum } from '@kyso-io/kyso-model/dist/enums/entity.enum';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState, setError } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { fetchRelationsAction } from '../relations/relations-actions';

export const fetchTagsAction = createAsyncThunk('tags/fetchTags', async (_, { getState, dispatch }): Promise<Tag[]> => {
  try {
    // console.log('fetchTagsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags`;
    // console.log(`fetchTagsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchTagsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchTagsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchTagsAction: Response didn't have data, returning an empty array []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchTagsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const createTagAction = createAsyncThunk('tags/createTag', async (tag: Tag, { getState, dispatch }): Promise<Tag | null> => {
  try {
    // console.log('createTagAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags`;
    // console.log(`createTagAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.post(url, tag, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`createTagAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createTagAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createTagAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createTagAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchTagAction = createAsyncThunk('tags/fetchTags', async (tagId: string, { getState, dispatch }): Promise<Tag | null> => {
  try {
    // console.log('fetchTagsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${tagId}`;
    // console.log(`fetchTagsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchTagsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchTagsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchTagsAction: Response didn't have data, returning an empty array []`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchTagsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const checkTagNameAction = createAsyncThunk('tags/checkTagName', async (tagName: string, { getState, dispatch }): Promise<boolean> => {
  try {
    // console.log('checkTagNameAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/check/${tagName}`;
    // console.log(`checkTagNameAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<boolean>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.data) {
      // console.log(`checkTagNameAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`checkTagNameAction: Response didn't have data, returning false`);
      return false;
    }
  } catch (e: any) {
    // console.log(`checkTagNameAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return false;
  }
});

export const updateTagActions = createAsyncThunk('tags/updateTag', async (payload: { tagId: string; tag: Tag }, { getState, dispatch }): Promise<Tag | null> => {
  try {
    // console.log('updateTagActions invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${payload.tagId}`;
    // console.log(`updateTagActions: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.patch(url, payload.tag, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`updateTagActions: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`updateTagActions: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`updateTagActions: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`updateTagActions: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const deleteTagAction = createAsyncThunk('tags/deleteTag', async (tagId: string, { getState, dispatch }): Promise<Tag | null> => {
  try {
    // console.log('deleteTagAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${tagId}`;
    // console.log(`deleteTagAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Tag>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteTagAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteTagAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteTagAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteTagAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const assignTagToEntityAction = createAsyncThunk(
  'tags/assignTagToEntity',
  async (payload: { tagId: string; entityId: string; entityEnum: EntityEnum }, { getState, dispatch }): Promise<TagAssign | null> => {
    try {
      // console.log('assignTagToEntityAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${payload.tagId}/assign/${payload.entityId}/${payload.entityEnum}`;
      // console.log(`assignTagToEntityAction: ${printAuthenticated(auth)} - POST ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TagAssign>> = await httpClient.post(url, null, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`assignTagToEntityAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`assignTagToEntityAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`assignTagToEntityAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`assignTagToEntityAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const unassignTagFromEntityAction = createAsyncThunk(
  'tags/unassignTagFromEntityAction',
  async (payload: { tagId: string; entityId: string }, { getState, dispatch }): Promise<TagAssign | null> => {
    try {
      // console.log('unassignTagFromEntityAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/tags/${payload.tagId}/unassign/${payload.entityId}`;
      // console.log(`unassignTagFromEntityAction: ${printAuthenticated(auth)} - DELETE ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<TagAssign>> = await httpClient.delete(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`unassignTagFromEntityAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`unassignTagFromEntityAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`unassignTagFromEntityAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`unassignTagFromEntityAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);
