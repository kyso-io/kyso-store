import { KysoSetting, NormalizedResponseDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setError } from '..';
import { Api } from '../../api';
import { setPublicSettings } from './settings-slice';

export const fetchKysoConfigValuesAction = createAsyncThunk('settings/fetchKysoConfigValues', async (key: string, { dispatch }): Promise<string | null> => {
  try {
    const api: Api = new Api();
    const response: NormalizedResponseDTO<string> = await api.getSettingValue(key);
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

export const fetchPublicKysoSettings = createAsyncThunk('settings/fetchPublicKysoSettings', async (_, { dispatch }): Promise<KysoSetting[] | null> => {
  try {
    const api: Api = new Api();
    const response: NormalizedResponseDTO<KysoSetting[]> = await api.getPublicSettings();
    if (response?.data) {
      await dispatch(setPublicSettings(response.data as any));
      return response.data as any;
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
