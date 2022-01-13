import { createSlice } from '@reduxjs/toolkit';
import { ActionWithPayload } from '../../types/action-with-payload';
import { loginAction } from './auth-actions';

export type AuthState = {
  token: string | null;
};

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state: AuthState, action: ActionWithPayload<string>) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(loginAction.fulfilled, (state: AuthState, action) => {
      state.token = action.payload;
    });
  },
});

export const { setToken } = authSlice.actions;

export default authSlice.reducer;
