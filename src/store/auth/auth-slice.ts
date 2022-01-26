import { ActionWithPayload } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';

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
    setAuthAction: (state: AuthState, action: ActionWithPayload<{ jwt: string, teamName: string, organizationName: string }>) => {
      state.token = action.payload!.jwt;
      state.team = action.payload!.teamName
      state.organization = action.payload!.organizationName
    },
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
});

export const { setAuthAction, setTokenAuthAction, setTeamAuthAction, setOrganizationAuthAction } = authSlice.actions;

export default authSlice.reducer;
