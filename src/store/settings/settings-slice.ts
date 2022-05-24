import { ActionWithPayload, KysoSetting } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { fetchPublicKysoSettings } from './settings-actions';

export type KysoSettingsState = {
  publicSettings: KysoSetting[]
};

const initialState: KysoSettingsState = {
  publicSettings: []
  
};

const kysoSettingsSlice = createSlice({
  name: 'kyso-settings',
  initialState,
  reducers: {
    setPublicSettings: (state: KysoSettingsState, action: ActionWithPayload<KysoSetting[]>) => {
      if (action && action.payload) {
        state.publicSettings = [...action.payload];
      }
    },
    resetSettingsSlice: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchPublicKysoSettings.fulfilled, (state: KysoSettingsState, action: ActionWithPayload<KysoSetting[]>) => {
      if (action && action.payload) {
        state.publicSettings = [...action.payload];
      }
    });
  },
});


export const { setPublicSettings, resetSettingsSlice } = kysoSettingsSlice.actions;

export default kysoSettingsSlice.reducer;
