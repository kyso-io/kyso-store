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
    setToken: (state: AuthState, action: ActionWithPayload<string>) => {
      state.token = action.payload;
    },
    setTeam: (state: AuthState, action: ActionWithPayload<string>) => {
      state.team = action.payload;
    },
    setOrganization: (state: AuthState, action: ActionWithPayload<string>) => {
      state.organization = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.fulfilled, (state: AuthState, action) => {
      state.token = action.payload;
    });
  },
});

export const { setToken, setTeam, setOrganization } = authSlice.actions;

export default authSlice.reducer;
