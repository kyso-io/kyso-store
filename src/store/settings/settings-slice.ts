import { ActionWithPayload, KysoSetting, Relations, ReportDTO } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import listToKeyVal from '../../helpers/list-to-key-val';
import { fetchRelationsAction } from '../relations/relations-actions';
import { fetchPublicKysoSettings } from './settings-actions';

export type KysoSettingsState = {
  publicSettings: KysoSetting[]
};

const initialState: KysoSettingsState = {
  publicSettings: [],
  
};

const kysoSettingsSlice = createSlice({
  name: 'kyso-settings',
  initialState,
  reducers: {
    setPublicSettings: (state: KysoSettingsState, action: ActionWithPayload<ReportDTO[]>) => {
      state.publicSettings = {
        ...state.publicSettings,
        ...listToKeyVal(action.payload),
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPublicKysoSettings.fulfilled, (state: KysoSettingsState, action: ActionWithPayload<KysoSetting[]>) => {
      console.log(action.payload)

      state.publicSettings = {
        ...state.publicSettings,
        ...action.payload,
      };
    });
    
  },
});


export default kysoSettingsSlice.reducer;
