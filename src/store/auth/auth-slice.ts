import { TokenPermissions } from '@kyso-io/kyso-model';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { ActionWithPayload } from '../../types/action-with-payload';

export type AuthState = {
  token: string | null;
  team: string | null;
  organization: string | null;
  organizationAuthOptions: any | null;
  currentUserPermissions: TokenPermissions | null;
};

const initialState: AuthState = {
  token: null,
  team: null,
  organization: null,
  organizationAuthOptions: null,
  currentUserPermissions: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthAction: (state: AuthState, action: ActionWithPayload<{ jwt: string; teamName: string; organizationName: string }>) => {
      state.token = action.payload!.jwt;
      state.team = action.payload!.teamName;
      state.organization = action.payload!.organizationName;
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
    setOrganizationAuthOptionsAction: (state: AuthState, action: ActionWithPayload<any>) => {
      state.organizationAuthOptions = action.payload;
    },
    setUserPermissionsAction: (state: AuthState, action: ActionWithPayload<any>) => {
      // console.log(action.payload)
      state.currentUserPermissions = action.payload;
    },
    resetAuthSlice: () => {
      return initialState;
    },
  },
});

export const { setAuthAction, setTokenAuthAction, setTeamAuthAction, setOrganizationAuthAction, setOrganizationAuthOptionsAction, setUserPermissionsAction, resetAuthSlice } = authSlice.actions;

export const selectCurrentUserPermissions = (state: RootState): TokenPermissions | null => {
  return state.auth.currentUserPermissions;
};

export default authSlice.reducer;
