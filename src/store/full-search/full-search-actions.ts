import { ElasticSearchIndex, FullTextSearchDTO, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchRelationsAction, RootState, setError } from '../..';
import { Api } from '../../api';

export const fullTextSearchAction = createAsyncThunk(
  'full-search/fullTextSearch',
  async (
    args: {
      type: ElasticSearchIndex;
      terms: string;
      page: number;
      perPage?: number;
      filterOrgs?: string[];
      filterTeams?: string[];
      filterTags?: string[];
      filterPeople?: string[];
    },
    { getState, dispatch },
  ): Promise<FullTextSearchDTO | null> => {
    try {
      const { auth } = getState() as RootState;
      const api: Api = new Api(auth.token, auth.organization, auth.team);
      const response: NormalizedResponseDTO<FullTextSearchDTO> = await api.fullTextSearch(args);
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
