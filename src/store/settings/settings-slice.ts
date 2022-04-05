import { ActionWithPayload, KysoSetting } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import listToKeyVal from '../../helpers/list-to-key-val';
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
    setPublicSettings: (state: KysoSettingsState, action: ActionWithPayload<KysoSetting[]>) => {
      state.publicSettings = {
        ...state.publicSettings,
        ...listToKeyVal(action.payload),
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPublicKysoSettings.fulfilled, (state: KysoSettingsState, action: ActionWithPayload<KysoSetting[]>) => {
      if(action && action.payload) {
        state.publicSettings = {
          ...state.publicSettings,
          ...action.payload,
        };
      }

    });
    
  },
});


export default kysoSettingsSlice.reducer;
