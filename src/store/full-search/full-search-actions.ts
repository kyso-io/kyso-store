import { FullTextSearchDTO, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { fetchRelationsAction, RootState, setError } from '../..';
import { buildAuthHeaders, getAPIBaseURL } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';

export const fullTextSearchAction = createAsyncThunk(
  'full-search/fullTextSearch',
  async (
    args: {
      type: string;
      terms: string;
      page: number;
      perPage?: number;
      filterOrgs?: string[];
      filterTeams?: string[];
      filterTags?: string[];
      filterPeople?: string[];
    },
    { getState, dispatch }
  ): Promise<FullTextSearchDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      let url = `${getAPIBaseURL()}/search?type=${args.type}&terms=${args.terms}&page=${args.page}`;
      if (args.perPage) {
        url += `&perPage=${args.perPage}`;
      }
      if (args.filterOrgs && args.filterOrgs.length > 0) {
        url += `&filter.orgs=${args.filterOrgs.join(',')}`;
      }
      if (args.filterTeams && args.filterTeams.length > 0) {
        url += `&filter.teams=${args.filterTeams.join(',')}`;
      }
      if (args.filterTags && args.filterTags.length > 0) {
        url += `&filter.tags=${args.filterTags.join(',')}`;
      }
      if (args.filterPeople && args.filterPeople.length > 0) {
        url += `&filter.people=${args.filterPeople.join(',')}`;
      }
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<FullTextSearchDTO>> = await httpClient.get(url, {
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
      if (axios.isAxiosError(e)) {
        dispatch(setError(e.response?.data.message));
      } else {
        dispatch(setError(e.toString()));
      }
      return null;
    }
  }
);
