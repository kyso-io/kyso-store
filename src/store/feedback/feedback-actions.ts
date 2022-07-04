import { FeedbackDto, NormalizedResponseDTO, ReportDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { buildAuthHeaders, getAPIBaseURL } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';

export const newFeedbackAction = createAsyncThunk('reports/newFeedback', async (feedbackDto: FeedbackDto, { getState }): Promise<ReportDTO | null> => {
  const { auth } = getState() as RootState;
  const url = `${getAPIBaseURL()}/feedback`;
  const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, feedbackDto, {
    headers: await buildAuthHeaders(auth),
  });
  if (axiosResponse?.data?.data) {
    return axiosResponse.data.data;
  } else {
    return null;
  }
});
