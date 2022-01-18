import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import httpClient from '../../services/http-client';
import { Comment } from '../../types/comment';
import { NormalizedResponse } from '../../types/normalized-response';
import { fetchRelationsAction } from '../relations/relations-actions';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchReportCommentsAction = createAsyncThunk('comments/fetchReportComments', async (payload: { owner: string; reportName: string }, { getState, dispatch }) => {
  try {
    const url = `/reports/${payload.owner}/${payload.reportName}/comments`;
    const axiosResponse: AxiosResponse<NormalizedResponse<Comment[]>> = await httpClient.get(url);

    if (axiosResponse?.data?.relations) {
        dispatch(fetchRelationsAction(axiosResponse?.data?.relations))
    }

    if (axiosResponse?.data?.data) {
      return axiosResponse.data.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
});

