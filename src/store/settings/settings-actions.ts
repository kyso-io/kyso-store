import { KysoSetting, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { setError } from '..';
import { getAPIBaseURL } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { setPublicSettings } from './settings-slice';

export const fetchKysoConfigValuesAction = createAsyncThunk('settings/fetchKysoConfigValues', async (key: string, { dispatch }): Promise<string | null> => {
  try {
    const url = `${getAPIBaseURL()}/kyso-settings/${key}`;
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

export const fetchPublicKysoSettings = createAsyncThunk('settings/fetchPublicKysoSettings', async (_, { dispatch }): Promise<KysoSetting[] | null> => {
  try {
    const url = `${getAPIBaseURL()}/kyso-settings/public`;
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.get(url);
    if (axiosResponse?.data?.data) {
      await dispatch(setPublicSettings(axiosResponse.data.data as any));
      return axiosResponse.data.data as any
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

