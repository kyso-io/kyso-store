import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '@kyso-io/kyso-model';
import { loginAction } from './auth-actions';

export type AuthState = {
  token: string | null;
  team: string | null;
  organization: string | null;
};

const initialState: AuthState = {
  token: null,
  team: null,
  organization: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokenAuthAction: (state: AuthState, action: ActionWithPayload<string>) => {
      state.token = action.payload;
    },
    setTeamAuthAction: (state: AuthState, action: ActionWithPayload<string>) => {
      state.team = action.payload;
    },
    setOrganizationAuthAction: (state: AuthState, action: ActionWithPayload<string>) => {
      state.organization = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.fulfilled, (state: AuthState, action) => {
      state.token = action.payload;
    });
  },
});

export const { setTokenAuthAction, setTeamAuthAction, setOrganizationAuthAction } = authSlice.actions;

export default authSlice.reducer;
