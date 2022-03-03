import { NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { setError } from '..';
import httpClient from '../../services/http-client';

export const fetchKysoConfigValuesAction = createAsyncThunk('settings/fetchKysoConfigValues', async (key: string, { dispatch }): Promise<string | null> => {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/kyso-settings/${key}`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.get(url);
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
});
